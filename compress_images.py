import os
import glob
from PIL import Image

OUT_DIR = os.path.join(os.path.dirname(__file__), "assets", "images")
PRODUCTS_DIR = os.path.join(OUT_DIR, "products")

MAX_DIM_PORTRAIT = (900, 1350)
MAX_DIM_LANDSCAPE = (1600, 1067)

def compress(raw_path):
    jpg_path = raw_path.replace("_raw.png", ".jpg")
    img = Image.open(raw_path).convert("RGB")
    is_landscape = img.width > img.height
    max_dim = MAX_DIM_LANDSCAPE if is_landscape else MAX_DIM_PORTRAIT
    img.thumbnail(max_dim, Image.LANCZOS)
    img.save(jpg_path, "JPEG", quality=82, optimize=True)
    os.remove(raw_path)
    size_kb = os.path.getsize(jpg_path) / 1024
    print(f"{os.path.basename(jpg_path)}: {img.width}x{img.height} {size_kb:.0f}KB")

if __name__ == "__main__":
    raws = glob.glob(os.path.join(OUT_DIR, "*_raw.png")) + glob.glob(os.path.join(PRODUCTS_DIR, "*_raw.png"))
    for raw in raws:
        compress(raw)
    print(f"compressed {len(raws)} images")
