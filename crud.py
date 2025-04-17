from sqlalchemy.orm import Session
from . import models, schemas

def get_all_todos(db: Session):
    return db.query(models.ToDo).all()

def get_todo_by_id(db: Session, todo_id: int):
    return db.query(models.ToDo).filter(models.ToDo.id == todo_id).first()

def create_todo(db: Session, todo: schemas.ToDoCreate):
    db_todo = models.ToDo(**todo.dict())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def update_todo(db: Session, todo_id: int, updated: schemas.ToDoUpdate):
    todo_item = get_todo_by_id(db, todo_id)
    if todo_item:
        todo_item.title = updated.title
        todo_item.completed = updated.completed
        db.commit()
        db.refresh(todo_item)
        return todo_item
    return None

def delete_todo(db: Session, todo_id: int):
    todo_item = get_todo_by_id(db, todo_id)
    if todo_item:
        db.delete(todo_item)
        db.commit()
        return True
    return False

def filter_todos_by_status(db: Session, status: bool):
    return db.query(models.ToDo).filter(models.ToDo.completed == status).all()
