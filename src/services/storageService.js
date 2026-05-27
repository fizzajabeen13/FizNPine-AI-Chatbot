// ==============================
// INDEXED DB HELPER
// ==============================
const DB_NAME = "FizNPineDB";
const STORE_NAME = "chats";

const getDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
};

// Save all chats (Async)
export const saveChats = async (chats) => {
    try {
        const db = await getDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        store.put(chats, "fiznpine_chats");
        
        return new Promise((resolve, reject) => {
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    } catch (err) {
        console.error("Failed to save chats to IndexedDB", err);
    }
};

// Load all chats (Async)
export const loadChats = async () => {
    try {
        const db = await getDB();
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.get("fiznpine_chats");

        return new Promise((resolve) => {
            request.onsuccess = () => {
                if (request.result) {
                    resolve(request.result);
                } else {
                    // Migration: check localStorage
                    const oldData = localStorage.getItem("fiznpine_chats");
                    if (oldData) {
                        const parsed = JSON.parse(oldData);
                        resolve(parsed);
                        // Save to DB in background
                        saveChats(parsed);
                    } else {
                        // Migration from old messages
                        const oldMessages = localStorage.getItem("fiznpine_messages");
                        if (oldMessages) {
                            const parsedOld = JSON.parse(oldMessages);
                            if (parsedOld.length > 0) {
                                const oldChat = [{ id: Date.now().toString(), title: "Previous Chat", messages: parsedOld }];
                                resolve(oldChat);
                                saveChats(oldChat);
                                return;
                            }
                        }
                        resolve([]);
                    }
                }
            };
            request.onerror = () => {
                resolve([]);
            };
        });
    } catch (err) {
        console.error("Failed to load chats from IndexedDB", err);
        return [];
    }
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