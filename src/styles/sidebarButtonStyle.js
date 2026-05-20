export const sidebarButtonStyle = {
    width: "100%",
    height: "44px",   // ✅ FORCE SAME SIZE
    minHeight: "44px",

    display: "flex",
    alignItems: "center",
    gap: "10px",

    padding: "0 14px",

    marginTop: "10px",

    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",

    background: "var(--button-bg)",
    color: "var(--button-text)",

    fontSize: "14px",
    fontWeight: "500",

    cursor: "pointer",

    transition: "all 0.2s ease",

    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",

    backdropFilter: "blur(10px)",

    justifyContent: "flex-start",

    boxSizing: "border-box"
};

export const sidebarButtonHover = (e) => {
    e.currentTarget.style.transform = "translateX(4px)";
};

export const sidebarButtonLeave = (e) => {
    e.currentTarget.style.transform = "translateX(0px)";
};

/* ✅ NEW ADDITIONS (FIX FOR YOUR ERROR) */

export const sidebarInputStyle = {
    width: "100%",
    height: "44px",

    padding: "0 40px 0 14px", // space for icon

    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.10)",

    background: "var(--button-bg)",

    color: "var(--button-text)",

    outline: "none",

    fontSize: "14px",

    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",

    backdropFilter: "blur(10px)",

    boxSizing: "border-box"
};

export const sidebarResultItemStyle = {
    padding: "10px",
    marginTop: "5px",

    borderRadius: "8px",

    background: "var(--button-bg)",
    color: "var(--button-text)",

    fontSize: "13px",

    cursor: "pointer",
    transition: "0.2s"
};

export const sidebarInputWrapperStyle = {
    width: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center"
};

export const sidebarIconStyle = {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--button-text)",
    fontSize: "16px",
    pointerEvents: "none"
};