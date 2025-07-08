from fastapi import APIRouter, Depends, Path
from fastapi.responses import JSONResponse
from typing import List
from config.database import get_database_session
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.reservas import ReservaService
from schemas.reservas import Reserva
from models.reservas import Reserva as ReservaModel

reservas_router = APIRouter()

@reservas_router.get('/Reserva', tags=['Reserva'], response_model=List[Reserva], status_code=200, dependencies=[Depends(JWTBearer())])
def get_reservas(db = Depends(get_database_session)) -> List[Reserva]:
    result = ReservaService(db).get_reservas()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@reservas_router.get('/Reserva/{id}', tags=['Reserva'], response_model=Reserva)
def get_reserva(id: int = Path(ge=1), db = Depends(get_database_session)) -> Reserva:
    result = ReservaService(db).get_reserva_by_id(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@reservas_router.post('/Reserva', tags=['Reserva'], response_model=dict, status_code=201)
def create_reserva(reserva: Reserva, db = Depends(get_database_session)) -> dict:
    try:
        ReservaService(db).create_reserva(reserva)
        return JSONResponse(status_code=201, content={"message": "Se ha registrado la reserva"})
    except Exception as e:
        return JSONResponse(status_code=400, content={"message": str(e)})


@reservas_router.delete('/Reserva/{id}', tags=['Reserva'], response_model=dict, status_code=200)
def delete_reserva(id: int, db = Depends(get_database_session)) -> dict:
    result: ReservaModel = db.query(ReservaModel).filter(ReservaModel.id == id).first()
    if not result:
        return JSONResponse(status_code=404, content={"message": "No se encontró"})
    ReservaService(db).delete_reserva(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado la reserva"})

@reservas_router.get('/Reserva/activas/{usuario_id}', tags=['Reserva'], response_model=List[Reserva])
def get_reservas_activas(usuario_id: int, db = Depends(get_database_session)) -> List[Reserva]:
    result = ReservaService(db).get_reservas_activas_por_usuario(usuario_id)
    return JSONResponse(status_code=200, content=jsonable_encoder(result))
