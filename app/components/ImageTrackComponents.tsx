import { useEffect, useRef, useState } from 'react';

const SENSITIVITY = 5;
const MIN = 23;
const MAX = 227;
const DURATION = 1200;

const ImageTrackComponent = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Div holding images
    const track = trackRef.current;

    // X coord of mouse when dragging
    let mouseDownAt = 0;

    // Scroll Percentage
    let percentage = -MIN;

    const updateTrackAndImages = () => {
      track?.animate({
        transform: `translate(${percentage}%, -50%)`
      }, { duration: DURATION, fill: "forwards" });

      const images = track?.querySelectorAll('img');
      if (images) {
        for (const image of images) {
          image.animate({
            objectPosition: `${Math.round(100 * (percentage / 250) + 100)}% center`
          }, { duration: DURATION, fill: "forwards" });
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
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div ref={trackRef} id="image-track">
      {["/2023-07-30-0168.jpg", "/2023-07-30-0227.jpg", "/2023-07-30-0231.jpg", "/2023-07-30-0265.jpg", "/2023-07-30-0288.jpg"].map((src, index) => (
        <img
          key={src}
          className="image rounded-lg"
          src={src}
          draggable="false"
        />
      ))}
    </div>
  );
};

export default ImageTrackComponent;
