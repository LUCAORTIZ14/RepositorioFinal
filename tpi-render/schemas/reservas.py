from pydantic import BaseModel, Field
from typing import Optional

class Reserva(BaseModel):
    id: Optional[int] = None
    vehiculo_id: int
    usuario_id: int
    fecha_reserva: str
    fecha_devolucion: str

    class Config:
        from_attributes = True  # Para usar .from_orm()
