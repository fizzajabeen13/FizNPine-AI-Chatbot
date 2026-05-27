import React, { useState } from "react";
import { speakText, stopSpeaking } from "../services/speechService";
import { FiStopCircle, FiVolume2 } from "react-icons/fi";

function VoiceOutput({ text }) {
    const [speaking, setSpeaking] = useState(false);

    const handleSpeak = () => {
        if (!text) return;

        setSpeaking(true);
        speakText(text);

        setTimeout(() => {
            setSpeaking(false);
        }, 3000);
    };

    const handleStop = () => {
        stopSpeaking();
        setSpeaking(false);
    };

    return (
        <div className="voice-output">
            {!speaking ? (
                <button
                    onClick={handleSpeak}
                    className="voice-output-button"
                >
                    <FiVolume2 size={18} />
                    Read Aloud
                </button>
            ) : (
                <button
                    onClick={handleStop}
                    className="voice-output-button"
                >
                    <FiStopCircle size={18} />
                    Stop
                </button>
            )}
        </div>
    );
}

export default VoiceOutput;
