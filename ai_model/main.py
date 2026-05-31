# ─────────────────────────────────────────────────────────────
# ai_model/main.py  —  Trashify AI (Fixed Loader v4)
#
# Fix: file model.weights.h5 menyimpan layer dengan nama GENERIC
# Keras 3 (batch_normalization_N, conv2d_N, ...) sementara model
# MobileNetV2 API menggunakan nama SPESIFIK (Conv1, bn_Conv1, ...).
#
# Solusi: decode urutan instantiasi layer dari config.json untuk
# membangun mapping specific_name → generic_name, lalu assign
# weights satu per satu berdasarkan mapping tersebut.
#
# Output kelas : [organic, anorganic, residu]
# Input size   : 224x224x3, normalisasi [-1, 1]
# ─────────────────────────────────────────────────────────────

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
from PIL import Image
import h5py, json, io, os

app = FastAPI(title="Trashify AI Model", version="4.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"],
                   allow_methods=["*"], allow_headers=["*"])

CLASS_LABELS = ["anorganic", "organic", "residu"]
ITEM_NAMES = {
    "anorganic": "Sampah Anorganik",
    "organic":   "Sampah Organik",
    "residu":    "Sampah Residu",
}

# ── Build arsitektur ──────────────────────────────────────────
def build_model():
    keras.backend.clear_session()
    base = keras.applications.MobileNetV2(
        input_shape=(224, 224, 3), include_top=False, weights=None)
    x   = layers.GlobalAveragePooling2D()(base.output)
    x   = layers.Dropout(0.5)(x)
    out = layers.Dense(3, activation="softmax")(x)
    return keras.Model(inputs=base.input, outputs=out)

# ── Decode mapping: nama spesifik → nama generik Keras 3 ─────
def build_name_mapping(config_path):
    with open(config_path) as f:
        cfg = json.load(f)
    cls_snake = {"Conv2D": "conv2d", "DepthwiseConv2D": "depthwise_conv2d",
                 "BatchNormalization": "batch_normalization", "Dense": "dense"}
    counters, mapping = {}, {}
    for layer in cfg["config"]["layers"]:
        cls  = layer["class_name"]
        name = layer["name"]
        if cls not in cls_snake:
            continue
        base_name = cls_snake[cls]
        count     = counters.get(base_name, 0)
        generic   = base_name if count == 0 else f"{base_name}_{count}"
        counters[base_name] = count + 1
        mapping[name] = generic
    return mapping

# ── Load weights berdasarkan mapping ─────────────────────────
def load_weights_by_mapping(model, weights_path, config_path):
    # Baca semua layer dari h5
    h5_data = {}
    with h5py.File(weights_path, "r") as f:
        for k in f.keys():
            if not k.startswith("layers"):
                continue
            grp = f[k]
            if "vars" not in grp or len(grp["vars"].keys()) == 0:
                continue
            # Strip "layers\" prefix (satu backslash)
            name = k[len("layers\\"):]
            vg   = grp["vars"]
            h5_data[name] = [vg[str(i)][()] for i in range(len(vg.keys()))]

    # Bangun mapping nama
    name_map = build_name_mapping(config_path)

    assigned = not_found = shape_err = 0
    for layer in model.layers:
        if not layer.weights:
            continue
        sname = layer.name

        # Cari generic name
        if sname in name_map:
            gname = name_map[sname]
        elif "dense" in sname.lower():
            gname = "dense"   # head classifier yang kita tambah sendiri
        else:
            not_found += 1
            continue

        if gname not in h5_data:
            not_found += 1
            continue

        h5_t = h5_data[gname]
        if [tuple(w.shape) for w in layer.weights] != [tuple(t.shape) for t in h5_t]:
            shape_err += 1
            continue

        layer.set_weights(h5_t)
        assigned += 1

    return assigned, not_found, shape_err

# ── Startup ───────────────────────────────────────────────────
model = None
config_path  = "config.json"
weights_path = "model.weights.h5"

print(f"📁 config.json      : {'✅' if os.path.exists(config_path)  else '❌'}")
print(f"📁 model.weights.h5 : {'✅' if os.path.exists(weights_path) else '❌'}")

if os.path.exists(weights_path) and os.path.exists(config_path):
    try:
        print("\n⏳ Membangun arsitektur...")
        model = build_model()
        print(f"   ✅ {len(model.layers)} layers siap")

        print("⏳ Memuat weights...")
        assigned, not_found, shape_err = load_weights_by_mapping(
            model, weights_path, config_path)
        print(f"   ✅ {assigned}/105 layer weights dimuat")
        if not_found:
            print(f"   ⚠️  {not_found} layer tidak ditemukan")
        if shape_err:
            print(f"   ⚠️  {shape_err} shape mismatch")

        # Verifikasi cepat
        std = np.std(model.get_layer("Conv1").get_weights()[0])
        print(f"   ✅ Conv1 std={std:.4f} — weights valid (bukan random init)")
        print("\n🚀 Model siap!")

    except Exception as e:
        import traceback
        print("❌ Gagal load model:")
        traceback.print_exc()
        model = None
else:
    print("❌ File model tidak lengkap!")

# ── Health check ─────────────────────────────────────────────
@app.get("/")
def root():
    return {"status": "ok", "model_loaded": model is not None,
            "classes": CLASS_LABELS, "version": "4.0.0"}

# ── Predict ───────────────────────────────────────────────────
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(503, "Model belum dimuat")
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, "File harus berupa gambar")

    try:
        img = Image.open(io.BytesIO(await file.read()))
        if img.mode != "RGB":
            img = img.convert("RGB")
        img       = img.resize((224, 224))
        arr       = np.array(img, dtype=np.float32) / 127.5 - 1.0
        arr       = np.expand_dims(arr, 0)

        pred      = model.predict(arr, verbose=0)[0]
        idx       = int(np.argmax(pred))
        category  = CLASS_LABELS[idx]
        confidence= float(pred[idx]) * 100

        print(f"\n📊 Prediksi:")
        for i, lbl in enumerate(CLASS_LABELS):
            print(f"   {lbl:<12}: {pred[i]*100:5.1f}% {'█'*int(pred[i]*20)}")
        print(f"   → {category} ({confidence:.1f}%)")

        return {"success": True, "category": category,
                "confidence": round(confidence, 1),
                "item_name": ITEM_NAMES[category]}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, f"Gagal memproses: {e}")
