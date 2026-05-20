import React from "react";
import VoiceOutput from "./VoiceOutput";
import { motion } from "framer-motion";

function MessageBubble({ sender, text }) {

    const isUser = sender === "user";

    return (

        <div
            style={{
                marginBottom: "15px",
                textAlign: isUser ? "right" : "left"
            }}
        >

            {/* Voice output for AI only */}
            {!isUser && (
                <VoiceOutput text={text} />
            )}

            {/* Animated Bubble */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}

                style={{

                    position: "relative",

                    display: "inline-block",

                    maxWidth: "70%",

                    padding: "14px 18px",

                    borderRadius: "18px",

                    background: isUser
                        ? "var(--user-bubble)"
                        : "var(--ai-bubble)",

                    color: "var(--text)",

                    boxShadow:
                        "0 4px 12px rgba(0,0,0,0.2)",

                    border:
                        "1px solid rgba(255,255,255,0.08)",

                    wordWrap: "break-word",

                    whiteSpace: "pre-wrap",

                    fontSize: "15px",

                    lineHeight: "1.5",

                    backdropFilter: "blur(10px)"
                }}
            >

                {/* MESSAGE TAIL */}
                <div
                    style={{
                        position: "absolute",

                        width: "14px",
                        height: "14px",

                        background: isUser
                            ? "var(--user-bubble)"
                            : "var(--ai-bubble)",

                        bottom: "12px",

                        transform: "rotate(45deg)",

                        right: isUser ? "-6px" : "auto",

                        left: !isUser ? "-6px" : "auto",

                        borderBottom:
                            "1px solid rgba(255,255,255,0.08)",

                        borderRight:
                            "1px solid rgba(255,255,255,0.08)"
                    }}
                />

                {/* MESSAGE TEXT */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 2
                    }}
                >
                    {text.replace(/BRBR/g, "\n")}
                </div>

            </motion.div>

        </div>
    );
}

export default MessageBubble;