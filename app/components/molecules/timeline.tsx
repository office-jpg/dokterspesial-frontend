import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TimelineStep {
    number: string;
    title: string;
    description: string;
}

interface TimelineProps {
    steps: TimelineStep[];
    className?: string;
    accentColor?: string;
    gradientColor?: string;
}

export default function Timeline({ steps, className = "", accentColor = "text-tertiary", gradientColor = "via-primary" }: TimelineProps) {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 50%", "end 90%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div ref={containerRef} className={className}>
            <div ref={ref} className="relative">
                <div 
                    className={`absolute top-0 bottom-0 left-[39px] w-[2px] md:left-1/2 bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] ${
                        gradientColor === "via-gpa" ? "via-gpa/20" : 
                        gradientColor === "via-dd" ? "via-dd/20" : 
                        gradientColor === "via-purple-600" ? "via-purple-600/20" : 
                        "via-tertiary/20"
                    } to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] z-0`}
                    style={{ height: height + "px" }}
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className={`absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b ${
                            gradientColor === "via-gpa" ? "from-gpa via-gpa" :
                            gradientColor === "via-dd" ? "from-dd via-dd" :
                            gradientColor === "via-purple-600" ? "from-purple-600 via-purple-600 dark:from-purple-700 dark:via-purple-700" :
                            "from-tertiary via-primary"
                        } to-transparent from-[0%] via-[50%] rounded-full`}
                    />
                </div>

                {steps.map((step, index) => {
                    const stepProgress = useTransform(
                        scrollYProgress,
                        [index / steps.length, (index + 1) / steps.length],
                        [0, 1]
                    );
                    
                    return (
                        <motion.div
                            key={index}
                            style={{
                                opacity: useTransform(stepProgress, [0, 0.3], [0.3, 1]),
                                scale: useTransform(stepProgress, [0, 0.3], [0.95, 1]),
                            }}
                            className={`mb-16 flex flex-col items-start gap-8 md:flex-row md:items-center ${
                                index % 2 === 0
                                    ? "md:flex-row"
                                    : "md:flex-row-reverse"
                            }`}
                        >
                            <motion.div
                                style={{
                                    x: useTransform(stepProgress, [0, 0.5], [index % 2 === 0 ? 50 : -50, 0]),
                                }}
                                className={`flex-1 ${index % 2 === 0 ? "md:text-right" : ""} pl-24 md:pl-0`}
                            >
                                <motion.div
                                    style={{
                                        opacity: useTransform(stepProgress, [0.2, 0.4], [0.3, 1]),
                                    }}
                                    className={`text-muted-foreground/60 mb-4 text-5xl font-bold md:text-7xl ${index % 2 === 0 ? "md:text-right" : ""}`}
                                >
                                    {step.number}
                                </motion.div>
                                <motion.h3
                                    style={{
                                        opacity: useTransform(stepProgress, [0.3, 0.5], [0, 1]),
                                        y: useTransform(stepProgress, [0.3, 0.5], [20, 0]),
                                    }}
                                    className={`text-foreground mb-2 text-2xl font-bold ${index % 2 === 0 ? "md:text-right" : ""}`}
                                >
                                    {step.title}
                                </motion.h3>
                                <motion.p
                                    style={{
                                        opacity: useTransform(stepProgress, [0.4, 0.6], [0, 1]),
                                        y: useTransform(stepProgress, [0.4, 0.6], [20, 0]),
                                    }}
                                    className={`text-muted-foreground ${index % 2 === 0 ? "md:ml-auto md:text-right" : ""} ${
                                        index % 2 === 0
                                            ? "md:inline-block md:max-w-sm"
                                            : "max-w-sm"
                                    }`}
                                >
                                    {step.description.split('\n').map((line, lineIndex) => (
                                        <span key={lineIndex}>
                                            {line}
                                            {lineIndex < step.description.split('\n').length - 1 && <br />}
                                        </span>
                                    ))}
                                </motion.p>
                            </motion.div>

                            <div className="relative z-30 flex items-center bg-background justify-center md:static">
                                <motion.div
                                    style={{
                                        scale: useTransform(stepProgress, [0.1, 0.3], [0.5, 1]),
                                        borderColor: useTransform(
                                            stepProgress,
                                            [0.2, 0.4],
                                            accentColor === "text-gpa" ? 
                                                ["hsl(var(--gpa) / 0.4)", "hsl(var(--gpa))"] :
                                            accentColor === "text-dd" ?
                                                ["hsl(var(--dd) / 0.4)", "hsl(var(--dd))"] :
                                            accentColor === "text-purple-600" ?
                                                ["hsl(267 57% 50% / 0.4)", "hsl(267 57% 50%)"] :
                                                ["hsl(var(--tertiary) / 0.4)", "hsl(var(--tertiary))"]
                                        ),
                                        boxShadow: '0 0 0 4px hsl(var(--background))'
                                    }}
                                    className="absolute bg-background z-80 top-1/2 left-0 flex size-20 -translate-y-1/2 items-center justify-center border-2 transition-all duration-300 md:relative md:top-auto md:left-auto md:translate-y-0"
                                >
                                    <motion.div
                                        style={{
                                            opacity: useTransform(stepProgress, [0.2, 0.4], [0.5, 1]),
                                        }}
                                        className={`${accentColor} text-xl font-bold`}
                                    >
                                        {step.number}
                                    </motion.div>
                                </motion.div>
                            </div>

                            <div className="hidden flex-1 md:block">
                                <motion.div
                                    style={{
                                        scaleX: useTransform(stepProgress, [0.5, 0.7], [0, 1]),
                                    }}
                                    className="bg-border h-[2px] w-full origin-left"
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
