import React from "react";

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
      <button onClick={onBack} className="back-button">
        Back
      </button>
      <img src={src} alt="Expanded" className="expanded-image" />
    </div>
  );
};

export default ExpandedImageComponent;
