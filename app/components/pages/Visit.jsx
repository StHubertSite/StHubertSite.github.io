import React from "react";
import "./pages.css";

const BenchGrad = ({}) => {
  document.getElementById("PageTitle").innerText = "I love you so much Olivia!";

  return (
    <div className="visit-container">
      <div className="cards-grid">
        <div className="card-column">
          <div className="card">
            <h2>Your beauty is like a flower.</h2>
            <p>A little flower that is delicate and perfect.</p>
            <img
              src="JoshAndOlivia/Visit/2024-04-22-0242-flower.jpg"
              alt="Image 1"
            />
            <p>
              There is something so sweet about you.
              <br />
              Would you be mine forever?
              <br />I promise to shower you with love everyday
            </p>
          </div>
        </div>
        <div className="card-column">
          <div className="card">
            <h2>Olivia, There isn't anything I would not do for you!</h2>
            <p>
              Your life is so precious and everyday I simply want to love you.
              <br />
              It was simply wonderful visiting your house for the first time.
              <br />
              Taking walks, going to Mass, praying, smiling, laughing, and
              sharing our lives,
              <br />I want to do it all with you.
            </p>
          </div>

          <div className="card">
            <h2>Header</h2>
            <p>Text</p>
          </div>
        </div>
        <div className="card-column">
          <div className="card">
            <h2>Your smile is incredible!</h2>

            <p>
              You shine like the sun and bring so much joy to those around you!
              <br />I want to spend every sunset by your side.
            </p>
            <img
              src="JoshAndOlivia/Visit/06-10-23-0167-sunset.jpg"
              alt="Image 3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchGrad;
