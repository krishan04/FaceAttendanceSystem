from flask import Flask, request, jsonify
import os
import json
from werkzeug.security import generate_password_hash
from database import SessionLocal
from model import User, Attendance
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
import face_recognition
import numpy as np
from datetime import datetime

app = Flask(__name__)


# Folder to save uploaded face images
UPLOAD_FOLDER = 'uploaded_faces'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def home():
    return "Face Recognition Attendance System Backend is Running!"


# Global variables
known_face_encodings = []
known_face_names = []

known_face_encodings = []
known_face_usernames = []

def load_known_faces():
    global known_face_encodings, known_face_usernames
    known_face_encodings = []
    known_face_usernames = []

    folder = 'uploaded_faces'
    for filename in os.listdir(folder):
        if filename.endswith('.jpg'):
            path = os.path.join(folder, filename)
            image = face_recognition.load_image_file(path)
            encoding = face_recognition.face_encodings(image)

            if encoding:  # Check if a face is found
                known_face_encodings.append(encoding[0])
                username = os.path.splitext(filename)[0]  # remove .jpg
                known_face_usernames.append(username)
load_known_faces()


@app.route('/mark_attendance', methods=['POST'])
def mark_attendance():
    db = SessionLocal()
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Save the uploaded file temporarily
        temp_folder = 'temp'
        os.makedirs(temp_folder, exist_ok=True)

        temp_path = os.path.join(temp_folder, file.filename)
        file.save(temp_path)

        # Perform face recognition
        recognized_username = recognize_face(temp_path)

        if recognized_username:
            user = db.query(User).filter_by(username=recognized_username).first()
            if user:
                attendance = Attendance(user_id=user.id, timestamp=datetime.now())
                db.add(attendance)
                db.commit()
                return jsonify({'message': f'Attendance marked for {recognized_username}'}), 200
            else:
                return jsonify({'error': 'User not found in database'}), 404
        else:
            return jsonify({'error': 'Face not recognized'}), 404
    finally:
        db.close()
        if os.path.exists(temp_path):
            os.remove(temp_path)
    
def recognize_face(image_path):
    unknown_image = face_recognition.load_image_file(image_path)
    unknown_encodings = face_recognition.face_encodings(unknown_image)

    if not unknown_encodings:
        return None  # No face found in uploaded image

    unknown_encoding = unknown_encodings[0]

    # Compare with all known faces
    results = face_recognition.compare_faces(known_face_encodings, unknown_encoding)

    if True in results:
        match_index = results.index(True)
        return known_face_usernames[match_index]

    return None


@app.route('/register', methods=['POST'])
def register():
    db = SessionLocal()

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    username = request.form.get('username')
    password = request.form.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    # Check if user already exists
    existing_user = db.query(User).filter(User.username == username).first()
    if existing_user:
        return jsonify({'error': 'User already exists!'}), 409

    # Save the uploaded face image
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], username + '.jpg')
    file.save(filepath)

    # 👉 Load the saved image and encode the face
    image = face_recognition.load_image_file(filepath)
    encodings = face_recognition.face_encodings(image)

    if len(encodings) == 0:
        return jsonify({'error': 'No face detected in the image'}), 400

    # Take the first face encoding
    face_encoding = encodings[0]

    # Save the user in database
    hashed_password = generate_password_hash(password)

    # 🛠️ Notice: face encoding is stored as a string
    new_user = User(
        username=username,
        password=hashed_password,
        encoding=json.dumps(face_encoding.tolist()),  # <-- Save encoding
        role='user'
    )

    db.add(new_user)
    db.commit()
    db.close()

    return jsonify({'message': 'Face and User registered successfully!'}), 200


@app.route('/login', methods=['POST'])
def login():
    db = SessionLocal() 
    data = request.get_json()
    
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required!'}), 400

    user = db.query(User).filter(User.username == username).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid username or password!'}), 401
    db.close()
    return jsonify({'message': f'Welcome {user.username}!', 'role': user.role}), 200


@app.route('/show_users')
def show_users():
    db = SessionLocal()
    users = db.query(User).all()
    result = []
    for user in users:
        result.append({
            'id': user.id,
            'username': user.username,
            'role': user.role,
            'encoding': user.encoding
        })
    db.close()
    return jsonify(result)


@app.route('/register_admin', methods=['POST'])
def register_admin():
    db = SessionLocal()

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    existing_user = db.query(User).filter(User.username == username).first()
    if existing_user:
        return jsonify({'error': 'Admin already exists!'}), 409

    hashed_password = generate_password_hash(password)
    new_admin = User(username=username, password=hashed_password, role='admin')

    db.add(new_admin)
    db.commit()
    db.close()

    return jsonify({'message': 'Admin registered successfully!'}), 200


@app.route('/attendance', methods=['GET'])
def get_attendance():
    db = SessionLocal()

    # Join Attendance and User tables to get username with timestamp
    results = db.query(Attendance, User).join(User, Attendance.user_id == User.id).all()

    attendance_list = []
    for attendance, user in results:
        attendance_list.append({
            'username': user.username,
            'timestamp': attendance.timestamp.strftime("%Y-%m-%d %H:%M:%S")
        })

    db.close()

    return jsonify({'attendance': attendance_list})


if __name__ == "__main__":
    app.run(debug=True)