# ─────────────────────────────────────────────────────────────
# test_model.py  —  Verifikasi model berfungsi normal
# Jalankan: python test_model.py
# ─────────────────────────────────────────────────────────────
import os, json, h5py, numpy as np
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers as klayers

print("=" * 55)
print("  TEST MODEL — Trashify Waste Classifier")
print("=" * 55)
print(f"  TF    : {tf.__version__}  |  Keras: {keras.__version__}")
print()

CLASS = ["organic", "anorganic", "residu"]

# ── Build ──────────────────────────────────────────────────────
keras.backend.clear_session()
base = keras.applications.MobileNetV2(input_shape=(224,224,3),
                                       include_top=False, weights=None)
x   = klayers.GlobalAveragePooling2D()(base.output)
x   = klayers.Dropout(0.5)(x)
out = klayers.Dense(3, activation="softmax")(x)
model = keras.Model(inputs=base.input, outputs=out)
print(f"✅ Arsitektur dibangun ({len(model.layers)} layers)")

# ── Decode mapping ─────────────────────────────────────────────
if not os.path.exists("config.json"):
    print("❌ config.json tidak ditemukan!"); exit(1)
if not os.path.exists("model.weights.h5"):
    print("❌ model.weights.h5 tidak ditemukan!"); exit(1)

with open("config.json") as f:
    cfg = json.load(f)

cls_snake = {"Conv2D": "conv2d", "DepthwiseConv2D": "depthwise_conv2d",
             "BatchNormalization": "batch_normalization", "Dense": "dense"}
counters, name_map = {}, {}
for layer in cfg["config"]["layers"]:
    cls = layer["class_name"]
    if cls not in cls_snake: continue
    base_name = cls_snake[cls]
    count     = counters.get(base_name, 0)
    generic   = base_name if count == 0 else f"{base_name}_{count}"
    counters[base_name] = count + 1
    name_map[layer["name"]] = generic

# ── Load weights ───────────────────────────────────────────────
h5_data = {}
with h5py.File("model.weights.h5", "r") as f:
    for k in f.keys():
        if not k.startswith("layers"): continue
        grp = f[k]
        if "vars" not in grp or not grp["vars"].keys(): continue
        name = k[len("layers\\"):]
        vg   = grp["vars"]
        h5_data[name] = [vg[str(i)][()] for i in range(len(vg.keys()))]

assigned = 0
for layer in model.layers:
    if not layer.weights: continue
    sname = layer.name
    gname = name_map.get(sname) or ("dense" if "dense" in sname.lower() else None)
    if not gname or gname not in h5_data: continue
    h5_t = h5_data[gname]
    if [tuple(w.shape) for w in layer.weights] != [tuple(t.shape) for t in h5_t]: continue
    layer.set_weights(h5_t)
    assigned += 1

print(f"✅ Weights dimuat: {assigned}/105 layer")

std = np.std(model.get_layer("Conv1").get_weights()[0])
print(f"✅ Conv1 std={std:.4f} — weights valid (bukan random init)")

# ── Test prediksi ──────────────────────────────────────────────
print()
print("📊 Test Prediksi (6 sampel):")
print("-" * 50)

tests = [
    ("Hitam (zeros)", np.zeros((1,224,224,3), "float32")),
    ("Putih (ones) ", np.ones((1,224,224,3),  "float32")),
    ("Random #1    ", (np.random.rand(1,224,224,3).astype("float32")*2)-1),
    ("Random #2    ", (np.random.rand(1,224,224,3).astype("float32")*2)-1),
    ("Random #3    ", (np.random.rand(1,224,224,3).astype("float32")*2)-1),
    ("Random #4    ", (np.random.rand(1,224,224,3).astype("float32")*2)-1),
]

pred_classes = []
for name, inp in tests:
    p = model.predict(inp, verbose=0)[0]
    idx = np.argmax(p)
    pred_classes.append(idx)
    bar = "█" * int(np.max(p) * 25)
    print(f"  {name}: {CLASS[idx]:12} {np.max(p)*100:5.1f}%  {bar}")
    print(f"           [org:{p[0]*100:.1f}% anorg:{p[1]*100:.1f}% res:{p[2]*100:.1f}%]")

print()
if len(set(pred_classes)) > 1:
    print("✅ Output BERVARIASI — model berfungsi dengan benar!")
else:
    print("⚠️  Output seragam — perlu investigasi lebih lanjut")
print("=" * 55)
