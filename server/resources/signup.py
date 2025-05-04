from config import db
from flask import request, session
from flask_restful import Resource

from models.users import User

class Signup(Resource):
    def post(self):
        json = request.get_json()

        try:
            user=User(
                first_name=json.get('first_name'),
                last_name=json.get('last_name'),
                email=json.get('email'),
                location=json.get('location'),
            )

            user.password_hash = json['password']

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return user.to_dict(), 201
        except:
            error={"error": "Invalid User Input"}
            return error, 422
        