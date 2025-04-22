function ThemeToggle({ theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
}

export default ThemeToggle;
