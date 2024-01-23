from models import db,User
from flask import request,jsonify ,Blueprint

user_bp = Blueprint('user_bp',__name__)


#add user (register)

