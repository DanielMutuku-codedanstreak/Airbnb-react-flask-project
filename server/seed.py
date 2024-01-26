from app import User,Property, Reservation,db,app
from datetime import datetime,timedelta
from faker import Faker 
from random import choice as rc

fake = Faker()

with app.app_context():
   print('************** clearing database **************')
   User.query.delete()
   Property.query.delete()
   Reservation.query.delete()
   db.session.commit()

   print('************** seeding users **************')

   users=[]
   user_types = ["Host",'Guest']
   for _ in range (50):
      user = User(
         name = fake.name(),
         email = fake.email(),
         phone = fake.phone_number(),
         password = fake.word(),
         user_type = rc(user_types)
      )
      db.session.add(user)
      users.append(user)
   db.session.commit()

   print('************** seeding property **************')

   properties=[]
   amenities = ["Wi-Fi", "Television",  "Air conditioning"]
   categories = [
    "Entire Home/Apartment",
    "Private Room",
    "Shared Room",
    "Hotel",
    "Unique Stays",
    "Boutique",
    "Entire Floor or Guest Suite",
    "Hostel",
    "Cabin",
    "Farm Stay"
]
   inclusives=["Meal Plan : Bed And BreakFast", "Pick up and Return Transfer"]
   locations = [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Eldoret",
    "Thika",
    "Malindi",
    "Nyeri",
    "Kitale",
    "Machakos",
    "Meru",
    "Kakamega",
    "Lamu",
    "Kericho",
    "Garissa",
]
   for _ in range (100):
      property =Property(
         title = fake.sentence(),
        description = fake.sentence(),
        category = rc(categories),
        image = 'https://a0.muscache.com/im/pictures/c3281f7a-ca80-4ff7-a3a8-131469e42c16.jpg?im_w=720',
        other_images = ['https://a0.muscache.com/im/pictures/c3281f7a-ca80-4ff7-a3a8-131469e42c16.jpg?im_w=720' for _ in range(4)],
        price = fake.random_int(min=50, max=300),
        inclusives = [rc(inclusives),rc(inclusives)],
        amenities = [rc(amenities),rc(amenities)],
        rules = {
         "checkin": "12:00:00 AM", 
         "checkout": "11:00:00 PM", 
            },
        capacity = fake.random_int(min=1, max=5),
        bathrooms = fake.random_int(min=1, max=3),
        beds = fake.random_int(min=1, max=3),
        location = rc(locations),
        user_id = fake.random_int(min=1, max=50)
      )
      db.session.add(property)
      properties.append(property)
   db.session.commit()

   print('************** seeding reservations **************')


   reservations =[]
   for property in properties:
    for _ in range(fake.random_int(min=1, max=5)):
        start_date = fake.date_between(start_date="today", end_date="+1y")
        
        # Generate a random duration for the reservation (between 1 and 14 days)
        reservation_duration = timedelta(days=fake.random_int(min=1, max=14))
        end_date = start_date + reservation_duration

        reservation = Reservation(
            check_in_date=start_date,
            check_out_date=end_date,
            number_of_guests=fake.random_int(max=5, min=1),
            total=fake.random_int(min=100, max=1000),
            user_id=fake.random_int(min=1, max=50),
            property_id=property.id
        )
        db.session.add(reservation)
        reservations.append(reservation)

   db.session.commit()


   print('************** seeding complete **************')