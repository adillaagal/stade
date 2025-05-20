from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bookings.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database Models
class PoolBooking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.String(5), nullable=False)
    num_people = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class FieldBooking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.String(5), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Create database tables
with app.app_context():
    db.create_all()

# Routes
@app.route('/api/pool/book', methods=['POST'])
def book_pool():
    data = request.json
    try:
        booking = PoolBooking(
            date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
            time=data['time'],
            num_people=data['people'],
            total_price=data['total'],
            name=data['name'],
            email=data['email']
        )
        db.session.add(booking)
        db.session.commit()
        return jsonify({'message': 'Pool booking successful!'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/field/book', methods=['POST'])
def book_field():
    data = request.json
    try:
        booking = FieldBooking(
            date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
            time=data['time'],
            duration=data['duration'],
            total_price=data['total'],
            name=data['name'],
            email=data['email']
        )
        db.session.add(booking)
        db.session.commit()
        return jsonify({'message': 'Field booking successful!'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/pool/availability', methods=['GET'])
def check_pool_availability():
    date = request.args.get('date')
    time = request.args.get('time')
    
    existing_bookings = PoolBooking.query.filter_by(
        date=datetime.strptime(date, '%Y-%m-%d').date(),
        time=time
    ).count()
    
    # Assume max capacity is 20 people per time slot
    return jsonify({'available': existing_bookings < 20})

@app.route('/api/field/availability', methods=['GET'])
def check_field_availability():
    date = request.args.get('date')
    time = request.args.get('time')
    
    existing_booking = FieldBooking.query.filter_by(
        date=datetime.strptime(date, '%Y-%m-%d').date(),
        time=time
    ).first()
    
    return jsonify({'available': existing_booking is None})

if __name__ == '__main__':
    app.run(port=5000)
