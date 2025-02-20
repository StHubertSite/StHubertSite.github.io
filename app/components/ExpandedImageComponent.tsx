import React, { useState, useEffect } from "react";
import Image from "next/image";

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
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "auto",
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
        <div id="PageTitle" className="image-text title">
          {src.replace("/", "").replace(".JPG", "")}
        </div>
      </div>
      {/* Striped Page */}
      {/* Will fly in from bottom->top */}
      <div
        className="striped-page-wrapper"
        style={{
          animation: back
            ? "slidePageDown 1s ease-out forwards"
            : "slidePageUp 1s ease-out 0.5s forwards",
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: "50%",
          zIndex: 3,
        }}
      >
        <StripedPage
          handleBack={handleBack}
          componentName={src.split("/").pop()?.replace(".JPG", "") || ""}
        />
      </div>
    </div>
  );
};

export default ExpandedImageComponent;
