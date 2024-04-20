from flask import Flask
from blueprints import db, migrate, jwt, cors
from blueprints.auth.routes import auth
from flask_jwt_extended import (
    create_access_token, 
    get_jwt,
    get_jwt_identity,
    set_access_cookies,
)
from datetime import datetime, timedelta, timezone



def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')
    
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)

    @app.after_request
    def refresh_expiring_jwts(response):
        try:
            exp_timestamp = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
            if target_timestamp > exp_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                set_access_cookies(response, access_token)
            return response
        except (RuntimeError, KeyError):
            # Case where there is not a valid JWT. Just return the original response
            return response
    
    app.register_blueprint(auth, url_prefix="/auth/")
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)