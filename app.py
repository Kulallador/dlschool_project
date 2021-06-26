from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import numpy as np
import json
from PIL import Image
import torch
import io
from base64 import b64encode
        
# !pip install -qr https://raw.githubusercontent.com/ultralytics/yolov5/master/requirements.txt  

model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
model.eval()

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template("index.html")

def encode_img(img):
    data = io.BytesIO()
    img.save(data, "JPEG")
    return b64encode(data.getvalue()) 
    
@app.route("/uploadimage", methods=["POST"])
def upload_image():
    if request.method == "POST":
        file = request.files['myFile']

        img_bytes = file.read()

        img = Image.open(io.BytesIO(img_bytes))
        img = img.convert("RGB")
        uri = "data:image/jpeg;base64,"+encode_img(img).decode('utf-8')

        result = model(img, size=640)
        img_data = result.render()
        img_res = Image.fromarray(img_data[0])
        uri_res = "data:image/jpeg;base64,"+encode_img(img_res).decode('utf-8')

        return json.dumps({"sourceImage": uri, "resultImage": uri_res})
    

