import React from "react";
import { useTheme } from "../context/ThemeContext";
import {
    FiMoon,
    FiSun
} from "react-icons/fi";
import {
    sidebarButtonStyle,
    sidebarButtonHover,
    sidebarButtonLeave
} from "../styles/sidebarButtonStyle";

function ThemeToggle() {

    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style= {sidebarButtonStyle}
            onMouseEnter={sidebarButtonHover}
            onMouseLeave={sidebarButtonLeave}
            >
            {theme === "light" ? <FiMoon size="18px" /> : <FiSun size="18px" /> } Mode:  {theme === "light" ? "Dark" : "Light"}
        </button>
    );
}

export default ThemeToggle;