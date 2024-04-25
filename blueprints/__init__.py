from flask_sqlalchemy import SQLAlchemy

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_marshmallow import Marshmallow

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)
migrate = Migrate()
jwt = JWTManager()
cors = CORS()
ma = Marshmallow()
