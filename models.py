from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class Todo(Base):  # Changed class name from ToDo to Todo
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    completed = Column(Boolean, default=False)
