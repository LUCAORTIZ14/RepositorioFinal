from fastapi.security import HTTPBearer
from fastapi import Request, HTTPException

from services.usuarios import UsuariosService
from utils.jwt_manager import create_token, validate_token


from models.usuarios import Usuarios as UsuarioModel
from config.database import Session

def get_user(users:list, email: str):
    for item in users:
        if item.correo == email:
            return item
        
class JWTBearer(HTTPBearer):
    async def __call__(self, request: Request):
        auth = await super().__call__(request)
        data = validate_token(auth.credentials)
        db= Session()
        usuariosDb : UsuarioModel= UsuariosService(db).get_usuarios()
        for item in usuariosDb:
             if item.correo == data['email']:
               return
        raise HTTPException(status_code=403, detail="Credenciales son invalidas")

