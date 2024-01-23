from models import db,Reservation
from flask import request,jsonify ,Blueprint

res_bp = Blueprint('res_bp',__name__)


#add a booking
@res_bp.route('/reservations', methods=['POST'] )
def add_reservations():
   data = get_json()
   
   check_in_date=data['check_in_date']
   check_in_date=data['check_in_date']
   number_of_guests=data['number_of_guests']
   total = data['total']
   property_id = data['property_id']
   user_id =data['user_id']#current user

   booked = Reservation.query.filter_by(property_id=property_id,check_in_date=check_in_date,check_out_date=check_out_date).first()
   
   if booked:
      return jsonify({"error":"reservation already exists"})
   






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
         "location":booking.property.location
      }for booking in bookings
      ]),200


#cancel own bookings
@res_bp.route('/reservations/<int:reservation_id>')
def cancel_reservation(reservation_id):
   user_id =1 #current user
   booking = Reservation.query.get(reservation_id)

   if booking.user_id != user_id:
      return jsonify({"error":"Validation error"})


   elif not booking:
      return jsonify({"error":"No reservation"})

   else:
      db.session.delete(booking)
      db.session.commit()

      return jsonify({"success":"reservation canceled successfully"})



#host get all bookings on own property

