import React from "react";
import { useChat } from "../context/ChatContext";

function PersonalitySelector() {
    const { personality, setPersonality } = useChat();

    return (
        <div className="field-group">
            <label className="field-label" htmlFor="personality-mode">
                Personality
            </label>

            <select
                id="personality-mode"
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                className="sidebar-select"
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
