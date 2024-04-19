from run import create_app
import pytest
from blueprints import db 
from blueprints.auth.models import User
from werkzeug.security import generate_password_hash

@pytest.fixture()
def flask_app():
    app = create_app()
    app.config.update({
        "TESTING": True,
    })
    
    yield app
    

@pytest.fixture()
def client(flask_app):
    # Create the app testing instance
    with flask_app.test_client() as testing_client:
        # Establish an application context
        with flask_app.app_context():
            # other setup can go here
            user = User(first_name="John",
                        last_name="Doe",
                        email="test@test.com",
                        password=generate_password_hash("test"))
            
            db.session.add(user)
            db.session.commit()

            yield testing_client

            # clean up / reset resources here
            test_user = db.session.execute(db.select(User).filter_by(email="test@test.com")).scalar_one()
            db.session.delete(test_user)
            db.session.commit()


@pytest.fixture()
def runner(flask_app):
    return flask_app.test_cli_runner()