import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onUpdate, onDelete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}



export default TodoList;
