import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function ChatBox({ messages }) {

    const bottomRef = useRef(null);

    // ✅ Correct place for debugging
    console.log("ALL MESSAGES:", messages);

    // Auto-scroll whenever messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    return (
        <div style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            background: "var(--bg)"
        }}>

            {/* Messages */}
            {messages.map((msg, index) => (
                <MessageBubble
                    key={index}
                    sender={msg.sender}
                    text={msg.text}
                />
            ))}

            {/* Auto scroll anchor */}
            <div ref={bottomRef}></div>

        </div>
    );
}

export default ChatBox;