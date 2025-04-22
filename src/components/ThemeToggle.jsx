import React from "react";

function ThemeToggle({ theme, setTheme }) {
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
  Switch to {theme === "light" ? "Dark" : "Light"} Mode
</button>
  );
}

export default ThemeToggle;