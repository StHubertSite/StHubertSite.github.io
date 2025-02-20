"use client";
import ImageTrackComponent from "./components/ImageTrackComponents";

const images = [
  {
    src: "/2023-07-30-0168.JPG",
    buttonText: "",
  },
  {
    src: "/2023-07-30-0231.JPG",
    buttonText: "",
  },
  {
    src: "/2023-07-30-0227.JPG",
    buttonText: "",
  },
  {
    src: "/2024-09-17-0005.JPG",
    buttonText: "",
  },
  {
    src: "/2023-07-30-0265.JPG",
    buttonText: "",
  },
  {
    src: "/SteelCross.JPG",
    buttonText: "",
  },
];

export default function Home() {
  return <ImageTrackComponent mainImages={images} />;
}
