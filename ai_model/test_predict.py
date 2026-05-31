import requests

# Ganti dengan path gambar sampah milikmu
IMAGE_PATH = "test_sampah.jpg"

with open(IMAGE_PATH, "rb") as f:
    response = requests.post(
        "http://localhost:8000/predict",
        files={"file": ("gambar.jpg", f, "image/jpeg")}
    )

result = response.json()
print(f"Kategori   : {result['category']}")
print(f"Nama       : {result['item_name']}")
print(f"Confidence : {result['confidence']}%")