from models import db,Reservation, Property
from flask import request,jsonify ,Blueprint
from datetime import datetime
from flask_jwt_extended import  jwt_required, get_jwt_identity

res_bp = Blueprint('res_bp',__name__)


#add booking
@res_bp.route('/reservations', methods=['POST'])
@jwt_required()
def add_reservations():

    try:
        data = request.get_json()

        # Ensure all required fields are present in the request
        required_fields = ['check_in_date', 'check_out_date', 'number_of_guests', 'total', 'property_id']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        check_in_date = datetime.strptime(data['check_in_date'], "%Y-%m-%d")
        check_out_date = datetime.strptime(data['check_out_date'], "%Y-%m-%d")

        number_of_guests = data['number_of_guests']
        total = data['total']
        property_id = data['property_id']
        user_id = get_jwt_identity()  # current user

        # Validate number of guests
        property = Property.query.filter_by(id=property_id).first()
        if number_of_guests > property.capacity:
            return jsonify({"error": f"The property can accommodate a maximum of {property.capacity} guests"}), 400

        # Check for reservation conflicts
        conflicting_reservation = Reservation.query.filter(
            (Reservation.property_id == property_id) &
            (
                (Reservation.check_in_date <= check_in_date) & (Reservation.check_out_date >= check_in_date) |
                (Reservation.check_in_date <= check_out_date) & (Reservation.check_out_date >= check_out_date) |
                (check_in_date <= Reservation.check_in_date) & (check_out_date >= Reservation.check_in_date)
            )
        ).first()

        if conflicting_reservation:
            return jsonify({"error": "Reservation already exists"}), 409

        new_reservation = Reservation(
            check_in_date=check_in_date,
            check_out_date=check_out_date,
            number_of_guests=number_of_guests,
            total=total,
            property_id=property_id,
            user_id=user_id  # current user

        )

        db.session.add(new_reservation)
        db.session.commit()

        return jsonify({"success": "Reservation added successfully"}), 201

    except Exception as e:
        # Handle database or other exceptions
        return jsonify({"error": f"Failed to add reservation. {str(e)}"}), 500

#view bookings
@res_bp.route('/reservations')
@jwt_required()
def my_bookings():
   user_id=get_jwt_identity() #current userid
   bookings = Reservation.query.filter_by(user_id=user_id).all()

   if not bookings:
      return jsonify({"error":"You have no reservation history"}),404
   else:
      return jsonify([{
         "id":booking.id,
         "property":booking.property.title,
         "image":booking.property.image,
         "from":booking.check_in_date,
         "to":booking.check_out_date,
         "total":booking.total,
         "location":booking.property.location,
         "user_id":booking.user_id,
         "number_of_guests":booking.number_of_guests
      }for booking in bookings
      ]),200


#cancel own bookings
@res_bp.route('/reservations/<int:reservation_id>', methods=['DELETE'])
@jwt_required()
def cancel_reservation(reservation_id):
   user_id = get_jwt_identity() #current user
   booking = Reservation.query.get(reservation_id)

   if  booking is None:
      return jsonify({"error":"You have no reservations"}),404

   if booking.user_id != user_id:
      return jsonify({"error":"Validation error"}),405


  
   else:
      db.session.delete(booking)
      db.session.commit()

      return jsonify({"success":"reservation canceled successfully"}),200

#get my clients
@res_bp.route('/clients/<int:property_id>')
@jwt_required()
def get_my_clients(property_id):
    # user_id = get_jwt_identity() #current user id

    reservations = Reservation.query.filter_by(property_id = property_id).all()

    if not reservations:
        return jsonify({"error":"You've had no clients on this property."}),404
    
    if reservations:
        return jsonify([
            {
                "name": reservation.user.name,
                "email": reservation.user.email,
                "phone": reservation.user.phone,
                "from": reservation.check_in_date,
                "to": reservation.check_out_date,
                "total": reservation.total

            }for reservation in reservations
        ]),200




