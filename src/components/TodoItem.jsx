import React, { useState } from "react";
import { updateTodo, deleteTodo } from "../api";

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      // Toggle the completed status of the todo
      const data = await updateTodo(todo.id, { completed: !todo.completed });
      onUpdate(data); // Update the todo in the parent component's state
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (title.trim()) {
      setIsLoading(true);
      try {
        const data = await updateTodo(todo.id, { title });
        onUpdate(data); // Update the todo in the parent component's state
        setIsEditing(false); // Exit editing mode
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteTodo(todo.id); // Delete the todo
      onDelete(todo.id); // Remove it from the parent component's state
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`todo-item ${isLoading ? "loading" : ""}`}>
      {/* Button for toggling the completion status */}
      <button
        id={`toggle-completion-${todo.id}`} // Unique ID for the button
        name={`toggle-completion-${todo.id}`} // Unique name for the button
        onClick={handleToggleComplete}
        disabled={isLoading}
      >
        {todo.completed ? "Mark as Pending" : "Mark as Completed"}
      </button>

      {/* Edit mode or display mode for the title */}
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave} // Save the title when the input loses focus
          autoFocus
          disabled={isLoading} // Disable while loading
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>{todo.title}</span>
      )}

      {/* Button for deleting the todo */}
      <button onClick={handleDelete} disabled={isLoading}>
        {isLoading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

export default TodoItem;
