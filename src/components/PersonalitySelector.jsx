import React from "react";
import { useChat } from "../context/ChatContext";

function PersonalitySelector() {

    const { personality, setPersonality } = useChat();

    return (

        <div
            style={{
                marginTop: "15px",
                width: "100%"
            }}
        >

            {/* TITLE */}
            <p
                style={{
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "var(--text)"
                }}
            >
                Select Personality Mode
            </p>

            {/* DROPDOWN */}
            <select
                value={personality}
                onChange={(e) =>
                    setPersonality(e.target.value)
                }
                style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",

                    background: "var(--button-bg)",
                    color: "var(--button-text)",

                    border: "1px solid rgba(255,255,255,0.08)",

                    outline: "none",

                    fontSize: "14px",

                    cursor: "pointer"
                }}
            >

                <option value="friendly">
                    Friendly
                </option>

                <option value="professional">
                    Professional
                </option>

                <option value="teacher">
                    Teacher
                </option>

                <option value="motivational">
                    Motivational
                </option>

                <option value="funny">
                    Funny
                </option>

                <option value="medical">
                    Medical Assistant
                </option>

            </select>

        </div>
    );
}

export default PersonalitySelector;