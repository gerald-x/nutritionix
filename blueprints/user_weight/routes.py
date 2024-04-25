from flask import Blueprint, jsonify, request
from blueprints import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import date, datetime
from .models import UserWeight, user_weight_schema, user_weight_schemas

user_weight = Blueprint("user_weight", __name__)

@user_weight.route('/submit-weight/', methods=['POST'])
@jwt_required()
def submit_weight():
    user_id = get_jwt_identity()
    weight = request.json.get('weight', None)
    date_str = request.json.get('date', None)
    
    if weight is None or date_str is None:
        return jsonify({"msg": "Missing weight or date"}), 400
    
    try:
        float_weight = float(weight)     
        formatted_weight = float(f"{float_weight:.2f}")
    except:
        return jsonify({"msg": "Wrong input format"}), 400

    formatted_date = date.fromisoformat(date_str)

    if formatted_date == datetime.now().date():
        weight_entry = UserWeight.query.filter_by(user_id=user_id, date=formatted_date).first()
        weight_entry.weight = formatted_weight
        db.session.commit()
        return jsonify(msg="Weight recorded successfully")

    new_weight = UserWeight(user_id=user_id, weight=formatted_weight, date=formatted_date)
    db.session.add(new_weight)
    db.session.commit()

    return jsonify({"msg": "Weight recorded successfully"}), 200


@user_weight.route('/get-weight/', methods=['GET'])
@jwt_required()
def get_weights():
    user_id = get_jwt_identity()
    weights = UserWeight.query.filter_by(user_id=user_id).order_by(UserWeight.date.asc()).all()
    
    weight_dump = user_weight_schemas.dump(weights)
    return jsonify(weight_dump), 200