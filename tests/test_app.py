from tests import client, flask_app
from blueprints.auth.models import User
from blueprints import db
import json

def test_login_user(client):
    """
        GIVEN a flask client
        WHEN a user POSTS credentials to the '/auth/login/'
        THEN two tokens are returned, one for access, and one for refresh 
    """
    response = client.post("/auth/login/", data=json.dumps({
        "email": "test@test.com",
    }), content_type="application/json")
    assert response.status_code == 400

    response = client.post("/auth/login/", data=json.dumps({
        "email": "test@test.com",
        "password": ""
    }), content_type="application/json")

    assert response.status_code == 400

    response = client.post("/auth/login/", data=json.dumps({
        "email": "test@test.com",
        "password": "test"
    }), content_type="application/json")

    assert response.status_code == 200
    assert "access_token" in response.json
    assert "refresh_token" in response.json


def test_register_user(client):
    """
        GIVEN a flask application configured for testing
        WHEN a user is created on the '/auth/register/' (POST)
        THEN check if constraints failed, or is successful
        FINALLY delete user after creation  
    """
    response = client.post("/auth/register/", data=json.dumps({
        "first_name": ""
    }), 
    content_type="application/json")

    assert response.status_code == 400

    response = client.post("/auth/register/", data=json.dumps({
        "first_name": "Dummy",
        "last_name": "User",
        "email": "test@gmail.com",
        "password": "testing123"
    }), 
    content_type="application/json")

    assert response.status_code == 200
    assert "access_token" in response.json.keys()

    user = db.session.execute(db.select(User).filter_by(email="test@gmail.com")).scalar_one()
    
    db.session.delete(user)
    db.session.commit()

    test_user_exists = db.session.execute(db.select(User).filter_by(email="test@gmail.com")).scalars().first()
    assert test_user_exists == None