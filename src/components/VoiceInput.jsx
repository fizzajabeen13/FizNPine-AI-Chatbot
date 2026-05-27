import React, { useState } from "react";
import { startListening, stopListening } from "../services/speechService";
import { FiMic, FiSquare } from "react-icons/fi";

function VoiceInput({ setMessage }) {
    const [listening, setListening] = useState(false);

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

    const handleStop = () => {
        stopListening();
        setListening(false);
    };

    return (
        <div className="voice-input">
            {!listening ? (
                <button
                    onClick={handleStart}
                    className="icon-button"
                    aria-label="Start voice input"
                >
                    <FiMic size={18} />
                </button>
            ) : (
                <button
                    onClick={handleStop}
                    className="icon-button icon-button-active"
                    aria-label="Stop voice input"
                >
                    <FiSquare size={16} />
                </button>
            )}
        </div>
    );
}

export default VoiceInput;
