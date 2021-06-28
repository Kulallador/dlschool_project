# dlschool_project

Веб-приложение разработано в рамках проекта для [Deep Learning school](https://www.dlschool.org/). 
В качестве модели для детекции объектов использована модель [Yolov5s](https://github.com/ultralytics/yolov5), для загрузки модели использовался [torchhub](https://pytorch.org/hub/ultralytics_yolov5/).

## Запуск

Для запуска необходим python, pip и git. 

Клонируем репозиторий:
```
git clone https://github.com/Kulallador/dlschool_project.git
```

Создаем виртуальную среду и активируем её:

```
python -m venv env python=3.9 
```
Активация среды на Linux:
```
source env/bin/activate
```
на Windows:
```
env\Scripts\activate
```

Устанавливаем зависимости:
```
pip install -r requirements.txt
```

Запускаем приложение:
```
python app.py
```

Теперь, если вы зайдете на http://localhost:5000/, то вам откроется страница с приложением.

## Запуск с помощью docker

Для запуска приложения с помощью docker достаточно написать:
```
bash start.hs 
```

или 

```
docker build -t dl_proj .
docker run -d -p 5001:5000 dl_proj
```

Теперь, если зайти на http://0.0.0.0:5001/, то откроется страница с приложением

## Demo

Ссылка на демо приложения: https://dlschool-project.herokuapp.com/
На данный момент приложение поддерживает .jpg и .png форматы изображений.
