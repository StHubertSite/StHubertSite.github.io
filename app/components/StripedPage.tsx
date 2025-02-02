import React from "react";
import TransparentBackButton from "./TransparentBackButton";

interface StripedPageProps {
  handleBack: () => void;
}

const StripedPage: React.FC<StripedPageProps> = ({ handleBack }) => {
  return (
    <div className="striped-page-container">
      <div className="striped-page-wrapper">
        <div className="striped-page">
          {" "}
          <div>
            <TransparentBackButton onClick={handleBack} text={"Back"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripedPage;
