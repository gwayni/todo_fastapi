from sqlalchemy.orm import Session
from backend import models, schemas

def create_todo(db: Session, todo: schemas.TodoCreate):  # Updated to match class name
    db_todo = models.Todo(
        title=todo.title,
        completed=False  # Default value
    )
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def get_all_todos(db: Session):
    return db.query(models.Todo).all()

def get_todo_by_id(db: Session, todo_id: int):
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()

def update_todo(db: Session, todo_id: int, updated: schemas.TodoUpdate):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not todo:
        return None
    if updated.title:
        todo.title = updated.title
    if updated.completed is not None:
        todo.completed = updated.completed
    db.commit()
    db.refresh(todo)
    return todo

def delete_todo(db: Session, todo_id: int):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if todo:
        db.delete(todo)
        db.commit()
        return True
    return False

def filter_todos_by_status(db: Session, status: bool):
    return db.query(models.Todo).filter(models.Todo.completed == status).all()
