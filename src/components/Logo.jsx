import React from "react";

function Logo() {

    return (

        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            marginBottom: "25px",
            alignItems: "center"
        }}>

            {/* LOGO IMAGE */}
            <img
                src="/logo.svg"
                alt="FizNPine AI Logo"
                style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "contain"
                }}
            />

            {/* LOGO TITLE */}
            <h2 style={{
                margin: 0,
                padding: 0,
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "1.2",
                background: "var(--text)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
            }}>
                FizNPine AI
            </h2>

            {/* TAGLINE */}
            <p style={{
                margin: 0,
                padding: 0,
                fontSize: "13px",
                color: "var(--text)",
                lineHeight: "1.4"
            }}>
                Smart AI for learning & creativity
            </p>

        </div>
    );
}

export default Logo;