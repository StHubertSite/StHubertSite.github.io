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
    endFrame: 150,
    folderName: "Toadhouse",
  },
];

const generateImagesForModel = (model: ModelConfig) => {
  const images = [];
  for (let i = model.startFrame; i <= model.endFrame; i++) {
    images.push({
      src: `/${model.folderName}/${i.toString().padStart(4, "0")}.PNG`,
      buttonText: model.name,
    });
  }
  return images;
};

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      {models.map((model) => (
        <div key={model.name} className="model-container">
          <ImageTrackComponent
            mainImages={generateImagesForModel(model)}
            modelId={model.folderName}
          />
        </div>
      ))}
    </div>
  );
}
