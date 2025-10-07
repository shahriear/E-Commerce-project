import { useRef, useState } from 'react';

export default function ZoomableImage({ src, alt }) {
  const containerRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [backgroundPos, setBackgroundPos] = useState('center');

  const handleMouseMove = e => {
    if (!zoomed || !containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    setBackgroundPos(`${x}% ${y}%`);
  };

  const handleTouch = e => {
    if (!zoomed || !containerRef.current) return;

    const touch = e.touches[0];
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    const x = ((touch.pageX - left - window.scrollX) / width) * 100;
    const y = ((touch.pageY - top - window.scrollY) / height) * 100;

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
      onTouchStart={() => setZoomed(prev => !prev)}
      onTouchMove={handleTouch}
      onTouchEnd={() => setBackgroundPos('center')}
      className="w-full md:w-fit h-[350px]  sm:h-[300px] md:h-full xl:w-full object-contain rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: zoomed ? '180%' : '100%',
        backgroundPosition: backgroundPos,
        transition: 'background-size 0.3s ease',
        cursor: zoomed ? 'zoom-in' : 'default',
      }}
    >
      <img src={src} alt={alt} className="opacity-0 w-full h-full" />
    </div>
  );
}
