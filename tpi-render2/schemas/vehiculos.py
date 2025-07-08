from pydantic import BaseModel, Field
from typing import Optional, List


class Vehiculo(BaseModel):
    id: int
    marca: str = Field(min_length=1, max_length=20)
    modelo: str = Field(min_length=1, max_length=40)
    año : int
    matricula: str = Field(min_length=6, max_length=7)
    capacidad : int
    categoria_id : int

     
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": 1,
                "marca": "Toyota",
                "modelo": "Corolla",
                "año" : 2015,
                "matricula": "ABC123",
                "capacidad": 5,
                "categoria_id": 1
            }
        }

