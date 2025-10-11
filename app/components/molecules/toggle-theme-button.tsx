import { memo, useCallback, useEffect, useLayoutEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";

import { Button } from "~/components/atoms/button";
import { applyTheme, getCurrentTheme } from "~/lib/theme";
import { cn } from "~/lib/utils";

type AnimationVariant = "circle" | "circle-blur" | "gif" | "polygon";

type StartPosition =
    | "center"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";

export interface AnimatedThemeToggleButtonProps {
    theme?: "light" | "dark";
    showLabel?: boolean;
    variant?: AnimationVariant;
    start?: StartPosition;
    url?: string;
    className?: string;
    onClick?: () => void;
}

export const AnimatedThemeToggleButton = ({
    theme = "light",
    showLabel = false,
    variant = "polygon",
    start = "center",
    url,
    className,
    onClick,
}: AnimatedThemeToggleButtonProps) => {
    const handleClick = useCallback(() => {
        const styleId = `theme-transition-${Date.now()}`;
        const style = document.createElement("style");
        style.id = styleId;

        let css = "";
        const positions = {
            center: "center",
            "top-left": "top left",
            "top-right": "top right",
            "bottom-left": "bottom left",
            "bottom-right": "bottom right",
        };

        if (variant === "circle") {
            const cx =
                start === "center"
                    ? "50"
                    : start.includes("left")
                      ? "0"
                      : "100";
            const cy =
                start === "center" ? "50" : start.includes("top") ? "0" : "100";
            css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) { 
            animation: none;
          }
          ::view-transition-new(root) {
            animation: circle-expand 0.4s ease-out;
            transform-origin: ${positions[start]};
          }
          @keyframes circle-expand {
            from {
              clip-path: circle(0% at ${cx}% ${cy}%);
            }
            to {
              clip-path: circle(150% at ${cx}% ${cy}%);
            }
          }
        }
      `;
        } else if (variant === "circle-blur") {
            const cx =
                start === "center"
                    ? "50"
                    : start.includes("left")
                      ? "0"
                      : "100";
            const cy =
                start === "center" ? "50" : start.includes("top") ? "0" : "100";
            css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) { 
            animation: none;
          }
          ::view-transition-new(root) {
            animation: circle-blur-expand 0.5s ease-out;
            transform-origin: ${positions[start]};
            filter: blur(0);
          }
          @keyframes circle-blur-expand {
            from {
              clip-path: circle(0% at ${cx}% ${cy}%);
              filter: blur(4px);
            }
            to {
              clip-path: circle(150% at ${cx}% ${cy}%);
              filter: blur(0);
            }
          }
        }
      `;
        } else if (variant === "gif" && url) {
            css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: fade-out 0.4s ease-out;
          }
          ::view-transition-new(root) {
            animation: gif-reveal 2.5s cubic-bezier(0.4, 0, 0.2, 1);
            mask-image: url('${url}');
            mask-size: 0%;
            mask-repeat: no-repeat;
            mask-position: center;
          }
          @keyframes fade-out {
            to {
              opacity: 0;
            }
          }
          @keyframes gif-reveal {
            0% {
              mask-size: 0%;
            }
            20% {
              mask-size: 35%;
            }
            60% {
              mask-size: 35%;
            }
            100% {
              mask-size: 300%;
            }
          }
        }
      `;
        } else if (variant === "polygon") {
            const animationName =
                theme === "light" ? "wipe-in-dark" : "wipe-in-light";
            css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: none;
            z-index: 1;
          }
          ::view-transition-new(root) {
            animation: ${animationName} 0.4s ease-out;
            z-index: 9999;
          }
          @keyframes wipe-in-dark {
            from {
              clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            }
            to {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
          @keyframes wipe-in-light {
            from {
              clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
            }
            to {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
        }
      `;
        }

        if (css) {
            style.textContent = css;
            document.head.appendChild(style);

            setTimeout(() => {
                const styleEl = document.getElementById(styleId);
                if (styleEl) {
                    styleEl.remove();
                }
            }, 1000);
        }

        onClick?.();
    }, [onClick, variant, start, url, theme]);

    return (
        <Button
            variant="outline"
            size={showLabel ? "default" : "icon"}
            onClick={handleClick}
            className={cn(
                "relative overflow-hidden transition-all",
                showLabel && "gap-2",
                className
            )}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
            {theme === "light" ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            {showLabel && (
                <span className="text-sm">
                    {theme === "light" ? "Light" : "Dark"}
                </span>
            )}
        </Button>
    );
};

function ThemeToggleButtonComponent({
    showLabel = false,
}: {
    showLabel?: boolean;
}) {
    const [theme, setTheme] = useState<"light" | "dark" | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    useLayoutEffect(() => {
        setTheme(getCurrentTheme());
        setIsHydrated(true);
    }, []);

    const toggle = useCallback(() => {
        if (!theme || !isHydrated) return;
        
        const nextTheme = theme === "dark" ? "light" : "dark";
        
        const handleThemeToggle = () => {
            applyTheme(nextTheme);
            setTheme(nextTheme);
        };

        // Handle view transition if supported
        if (
            typeof document !== "undefined" &&
            "startViewTransition" in document
        ) {
            (document as any).startViewTransition(() => {
                handleThemeToggle();
            });
        } else {
            handleThemeToggle();
        }
    }, [theme, isHydrated]);

    // Show loading state until hydrated
    if (!isHydrated || theme === null) {
        return (
            <Button
                variant="outline"
                size={showLabel ? "default" : "icon"}
                disabled
                className={cn(
                    "relative overflow-hidden transition-all opacity-50",
                    showLabel && "gap-2"
                )}
                aria-label="Loading theme..."
            >
                <Sun className="h-[1.2rem] w-[1.2rem]" />
                {showLabel && <span className="text-sm">Loading...</span>}
            </Button>
        );
    }

    return (
        <AnimatedThemeToggleButton
            theme={theme}
            onClick={toggle}
            variant="polygon"
            start="center"
            showLabel={showLabel}
        />
    );
}

export const ThemeToggleButton = memo(ThemeToggleButtonComponent);
