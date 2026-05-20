import React from "react";
import { useChat } from "../context/ChatContext";
import { FiPlus } from "react-icons/fi";

import {
    sidebarButtonStyle,
    sidebarButtonHover,
    sidebarButtonLeave
} from "../styles/sidebarButtonStyle";

function NewChatButton() {

    const { startNewChat } = useChat();

    return (

        <button
            onClick={startNewChat}
            style={sidebarButtonStyle}
            onMouseEnter={sidebarButtonHover}
            onMouseLeave={sidebarButtonLeave}
        >

            {/* ICON */}
            <FiPlus size={18} />

            {/* TEXT */}
            New Chat

        </button>

    );
}

export default NewChatButton;