import React, { useState } from "react";
import { startListening, stopListening } from "../services/speechService";
import { FiMic } from "react-icons/fi";

function VoiceInput({ setMessage }) {

    const [listening, setListening] = useState(false);

    // Start voice input
    const handleStart = () => {

        setListening(true);

        startListening(
            (text) => {
                setMessage(text);
                setListening(false);
            },
            () => {
                setListening(false);
            }
        );
    };

    // Stop voice input
    const handleStop = () => {
        stopListening();
        setListening(false);
    };

    const baseStyle = {
        height: "46px",
        minWidth: "46px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        border: "none",
        borderRadius: "10px",

        color: "var(--button-text)",
        background: "var(--button-bg)",

        cursor: "pointer",

        boxShadow: "0 4px 12px rgba(37,99,235,0.25)",

        transition: "all 0.2s ease",
        fontSize: "16px"
    };

    return (

        <div
            style={{
                display: "flex",
                alignItems: "center"
            }}
        >

            {!listening ? (

                <button
                    onClick={handleStart}
                    style={baseStyle}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                    }
                >
                    <FiMic size={18} />
                </button>

            ) : (

                <button
                    onClick={handleStop}
                    style={{
                        ...baseStyle,
                        background: "var(--button-bg)",
                        border: "1px solid var(--button-text)",
                        color: "var(--button-text)"
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                    }
                >
                    ⏹
                </button>

            )}

        </div>
    );
}

export default VoiceInput;