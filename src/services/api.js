// API base URL from environment (Vercel)
const API_URL = import.meta.env.VITE_API_URL;

// =============================
// SEND MESSAGE TO AI
// =============================
export const sendMessageToAI = async (message, personality) => {
    try {
        const res = await fetch(`${API_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
                personality
            }),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();

    } catch (error) {
        console.error("API Error:", error);

        return {
            success: false,
            reply: "Server not responding"
        };
    }
};

// =============================
// CHAT TITLE GENERATOR
// =============================
export const generateChatTitle = (message) => {
    return message.length > 30
        ? message.substring(0, 30) + "..."
        : message;
};