from fastapi import APIRouter, Depends, Path, Query
from fastapi.responses import JSONResponse
from typing import Optional, List
from datetime import datetime

from config.database import get_database_session
from models.vehiculos import Vehiculos as VehiculoModel
from schemas.vehiculos import Vehiculo
from services.vehiculos import VehiculoService
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer

vehiculo_router = APIRouter()


# 1. Obtener vehículos disponibles
@vehiculo_router.get('/vehiculos/disponibles', tags=['vehiculos'], response_model=List[Vehiculo])
def get_vehiculos_disponibles(
    fecha: Optional[str] = Query(None, description="Fecha a consultar en formato YYYY-MM-DD"),
    db=Depends(get_database_session)
):
    fecha_consulta = None
    if fecha:
        try:
            fecha_consulta = datetime.strptime(fecha, '%Y-%m-%d').date()
        except ValueError:
            return JSONResponse(status_code=400, content={"message": "Formato de fecha inválido. Usar YYYY-MM-DD."})
    
    result = VehiculoService(db).get_vehiculos_disponibles(fecha_consulta)
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


# 2. Obtener vehículos por categoría
@vehiculo_router.get('/vehiculos/', tags=['vehiculos'], response_model=List[Vehiculo])
def get_vehiculo_by_category(idCategoria: int, db=Depends(get_database_session)) -> List[Vehiculo]:
    result = VehiculoService(db).get_vehiculos_by_category(idCategoria)
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


# 3. Obtener todos los vehículos
@vehiculo_router.get('/vehiculos', tags=['vehiculos'], response_model=List[Vehiculo], status_code=200)
def get_vehiculos(db=Depends(get_database_session)) -> List[Vehiculo]:
    result = VehiculoService(db).get_vehiculos()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


# 4. Obtener vehículo por ID
@vehiculo_router.get('/vehiculos/{id}', tags=['vehiculos'], response_model=Vehiculo)
def get_vehiculo(id: int = Path(ge=1, le=2000), db=Depends(get_database_session)) -> Vehiculo:
    result = VehiculoService(db).get_vehiculo(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


# 5. Crear vehículo
@vehiculo_router.post('/vehiculos', tags=['vehiculos'], response_model=dict, status_code=201)
def create_vehiculo(vehiculo: Vehiculo, db=Depends(get_database_session)) -> dict:
    VehiculoService(db).create_vehiculo(vehiculo)
    return JSONResponse(status_code=201, content={"message": "Se ha registrado el vehiculo"})


# 6. Actualizar vehículo
@vehiculo_router.put('/vehiculos/{id}', tags=['vehiculos'], response_model=dict, status_code=200)
def update_vehiculo(id: int, vehiculo: Vehiculo, db=Depends(get_database_session)) -> dict:
    result = VehiculoService(db).get_vehiculo(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    
    VehiculoService(db).update_vehiculo(id, vehiculo)
    return JSONResponse(status_code=200, content={"message": "Se ha modificado el vehiculo"})


# 7. Eliminar vehículo
@vehiculo_router.delete('/vehiculos/{id}', tags=['vehiculos'], response_model=dict, status_code=200)
def delete_vehiculo(id: int, db=Depends(get_database_session)) -> dict:
    result: VehiculoModel = db.query(VehiculoModel).filter(VehiculoModel.id == id).first()
    if not result:
        return JSONResponse(status_code=404, content={"message": "No se encontró"})
    VehiculoService(db).delete_vehiculo(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado el vehiculo"})