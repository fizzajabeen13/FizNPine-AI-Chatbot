import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import Loader from "./Loader";
import { useChat } from "../context/ChatContext";

function ChatBox({ messages, loading }) {
    const { personality } = useChat();
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, loading]);

    return (
        <div className="chat-thread">
            {messages.length === 0 ? (
                <section className="empty-state">
                    <div className="empty-logo">F</div>
                    <h1>How can I help with your school project today?</h1>
                    <p>
                        Ask a question, or use voice input to start a conversation.
                        <br /><br />
                        <span className="personality-badge">
                            Current Personality: <strong>{personality ? personality.charAt(0).toUpperCase() + personality.slice(1) : "Friendly"}</strong>
                        </span>
                    </p>
                </section>
            ) : (
                messages.map((msg, index) => (
                    <MessageBubble
                        key={`${msg.sender}-${index}`}
                        sender={msg.sender}
                        text={msg.text}
                    />
                ))
            )}

            {loading && <Loader />}

            <div ref={bottomRef}></div>
        </div>
    );
}

export default ChatBox;
