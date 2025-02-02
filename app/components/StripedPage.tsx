import React from "react";

interface StripedPageProps {
  back: boolean;
}

const StripedPage: React.FC<StripedPageProps> = ({ back }) => {
  return (
    <div className="striped-page-container">
      <div className="striped-page-wrapper">
        <div className="striped-page" />
      </div>
    </div>
  );
};

export default StripedPage;
