#FROM alpine:3.8
#RUN apk add python3 py-pip && \
#pip install --upgrade pip && \
#pip install flask

FROM python:3
#RUN pip install flask
RUN pip  install  -i  https://pypi.doubanio.com/simple/  --trusted-host pypi.doubanio.com flask

ENV FLASK_APP app.py

# EKS, Fargate ...
ENV PLATFORM 'Amazon EKS'

WORKDIR /app
COPY . /app/

CMD ["python", "app.py"]
