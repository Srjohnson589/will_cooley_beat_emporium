from config import db
from flask import request, session
from flask_restful import Resource

from models.users import User

class Logout(Resource):
    def delete(self):
        user_id=session['user_id']
        if user_id:
            session['user_id'] = None
            return {}, 204
        else:
            error = {"Error": "Not Authorized"}
            return error, 401
        