import { useRef, useState } from 'react';

export default function ZoomableImage({ src, alt }) {
  const containerRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [backgroundPos, setBackgroundPos] = useState('center');

  const handleMouseMove = e => {
    if (!zoomed) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => {
        setZoomed(false);
        setBackgroundPos('center');
      }}
      onMouseMove={handleMouseMove}
      className="w-full h-[350px]  rounded-lg overflow-hidden "
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: zoomed ? '180%' : '100%', // only zoom on hover
        backgroundPosition: backgroundPos,
        transition: 'background-size 0.3s ease', // smooth zoom in/out
        cursor: zoomed ? 'zoom-in' : 'default',
      }}
    >
      <img src={src} alt={alt} className="opacity-0 w-full h-full" />
    </div>
  );
}
