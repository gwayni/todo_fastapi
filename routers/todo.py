from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import schemas, crud
from database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.TodoResponse])
def read_todos(db: Session = Depends(get_db)):
    return crud.get_all_todos(db)

@router.get("/{todo_id}", response_model=schemas.TodoResponse)
def read_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = crud.get_todo_by_id(db, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="To-Do not found")
    return todo

@router.post("/", response_model=schemas.TodoResponse)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    return crud.create_todo(db, todo)

@router.put("/{todo_id}", response_model=schemas.TodoResponse)
def update_todo(todo_id: int, updated: schemas.TodoUpdate, db: Session = Depends(get_db)):
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

@router.get("/filter", response_model=list[schemas.TodoResponse])
def filter_todos(completed: Optional[bool] = None, db: Session = Depends(get_db)):
    return crud.filter_todos_by_status(db, completed)
