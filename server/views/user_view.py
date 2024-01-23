from models import db,User
from flask import request,jsonify ,Blueprint

user_bp = Blueprint('user_bp',__name__)


#add user (register)
@user_bp.route('/signup', methods=['POST'])
def register_user():
    data = request.form
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')
    user_type = data.get('user_type')  


    check_email = User.query.filter_by(email=email).first()
    if check_email:
        return jsonify({"error": "Email already exists"}), 404

    check_phone = User.query.filter_by(phone=phone).first()
    if check_phone:
        return jsonify({"error": "Phone number already exists"}), 404

    new_user = User(
        name=name,
        email=email,
        phone=phone,
        password=password,
        user_type=user_type
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully", "user_type": user_type}), 201

#get a single user
@user_bp.route('/users/<int:user_id>')
def get_a_single_user(user_id):
    user = User.query.filter_by(id=user_id).first()

    if not user:
      response = jsonify({"error":"user does not exist"}),404
    else:  
      response = jsonify({
         "id":user.id,
         "name":user.name,
         "email":user.email,
         "phone":user.phone,

      }),200
    
    return response

#delete user
@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)

    if user:
        db.session.delete(user)
        db.session.commit()
        response = jsonify({"success": "User deleted successfully"}), 200
    else:
        response = jsonify({"error": "User does not exist"}), 404

    return response
