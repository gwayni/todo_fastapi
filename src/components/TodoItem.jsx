import React, { useState } from "react";
import { updateTodo, deleteTodo } from "../api";

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      const data = await updateTodo(todo.id, { completed: !todo.completed });
      onUpdate(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (title.trim()) {
      setIsLoading(true);
      try {
        const data = await updateTodo(todo.id, { title });
        onUpdate(data);
        setIsEditing(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteTodo(todo.id);
      onDelete(todo.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`todo-item ${isLoading ? "loading" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        disabled={isLoading}
      />
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          autoFocus
          disabled={isLoading}
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>{todo.title}</span>
      )}
      <button onClick={handleDelete} disabled={isLoading}>
        {isLoading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

export default TodoItem;