const API_URL = import.meta.env.VITE_API_URL || "https://todo-fastapi-fw5b.onrender.com";

// Fetch all todos with an optional filter for completion status
export const getTodos = async (completed) => {
  let url = `${API_URL}/todos`;  // Base URL

  // Add the query parameter for completed if it's not undefined
  if (completed !== undefined) {
    url += `?completed=${completed}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch todos: ${errorText}`);
    }
    return await response.json();  // Return the JSON data if successful
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;  // Re-throw or handle accordingly
  }
};

// Create a new todo
export const createTodo = async (title) => {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create todo: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createTodo:", error);
    throw error; // Re-throw or handle accordingly
  }
};

// Update an existing todo (specifically for toggling completion)
export const updateTodo = async (id, updates) => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates), // Send the completed status change
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update todo: ${errorText}`);
    }

    return await response.json();  // Return updated todo
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;  // Re-throw or handle accordingly
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete todo: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error; // Re-throw or handle accordingly
  }
};

// In api.jsx
export const updateTodo = async (id, updates) => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates), // Send the completed status change
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update todo: ${errorText}`);
    }

    return await response.json();  // Return updated todo
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;  // Re-throw or handle accordingly
  }
};

``
