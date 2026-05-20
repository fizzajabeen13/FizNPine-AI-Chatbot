import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

import {
    saveMessages,
    loadMessages,
    savePersonality,
    loadPersonality
} from "../services/storageService";

// Create Context
const ChatContext = createContext();

// Custom Hook
export const useChat = () => {
    return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {

    // =========================
    // SAFE INITIAL STATES
    // =========================

    const [messages, setMessages] = useState(() => {
        return loadMessages() || [];
    });

    const [loading, setLoading] = useState(false);

    const [currentChat, setCurrentChat] = useState("New Chat");

    const [personality, setPersonality] = useState(() => {
        return loadPersonality() || "friendly";
    });

    // =========================
    // NEW CHAT FUNCTION
    // =========================

    const startNewChat = () => {
        setMessages([]);
        setCurrentChat("New Chat");

        // IMPORTANT: clear storage too
        saveMessages([]);
    };

    // =========================
    // AUTO SAVE EFFECTS
    // =========================

    useEffect(() => {
        saveMessages(messages);
    }, [messages]);

    useEffect(() => {
        savePersonality(personality);
    }, [personality]);

    // =========================
    // CONTEXT VALUE
    // =========================

    const value = {
        messages,
        setMessages,

        loading,
        setLoading,

        currentChat,
        setCurrentChat,

        personality,
        setPersonality,

        startNewChat
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext;