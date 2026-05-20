import React, { useState } from "react";
import { speakText, stopSpeaking } from "../services/speechService";
import {
    sidebarButtonStyle,
    sidebarButtonHover,
    sidebarButtonLeave
} from "../styles/sidebarButtonStyle";

import { FiVolume2, FiStopCircle } from "react-icons/fi";

function VoiceOutput({ text }) {

    const [speaking, setSpeaking] = useState(false);

    // Speak AI response
    const handleSpeak = () => {

        if (!text) return;

        setSpeaking(true);

        speakText(text);

        // Auto reset (simple fallback)
        setTimeout(() => {
            setSpeaking(false);
        }, 3000);
    };

    // Stop speaking
    const handleStop = () => {
        stopSpeaking();
        setSpeaking(false);
    };

    return (

        <div style={{ marginTop: "8px" }}>

            {!speaking ? (

                <button
                    onClick={handleSpeak}
                    style={{
                        ...sidebarButtonStyle,
                        height: "36px",
                        fontSize: "13px",
                        gap: "8px",
                        width: "130px"
                    }}
                    onMouseEnter={sidebarButtonHover}
                    onMouseLeave={sidebarButtonLeave}
                >
                    <FiVolume2 size={18} />
                    Read Aloud
                </button>

            ) : (

                <button
                    onClick={handleStop}
                    style={{
                        ...sidebarButtonStyle,
                        height: "36px",
                        fontSize: "13px",
                        gap: "8px",
                        background: "var(--button-bg)",
                        border: "1px solid var(--button-text)",
                        color: "var(--button-text)",
                        width: "130px"
                    }}
                    onMouseEnter={sidebarButtonHover}
                    onMouseLeave={sidebarButtonLeave}
                >
                    <FiStopCircle size={18} />
                    Stop
                </button>

            )}

        </div>
    );
}

export default VoiceOutput;