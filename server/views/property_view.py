from flask import Blueprint,jsonify,request
from models import db, Property,User
from sqlalchemy import desc
from flask_jwt_extended import  jwt_required, get_jwt_identity


prop_bp = Blueprint('prop_bp', __name__)

#view all properties
@prop_bp.route('/properties')
# @jwt_required()

def get_all_properties():
   properties = Property.query.all()
   

   return jsonify([
      {
         "id":property.id,
         "title":property.title,
         "description":property.description,
         "image":property.image,
         "other_images":property.other_images,
         "price":property.price,
         "category":property.category,
         "inclusives":property.inclusives,
         "amenities":property.amenities,
         "rules":property.rules,
         "capacity":property.capacity,
         "bathrooms":property.bathrooms,
         "beds":property.beds,
         "location":property.location,
         "host":{
            "name":property.user.name,
            "email":property.user.email,
            "phone":property.user.phone,
            },
          
         
      }for property in properties]
   ),200
   # return jsonify([property.to_dict() for property in properties]),200


#view single property
@prop_bp.route('/properties/<int:property_id>')
# @jwt_required()

def get_single_property(property_id):
   property = Property.query.filter_by(id=property_id).first()
   if not property:
      return jsonify({"error":"property not found"}),404
   else:
      return jsonify(
      {
         "id":property.id,
         "title":property.title,
         "description":property.description,
         "image":property.image,
         "other_images":property.other_images,
         "price":property.price,
         "category":property.category,
         "inclusives":property.inclusives,
         "amenities":property.amenities,
         "rules":property.rules,
         "capacity":property.capacity,
         "bathrooms":property.bathrooms,
         "beds":property.beds,
         "location":property.location,
         "host":{
            "name":property.user.name,
            "email":property.user.email,
            "phone":property.user.phone,
            },
          
         
      }
   ),200

#search property by title
@prop_bp.route('/properties/<string:search>', methods=['GET'])
# @jwt_required()
def search_property(search):
   properties= Property.query.filter(Property.title.ilike(f'%{search}%')).all()
     
   if not properties:
        return jsonify({"error": "Title not found"}), 404

   else:
      return jsonify([
      {
         "id":property.id,
         "title":property.title,
         "description":property.description,
         "image":property.image,
         "other_images":property.other_images,
         "price":property.price,
         "category":property.category,
         "inclusives":property.inclusives,
         "amenities":property.amenities,
         "rules":property.rules,
         "capacity":property.capacity,
         "bathrooms":property.bathrooms,
         "beds":property.beds,
         "location":property.location,
         "host":{
            "name":property.user.name,
            "email":property.user.email,
            "phone":property.user.phone,
            },
          
         
      }for property in properties]
      ),200

#add property
@prop_bp.route('/properties',methods=['POST'])
@jwt_required()
def add_property():
    data = request.get_json()
    
    title = data['title']
    description = data['description']
    image = data['image']
    other_images = data['other_images']
    price = data['price']
    category = data['category']
    inclusives = data['inclusives']
    amenities = data['amenities']
    rules = data['rules']
    capacity = data['capacity']
    bathrooms = data['bathrooms']
    beds = data['beds']
    location = data['location']
    
    user_id= get_jwt_identity()             #current user id  jwt_get_required

    user=User.query.filter_by(id=user_id).first()
    if user.user_type == 'guest':
       return jsonify({"error":"unauthorized "}),404
    else:
      new_property = Property(
          title=title.title(),
          description=description,
          image=image,
          other_images=other_images,
          price=price,
          category=category.title(),
          inclusives=inclusives,
          amenities=amenities,
          rules=rules,
          capacity=capacity,
          bathrooms=bathrooms,
          beds=beds,
          location=location.title(),
          user_id=user_id
          
          
       )
      db.session.add(new_property)
      db.session.commit()
      
      user = User.query.get(user_id)
      
      return jsonify([
      {
         
         "title":title,
         "description":description,
         "image":image,
         "other_images":other_images,
         "price":price,
         "category":category,
         "inclusives":inclusives,
         "amenities":amenities,
         "rules":rules,
         "capacity":capacity,
         "bathrooms":bathrooms,
         "beds":beds,
         "location":location,
         "host":{
            "name":user.name,
            "email":user.email,
            "phone":user.phone,
            },
          
         
      }]
   ),201


    

#update property
@prop_bp.route("/properties/<int:property_id>", methods=['PATCH'])
@jwt_required()
def update_property(property_id):
    property = Property.query.filter_by(id=property_id).first()

    user_id = get_jwt_identity()                   #current user id


    if property.user_id == user_id:
        data = request.get_json()

        for attr in data:
            setattr(property, attr, data[attr])

        db.session.commit()
        response = jsonify({"success": "Property updated successfully"}), 200
    else:
        response = jsonify({"error": "Property not found"}), 404

    return response

#delete property
@prop_bp.route("/properties/<int:property_id>", methods=['DELETE'])
@jwt_required()
def delete_property(property_id):
    property = Property.query.filter_by(id=property_id).first()
    user_id = get_jwt_identity()  # current user
    if property:
      if property.user_id == user_id:

         db.session.delete(property)
         db.session.commit()
         return jsonify({"success": "Property deleted successfully"}), 200

      else:
         return jsonify({"error":"unauthorised access"})

    else:
        return jsonify({"error": "Property not found"}), 404

#get all property by user_id(host)
@prop_bp.route('/get_all_properties_by_user_id')  
@jwt_required()
def get_all_properties_by_user_id():
   user_id = get_jwt_identity() #current user id
   properties = Property.query.filter_by(user_id=user_id).all()

   if not properties:
      return jsonify({"error":"You  have No property"}),404

   else:
      return jsonify([
      {
         "id":property.id,
         "title":property.title,
         "description":property.description,
         "image":property.image,
         "other_images":property.other_images,
         "price":property.price,
         "category":property.category,
         "inclusives":property.inclusives,
         "amenities":property.amenities,
         "rules":property.rules,
         "capacity":property.capacity,
         "bathrooms":property.bathrooms,
         "beds":property.beds,
         "location":property.location,
         "host":{
            "name":property.user.name,
            "email":property.user.email,
            "phone":property.user.phone,
            },
          
         
      }for property in properties]
      ),200
