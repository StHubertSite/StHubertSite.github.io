"use client";
import ImageTrackComponent from "../components/ImageTrackComponents";

const images = [
  "/JoshAndOlivia/Visit.JPG",
  "/JoshAndOlivia/RosaryCircle.JPG",
  "/JoshAndOlivia/Proposal.JPG",
  "/JoshAndOlivia/Laugh.JPG",
  "/JoshAndOlivia/Face.JPG",
  "/JoshAndOlivia/BenchGrad.JPG",
  "/JoshAndOlivia/MackanacIsland.JPG",
];

export default function Home() {
  return <ImageTrackComponent mainImages={images} />;
}
