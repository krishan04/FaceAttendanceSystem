# backend/create_tables.py

from database import Base, engine
from model import Admin, User, Attendance

# Create all tables
Base.metadata.create_all(bind=engine)

print("Tables created successfully.")