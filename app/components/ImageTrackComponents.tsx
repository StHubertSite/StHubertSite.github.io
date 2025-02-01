import { useEffect, useRef } from 'react';

const ImageTrackComponent = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;

    let mouseDownAt = 0;
    let percentage = 0;

    const handleMouseDown = (e: { clientX: number; }) => {
      mouseDownAt = e.clientX;
    };

    const handleMouseMove = (e: { clientX: number; }) => {
      if (!mouseDownAt || !trackRef?.current) return;
 
      const mouseDelta = mouseDownAt - e.clientX;
      const maxDelta = window.innerWidth / 2;

      percentage = percentage + (mouseDelta / maxDelta) * - 100;
      percentage = Math.min(percentage, -23);
      percentage = Math.max(percentage, -227);
      console.log("percentage", percentage);

      //track.style.transform = `translate(${percentage}%, -50%)`;
      track.animate({
        transform: `translate(${percentage}%, -50%)`
      }, { duration: 800, fill: "forwards"});

      const images = trackRef.current.querySelectorAll('img');
      for (const image of images) {
        //image.style.objectPosition = `${100 * (percentage/250) + 100}% 50%`;
        image.animate({
          objectPosition: `${Math.round(100 * (percentage/250) + 100)}% center`
        }, { duration: 800, fill: "forwards"});
  
      }
    };

    const handleMouseUp = () => {
      mouseDownAt = 0;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div ref={trackRef} id="image-track" >
      <img className="image  rounded-lg" src="/2023-07-30-0168.jpg" draggable="false" />
      <img className="image  rounded-lg" src="/2023-07-30-0227.jpg" draggable="false" />
      <img className="image  rounded-lg" src="/2023-07-30-0231.jpg" draggable="false" />
      <img className="image  rounded-lg" src="/2023-07-30-0265.jpg" draggable="false" />
      <img className="image  rounded-lg" src="/2023-07-30-0288.jpg" draggable="false" />
    </div>
  );
};

export default ImageTrackComponent;
