from models.categorias import Categorias as CategoriasModel
from schemas.categorias import Categorias
from sqlalchemy import  func
from models.categorias import Categorias
from models.vehiculos import Vehiculos

class CategoriasService():
    
    def __init__(self, db) -> None:
        self.db = db

    def get_categoriass(self):
        result = self.db.query(CategoriasModel).all()
        return result

    def get_categorias(self, id):
        result = self.db.query(CategoriasModel).filter(CategoriasModel.id == id).first()
        return result

    def create_categorias(self, Categorias: Categorias):
        new_categoria = CategoriasModel(**Categorias.model_dump())
        self.db.add(new_categoria)
        self.db.commit()
        return
    def update_categoria(self, id: int, data: Categorias):
        categoria = self.db.query(CategoriasModel).filter(CategoriasModel.id == id).first()
        categoria.nombre = data.nombre
        categoria.descripcion = data.descripcion
        self.db.commit()
        return
    
    def delete_categoria(self, id: int):
       self.db.query(CategoriasModel).filter(CategoriasModel.id == id).delete()
       self.db.commit()
       return
    
    ##def getCatMasVendida(self):
    ##   SELECT c.nombre_categoria, SUM(v.cantidad) AS total_vendido
    ##   FROM ventas v
    ##        INNER JOIN productos p ON v.idProducto = p.id
    ##        INNER JOIN categorias c ON p.idCategoria = c.id
    ##    GROUP BY c.descripcion
    ##    ORDER BY total_vendido DESC
    ##    LIMIT 1;
    ##  respuesta = self.db.query(CategoriasModel.descripcion ,
    ##                              func.sum(Ventas.cantidad).label('total_vendido')
    ##                             ).join(Productos, Productos.idCategoria == CategoriasModel.id
    ##                              ).join(Ventas, Ventas.idProducto == Productos.id
    ##                               ).group_by(CategoriasModel.descripcion
    ##                              ).order_by(func.sum(Ventas.cantidad).desc()
    ##                              ).limit(1).one()
    ##  return respuesta
    ##