from sqlalchemy import Column, Integer, String, Float, Boolean, Enum
from database import Base
from sqlalchemy.dialects.postgresql import ENUM

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_admin = Column(Boolean, default=False)

class Flower(Base):
    __tablename__ = "flowers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    stock = Column(Integer, nullable=False)
    color = Column(String, nullable=False)
    category = Column(String, nullable=False)
    image = Column(String, nullable=True)
    flower_type = Column(String, nullable=False)
    size = Column(String, nullable=True)
    care_tips = Column(String, nullable=True)
    availability = Column(Boolean, default=True)
