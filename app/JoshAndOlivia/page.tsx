"use client";
import ImageTrackComponent from "../components/ImageTrackComponents";

const images = [
  {
    src: "/JoshAndOlivia/Visit.JPG",
    buttonText: "Two Young Lovers",
  },
  { src: "/JoshAndOlivia/RosaryCircle.JPG", buttonText: "Best Friends" },
  { src: "/JoshAndOlivia/Proposal.JPG", buttonText: "Will you..." },
  { src: "/JoshAndOlivia/Laugh.JPG", buttonText: "So Much Fun" },
  { src: "/JoshAndOlivia/Face.JPG", buttonText: "" },
  { src: "/JoshAndOlivia/BenchGrad.JPG", buttonText: "Sweet Heart" },
  { src: "/JoshAndOlivia/MackanacIsland.JPG", buttonText: "Mackinac Island" },
];

export default function Home() {
  return <ImageTrackComponent mainImages={images} />;
}
