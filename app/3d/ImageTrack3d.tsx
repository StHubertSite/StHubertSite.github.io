import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TransparentButton from "../components/TransparentButton";
import ExpandedImageComponent from "../components/ExpandedImageComponent";

const SENSITIVITY = 3;

const MIN = 0;
const MAX = 100;
const DURATION = 1200;
const animationSpeed = 42; // ~24fps

interface ModelImageTrackProps {
  mainImages: { src: string; buttonText?: string }[];
  modelId: string; // Add modelId to track which model this is
}

const ImageTrackComponent = ({ mainImages, modelId }: ModelImageTrackProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Percentage of the track to show
  const [percentage, setPercentage] = useState<number>(MIN);

  // X coord of mouse when dragging
  const [mouseDownAt, setMouseDownAt] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % mainImages.length);
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [mainImages.length]);

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
      const imageParam = params.get("image");
      if (imageParam) {
        const imageObj = mainImages.find((image) =>
          image.src.includes(imageParam)
        );
        if (imageObj) {
          setExpandedImage(imageObj.src);
          const imageIndex = mainImages.indexOf(imageObj);
          const numberofImages = mainImages.length;
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
  }, [mainImages, expandedImage, percentage, mouseDownAt, trackRef]);

  // Modify URL handling to include modelId
  const handleButtonClick = (src: string) => {
    if (expandedImage) return;
    setExpandedImage(src);
    const newUrl = `${
      window.location.pathname
    }?model=${modelId}&image=${encodeURIComponent(src.replace(".PNG", ""))}`;
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
        id="image-track"
      >
        <div
          className="relative inline-block"
          style={{
            marginRight: "10px",
          }}
        >
          <Image
            src={mainImages[currentFrame].src}
            alt={`${modelId} Frame ${currentFrame}`}
            width={400}
            height={300}
            style={{
              width: "400px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "8px",
              pointerEvents: "none",
            }}
          />
          {/* <div className="img-inset-shadow"></div> */}
          <TransparentButton
            onClick={() => handleButtonClick(mainImages[currentFrame].src)}
            text={mainImages[currentFrame].buttonText || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageTrackComponent;
