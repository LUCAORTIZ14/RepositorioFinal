from models.reservas import Reserva as ReservaModel
from schemas.reservas import Reserva
from datetime import datetime

class ReservaService():
    def __init__(self, db) -> None:
        self.db = db

    def get_reservas(self):
        return self.db.query(ReservaModel).all()

    def get_reserva_by_id(self, id):
        return self.db.query(ReservaModel).filter(ReservaModel.id == id).first()

    def create_reserva(self, reserva: Reserva):
        # Verificar si ya hay una reserva superpuesta para el mismo vehículo
        reservas_conflictivas = (
            self.db.query(ReservaModel)
            .filter(ReservaModel.vehiculo_id == reserva.vehiculo_id)
            .filter(ReservaModel.fecha_reserva <= reserva.fecha_devolucion)
            .filter(ReservaModel.fecha_devolucion >= reserva.fecha_reserva)
            .all()
        )

        if reservas_conflictivas:
            raise Exception("El vehículo ya está reservado en esas fechas")

        # Si no hay conflicto, se guarda la reserva
        new_reserva = ReservaModel(**reserva.dict())
        self.db.add(new_reserva)
        self.db.commit()
        return


    def delete_reserva(self, id: int):
        self.db.query(ReservaModel).filter(ReservaModel.id == id).delete()
        self.db.commit()
        return

    def get_reservas_activas_por_usuario(self, usuario_id: int):
        return (
            self.db.query(ReservaModel)
            .filter(ReservaModel.usuario_id == usuario_id)
            .all()
        )
