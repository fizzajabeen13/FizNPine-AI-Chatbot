import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef
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
    // STATES
    // =========================

    const [chats, setChats] = useState([]);
    const [isChatsLoaded, setIsChatsLoaded] = useState(false);

    // active chat id handled ONLY via ref (no ESLint issues)
    const currentChatIdRef = useRef(null);

    // =========================
    // LOAD CHATS
    // =========================

    useEffect(() => {
        loadChats().then(loadedChats => {
            const data = loadedChats || [];
            setChats(data);

            if (data.length > 0) {
                currentChatIdRef.current = data[0].id;
            }

            setIsChatsLoaded(true);
        });
    }, []);

    // keep ref synced (if needed externally)
    const [forceUpdateKey, setForceUpdateKey] = useState(0);

    // =========================
    // PERSONALITY
    // =========================

    const [personality, setPersonality] = useState(() => {
        return loadPersonality() || "friendly";
    });

    // =========================
    // COMPUTED
    // =========================

    const currentChat = chats.find(
        c => c.id === currentChatIdRef.current
    );

    const messages = currentChat ? currentChat.messages : [];

    // =========================
    // SET MESSAGES
    // =========================

    const setMessages = (newMessages) => {
        setChats(prevChats => {

            const activeId = currentChatIdRef.current;

            const currentChatObj = prevChats.find(c => c.id === activeId);
            const currentMessagesList = currentChatObj ? currentChatObj.messages : [];

            const evaluatedMessages =
                typeof newMessages === "function"
                    ? newMessages(currentMessagesList)
                    : newMessages;

            // NEW CHAT
            if (!activeId) {
                const newId = Date.now().toString();

                currentChatIdRef.current = newId;

                return [
                    {
                        id: newId,
                        title: "Generating title...",
                        messages: evaluatedMessages
                    },
                    ...prevChats
                ];
            }

            // UPDATE EXISTING CHAT
            return prevChats.map(c => {
                if (c.id === activeId) {
                    return { ...c, messages: evaluatedMessages };
                }
                return c;
            });
        });
    };

    // =========================
    // UPDATE TITLE
    // =========================

    const updateChatTitle = (id, newTitle) => {
        setChats(prevChats =>
            prevChats.map(c =>
                c.id === id ? { ...c, title: newTitle } : c
            )
        );
    };

    // =========================
    // DELETE CHAT
    // =========================

    const deleteChat = (id) => {
        setChats(prevChats => {
            const updated = prevChats.filter(c => c.id !== id);

            if (id === currentChatIdRef.current) {
                currentChatIdRef.current =
                    updated.length > 0 ? updated[0].id : null;
            }

            return updated;
        });
    };

    // =========================
    // NEW CHAT
    // =========================

    const startNewChat = () => {
        currentChatIdRef.current = null;
        forceUpdate(n => n + 1); // force UI refresh if needed
    };

    // =========================
    // AUTO SAVE
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

        currentChatIdRef,

        updateChatTitle,
        deleteChat,
        startNewChat,

        isChatsLoaded,

        messages,
        setMessages,

        personality,
        setPersonality
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext;