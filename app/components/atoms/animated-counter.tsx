import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  end: string;
  duration?: number;
}

export function AnimatedCounter({ end, duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const numericEnd = Number.parseInt(end.replace(/[^\d]/g, ""));

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * numericEnd));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [numericEnd, duration]);

  return <span>{end.includes("%") ? `${count}%` : `${count}+`}</span>;
}
