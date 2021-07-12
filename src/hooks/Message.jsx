import React from "react";

const Message = ({ text }) => {
    const styles = {
        zIndex: 1000,
        background: "#393E46",
        position: "absolute",
        bottom: "70px",
        left: "50%",
        transform: "translate(-50%, 0%)",
        padding: "8px",
        color: "#fff",
        borderRadius: "4px"
    }

    return (
        <div className="message" style={styles}>
            <span>{text}</span>
        </div>
    )
}

export default Message;