from models.vehiculos import Vehiculos as VehiculoModel
from models.reservas import Reserva as ReservaModel
from schemas.vehiculos import Vehiculo
from datetime import date
class VehiculoService():
    
    def __init__(self, db) -> None:
        self.db = db

    def get_vehiculos(self):
        result = self.db.query(VehiculoModel).all()
        return result

    def get_vehiculo(self, id):
        result = self.db.query(VehiculoModel).filter(VehiculoModel.id == id).first()
        return result

    def get_vehiculo_by_category(self, categoria_id):
        result = self.db.query(VehiculoModel).filter(VehiculoModel.categoria_id == categoria_id).all()
        return result
    
    
    
    
    
    
    
    #creamos la funcion para ver vehiculos disponibles
    def get_vehiculos_disponibles(self,fecha_consulta: date = None):
        if fecha_consulta is None:
            fecha_consulta = date.today()
            
       # Obtener los vehículos que tienen reserva activa en la fecha_consulta
        subquery = self.db.query(ReservaModel.vehiculo_id)\
                        .filter(ReservaModel.fecha_reserva <= fecha_consulta,
                                ReservaModel.fecha_devolucion >= fecha_consulta)
                      
        # Retornar los vehículos que NO están reservados (id no está en la subconsulta)
        result = self.db.query(VehiculoModel)\
                    .filter(~VehiculoModel.id.in_(subquery)).all()
        return result         
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
    def create_vehiculo(self, Vehiculo: Vehiculo):
        new_vehiculo = VehiculoModel(**Vehiculo.model_dump(exclude={'categoria'}) )
        self.db.add(new_vehiculo)
        self.db.commit()
        return
    def update_vehiculo(self, id: int, data: Vehiculo):
        vehiculo = self.db.query(VehiculoModel).filter(VehiculoModel.id == id).first()
        vehiculo.marca = data.marca
        vehiculo.modelo = data.modelo
        vehiculo.año = data.año
        vehiculo.matricula = data.matricula
        vehiculo.capacidad = data.capacidad
        vehiculo.categoria_id = data.categoria_id
        
        self.db.commit()
      
        return
    def delete_vehiculo(self, id: int):
       self.db.query(VehiculoModel).filter(VehiculoModel.id == id).delete()
       self.db.commit()
       return