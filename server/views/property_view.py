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
         "title":property.title,
         "title":property.title,
         "title":property.title,
         "title":property.title,
         "title":property.title,
         "title":property.title,
         "title":property.title,
      }for property in properties]
   ),200
   # return jsonify([property.to_dict() for property in properties]),200


#view single property

#search property by title

#add property

#update property

#delete property

