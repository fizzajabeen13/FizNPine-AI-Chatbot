import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChatProvider } from "./context/ChatContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/global.css";
import "./styles/responsive.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
    <React.StrictMode>
        <ThemeProvider>
            <ChatProvider>
                <App />
            </ChatProvider>
        </ThemeProvider>
    </React.StrictMode>
);