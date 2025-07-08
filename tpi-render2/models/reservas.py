from config.database import Base
from sqlalchemy import Column, Integer, ForeignKey, String

class Reserva(Base):
    __tablename__ = "reservas"

    id = Column(Integer, primary_key=True)
    vehiculo_id = Column(Integer, ForeignKey('vehiculos.id'), nullable=False)
    usuario_id = Column(Integer, ForeignKey('usuarios.id'), nullable=False)
    fecha_reserva = Column(String) 
    fecha_devolucion = Column(String) 
