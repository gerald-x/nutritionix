from dotenv import load_dotenv
import os
from datetime import timedelta

load_dotenv()

SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI")
SECRET_KEY = "@final/year"
DEBUG=True
JWT_TOKEN_LOCATION = ["cookies", "headers"]
JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
JWT_COOKIE_SECURE = False