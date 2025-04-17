import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql://todo_fastapi_arm5_user:rnp974ZFrjJC0cNCAsQdczTSDbbpiKMG@dpg-d00hu7adbo4c73930r60-a/todo_fastapi_arm5"  # Change to PostgreSQL URI if deploying

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()