import base64
import os
import sys
import time
from openai import OpenAI

KEY_PATH = os.path.join(os.path.dirname(__file__), "..", ".openai_key")
with open(KEY_PATH, "r") as f:
    api_key = f.read().strip()

client = OpenAI(api_key=api_key)

STYLE = (
    "Editorial still-life product photography for a minimalist high-end fashion "
    "brand. Warm bone/cream textured studio background, soft natural directional "
    "light, gentle shadow, shot from slightly above at a flattering angle. "
    "No people, no mannequins, no faces, no text, no logos, no watermark. "
    "Muted warm neutral tones, quiet and considered, quality natural fabric "
    "texture clearly visible. Sharp focus, professional catalogue quality."
)

PRODUCTS = [
    ("outerwear-1", "A camel-colored wool wrap coat with a self-tie belt, elegantly draped and gently folded", "portrait"),
    ("outerwear-2", "A black tailored single-breasted wool blazer, neatly folded with the lapel visible", "portrait"),
    ("outerwear-3", "An oversized bone off-white cotton trench coat, loosely draped", "portrait"),
    ("outerwear-4", "A charcoal grey quilted field jacket, neatly folded", "portrait"),
    ("knitwear-1", "A camel-colored fine merino wool crewneck sweater, neatly folded", "portrait"),
    ("knitwear-2", "A bone-colored cable-knit cardigan with horn buttons, draped open", "portrait"),
    ("knitwear-3", "A black ribbed knit turtleneck sweater, neatly folded", "portrait"),
    ("knitwear-4", "A stone-colored sleeveless cashmere-blend knit vest, folded flat", "portrait"),
    ("dresses-1", "A bone-colored silk slip dress with thin straps, draped elegantly", "portrait"),
    ("dresses-2", "A black tailored midi dress with a structured waist, draped on a form", "portrait"),
    ("dresses-3", "A camel-colored knit wrap dress with a self-tie waist, draped", "portrait"),
    ("dresses-4", "A stone-colored linen shirt dress with a self-belt, draped open", "portrait"),
    ("tops-1", "A bone-colored fluid silk blouse with a button placket, neatly folded", "portrait"),
    ("tops-2", "A crisp white cotton poplin shirt, neatly folded with collar visible", "portrait"),
    ("tops-3", "A black fine-knit tank top in soft viscose, folded flat", "portrait"),
    ("tops-4", "A camel-colored draped satin camisole, folded flat", "portrait"),
    ("accessories-1", "A structured black leather tote bag standing upright, handles visible", "portrait"),
    ("accessories-2", "An oversized camel wool scarf, elegantly draped and coiled", "portrait"),
    ("accessories-3", "A slim black leather belt with a matte horn buckle, coiled neatly", "portrait"),
    ("accessories-4", "A bone-colored structured leather crossbody bag with a top handle, standing upright", "portrait"),
    ("hero", "A wide elegant flat-lay arrangement of a camel wool coat, a cream silk blouse, and a black leather bag, composed with generous negative space", "landscape"),
    ("about", "A minimalist Copenhagen fashion design studio interior: neutral fabric swatches, a wooden work table, natural daylight from a window, no people", "portrait"),
]

SIZE_MAP = {"portrait": "1024x1536", "landscape": "1536x1024"}

OUT_DIR = os.path.join(os.path.dirname(__file__), "assets", "images")
PRODUCTS_DIR = os.path.join(OUT_DIR, "products")
os.makedirs(PRODUCTS_DIR, exist_ok=True)


def out_path(name):
    if name in ("hero", "about"):
        return os.path.join(OUT_DIR, name + ".jpg")
    return os.path.join(PRODUCTS_DIR, name + ".jpg")


def generate(name, subject, orientation):
    path = out_path(name)
    if os.path.exists(path):
        print(f"skip {name} (already exists)")
        return
    prompt = f"{subject}. {STYLE}"
    size = SIZE_MAP[orientation]
    for attempt in range(3):
        try:
            result = client.images.generate(
                model="gpt-image-1",
                prompt=prompt,
                size=size,
                quality="medium",
                n=1,
            )
            b64 = result.data[0].b64_json
            raw_path = path.replace(".jpg", "_raw.png")
            with open(raw_path, "wb") as f:
                f.write(base64.b64decode(b64))
            print(f"ok {name}")
            return
        except Exception as e:
            print(f"error {name} attempt {attempt+1}: {e}")
            time.sleep(3)
    print(f"FAILED {name}")


if __name__ == "__main__":
    only = sys.argv[1:] if len(sys.argv) > 1 else None
    for name, subject, orientation in PRODUCTS:
        if only and name not in only:
            continue
        generate(name, subject, orientation)
