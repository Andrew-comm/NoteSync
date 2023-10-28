import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("bg-gray-800");
    document.body.classList.toggle("text-white");
  };

  return (
    <header className="flex justify-between items-center px-4 py-6">
      <Link to="/" className="text-2xl font-bold">
        Notes
      </Link>
      <div className="flex items-center">
        <button
          className="p-1 text-gray-700 dark:text-gray-300"
          onClick={handleDarkModeToggle}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
        <a
          href="https://github.com/your-github-link"
          target="_blank"
          rel="noreferrer"
          className="ml-4 text-gray-700 dark:text-gray-300"
        >
        </a>
      </div>
    </header>
  );
}

export default Header;