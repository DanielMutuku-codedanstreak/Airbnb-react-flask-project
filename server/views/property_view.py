from flask import Blueprint,jsonify,request
from models import db, Property,User
from sqlalchemy import desc

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
@prop_bp.route('/properties',methods=['POST'])
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
    
    user_id=2 #current user id
    user=User.query.filter_by(id=user_id).first()
    if user.user_type == 'guest':
       return jsonify({"error":"unauthorized access"}),404
    else:
      new_property = Property(
          title=title.title(),
          description=description,
          image=image,
          other_images=other_images,
          price=price,
          category=category,
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
      
      property = Property.query.order_by(desc(Property.id)).first()
      
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
   ),201


    

    


#update property

#delete property

