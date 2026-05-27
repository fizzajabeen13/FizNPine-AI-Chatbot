import React from "react";

function Logo() {
    return (
        <div className="logo">
            <img
                src="/logo.svg"
                alt="FizNPine AI Logo"
                className="logo-mark"
            />

            <div>
                <h2 className="logo-title">
                    FizNPine AI
                </h2>
                <p className="logo-tagline">
                    Smart AI for learning and creativity
                </p>
            </div>
        </div>
    );
}

export default Logo;
