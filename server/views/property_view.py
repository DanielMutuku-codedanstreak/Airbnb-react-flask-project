from flask import Blueprint,jsonify
from models import db, Property


prop_bp = Blueprint('prop_bp', __name__)

#view all properties
@prop_bp.route('/properties')
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
def get_single_property(property_id):
   property = Property.query.filter_by(id=property_id).first()
   if not property:
      return jsonify({"error":"property not found"}),404
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
          
         
      }]
   ),200

#search property by title
@prop_bp.route('/properties/<string:search>', methods=['GET'])
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

#update property

#delete property

