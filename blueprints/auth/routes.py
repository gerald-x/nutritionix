from flask import Blueprint, jsonify, request
from .models import User
from blueprints import db
from werkzeug.security import generate_password_hash, check_password_hash
from validate_email_address import validate_email
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity

auth = Blueprint("auth", __name__)

@auth.route("", methods=["GET", "POST"])
def index():
    return "hello world!"


@auth.route("/token-validate/", methods=["GET"])
@jwt_required()
def token_validate():
    id = get_jwt_identity()
    print(id)
    return jsonify(msg="Valid Token")


@auth.route("login/", methods=["POST"])
def login_view():
    email = request.json.get("email", "").strip()
    password = request.json.get("password", "")

    if not email or not password:
        return jsonify({"msg": "Invalid or Missing Credentials"}), 400
    
    if not validate_email(email):
        return jsonify({"msg": "email not valid"}), 400
    
    user = db.session.execute(db.select(User).filter_by(email=email)).scalars().first()
    
    if not user:
        return jsonify({"msg": "User doesn't exists"}), 400
    
    if not check_password_hash(user.password, password):
        return jsonify({"msg": "Incorrect Password"}), 400

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    return jsonify(access_token=access_token, refresh_token=refresh_token)


@auth.route("register/", methods=["POST"])
def register():
    first_name = request.json.get("first_name", "").strip()
    last_name = request.json.get("last_name", "").strip()
    email = request.json.get("email", "").strip()
    password = request.json.get("password", "")
    confirm_password = request.json.get("confirm_password", "")

    if (not first_name or 
        not last_name or 
        not email or 
        not password or
        not confirm_password
        ):
        return jsonify({"msg": "Invalid or Missing Credentials"}), 400
    
    if not validate_email(email):
        return jsonify({"msg": "email not valid"}), 400
    
    if not confirm_password == password:
        return jsonify({"msg": "Passwords do not match"}), 400
            
    user_exists = db.session.execute(db.select(User).filter_by(email=email)).scalars().first()
    if user_exists:
        return jsonify({"msg": "Email already exists"}), 400
    
    user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=generate_password_hash(password)
    )

    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    return jsonify(access_token=access_token, refresh_token=refresh_token)