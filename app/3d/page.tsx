"use client";
import ImageTrackComponent from "./ImageTrack3d";

interface ModelConfig {
  name: string;
  startFrame: number;
  endFrame: number;
  folderName: string;
}

const models: ModelConfig[] = [
  {
    name: "Toad House",
    startFrame: 50,
    endFrame: 149,
    folderName: "Toadhouse",
  },
];

export default function Home() {
  return <ImageTrackComponent models={models} />;
}
