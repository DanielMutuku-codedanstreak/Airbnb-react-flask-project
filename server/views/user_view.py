from models import db,User
from flask import request,jsonify ,Blueprint
from werkzeug.security import generate_password_hash
from flask_jwt_extended import  jwt_required, get_jwt_identity


user_bp = Blueprint('user_bp',__name__)


#add user (register)
@user_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()

    required_fields = ['name', 'email', 'phone', 'password', 'user_type']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 404

    name = data['name']
    email = data['email']
    phone = data['phone']
    password = generate_password_hash(data['password'])
    user_type = data['user_type']  


    check_email = User.query.filter_by(email=email).first()
    if check_email:
        return jsonify({"error": "Email already exists"}), 404

    check_phone = User.query.filter_by(phone=phone).first()
    if check_phone:
        return jsonify({"error": "Phone number already exists"}), 404

    new_user = User(
        name=name.title(),
        email=email,
        phone=phone,
        password=password,
        user_type=user_type.title(),
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success": "User registered successfully"}), 201

#get a single user
@user_bp.route('/user')
@jwt_required()
def get_a_single_user():
    user_id = get_jwt_identity() #current user
    user = User.query.filter_by(id=user_id).first()

    if not user:
      response = jsonify({"error":"user does not exist"}),404
    else:  
      response = jsonify({
         "id":user.id,
         "name":user.name,
         "email":user.email,
         "phone":user.phone,
         "user_type":user.user_type

      }),200
    
    return response

#delete user
@user_bp.route('/user', methods=['DELETE'])
@jwt_required()
def delete_user():
    user_id = get_jwt_identity() #current user id
    user = User.query.get(user_id)

    if user:
        db.session.delete(user)
        db.session.commit()
        response = jsonify({"success": "User deleted successfully"}), 200
    else:
        response = jsonify({"error": "User does not exist"}), 404

    return response


#update user details
@user_bp.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user_details():
    user_id = get_jwt_identity() #current user id
    user = User.query.filter_by(id=user_id).first()

    if user:
        data = request.get_json()

        name = data['name']
        email = data['email']
        phone = data['phone']

        check_email = User.query.filter_by(email=email).first()
        if check_email and (check_email != user.email):
            return jsonify({"error": f"The email: {email} already exists"}), 404  

        check_phone = User.query.filter_by(phone=phone).first()
        if check_email and (check_email != user.phone):
            return jsonify({"error": f"The phone: {phone} already exists"}), 404   

        # update the user
        user.name = name.title()
        user.email = email
        user.phone = phone
        
        db.session.commit()
        return jsonify({"success": "User updated successfully"}), 200

    elif not user:
        return jsonify({"error": "User not found"}), 404

#reset password
@user_bp.route('/reset_password' ,methods=['POST'])
def reset_password():
    data = request.get_json()

    # Extract data from the request
    name = data['name']
    email = data['email']
    new_password = data['password']

    # Verify details
    check_user = User.query.filter_by(email=email).first()

    if not check_user or check_user.name.lower() != name.lower():
        return jsonify({"error": "Details do not match"}), 404

    # Update the user's password
    check_user.password = generate_password_hash(new_password)
    
    db.session.commit()

    return jsonify({"success": "Password changed successfully"}), 200