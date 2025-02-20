import React from "react";

interface TransparentBackButtonProps {
  onClick: () => void; // Define onClick as a function with no arguments and no return
  text: string; // Define text as a string
}

const TransparentBackButton: React.FC<TransparentBackButtonProps> = ({
  onClick,
  text,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        className="text-gray-800 font-semibold py-2 px-4 rounded shadow"
        style={{
          width: "9rem",
          height: "3rem",
          marginTop: "0.5rem",
          marginBottom: "1rem",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(2px)", //used to be 8px
          color: "black",
          border: "none",
          transition: "transform 0.2s ease, background-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
          e.currentTarget.style.transform = "scale(1)";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.95)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default TransparentBackButton;
