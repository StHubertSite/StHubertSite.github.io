import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TransparentButton from "../components/TransparentButton";
import ExpandedImageComponent from "../components/ExpandedImageComponent";

const SENSITIVITY = 3;

const MIN = 0;
const MAX = 100;
const DURATION = 1200;
const ANIMATIONSPEED = 42; // ~24fps
interface ModelConfig {
  name: string;
  startFrame: number;
  endFrame: number;
  folderName: string;
}

interface ModelImageTrackProps {
  models: ModelConfig[];
}

const ImageTrackComponent = ({ models }: ModelImageTrackProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [currentFrames, setCurrentFrames] = useState<{ [key: string]: number }>(
    Object.fromEntries(models.map((model) => [model.folderName, 0]))
  );
  const [percentage, setPercentage] = useState<number>(MIN);
  const [mouseDownAt, setMouseDownAt] = useState<number>(0);

  // Generate images array for all models
  const allModelImages = models.map((model) => ({
    model,
    images: Array.from(
      { length: model.endFrame - model.startFrame + 1 },
      (_, i) => ({
        src: `/${model.folderName}/${(i + model.startFrame)
          .toString()
          .padStart(4, "0")}.png`,
        buttonText: model.name,
      })
    ),
  }));

  useEffect(() => {
    const intervals = models.map((model) => {
      return setInterval(() => {
        setCurrentFrames((prev) => ({
          ...prev,
          [model.folderName]:
            (prev[model.folderName] + 1) %
            (model.endFrame - model.startFrame + 1),
        }));
      }, ANIMATIONSPEED);
    });

    return () => intervals.forEach(clearInterval);
  }, [models]);

  useEffect(() => {
    // Div holding images
    const track = trackRef.current;

    const updateTrackAndImages = (duration: number) => {
      track?.animate(
        {
          transform: `translate(${percentage}%, -50%)`,
        },
        { duration: duration, fill: "forwards" }
      );

      // const images = track?.querySelectorAll("img");
      // if (images) {
      //   images.forEach((image) => {
      //     image.animate(
      //       {
      //         objectPosition: `${Math.round(percentage + 100)}% center`,
      //       },
      //       { duration: duration, fill: "forwards" }
      //     );
      //   });
      // }
    };

    const getExpandedImageFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const modelParam = params.get("folderName");
      if (modelParam) {
        const modelOBJ = models.find((model) =>
          model.folderName.includes(modelParam)
        );
        if (modelOBJ) {
          setExpandedImage(modelOBJ.folderName);
          const imageIndex = models.indexOf(modelOBJ);
          const numberofImages = models.length;
          setPercentage((-100 / numberofImages) * imageIndex - 10);
          updateTrackAndImages(DURATION / 3);
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (expandedImage) return;

      setMouseDownAt(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (expandedImage) return;
      if (!mouseDownAt || !track) return;

      const mouseDelta = mouseDownAt - e.clientX;
      const maxDelta = window.innerWidth / 2;

      let newPercentage = percentage + (mouseDelta / maxDelta) * -100;

      newPercentage = Math.min(newPercentage, -MIN);
      setPercentage(Math.max(newPercentage, -MAX));

      // Update mouseDownAt to continue smooth drag
      setMouseDownAt(e.clientX);
      updateTrackAndImages(DURATION);
    };

    const handleMouseUp = () => {
      setMouseDownAt(0);
    };

    const handleWheel = (e: WheelEvent) => {
      if (expandedImage) return;

      const isTrackpad = e.deltaMode === 0 && Math.abs(e.deltaY) < 100;

      let newPercentage = percentage;

      if (isTrackpad) {
        // Handle trackpad scroll
        if (e.deltaY !== 0) {
          newPercentage += e.deltaY > 0 ? -SENSITIVITY : SENSITIVITY; // Adjust sensitivity if needed
        } else if (e.deltaX !== 0) {
          newPercentage += e.deltaX > 0 ? -SENSITIVITY : SENSITIVITY; // Adjust sensitivity if needed
        }
      } else {
        // Handle scroll wheel
        if (e.deltaY !== 0) {
          newPercentage += e.deltaY > 0 ? -SENSITIVITY * 3 : SENSITIVITY * 3; // Adjust sensitivity if needed
        } else if (e.deltaX !== 0) {
          newPercentage += e.deltaX > 0 ? -SENSITIVITY * 3 : SENSITIVITY * 3; // Adjust sensitivity if needed
        }
      }

      newPercentage = Math.min(newPercentage, -MIN);
      setPercentage(Math.max(newPercentage, -MAX));

      updateTrackAndImages(DURATION);
    };

    // Attach event listeners
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("wheel", handleWheel);

    // Check URL for image query parameter
    getExpandedImageFromURL();

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [models, expandedImage, percentage, mouseDownAt, trackRef]);

  // Modify URL handling to include modelId
  const handleButtonClick = (folderName: string) => {
    if (expandedImage) return;
    setExpandedImage(folderName);
    const newUrl = `${window.location.pathname}?model=${folderName}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const handleBack = () => {
    setExpandedImage(null);
    window.history.pushState({}, "", window.location.pathname);
  };

  return (
    <div>
      {expandedImage && (
        <ExpandedImageComponent src={expandedImage} onBack={handleBack} />
      )}
      <div
        style={{
          zIndex: expandedImage ? -100 : 1,
          transition: expandedImage
            ? "none"
            : "opacity 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        }}
        ref={trackRef}
        id={"image-track"}
      >
        {allModelImages.map(({ model, images }) => (
          <div
            key={model.folderName}
            style={{
              position: "relative",
              display: "inline-block",
              marginRight: "10px",
              transition: "transform 0.5s ease",
              transform:
                expandedImage == model.folderName
                  ? "translateY(-100vh)"
                  : "translateY(0)",
            }}
          >
            {/* Image */}
            <Image
              src={images[currentFrames[model.folderName]].src}
              alt={`${model.folderName} Frame ${
                currentFrames[model.folderName]
              }`}
              width={400}
              height={400}
              loading="eager"
              style={{
                width: "400px",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
                pointerEvents: "none",
              }}
              draggable="false"
            />
            <div className="img-inset-shadow"></div>
            <TransparentButton
              onClick={() => handleButtonClick(model.folderName)}
              text={images[currentFrames[model.folderName]].buttonText || ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageTrackComponent;
