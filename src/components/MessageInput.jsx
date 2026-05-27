import React from "react";
import VoiceInput from "./VoiceInput";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";

function MessageInput({
    message,
    setMessage,
    handleSendMessage,
    loading
}) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="composer"
        >
            <textarea
                placeholder="Ask anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                className="composer-input"
            />

            <VoiceInput setMessage={setMessage} />

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!message.trim() || loading}
                className="icon-button icon-button-primary"
                aria-label="Send message"
            >
                <FiSend />
            </motion.button>
        </motion.div>
    );
}

export default MessageInput;
