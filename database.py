from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Your database connection URL
DATABASE_URL = "postgresql://todo_fastapi_arm5_user:rnp974ZFrjJC0cNCAsQdczTSDbbpiKMG@dpg-d00hu7adbo4c73930r60-a/todo_fastapi_arm5"

# Initialize database connection and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
