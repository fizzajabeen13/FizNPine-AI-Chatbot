// ==============================
// CHAT STORAGE
// ==============================

// Save messages
export const saveMessages = (messages) => {
    localStorage.setItem(
        "fiznpine_messages",
        JSON.stringify(messages)
    );
};

// Load messages
export const loadMessages = () => {

    const data = localStorage.getItem(
        "fiznpine_messages"
    );

    return data ? JSON.parse(data) : [];
};

// ==============================
// THEME STORAGE
// ==============================

// Save theme
export const saveTheme = (theme) => {
    localStorage.setItem(
        "fiznpine_theme",
        theme
    );
};

// Load theme
export const loadTheme = () => {

    return (
        localStorage.getItem(
            "fiznpine_theme"
        ) || "light"
    );
};

// ==============================
// PERSONALITY STORAGE
// ==============================

// Save personality
export const savePersonality = (personality) => {
    localStorage.setItem(
        "fiznpine_personality",
        personality
    );
};

// Load personality
export const loadPersonality = () => {

    return (
        localStorage.getItem(
            "fiznpine_personality"
        ) || "friendly"
    );
};