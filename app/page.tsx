"use client";
import ImageTrackComponent from "./components/ImageTrackComponents";

const images = [
  "/2023-07-30-0168.JPG",
  "/2023-07-30-0231.JPG",
  "/2023-07-30-0227.JPG",
  "/2024-09-17-0005.JPG",
  "/2023-07-30-0265.JPG",
  "/SteelCross.JPG",
];

export default function Home() {
  return <ImageTrackComponent mainImages={images} />;
}
