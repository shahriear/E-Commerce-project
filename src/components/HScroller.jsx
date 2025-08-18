// import { useRef, useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const HScroller = ({ children }) => {
//   const trackRef = useRef(null);
//   const [showArrows, setShowArrows] = useState(false);

//   useEffect(() => {
//     const el = trackRef.current;
//     if (!el) return;

//     const checkScroll = () => {
//       setShowArrows(el.scrollWidth > el.clientWidth);
//     };

//     checkScroll();
//     window.addEventListener('resize', checkScroll);

//     return () => window.removeEventListener('resize', checkScroll);
//   }, [children]);

//   const scrollBy = dir => {
//     const el = trackRef.current;
//     if (!el) return;
//     const amount = el.clientWidth * 0.9;
//     el.scrollBy({ left: dir * amount, behavior: 'smooth' });
//   };

//   return (
//     <div className="relative">
//       {showArrows && (
//         <button
//           aria-label="Prev"
//           onClick={() => scrollBy(-1)}
//           className="absolute -left-3 top-1/2 z-10 -translate-y-1/2
//                      rounded-full bg-white shadow p-2 hover:shadow-md hidden md:inline-flex"
//         >
//           <ChevronLeft />
//         </button>
//       )}

//       <div
//         ref={trackRef}
//         className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-2 no-scrollbar"
//       >
//         {children}
//       </div>

//       {showArrows && (
//         <button
//           aria-label="Next"
//           onClick={() => scrollBy(1)}
//           className="absolute -right-3 top-1/2 z-10 -translate-y-1/2
//                      rounded-full bg-white shadow p-2 hover:shadow-md hidden md:inline-flex"
//         >
//           <ChevronRight />
//         </button>
//       )}
//     </div>
//   );
// };

// export default HScroller;
