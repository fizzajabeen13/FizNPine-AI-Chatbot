import React from "react";
import VoiceInput from "./VoiceInput";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";

function MessageInput({
    message,
    setMessage,
    handleSendMessage
}) {

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (

        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="glass input-bar"
            style={{
                display: "flex",
                padding: "15px",
                margin: "10px",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap"
            }}
        >

            {/* INPUT */}
            <input
                type="text"
                placeholder="Ask anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "8px",
                    outline: "none",
                    fontSize: "16px",
                    background: "var(--input-bg)",
                    color: "var(--text)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    placeholderTextColor: "var(--text)"
                }}
            />

            {/* VOICE INPUT */}
            <VoiceInput setMessage={setMessage} />

            {/* SEND BUTTON (ANIMATED) */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                style={{
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: "8px",
                    color: "var(--button-text)",
                    cursor: "pointer",
                    fontSize: "18px",
                    background: "var(--button-bg)",
                    boxShadow: "0 4px 12px rgba(37,99,235,0.4)",
                    transition: "0.2s"
                }}
                whileHover={{
                  scale: 1.05
                }}

                whileTap={{
                  scale: 0.95
                }}
            >
                <FiSend />
            </motion.button>

        </motion.div>
    );
}

export default MessageInput;