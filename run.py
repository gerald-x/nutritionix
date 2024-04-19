from flask import Flask
from blueprints import db, migrate, jwt
from blueprints.auth.routes import auth


def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')
    
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    app.register_blueprint(auth, url_prefix="/auth/")
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)