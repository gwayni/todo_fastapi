from pydantic import BaseModel

class ToDoBase(BaseModel):
    title: str
    completed: bool = False

class ToDoCreate(ToDoBase):
    pass

class ToDoUpdate(ToDoBase):
    pass

class ToDoResponse(ToDoBase):
    id: int

    class Config:
        orm_mode = True
