import React from "react";
import { useChat } from "../context/ChatContext";
import { FiPlus } from "react-icons/fi";

function NewChatButton() {
    const { startNewChat } = useChat();

    return (
        <button
            onClick={startNewChat}
            className="sidebar-button sidebar-button-primary"
        >
            <FiPlus size={18} />
            New Chat
        </button>
    );
}

export default NewChatButton;
