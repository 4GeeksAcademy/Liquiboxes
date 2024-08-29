"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


users = Blueprint('users', __name__)

# Allow CORS requests to this API
CORS(users)


@users.route('/', methods=['GET'])
def get_all_users():
    users = User.query.all()
    
    # Serializa cada objeto en la lista de usuarios
    serialized_users = [user.serialize() for user in users]

    return jsonify(serialized_users), 200

@users.route('/register', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Verifica si el usuario ya existe
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'error': 'User already exists'}), 400 ## MIRAR ERROR NO SE ENVIA BIEN

    # Crea un nuevo usuario
    user = User(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201

@users.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    return jsonify({'error': 'Credenciales inválidas'}), 401

@users.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


