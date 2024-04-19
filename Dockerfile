FROM python:3.10
COPY . /nutrition
WORKDIR /nutrition
RUN pip install -r requirements.txt
CMD ["flask", "run"]