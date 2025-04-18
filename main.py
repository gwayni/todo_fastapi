from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import todo
from database import Base, engine
import os

# Fetch the PostgreSQL connection URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

# Initialize FastAPI app
app = FastAPI()

# CORS settings
origins = [
    "https://gwayni.github.io",  # Make sure your frontend domain is listed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Allow all headers
)

# Create the database tables based on the models
Base.metadata.create_all(bind=engine)

# Include the router for todos
app.include_router(todo.router, prefix="/todos", tags=["ToDos"])
