FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN apt update && apt install -y zip htop screen libgl1-mesa-glx
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENTRYPOINT ["python"]
CMD ["app.py"]
# CMD ["gunicorn", "wsgi:app"]
