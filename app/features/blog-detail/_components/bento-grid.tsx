// import { ArrowRightIcon } from "@radix-ui/react-icons";
// import type { ComponentPropsWithoutRef, ReactNode } from "react";

// import { Button } from "~/components/atoms/button";
// import { cn } from "~/lib/utils";

// interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
//   children: ReactNode;
//   className?: string;
// }

// interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
//   name: string;
//   className: string;
//   backgroundType: BrandFeature['backgroundType'];
//   gradient: string;
//   accentColor: string;
//   Icon: React.ElementType;
//   description: string;
//   href: string;
//   cta: string;
// }

// const getBackgroundSVG = (type: BrandFeature['backgroundType'], gradient: string, accentColor: string) => {
//   const gradientId = `${type}Gradient`;
  
//   switch (type) {
//     case 'needle':
//       return (
//         <div className="absolute inset-0">
//           <svg
//             className="absolute inset-0 h-full w-full"
//             viewBox="0 0 400 300"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor={accentColor} stopOpacity="0.1" />
//                 <stop offset="100%" stopColor={accentColor} stopOpacity="0.3" />
//               </linearGradient>
//             </defs>
//             <circle cx="100" cy="80" r="30" fill={`url(#${gradientId})`} className="animate-pulse" />
//             <circle cx="300" cy="150" r="20" fill={`url(#${gradientId})`} className="animate-pulse" style={{ animationDelay: "1s" }} />
//             <circle cx="200" cy="220" r="25" fill={`url(#${gradientId})`} className="animate-pulse" style={{ animationDelay: "2s" }} />
//             <path d="M50 50 L350 250" stroke={accentColor} strokeWidth="2" strokeOpacity="0.2" strokeDasharray="5,5" />
//             <path d="M50 250 L350 50" stroke={accentColor} strokeWidth="2" strokeOpacity="0.2" strokeDasharray="5,5" />
//           </svg>
//         </div>
//       );

//     case 'ultrasound':
//       return (
//         <div className="absolute inset-0">
//           <svg
//             className="absolute inset-0 h-full w-full"
//             viewBox="0 0 600 300"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
//                 <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
//                 <stop offset="50%" stopColor={accentColor} stopOpacity="0.2" />
//                 <stop offset="100%" stopColor={accentColor} stopOpacity="0.1" />
//               </radialGradient>
//             </defs>
//             <circle cx="150" cy="150" r="50" fill="none" stroke={accentColor} strokeWidth="2" strokeOpacity="0.4" className="animate-ping" />
//             <circle cx="150" cy="150" r="80" fill="none" stroke={accentColor} strokeWidth="1" strokeOpacity="0.3" className="animate-ping" style={{ animationDelay: "0.5s" }} />
//             <circle cx="150" cy="150" r="110" fill="none" stroke={accentColor} strokeWidth="1" strokeOpacity="0.2" className="animate-ping" style={{ animationDelay: "1s" }} />
//             <rect x="400" y="100" width="120" height="100" rx="10" fill={`url(#${gradientId})`} />
//             <circle cx="460" cy="150" r="15" fill={accentColor} fillOpacity="0.6" className="animate-pulse" />
//             <path d="M200 150 L400 150" stroke={accentColor} strokeWidth="2" strokeDasharray="8,4" strokeOpacity="0.6" />
//           </svg>
//         </div>
//       );

//     case 'carm':
//       return (
//         <div className="absolute inset-0">
//           <svg
//             className="absolute inset-0 h-full w-full"
//             viewBox="0 0 600 300"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
//                 <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
//                 <stop offset="100%" stopColor={accentColor} stopOpacity="0.1" />
//               </linearGradient>
//             </defs>
//             <rect x="250" y="50" width="30" height="200" rx="15" fill={`url(#${gradientId})`} />
//             {[0, 1, 2, 3, 4, 5, 6].map((i) => (
//               <circle key={i} cx="265" cy={70 + i * 25} r="8" fill={accentColor} fillOpacity="0.6" className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
//             ))}
//             <rect x="100" y="120" width="80" height="60" rx="10" fill="#374151" fillOpacity="0.3" />
//             <rect x="420" y="120" width="80" height="60" rx="10" fill="#374151" fillOpacity="0.3" />
//             <path d="M180 150 L250 150" stroke="#fbbf24" strokeWidth="3" strokeOpacity="0.7" strokeDasharray="2,2" className="animate-pulse" />
//             <path d="M280 150 L420 150" stroke="#fbbf24" strokeWidth="3" strokeOpacity="0.7" strokeDasharray="2,2" className="animate-pulse" />
//           </svg>
//         </div>
//       );

//     case 'anatomy':
//       return (
//         <div className="absolute inset-0">
//           <svg
//             className="absolute inset-0 h-full w-full"
//             viewBox="0 0 400 300"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
//                 <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
//                 <stop offset="100%" stopColor={accentColor} stopOpacity="0.1" />
//               </radialGradient>
//             </defs>
//             <circle cx="200" cy="100" r="40" fill={`url(#${gradientId})`} />
//             <circle cx="120" cy="180" r="25" fill={`url(#${gradientId})`} />
//             <circle cx="280" cy="180" r="25" fill={`url(#${gradientId})`} />
//             <circle cx="200" cy="100" r="5" fill={accentColor} className="animate-ping" />
//             <circle cx="120" cy="180" r="3" fill={accentColor} className="animate-ping" style={{ animationDelay: "0.5s" }} />
//             <circle cx="280" cy="180" r="3" fill={accentColor} className="animate-ping" style={{ animationDelay: "1s" }} />
//             <path d="M200 100 L120 180" stroke={accentColor} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3,3" />
//             <path d="M200 100 L280 180" stroke={accentColor} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3,3" />
//           </svg>
//         </div>
//       );

//     case 'aligner':
//       return (
//         <div className="absolute inset-0">
//           <svg
//             className="absolute inset-0 h-full w-full"
//             viewBox="0 0 400 300"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor={accentColor} stopOpacity="0.2" />
//                 <stop offset="100%" stopColor={accentColor} stopOpacity="0.4" />
//               </linearGradient>
//             </defs>
//             {[0, 1, 2, 3, 4].map((i) => (
//               <rect 
//                 key={i} 
//                 x={80 + i * 50} 
//                 y={120 + Math.sin(i) * 20} 
//                 width="30" 
//                 height="60" 
//                 rx="15" 
//                 fill={`url(#${gradientId})`} 
//                 className="animate-pulse" 
//                 style={{ animationDelay: `${i * 0.3}s` }}
//               />
//             ))}
//             <path 
//               d="M60 100 Q200 80 340 100 Q340 200 200 220 Q60 200 60 100 Z" 
//               fill="none" 
//               stroke={accentColor} 
//               strokeWidth="2" 
//               strokeOpacity="0.6" 
//               strokeDasharray="5,5"
//               className="animate-pulse"
//             />
//           </svg>
//         </div>
//       );

//     case 'endodontic':
//       return (
//         <div className="absolute inset-0">
//           <svg
//             className="absolute inset-0 h-full w-full"
//             viewBox="0 0 600 300"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
//                 <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
//                 <stop offset="100%" stopColor={accentColor} stopOpacity="0.1" />
//               </radialGradient>
//             </defs>
//             <path 
//               d="M200 50 Q250 50 300 80 Q320 120 300 160 Q280 200 250 220 Q200 240 150 220 Q120 200 100 160 Q80 120 100 80 Q150 50 200 50 Z" 
//               fill={`url(#${gradientId})`}
//             />
//             <circle cx="180" cy="150" r="8" fill={accentColor} fillOpacity="0.6" className="animate-pulse" />
//             <circle cx="220" cy="150" r="8" fill={accentColor} fillOpacity="0.6" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
//             <circle cx="200" cy="180" r="6" fill={accentColor} fillOpacity="0.6" className="animate-pulse" style={{ animationDelay: "1s" }} />
//             <rect x="400" y="100" width="120" height="20" rx="10" fill="#374151" fillOpacity="0.3" />
//             <rect x="400" y="140" width="100" height="15" rx="7" fill="#374151" fillOpacity="0.3" />
//             <rect x="400" y="170" width="80" height="15" rx="7" fill="#374151" fillOpacity="0.3" />
//             <path d="M320 150 L400 150" stroke={accentColor} strokeWidth="2" strokeDasharray="4,4" strokeOpacity="0.6" className="animate-pulse" />
//           </svg>
//         </div>
//       );

//     case 'surgical':
//       return (
//         <div className="absolute inset-0">
//           <svg
//             className="absolute inset-0 h-full w-full"
//             viewBox="0 0 600 300"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor={accentColor} stopOpacity="0.2" />
//                 <stop offset="100%" stopColor={accentColor} stopOpacity="0.4" />
//               </linearGradient>
//             </defs>
//             <path 
//               d="M100 200 Q300 180 500 200 Q500 220 300 240 Q100 220 100 200 Z" 
//               fill={`url(#${gradientId})`}
//               opacity="0.3"
//             />
//             <path 
//               d="M250 180 Q270 160 290 180 Q290 210 270 220 Q250 210 250 180 Z" 
//               fill={accentColor} 
//               fillOpacity="0.6"
//               className="animate-pulse"
//             />
//             <line x1="200" y1="120" x2="220" y2="160" stroke="#374151" strokeWidth="3" />
//             <line x1="320" y1="120" x2="300" y2="160" stroke="#374151" strokeWidth="3" />
//             <path d="M200 190 Q270 185 340 190" stroke={accentColor} strokeWidth="2" strokeDasharray="3,3" strokeOpacity="0.6" />
//             <circle cx="270" cy="190" r="60" fill="none" stroke={accentColor} strokeWidth="1" strokeOpacity="0.3" strokeDasharray="8,4" />
//           </svg>
//         </div>
//       );

//     case 'scaling':
//       return (
//         <div className="absolute inset-0">
//           <svg
//             className="absolute inset-0 h-full w-full"
//             viewBox="0 0 400 300"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
//                 <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
//                 <stop offset="100%" stopColor={accentColor} stopOpacity="0.1" />
//               </radialGradient>
//             </defs>
//             {[0, 1, 2, 3].map((i) => (
//               <rect 
//                 key={i} 
//                 x={80 + i * 60} 
//                 y="120" 
//                 width="40" 
//                 height="80" 
//                 rx="20" 
//                 fill={`url(#${gradientId})`}
//               />
//             ))}
//             <path 
//               d="M60 150 Q200 140 340 150 Q340 170 200 180 Q60 170 60 150 Z" 
//               fill={accentColor} 
//               fillOpacity="0.2"
//             />
//             <line x1="150" y1="80" x2="180" y2="140" stroke="#374151" strokeWidth="3" />
//             {[0, 1, 2, 3, 4].map((i) => (
//               <circle 
//                 key={i} 
//                 cx={120 + i * 40} 
//                 cy={100 + Math.sin(i) * 10} 
//                 r="2" 
//                 fill={accentColor} 
//                 className="animate-bounce" 
//                 style={{ animationDelay: `${i * 0.2}s` }}
//               />
//             ))}
//             {[0, 1, 2].map((i) => (
//               <g key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.7}s` }}>
//                 <path 
//                   d={`M${200 + i * 50} ${60 + i * 20} L${205 + i * 50} ${65 + i * 20} L${210 + i * 50} ${60 + i * 20} L${205 + i * 50} ${55 + i * 20} Z`} 
//                   fill={accentColor} 
//                   fillOpacity="0.6"
//                 />
//               </g>
//             ))}
//           </svg>
//         </div>
//       );

//     default:
//       return null;
//   }
// };

// const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
//   return (
//     <div
//       className={cn(
//         "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
//         className,
//       )}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// };

// const BentoCard = ({
//   name,
//   className,
//   backgroundType,
//   gradient,
//   accentColor,
//   Icon,
//   description,
//   href,
//   cta,
//   ...props
// }: BentoCardProps) => (
//   <div
//     key={name}
//     className={cn(
//       "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
//       // light styles
//       "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
//       // dark styles
//       "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
//       className,
//     )}
//     {...props}
//   >
//     {getBackgroundSVG(backgroundType, gradient, accentColor)}
//     <div className="p-4">
//       <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
//         <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
//         <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
//           {name}
//         </h3>
//         <p className="max-w-lg text-neutral-400">{description}</p>
//       </div>

//       <div
//         className={cn(
//           "lg:hidden pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
//         )}
//       >
//         <Button
//           variant="link"
//           asChild
//           size="sm"
//           className="pointer-events-auto p-0"
//         >
//           <a href={href}>
//             {cta}
//             <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
//           </a>
//         </Button>
//       </div>
//     </div>

//     <div
//       className={cn(
//         "hidden lg:flex pointer-events-none absolute bottom-0 w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
//       )}
//     >
//       <Button
//         variant="link"
//         asChild
//         size="sm"
//         className="pointer-events-auto p-0"
//       >
//         <a href={href}>
//           {cta}
//           <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
//         </a>
//       </Button>
//     </div>

//     <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
//   </div>
// );

// export { BentoCard, BentoGrid };
