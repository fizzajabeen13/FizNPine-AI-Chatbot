import React, { useState } from "react";
import { useChat } from "../context/ChatContext";
import { FiSearch } from "react-icons/fi";

import {
    sidebarInputWrapperStyle,
    sidebarInputStyle,
    sidebarIconStyle,
    sidebarResultItemStyle
} from "../styles/sidebarButtonStyle";

function SearchChats() {
    const { messages } = useChat();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = (text) => {
        setQuery(text);

        if (!text.trim()) {
            setResults([]);
            return;
        }

        const filtered = messages.filter((msg) =>
            msg.text.toLowerCase().includes(text.toLowerCase())
        );

        setResults(filtered);
    };

    return (
        <div style={{ width: "100%" }}>

            {/* SEARCH BOX (ONLY ONE LAYER) */}
            <div style={sidebarInputWrapperStyle}>
                <input
                    type="text"
                    placeholder="Search chats..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={sidebarInputStyle}
                />

                <FiSearch style={sidebarIconStyle} />
            </div>

            {/* RESULTS */}
            {results.length > 0 && (
                <div style={{ marginTop: "10px" }}>
                    {results.map((msg, index) => (
                        <div key={index} style={sidebarResultItemStyle}>
                            <b>{msg.sender}:</b> {msg.text}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchChats;