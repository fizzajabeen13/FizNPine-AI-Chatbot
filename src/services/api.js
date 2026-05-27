import axios from "axios";

// Create axios instance
const API = axios.create({
    baseURL: "https://fiz-n-pine-ai-1ptd.vercel.app/api",
});

// Send message to backend
export const sendMessageToAI = async (message, personality) => {
    try {
        const response = await API.post("/chat", {
            message,
            personality
        });

        return response.data;

    } catch (error) {
        console.error("API Error:", error);

        return {
            success: false,
            reply: "Server not responding"
        };
    }
};
export const generateChatTitle = (message) => {
  return message.length > 30
    ? message.substring(0, 30) + "..."
    : message;
};

const API_URL = import.meta.env.VITE_API_URL;

export const sendMessage = async (msg) => {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: msg }),
  });

  return res.json();
};