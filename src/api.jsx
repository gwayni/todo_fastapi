const API_URL = import.meta.env.VITE_API_URL || "https://todo-fastapi-fw5b.onrender.com";

export const getTodos = async (completed) => {
  let url = `${API_URL}/todos`;

  if (completed !== undefined) {
    url += `?completed=${completed}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch todos: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

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
    throw error;
  }
};

export const updateTodo = async (id, updates) => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update todo: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete todo: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
