import React from "react";

function Loader() {

    return (

        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px"
        }}>

            {/* Spinner */}
            <div style={{
                width: "25px",
                height: "25px",
                border: "3px solid var(--text)",
                borderTop: "3px solid var(--button-bg)",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
            }} />

            <span style={{ marginLeft: "10px", color: "var(--text)" }}>
                Thinking...
            </span>

        </div>
    );
}

export default Loader;