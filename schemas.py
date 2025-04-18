from pydantic import BaseModel
from typing import Optional

class TodoCreate(BaseModel):
    title: str

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None

class ToDoResponse(BaseModel):
    id: int
    title: str
    completed: bool

    class Config:
        model_config = {  
            "from_attributes": True
        }
