from models import db,User
from flask import request,jsonify ,Blueprint
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity,jwt_required

auth_bp = Blueprint('auth_bp',__name__)

#login
@auth_bp.route('/login', methods=['POST'])
def login():
   data = request.get_json()

   email = data['email']
   # phone = data['phone']
   password = data['password']
   
   user = User.query.filter_by(email=email).first()

   if not user:
      return jsonify({"error":"email does not exist"}),404
   
   if user:
      if check_password_hash(user.password, password):
         access_token = create_access_token(identity = user.id)
         return jsonify(access_token = access_token),200

      return jsonify({"error":"Wrong password!"}),404
   

#get logged user
@auth_bp.route('/authenticated_user')
@jwt_required()

def authenticated_user():
   current_user_id = get_jwt_identity() #current user id

   user = User.query.get(current_user_id)

   if not user:
      return jsonify({"error":"User not found"}),404

   if user:
      return jsonify({
         "id":user.id,
         "name":user.name,
         "email":user.email,
         "phone":user.phone,
         "user_type":user.user_type
      }),200

#logout user