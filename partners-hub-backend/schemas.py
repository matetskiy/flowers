from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(BaseModel):
    id: int
    username: str
    is_admin: bool

    class Config:
        orm_mode = True

class FlowerBase(BaseModel):
    name: str
    description: str
    price: float
    stock: int
    color: str
    category: str
    flower_type: str
    size: Optional[str] = None
    care_tips: Optional[str] = None
    availability: bool
    image: Optional[str] = None

class FlowerCreate(FlowerBase):
    pass

class Flower(FlowerBase):
    id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
