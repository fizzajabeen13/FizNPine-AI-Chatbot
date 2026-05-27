import React from "react";
import { useTheme } from "../context/ThemeContext";
import {
    FiMoon,
    FiSun
} from "react-icons/fi";

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="sidebar-button"
        >
            {theme === "light" ? <FiMoon size="18px" /> : <FiSun size="18px" /> }
            {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
    );
}

export default ThemeToggle;
