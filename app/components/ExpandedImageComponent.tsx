import React, { useState, useEffect } from "react";
import Image from "next/image";
import TransparentButton from "./TransparentButton";
import StripedPage from "./StripedPage";

interface ExpandedImageComponentProps {
  src: string;
  onBack: () => void;
}

const ExpandedImageComponent: React.FC<ExpandedImageComponentProps> = ({
  src,
  onBack,
}) => {
  const [back, setBack] = useState<boolean>(false);

  useEffect(() => {
    setBack(false);
  }, []);

  const handleBack = () => {
    setBack(true);
    setTimeout(() => {
      onBack();
    }, 500);
  };

  return (
    <div
      className="expanded-image-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        className="expand-image-wrapper"
        style={{
          animation: back
            ? "slideUp 1s ease-out forwards"
            : "slideDown 1s ease-out 0.5s forwards",
          position: "relative",
        }}
      >
        {/* Background image */}
        {/* Will fly in from top->down */}
        <Image
          className="expanded-image"
          src={src}
          alt={`Expanded Image`}
          draggable="false"
          width={500}
          height={100}
        />
        <div
          className="image-text"
          style={{
            position: "absolute",
            top: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "24px", // Increased font size
            fontWeight: "bold", // Added bold font weight for title
          }}
        >
          {src.replace("/", "").replace(".JPG", "")}
        </div>
      </div>
      <div
        className="striped-page-wrapper"
        style={{
          animation: back
            ? "slidePageDown 1s ease-out forwards"
            : "slidePageUp 1s ease-out 0.5s forwards",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 3,
        }}
      >
        <StripedPage back={back} />
        {/* Back button */}
        <TransparentButton onClick={handleBack} text={"Back"} />
      </div>
    </div>
  );
};

export default ExpandedImageComponent;
