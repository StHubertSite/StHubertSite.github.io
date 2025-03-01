import React from "react";
import "./pages.css";
import TransparentButtonComponent from "../TransparentButtonComponent";
import TransparentBackButton from "../TransparentBackButton";

const Laugh = ({ handleBack }) => {
  document.getElementById("PageTitle").innerText = "You are fun to be with!";

  const formalPictures = [
    "/JoshAndOlivia/Laugh/12-01-23-0001-formal.JPG",
    "/JoshAndOlivia/Laugh/12-01-23-0000-formal.JPG",
    "/JoshAndOlivia/Laugh/3dpVYDy-formal.GIF",
  ];

  let formalIndex = 0;

  const formal = () => {
    formalIndex = (formalIndex + 1) % formalPictures.length;
    document.getElementById("formal").src = formalPictures[formalIndex];
  };

  return (
    <div className="visit-container">
      <div className="cards-grid">
        <div className="card-column">
          <div className="card">
            <img src="/JoshAndOlivia/Laugh/09-01-23-0002-dance.JPG" />
            <h2>Olivia, you are so fun to dance with!</h2>
            <p>You always look beautiful in your dresses</p>
          </div>
          <div className="card">
            <h2>You showed me so much!</h2>
            <p>
              We went to Leonardo's for swing dancing many times and always had
              a blast! I loved our dates where I could take you out and we could
              share our evenings together.
              <br />
              <br />
              You did a fantastic job teaching me to dance! I really love
              twirling you around and dipping you!
              <br />
              <br />
              We drove and hour to Dayton so we could learn to waltz together!
              That was so fun!
            </p>
          </div>
        </div>
        <div className="card-column">
          <TransparentBackButton onClick={handleBack} text={"Back"} />
          <div className="card">
            <h2>Do you remember...</h2>
            <p>
              how I would stay with you in CODA before your lab practicals?
              <br />
              How I encouraged you to do your best?
              <br />
              <br />
            </p>
            <p>
              Do you remember how you wrote my cover letter for me in a single
              weekend?
              <br />
              And what a wonderful job you did?
              <br />
              <br />
              I am so thankful for you Olivia!
              <br />
              You are just so talented and smart!
              <br />
              The love you show me through your caring actions move me so
              deeply. I remember all the walks we took at the panhandle trail ub
              West Virginia. Sometimes we just needed a getaway! What fun we
              would have just talking and laughing!
            </p>
            <h2>You really are me best friend!</h2>
            <p>You are such a joy to be with!</p>
          </div>
          <div className="card">
            <h2>Ice Skating</h2>
            <p>
              You also taught me to ice skate!
              <br />
              I held you hand and you pulled me along. You are so graceful when
              you skate!
              <br />
              It is always fun to race you!
              <br />
              One time I nearly fell and grabbed onto you! I don't know how you
              saved either of us!
            </p>
          </div>
        </div>
        <div className="card-column">
          <div className="card">
            <img src="/JoshAndOlivia/Laugh/09-29-23-0058-walk.JPG" />
            <h2>I love taking walks with you</h2>
            <p>
              I always have so much fun talking with you.
              <br />
              Your smile is so adorable!
            </p>
          </div>

          <div className="card">
            <img
              id="formal"
              src="/JoshAndOlivia/Laugh/12-01-23-0001-formal.JPG"
            />
            <TransparentButtonComponent
              onClick={formal}
              text={"???"}
              offsetY={"0"}
              offsetX={"0"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laugh;
