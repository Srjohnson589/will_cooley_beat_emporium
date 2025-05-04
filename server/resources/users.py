from config import app, api, db
from flask_restful import Resource

from models.users import User


class Users(Resource):
  def get(self):
    users = [user.to_dict() for user in User.query.all()]
    return users, 200