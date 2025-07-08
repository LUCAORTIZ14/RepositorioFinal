from fastapi import APIRouter
from fastapi import Depends, Path, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import get_database_session
from models.categorias import Categorias as CategoriaModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.categorias import CategoriasService
from schemas.categorias import Categorias

categorias_router = APIRouter()


@categorias_router.get('/categorias', tags=['Categorias'], response_model=List[Categorias], status_code=200 , dependencies=[Depends(JWTBearer())])
def get_categoria(db = Depends(get_database_session) ) -> List[Categorias]:
    #db = Session()
    result = CategoriasService(db).get_categoriass()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@categorias_router.get('/categorias/{id}', tags=['Categorias'], response_model=Categorias)
def get_categoria(id: int = Path(ge=1, le=2000), db = Depends(get_database_session)) -> Categorias:
    #db = Session()
    result = CategoriasService(db).get_categorias(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@categorias_router.post('/categorias', tags=['Categorias'], response_model=dict, status_code=201)
def create_categoriua(Categoria: Categorias,  db = Depends(get_database_session)) -> dict:
    #db = Session()
    CategoriasService(db).create_categorias(Categoria)
    return JSONResponse(status_code=201, content={"message": "Se ha registrado la Categoria"})


@categorias_router.put('/categorias/{id}', tags=['Categorias'], response_model=dict, status_code=200)
def update_categoria(id: int, categoria: Categorias,  db = Depends(get_database_session))-> dict:
    #db = Session()
    result = CategoriasService(db).get_categorias(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})

    CategoriasService(db).update_categoria(id, categoria)
    return JSONResponse(status_code=200, content={"message": "Se ha modificado la categoria"})


@categorias_router.delete('/categorias/{id}', tags=['Categorias'], response_model=dict, status_code=200)
def delete_categoria(id: int,  db = Depends(get_database_session))-> dict:
    #db = Session()
    result: CategoriaModel = db.query(CategoriaModel).filter(CategoriaModel.id == id).first()
    if not result:
        return JSONResponse(status_code=404, content={"message": "No se encontró"})
    CategoriasService(db).delete_categoria(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado la categoria"})

@categorias_router.get('/CatMasVendida', tags=['Categorias'])
def getCatMasVendida(  db = Depends(get_database_session)):
    #db= Session()
    result = CategoriasService(db).getCatMasVendida()
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder({'descripcion': result.descripcion, 'Total vendido': result.total_vendido}))
