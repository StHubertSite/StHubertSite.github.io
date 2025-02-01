import { useEffect, useRef, useState } from "react";

const SENSITIVITY = 5;
const MIN = 0;
const MAX = 100;
const DURATION = 1200;

const ImageTrackComponent = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);

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
        for (const image of images) {
          image.animate(
            {
              objectPosition: `${Math.round(percentage + 100)}% center`,
            },
            { duration: DURATION, fill: "forwards" }
          );
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseDownAt = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
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
      percentage += e.deltaY > 0 ? -SENSITIVITY : SENSITIVITY; // Adjust sensitivity if needed
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
  }, []);

  return (
    <div ref={trackRef} id="image-track">
      {[
        "/2023-07-30-0168.jpg",
        "/2023-07-30-0227.jpg",
        "/2023-07-30-0231.jpg",
        "/2023-07-30-0265.jpg",
        "/2023-07-30-0288.jpg",
      ].map((src, index) => (
        <div
          key={src}
          style={{
            position: "relative",
            display: "inline-block",
            marginRight: "10px",
          }}
        >
          {/* Image */}
          <img
            className="image rounded-lg"
            src={src}
            alt={`Image ${index}`}
            draggable="false"
          />

          {/* Button over the image */}
          <button
            className="text-gray-800 font-semibold py-2 px-4 rounded shadow"
            style={{
              width: "6rem",
              height: "3rem",
              position: "absolute",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(8px)",
              color: "white",
              border: "none",
              transition: "transform 0.2s ease, background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.5)";
              e.currentTarget.style.transform = "translateX(-50%) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.3)";
              e.currentTarget.style.transform = "translateX(-50%) scale(1)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateX(-50%) scale(0.95)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateX(-50%) scale(1.1)";
            }}
          ></button>
        </div>
      ))}
    </div>
  );
};

export default ImageTrackComponent;
