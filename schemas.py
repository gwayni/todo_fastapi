from pydantic import BaseModel
from typing import Optional


class TodoCreate(BaseModel):
    title: str


class TodoUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None


class TodoResponse(BaseModel):  # <- This is what you're referencing in routers/todo.py
    id: int
    title: str
    completed: bool

    class Config:
        from_attributes = True  # Correct for Pydantic v2
