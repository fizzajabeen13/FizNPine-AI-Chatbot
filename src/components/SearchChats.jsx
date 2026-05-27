import React, { useState } from "react";
import { useChat } from "../context/ChatContext";
import { FiSearch, FiMessageSquare, FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function SearchChats() {
    const { chats, deleteChat } = useChat();

    const [query, setQuery] = useState("");

    const filteredChats = chats.filter((c) =>
        c.title.toLowerCase().includes(query.toLowerCase())
    );

    const handleDelete = (e, id) => {
        e.stopPropagation();
        deleteChat(id);
    };

    return (
        <div className="search-panel">
            <div className="sidebar-input-wrapper">
                <input
                    type="text"
                    placeholder="Search past chats..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="sidebar-input"
                />
                <FiSearch className="sidebar-input-icon" />
            </div>

            <div className="chat-history-list">
                <AnimatePresence>
                    {filteredChats.map((chat) => (
                        <motion.div 
                            key={chat.id} 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                            className="history-item"
                        >
                            <div className="history-item-content">
                                <FiMessageSquare className="history-icon" />
                                <span className={`history-title ${chat.title === 'Generating title...' ? 'generating-title' : ''}`}>
                                    {chat.title || "New Chat"}
                                </span>
                            </div>
                            <button 
                                className="delete-chat-btn"
                                onClick={(e) => handleDelete(e, chat.id)}
                                aria-label="Delete chat"
                            >
                                <FiTrash2 />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {filteredChats.length === 0 && (
                    <div className="history-empty">No chats found.</div>
                )}
            </div>
        </div>
    );
}

export default SearchChats;
