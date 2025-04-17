from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import todo  # or from backend.routers import todo if outside backend
from database import Base, engine

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://gwayni.github.io/todo_fastapi/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(todo.router, prefix="/todos", tags=["ToDos"])
