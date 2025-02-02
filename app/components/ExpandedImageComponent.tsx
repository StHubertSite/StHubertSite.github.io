import React from "react";
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
  return (
    <div className="expanded-image-container">
      {/* Back button */}
      <TransparentButton onClick={onBack} text={"Back"} />

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
    </div>
  );
};

export default ExpandedImageComponent;
