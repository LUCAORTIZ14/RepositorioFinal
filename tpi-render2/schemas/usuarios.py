from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List

class User(BaseModel):
    email:str
    contraseña:str
class UsuarioBase(BaseModel):
    id: Optional[int] = None
    nombre: str = Field(min_length=2, max_length=20)
    correo: EmailStr
    rol:str
    class Config:
        from_attributes = True 
class Usuarios(UsuarioBase):
    contraseña: str = Field(min_length=8)
    

    

