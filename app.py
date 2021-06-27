from flask import Flask, render_template, request
import json
from PIL import Image
import torch
import io
from base64 import b64encode
import os

model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True, force_reload=True)
model.eval()

app = Flask(__name__)
port = int(os.environ.get("PORT", 5000))

@app.route("/")
def get_index():
    return render_template("index.html")

@app.route("/about")
def get_about():
    return render_template("about.html")

def encode_img(img):
    data = io.BytesIO()
    img.save(data, "JPEG")
    res = b64encode(data.getvalue())
    data.close()

    return  res 

@app.route("/uploadimage", methods=["POST"])
def upload_image():
    if request.method == "POST":
        file = request.files['myFile']

        img_bytes = file.read()

        img = Image.open(io.BytesIO(img_bytes))

        result = model(img, size=640)
        img_data = result.render()
        img_res = Image.fromarray(img_data[0])
        uri_res = "data:image/jpeg;base64,"+encode_img(img_res).decode('utf-8')
        file.close()

        return json.dumps({"resultImage": uri_res})

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=port)