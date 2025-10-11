import { cn } from "~/lib/utils";
import React from "react";
import { motion, type MotionProps } from "framer-motion";

const shinyAnimationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop" as const,
    repeatDelay: 1,
    type: "spring" as const,
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring" as const,
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

interface AnimatedBadgeProps extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>, MotionProps {
  children?: React.ReactNode;
  variant?: 'shiny' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  textBadge?: string;
}

export const AnimatedBadge = ({ 
  children, 
  variant = 'pulse', 
  size = 'md', 
  className, 
  textBadge,
  ...props 
}: AnimatedBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  if (variant === 'shiny') {
    return (
      <motion.div
        className={cn(
          "relative cursor-pointer w-fit rounded-none font-medium backdrop-blur-xl border transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,var(--primary)/10%_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_var(--primary)/10%]",
          sizeClasses[size],
          className,
        )}
        {...shinyAnimationProps}
        {...props}
      >
        <span
          className="relative block size-full text-sm uppercase tracking-wide bg-gradient-to-r from-primary via-tertiary to-foreground bg-clip-text text-transparent dark:font-light"
          style={{
            maskImage:
              "linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))",
          }}
        >
          {children}
        </span>
        <span
          style={{
            mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            WebkitMask:
              "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            backgroundImage:
              "linear-gradient(-75deg,var(--primary)/10% calc(var(--x)+20%),var(--primary)/50% calc(var(--x)+25%),var(--primary)/10% calc(var(--x)+100%))",
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] p-px"
        />
      </motion.div>
    );
  }

  return (
    <div className={cn('flex w-fit', className)}>
      <div className={cn(
        'rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center gap-2',
        sizeClasses[size]
      )}>
        <div className='size-1.5 rounded-full bg-muted-foreground/30 flex items-center justify-center relative'>
          <div className='size-2 rounded-full bg-muted-foreground/50 flex items-center justify-center animate-ping'>
            <div className='size-2 rounded-full bg-muted-foreground/50 flex items-center justify-center animate-ping' />
          </div>
          <div className='size-1.5 rounded-full bg-muted-foreground flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
        </div>
        <span className='font-medium text-slate-700 dark:text-slate-300'>
          {textBadge || children || 'Platform Pelatihan Riset Kesehatan'}
        </span>
      </div>
    </div>
  );
};
