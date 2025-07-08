from config.database import Base
from sqlalchemy import Column, Integer, String, Float, Text

class Usuarios(Base):

    __tablename__ = "usuarios"

    id = Column(Integer, primary_key = True)
    nombre= Column(String(20))
    correo= Column(String(100))
    contraseña=Column(String(1000))
    rol= Column(String(50)) 
