import React, { useState } from "react";
import { createTodo } from "../api";

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      const newTodo = await createTodo(title);
      onAdd(newTodo);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Optional label for accessibility */}
      <label htmlFor="todo-title" className="sr-only">Todo</label>

      <input
        id="todo-title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodo;
