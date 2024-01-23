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

#search property by title

#add property

#update property

#delete property

