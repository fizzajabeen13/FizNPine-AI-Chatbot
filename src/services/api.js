import axios from "axios";

// Create axios instance
const API = axios.create({
    baseURL: "http://localhost:5000/api",
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