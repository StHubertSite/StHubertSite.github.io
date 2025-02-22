import React from "react";
import "./pages.css";
import TransparentBackButton from "../TransparentBackButton";

const Sweetheart = ({ handleBack }) => {
  document.getElementById("PageTitle").innerText = "Olivia's Graduation";

  return (
    <div className="visit-container">
      <div className="cards-grid">
        <div className="card-column">
          <div className="card">
            <h2>You are just so CUTE!</h2>
          </div>
          <div className="card">
            <img src="/JoshAndOlivia/Sweetheart/2024-07-04-0013-flower.JPG" />
          </div>
        </div>
        <div className="card-column">
          <TransparentBackButton onClick={handleBack} text={"Back"} />
          <div className="card">
            <img src="/JoshAndOlivia/Sweetheart/07-03-23-0006-flower.JPG" />
          </div>
        </div>
        <div className="card-column">
          <div className="card">
            <img src="/JoshAndOlivia/Sweetheart/2024-04-07-0024-flower.JPG" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sweetheart;
