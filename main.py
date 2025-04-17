from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import todo
from backend.database import Base, engine

app = FastAPI()

origins = [
    "http://localhost:5173",  # Vite default dev server
    "http://localhost:5173/todoappreact-django",
    # Add your deployed frontend URL here later (if needed)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # list of allowed origins
    allow_credentials=True,
    allow_methods=["*"],              # allow all HTTP methods
    allow_headers=["*"],              # allow all headers
)

Base.metadata.create_all(bind=engine)

app.include_router(todo.router, prefix="/todos", tags=["ToDos"])
