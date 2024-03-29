from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(), nullable=False, unique=True)
    phone = db.Column(db.String(), nullable=False, unique=True)
    password = db.Column(db.String(450), nullable=False)
    user_type = db.Column(db.String(50), nullable=False)

    # One-to-Many relationship: a user can make many reservations
    reservations = db.relationship('Reservation', backref='user', lazy=True, cascade='all, delete-orphan')

    # One-to-Many relationship: a user can have many properties
    properties = db.relationship('Property', backref='user', lazy=True, cascade='all, delete-orphan')

class Property(db.Model, SerializerMixin):
    __tablename__ = 'properties'

    serialize_rules = ('-user.properties', )

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False, unique=True)
    description = db.Column(db.String(300), nullable=False)
    image = db.Column(db.String(), nullable=False)
    other_images = db.Column(db.JSON(), nullable=False)  # list []
    price = db.Column(db.Integer(), nullable=False)
    category = db.Column(db.String(), nullable=False)
    inclusives = db.Column(db.JSON(), nullable=False)  # list []
    amenities = db.Column(db.JSON(), nullable=False)  # list []
    rules = db.Column(db.JSON(), nullable=False)    # list []
    capacity = db.Column(db.Integer(), nullable=False)
    bathrooms = db.Column(db.Integer(), nullable=False)
    beds = db.Column(db.Integer(), nullable=False)
    location = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), nullable=True, onupdate=datetime.utcnow)

    user_id = db.Column(db.Integer(), db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    # One-to-Many relationship: a property can have many reservations
    reservations = db.relationship('Reservation', backref='property', lazy=True, cascade='all, delete-orphan')

class Reservation(db.Model, SerializerMixin):
    __tablename__ = 'reservations'

    serialize_rules = ('-user.reservations', '-property.reservations')

    id = db.Column(db.Integer, primary_key=True)
    check_in_date = db.Column(db.DateTime(), nullable=False)
    check_out_date = db.Column(db.DateTime(), nullable=False)
    number_of_guests = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    total = db.Column(db.Integer(), nullable=False)
   
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id', ondelete='CASCADE'), nullable=True)
    property_id = db.Column(db.Integer(), db.ForeignKey('properties.id', ondelete='CASCADE'), nullable=True)

    # user = db.relationship('User', backref='reservations', lazy=True, cascade='all, delete')
    # property = db.relationship('Property', backref='reservations', lazy=True)

class TokenBlocklist(db.Model, SerializerMixin):
    __tablename__='token_blocklist'

    id = db.Column(db.Integer, primary_key=True)
    jti =  db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
