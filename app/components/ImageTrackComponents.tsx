import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TransparentButton from "./TransparentButton";
import ExpandedImageComponent from "./ExpandedImageComponent";
import { get } from "http";

const SENSITIVITY = 3;

const mainImages = [
  "/2023-07-30-0168.JPG",
  "/2023-07-30-0231.JPG",
  "/2023-07-30-0227.JPG",
  "/2024-09-17-0005.JPG",
  "/2023-07-30-0265.JPG",
  "/2023-07-30-0288.JPG",
];

const MIN = 0;
const MAX = 100;
const DURATION = 1200;

const ImageTrackComponent = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  useEffect(() => {
    // Div holding images
    const track = trackRef.current;

    // X coord of mouse when dragging
    let mouseDownAt = 0;

    // Scroll Percentage
    let percentage = MIN;

    const updateTrackAndImages = () => {
      track?.animate(
        {
          transform: `translate(${percentage}%, -50%)`,
        },
        { duration: DURATION, fill: "forwards" }
      );

      const images = track?.querySelectorAll("img");
      if (images) {
        images.forEach((image) => {
          image.animate(
            {
              objectPosition: `${Math.round(percentage + 100)}% center`,
            },
            { duration: DURATION, fill: "forwards" }
          );
        });
      }
    };

    const getExpandedImageFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const imageParam = params.get("image");
      if (imageParam) {
        const imageUrl = mainImages.find((src) => src.includes(imageParam));
        if (imageUrl) {
          setExpandedImage(imageUrl);
          const imageIndex = mainImages.indexOf(imageUrl);
          const numberofImages = mainImages.length;
          percentage = (-100 / numberofImages) * imageIndex - 10;
          updateTrackAndImages();
        }
      }
    };

    // Check URL for image query parameter
    getExpandedImageFromURL();

    const handleMouseDown = (e: MouseEvent) => {
      if (expandedImage) return;

      mouseDownAt = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (expandedImage) return;
      if (!mouseDownAt || !track) return;

      const mouseDelta = mouseDownAt - e.clientX;
      const maxDelta = window.innerWidth / 2;

      percentage += (mouseDelta / maxDelta) * -100;
      percentage = Math.min(percentage, -MIN);
      percentage = Math.max(percentage, -MAX);

      // Update mouseDownAt to continue smooth drag
      mouseDownAt = e.clientX;
      updateTrackAndImages();
    };

    const handleMouseUp = () => {
      mouseDownAt = 0;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (expandedImage) return;

      const isTrackpad = e.deltaMode === 0 && Math.abs(e.deltaY) < 100;

      if (isTrackpad) {
        // Handle trackpad scroll
        if (e.deltaY !== 0) {
          percentage += e.deltaY > 0 ? -SENSITIVITY : SENSITIVITY; // Adjust sensitivity if needed
        } else if (e.deltaX !== 0) {
          percentage += e.deltaX > 0 ? -SENSITIVITY : SENSITIVITY; // Adjust sensitivity if needed
        }
      } else {
        // Handle scroll wheel
        if (e.deltaY !== 0) {
          percentage += e.deltaY > 0 ? -SENSITIVITY * 3 : SENSITIVITY * 3; // Adjust sensitivity if needed
        } else if (e.deltaX !== 0) {
          percentage += e.deltaX > 0 ? -SENSITIVITY * 3 : SENSITIVITY * 3; // Adjust sensitivity if needed
        }
      }

      percentage = Math.min(percentage, -MIN);
      percentage = Math.max(percentage, -MAX);
      updateTrackAndImages();
    };

    // Attach event listeners
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [expandedImage]);

  const handleButtonClick = (src: string) => {
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

  return (
    <div>
      {expandedImage && (
        <ExpandedImageComponent src={expandedImage} onBack={handleBack} />
      )}
      <div
        style={{ zIndex: expandedImage ? -100 : 1 }}
        ref={trackRef}
        id="image-track"
      >
        {mainImages.map((src, index) => (
          <div
            key={src}
            style={{
              position: "relative",
              display: "inline-block",
              marginRight: "10px",
              // transition: "transform 0.3s ease-in-out", // Smooth transition for scaling
              // zIndex: expandedImage === src ? 10 : 1, // Bring the expanded image on top
              // top: expandedImage === src ? "200vh" : "50%",
              // boxShadow: "inset 0px 0px 20px rgba(0, 0, 0, 0.5)", // Apply the inset shadow directly
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
            />
            <div className="img-inset-shadow"></div>

            {/* Button over the image */}
            <TransparentButton
              onClick={() => handleButtonClick(src)}
              text={""}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageTrackComponent;
