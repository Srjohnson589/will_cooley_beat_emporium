from config import db
from flask import request, session
from flask_restful import Resource

from models.users import User

class CheckSession(Resource):
    def get(self):
        try:
            user_id=session['user_id']
            user=User.query.filter(User.id==user_id).first()
            return user.to_dict(), 200
        except:
            error = {"Error": "Unauthorized - Try logging in"}
            return error, 401