from sqlalchemy import Column, Integer, String, DateTime
from database import Base

class Admin(Base):
    __tablename__ = 'admins'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    encoding = Column(String)
    role = Column(String, default='user')   # 👈 ADD THIS LINE

class Attendance(Base):
    __tablename__ = 'attendance'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    username = Column(String) 
    timestamp = Column(DateTime)