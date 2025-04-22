import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import FilterButtons from "./components/FilterButtons";
import ThemeToggle from "./components/ThemeToggle"; // optional
import { getTodos, updateTodo } from "./api";  // Assuming this fetches the todos
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

  // Fetch todos based on filter
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
    fetchTodos(); // Ensure we call the function
  }, [filter]); // Trigger fetch when filter changes

  // Toggle completion status of a todo
  const toggleCompletionStatus = async (todoId, currentStatus) => {
    const newStatus = !currentStatus; // Toggle between completed and pending
    try {
      const updatedTodo = await updateTodo(todoId, { completed: newStatus });
      // Update state immediately with the updated todo
      setTodos(todos.map(todo => todo.id === todoId ? updatedTodo : todo));
    } catch (error) {
      console.error("Error while updating todo status", error);
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
          onToggleCompletion={toggleCompletionStatus} // Added toggle function for completion
        />
      )}
    </div>
  );
}

export default App;
