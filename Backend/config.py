from flask import flask


app= flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///database.sqlite'

app.init_app(app)

