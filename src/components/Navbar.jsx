import React from "react";
import Logo from "./Logo";

function Navbar() {
    return (
        <div style={{
            width: "100%",
            paddingBottom: "10px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            marginBottom: "15px"
        }}>

            <Logo />

        </div>
    );
}

export default Navbar;