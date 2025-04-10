from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# Folder to save uploaded face images
UPLOAD_FOLDER = 'uploaded_faces'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def home():
    return "Face Recognition Attendance System Backend is Running!"

@app.route('/register', methods=['POST'])
def register():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    username = request.form.get('username')
    
    if not username:
        return jsonify({'error': 'Username is required'}), 400

    # Save the uploaded file
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], username + '.jpg')
    file.save(filepath)

    return jsonify({'message': 'Face registered successfully!'}), 200

if __name__ == "__main__":
    app.run(debug=True)