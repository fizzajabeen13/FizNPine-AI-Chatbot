import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

import {
    saveChats,
    loadChats,
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

    const [chats, setChats] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [isChatsLoaded, setIsChatsLoaded] = useState(false);

    // Asynchronously load chats on mount
    useEffect(() => {
        loadChats().then(loadedChats => {
            const data = loadedChats || [];
            setChats(data);
            if (data.length > 0) {
                setCurrentChatId(data[0].id);
            }
            setIsChatsLoaded(true);
        });
    }, []);

    // Use a ref to always have the latest currentChatId in setMessages closure
    const currentChatIdRef = React.useRef(currentChatId);
    useEffect(() => {
        currentChatIdRef.current = currentChatId;
    }, [currentChatId]);

    const [loading, setLoading] = useState(false);

    const [personality, setPersonality] = useState(() => {
        return loadPersonality() || "friendly";
    });

    // Computed properties
    const currentChat = chats.find(c => c.id === currentChatId);
    const messages = currentChat ? currentChat.messages : [];

    // Custom setMessages to handle updating the current chat in the chats array
    const setMessages = (newMessages) => {
        setChats(prevChats => {
            const activeId = currentChatIdRef.current;
            
            // Extract the most up-to-date messages for the active chat from prevChats
            const currentChatObj = prevChats.find(c => c.id === activeId);
            const currentMessagesList = currentChatObj ? currentChatObj.messages : [];

            // Evaluate the new messages using the most up-to-date messages array
            const evaluatedMessages = typeof newMessages === 'function' ? newMessages(currentMessagesList) : newMessages;

            if (!activeId) {
                // Creating a new chat
                const newId = Date.now().toString();
                const newTitle = "Generating title...";
                setCurrentChatId(newId);
                return [{ id: newId, title: newTitle, messages: evaluatedMessages }, ...prevChats];
            } else {
                // Updating existing chat
                return prevChats.map(c => {
                    if (c.id === activeId) {
                        return { ...c, messages: evaluatedMessages };
                    }
                    return c;
                });
            }
        });
    };

    const updateChatTitle = (id, newTitle) => {
        setChats(prevChats => prevChats.map(c => 
            c.id === id ? { ...c, title: newTitle } : c
        ));
    };

    const deleteChat = (id) => {
        setChats(prevChats => {
            const updatedChats = prevChats.filter(c => c.id !== id);
            
            // If we deleted the currently active chat, switch to another or clear
            if (id === currentChatIdRef.current) {
                const nextChatId = updatedChats.length > 0 ? updatedChats[0].id : null;
                setCurrentChatId(nextChatId);
            }
            
            return updatedChats;
        });
    };

    // =========================
    // NEW CHAT FUNCTION
    // =========================

    const startNewChat = () => {
        setCurrentChatId(null);
    };

    // =========================
    // AUTO SAVE EFFECTS
    // =========================

    useEffect(() => {
        if (isChatsLoaded) {
            saveChats(chats);
        }
    }, [chats, isChatsLoaded]);

    useEffect(() => {
        savePersonality(personality);
    }, [personality]);

    // =========================
    // CONTEXT VALUE
    // =========================

    const value = {
        chats,
        currentChatId,
        setCurrentChatId,
        currentChatIdRef,
        updateChatTitle,
        deleteChat,
        isChatsLoaded,
        
        messages,
        setMessages,

        loading,
        setLoading,

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