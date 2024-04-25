from blueprints import db, ma


class UserWeight(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    weight = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User", backref=db.backref("weight", lazy=True))


class UserWeightSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = UserWeight
        include_fk = True


user_weight_schema = UserWeightSchema()
user_weight_schemas = UserWeightSchema(many=True)