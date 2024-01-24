from models import db,Reservation, Property
from flask import request,jsonify ,Blueprint
from datetime import datetime

res_bp = Blueprint('res_bp',__name__)


#add a booking
@res_bp.route('/reservations', methods=['POST'])
def add_reservations():
   
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
    user_id = data['user_id']  # current user

    # Validate number of guests
    property = Property.query.filter_by(id=property_id).first()
    if number_of_guests > property.capacity:
        return jsonify({"error": f"The property can accommodate a maximum of {property.capacity} guests"}), 404

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
        return jsonify({"error": "Reservation already exists"}), 404

    
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

    return jsonify({"success": "Reservation added successfully"}),201

#view bookings
@res_bp.route('/reservations')
def my_bookings():
   # user_id=2 #current userid
   bookings = Reservation.query.all()

   if not bookings:
      return jsonify({"error":"You have no reservation history"}),404
   else:
      return jsonify([{
         "id":booking.id,
         "property":booking.property.title,
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
def cancel_reservation(reservation_id):
   user_id = 18 #current user
   booking = Reservation.query.get(reservation_id)

   if  booking is None:
      return jsonify({"error":"You have no reservations"})

   if booking.user_id != user_id:
      return jsonify({"error":"Validation error"})


  
   else:
      db.session.delete(booking)
      db.session.commit()

      return jsonify({"success":"reservation canceled successfully"})



#host get all bookings on own property


