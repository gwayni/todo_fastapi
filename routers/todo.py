# routers/todo.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import schemas
import crud
from database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.ToDoResponse])
def read_todos(db: Session = Depends(get_db)):
    return crud.get_all_todos(db)

@router.get("/{todo_id}", response_model=schemas.ToDoResponse)
def read_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = crud.get_todo_by_id(db, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="To-Do not found")
    return todo

@router.post("/", response_model=schemas.ToDoResponse)
def create_todo(todo: schemas.ToDoCreate, db: Session = Depends(get_db)):
    return crud.create_todo(db, todo)

@router.put("/{todo_id}", response_model=schemas.ToDoResponse)
def update_todo(todo_id: int, updated: schemas.ToDoUpdate, db: Session = Depends(get_db)):
    todo = crud.update_todo(db, todo_id, updated)
    if not todo:
        raise HTTPException(status_code=404, detail="To-Do not found")
    return todo

@router.delete("/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    success = crud.delete_todo(db, todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="To-Do not found")
    return {"message": "Deleted successfully"}

@router.get("/filter/status/{status}", response_model=list[schemas.ToDoResponse])
def filter_todos(status: bool, db: Session = Depends(get_db)):
    return crud.filter_todos_by_status(db, status)
