import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import FilterButtons from "./components/FilterButtons";
import ThemeToggle from "./components/ThemeToggle"; // optional
import { getTodos } from "./api";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        let completed;
        if (filter === "completed") completed = true;
        else if (filter === "pending") completed = false;
        else completed = undefined; // Default to undefined to get all todos
        const data = await getTodos(completed); // Send completed as query param
        setTodos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
  return (
    <div className="app">
      <ThemeToggle theme={theme} setTheme={setTheme} /> {/* Theme Toggle */}
      <h1>To-Do List</h1>
      <AddTodo onAdd={(newTodo) => setTodos([...todos, newTodo])} />
      <FilterButtons setFilter={setFilter} />  {/* Filter Buttons */}

      {isLoading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <TodoList
          todos={todos}
          onUpdate={(updatedTodo) =>
            setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)))
          }
          onDelete={(id) => setTodos(todos.filter((t) => t.id !== id))}
        />
      )}
    </div>
  );
}

export default App;
