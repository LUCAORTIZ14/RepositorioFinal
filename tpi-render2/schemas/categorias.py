from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List


class Categorias(BaseModel):
    id: Optional[int] = None
    nombre : str = Field(..., min_length=3, max_length=20)
    descripcion: str = Field(min_length=5, max_length=100)

    class Config:
        schema_extra = {
            "example": {
                "id": 1,
                "nombre": "economico",
                "descripcion": "Vehiculo de bajo consumo y costos de reserva"
            }
        }

