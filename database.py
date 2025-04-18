from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Get the PostgreSQL connection string from environment variables
DATABASE_URL = os.getenv("postgresql://todo_fastapi_arm5_user:rnp974ZFrjJC0cNCAsQdczTSDbbpiKMG@dpg-d00hu7adbo4c73930r60-a/todo_fastapi_arm5")

# Create the SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Create a sessionmaker to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for the models
Base = declarative_base()
