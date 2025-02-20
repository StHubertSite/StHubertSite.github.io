import React from "react";

interface TransparentButtonProps {
  onClick: () => void; // Define onClick as a function with no arguments and no return
  text: string; // Define text as a string
}

const TransparentButton: React.FC<TransparentButtonProps> = ({
  onClick,
  text,
}) => {
  return (
    <button
      className="text-gray-800 font-semibold py-2 px-4 rounded shadow"
      style={{
        width: "9rem",
        height: "3rem",
        position: "absolute",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(8px)",
        color: "black",
        border: "none",
        transition: "transform 0.2s ease, background-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        e.currentTarget.style.transform = "translateX(-50%) scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        e.currentTarget.style.transform = "translateX(-50%) scale(1)";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translateX(-50%) scale(0.95)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "translateX(-50%) scale(1.1)";
      }}
      onClick={onClick}
    >
      <p
        style={{
          fontWeight: "bold",
          textAlign: "center",
          margin: 0,
          position: "relative",
          top: text.length > 15 ? "-0.3rem" : "0", // Adjust top offset based on text length
        }}
      >
        {text}
      </p>
    </button>
  );
};

export default TransparentButton;
