import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TransparentButton from "./TransparentButton";
import ExpandedImageComponent from "./ExpandedImageComponent";

const SENSITIVITY = 3;

const MIN = 0;
const MAX = 100;
const DURATION = 1200;

interface ImageTrackComponentProps {
  mainImages: { src: string; buttonText?: string }[];
}

const ImageTrackComponent = ({ mainImages }: ImageTrackComponentProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  // Percentage of the track to show
  const [percentage, setPercentage] = useState<number>(MIN);

  // X coord of mouse when dragging
  const [mouseDownAt, setMouseDownAt] = useState<number>(0);

  // State to track loaded images
  const [loadedImages, setLoadedImages] = useState<number>(0);

  // State to track if all images are loaded
  const [allImagesLoaded, setAllImagesLoaded] = useState<boolean>(false);

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

      const images = track?.querySelectorAll("img");
      if (images) {
        images.forEach((image) => {
          image.animate(
            {
              objectPosition: `${Math.round(percentage + 100)}% center`,
            },
            { duration: duration, fill: "forwards" }
          );
        });
      }
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

  const handleButtonClick = (src: string) => {
    if (expandedImage) return;

    setExpandedImage(src); // Set the clicked image to be expanded
    const newUrl = `${window.location.pathname}?image=${encodeURIComponent(
      src.replace(".JPG", "")
    )}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const handleBack = () => {
    setExpandedImage(null);
    window.history.pushState({}, "", window.location.pathname);
  };

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedImages === mainImages.length) {
      console.log("All images are loaded");
      setAllImagesLoaded(true);
    }
  }, [loadedImages, mainImages.length]);

  return (
    <div>
      {expandedImage && allImagesLoaded && (
        <ExpandedImageComponent src={expandedImage} onBack={handleBack} />
      )}
      <div
        style={{
          zIndex: expandedImage ? -100 : 1,
          opacity: allImagesLoaded ? 1 : 0,
          transition: expandedImage
            ? "none"
            : "opacity 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        }}
        ref={trackRef}
        id="image-track"
      >
        {mainImages.map(({ src, buttonText }, index) => (
          <div
            key={src}
            style={{
              position: "relative",
              display: "inline-block",
              marginRight: "10px",
              transition: "transform 0.5s ease", // Smooth transition when moving down
              transform:
                expandedImage == src ? "translateY(-100vh)" : "translateY(0)", // Move down when clicked
            }}
          >
            {/* Image */}
            <Image
              className="image rounded-lg"
              src={src}
              alt={`Image ${index}`}
              draggable="false"
              width={500}
              height={300}
              loading="eager"
              onLoad={handleImageLoad}
            />
            <div className="img-inset-shadow"></div>

            {/* Button over the image */}
            <TransparentButton
              onClick={() => handleButtonClick(src)}
              text={buttonText || ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageTrackComponent;
