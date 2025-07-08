from sqlalchemy import create_engine

from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL ="postgresql://tpifinal_user:EEIj7Il5QO3FWtK5aYPliR3khs6CsFU3@dpg-d1hkhj3uibrs73fc8a80-a/tpifinal"
#"postgresql://tpifinal_user:EEIj7Il5QO3FWtK5aYPliR3khs6CsFU3@dpg-d1hkhj3uibrs73fc8a80-a/tpifinal"

#"postgresql://tpidb:q1cPUwbJSXGkp0rnTvhwIzyIitcsKcOg@dpg-d1glg7idbo4c73avrtn0-a/tpidb"
#"mysql+mysqlconnector://root:123456@localhost:3306/tienda "



engine = create_engine(DATABASE_URL)

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_database_session():
    db = Session()
    try:
        yield db
    finally:
        db.close()
