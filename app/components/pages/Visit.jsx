import React from "react";
import "./pages.css";
import TransparentButtonComponent from "../TransparentButtonComponent";
import TransparentBackButton from "../TransparentBackButton";

const BenchGrad = ({ handleBack }) => {
  document.getElementById("PageTitle").innerText = "I love you so much Olivia!";

  const handleSoMuch = () => {
    const loveTextElement = document.getElementById("i-love-you-text");

    let numberOfSo = (loveTextElement.innerHTML.match(/so/g) || []).length || 0;
    if (numberOfSo <= 0) {
      numberOfSo = 1;
    }

    loveTextElement.innerHTML = `<h2>I love you ${"so ".repeat(
      numberOfSo + 1
    )}much!</h2>`;
  };

  return (
    <div className="visit-container">
      <div className="cards-grid">
        <div className="card-column">
          <div className="card">
            <h2>Your beauty is like a flower.</h2>
            <p>A little flower that is delicate and perfect.</p>
            <img src="JoshAndOlivia/Visit/2024-04-22-0242-flower.jpg" />
            <p>
              There is something so sweet about you.
              <br />
              Would you be mine forever?
              <br />I promise to shower you with love everyday
            </p>
          </div>
        </div>
        <div className="card-column">
          <TransparentBackButton onClick={handleBack} text={"Back"} />
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
            <h2>Might we be lovers forever?</h2>
            <img src="JoshAndOlivia/Visit/06-07-23-0105-hay.jpg" />
            <TransparentButtonComponent
              onClick={handleSoMuch}
              text={"???"}
              offsetY={"-100px"}
              offsetX={"0"}
            />
            <p id="i-love-you-text">I love you!</p>
          </div>
        </div>
        <div className="card-column">
          <div className="card">
            <h2>Your smile is incredible!</h2>

            <p>
              You shine like the sun and bring so much joy to those around you!
              <br />I want to spend every sunset by your side.
            </p>
            <img src="JoshAndOlivia/Visit/06-10-23-0167-sunset.jpg" />
          </div>

          <div className="card">
            <h2>Accept my heart</h2>
            <img src="JoshAndOlivia/Visit/2024-06-08-0009-card.JPG" />
            <p>
              Our relationship is such a unique gift and I am forever thanking
              God for you.
              <br />
              He has planned things out so wonderfully.
              <br />
              All of you cards are so sweet and just an incredible showcase of
              your love!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchGrad;
