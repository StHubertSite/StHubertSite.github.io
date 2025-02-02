import React, { useState, useEffect } from "react";
import Image from "next/image";
import TransparentButton from "./TransparentButton";

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
    <div className="expanded-image-container">
      <div
        className="expand-image-wrapper"
        style={{
          animation: back
            ? "slideUp 0.5s ease-out forwards"
            : "slideDown 0.5s ease-out 0.5s forwards",
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
        {/* Back button */}
        <TransparentButton onClick={handleBack} text={"Back"} />
      </div>
    </div>
  );
};

export default ExpandedImageComponent;
