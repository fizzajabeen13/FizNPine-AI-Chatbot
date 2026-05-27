import React, { useEffect, useState } from "react";

import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";
import NewChatButton from "../components/NewChatButton";
import SearchChats from "../components/SearchChats";
import PersonalitySelector from "../components/PersonalitySelector";
import ThemeToggle from "../components/ThemeToggle";
import Navbar from "../components/Navbar";

import {
    FiMenu,
    FiX
} from "react-icons/fi";

import { sendMessageToAI, generateChatTitle } from "../services/api";
import { useChat } from "../context/ChatContext";

function ChatPage() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const {
        messages,
        setMessages,
        updateChatTitle,
        personality
    } = useChat();

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);

            if (!mobile) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSendMessage = async () => {
        const currentMessage = message.trim();

        if (!currentMessage || loading) return;

        const userMessage = {
            sender: "user",
            text: currentMessage
        };

        setMessages((prev) => [
            ...prev,
            userMessage
        ]);

        setMessage("");
        setLoading(true);

        // Check if this is the first message in a newly created chat
        // (If messages.length === 0, the first message is being sent now)
        const isFirstMessage = messages.length === 0;

        try {
            // Asynchronously generate title if it's the first message, BEFORE main response
            if (isFirstMessage) {
                try {
                    const res = await generateChatTitle(currentMessage);
                    if (res && res.title && res.title !== "New Chat") {
                        const cleanTitle = res.title.replace(/^["']|["']$/g, '');
                        // Small delay to ensure currentChatIdRef has updated
                        setTimeout(() => {
                            const activeId = currentChatIdRef.current;
                            if (activeId) {
                                updateChatTitle(activeId, cleanTitle);
                            }
                        }, 200);
                    }
                } catch (err) {
                    console.error("Title generation failed", err);
                }
            }

            const response = await sendMessageToAI(
                currentMessage,
                personality
            );

            const aiMessage = {
                sender: "ai",
                text: response.reply || "I could not generate a response."
            };

            setMessages((prev) => [
                ...prev,
                aiMessage
            ]);

        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "Something went wrong. Please check the backend and try again."
                }
            ]);
        } finally {
            setLoading(false);
        }

        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className="chat-shell">
            {isMobile && (
                <button
                    className="mobile-menu-button"
                    aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                    onClick={() => setSidebarOpen((prev) => !prev)}
                >
                    {sidebarOpen ? <FiX /> : <FiMenu />}
                </button>
            )}

            {isMobile && sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`chat-sidebar ${isMobile && sidebarOpen ? "chat-sidebar-open" : ""}`}
            >
                <Navbar />

                <div className="sidebar-actions">
                    <NewChatButton />
                    <SearchChats />
                    <ThemeToggle />
                </div>
            </aside>

            <main className="chat-main">
                <div className="chat-scroll">
                    <div className="chat-header">
                        <PersonalitySelector />
                    </div>
                    <ChatBox
                        messages={messages}
                        loading={loading}
                    />
                </div>

                <div className="composer-wrap">
                    <MessageInput
                        message={message}
                        setMessage={setMessage}
                        handleSendMessage={handleSendMessage}
                        loading={loading}
                    />
                </div>
            </main>
        </div>
    );
}

export default ChatPage;
