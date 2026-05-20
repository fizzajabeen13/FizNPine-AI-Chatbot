import React, { useState, useEffect } from "react";

import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";
import NewChatButton from "../components/NewChatButton";
import SearchChats from "../components/SearchChats";
import PersonalitySelector from "../components/PersonalitySelector";
import ThemeToggle from "../components/ThemeToggle";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

import {
    FiMenu,
    FiX
} from "react-icons/fi";

import { motion } from "framer-motion";

import { sendMessageToAI } from "../services/api";
import { useChat } from "../context/ChatContext";

function ChatPage() {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [isMobile, setIsMobile] = useState(
        window.innerWidth <= 768
    );

    const {
        messages,
        setMessages,
        personality
    } = useChat();

    // =========================
    // RESPONSIVE CHECK
    // =========================

    useEffect(() => {

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener(
            "resize",
            handleResize
        );

        return () =>
            window.removeEventListener(
                "resize",
                handleResize
            );

    }, []);

    // =========================
    // SEND MESSAGE
    // =========================

    const handleSendMessage = async () => {

        if (!message.trim()) return;

        const userMessage = {
            sender: "user",
            text: message
        };

        setMessages(prev => [
            ...prev,
            userMessage
        ]);

        const currentMessage = message;

        setMessage("");

        setLoading(true);

        try {

            const response =
                await sendMessageToAI(
                    currentMessage,
                    personality
                );

            const aiMessage = {
                sender: "ai",
                text: response.reply
            };

            setMessages(prev => [
                ...prev,
                aiMessage
            ]);

        } catch (error) {

            console.log(error);

        }

        setLoading(false);

        // Auto close sidebar on mobile
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    return (

        <div
            style={{
                height: "100vh",
                overflow: "hidden",
                background: "var(--chat-bg)"
            }}
        >

            {/* =========================
                MOBILE HAMBURGER
            ========================= */}

            {isMobile && (

                <button
                    onClick={() =>
                        setSidebarOpen(prev => !prev)
                    }
                    style={{
                        position: "fixed",
                        top: "20px",
                        left: "20px",

                        zIndex: 3000,

                        background: "transparent",

                        border: "none",

                        color: "var(--text)",

                        fontSize: "28px",

                        cursor: "pointer"
                    }}
                >
                    {sidebarOpen
                        ? <FiX />
                        : <FiMenu />}
                </button>
            )}

            {/* =========================
                MOBILE OVERLAY
            ========================= */}

            {isMobile && sidebarOpen && (

                <div
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                    style={{
                        position: "fixed",
                        inset: 0,

                        background: "var(--sidebar-bg)",

                        opacity: 0.5,

                        zIndex: 1500
                    }}
                />
            )}

            {/* =========================
                SIDEBAR
            ========================= */}

            <motion.div

                animate={{
                    x: isMobile
                        ? (sidebarOpen ? 0 : -300)
                        : 0
                }}

                transition={{
                    duration: 0.25
                }}

                style={{

                    width: "220px",

                    height: "100vh",

                    background: "var(--sidebar-bg)",

                    backdropFilter: "blur(12px)",

                    borderRight:
                        "1px solid rgba(255,255,255,0.08)",

                    boxShadow:
                        "0 0 20px rgba(0,0,0,0.3)",

                    position: "fixed",

                    top: 0,

                    left: 0,

                    zIndex: 2000,

                    paddingTop: "70px",

                    paddingLeft: "20px",

                    paddingRight: "20px",

                    overflow: "hidden"
                }}
            >

                {/* BRANDING */}
                <Navbar />
                <div
                  style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginTop: "20px"
                }}
                >

                {/* SIDEBAR CONTENT */}
                <NewChatButton />

                <SearchChats />

                <PersonalitySelector />

                <ThemeToggle />
              </div>

            </motion.div>

            {/* =========================
                MAIN CHAT AREA
            ========================= */}

            <div
                style={{
                    marginLeft:
                        isMobile ? 0 : "260px",

                    width:
                        isMobile
                            ? "100%"
                            : "calc(100% - 260px)",

                    height: "100vh",

                    display: "flex",

                    flexDirection: "column",

                    background:
                        "var(--chat-bg)"
                }}
            >

                {/* CHAT SCROLL AREA */}

                <div
                    style={{
                        flex: 1,

                        overflowY: "auto",

                        padding: "2px",

                        paddingTop:
                            isMobile
                                ? "2px"
                                : "2px"
                    }}
                >

                    <ChatBox
                        messages={messages}
                    />

                    {loading && <Loader />}

                </div>

                {/* INPUT SECTION */}

                <div
                    style={{
                        padding: "10px"
                    }}
                >

                    <MessageInput
                        message={message}
                        setMessage={setMessage}
                        handleSendMessage={
                            handleSendMessage
                        }
                    />

                </div>

            </div>

        </div>
    );
}

export default ChatPage;