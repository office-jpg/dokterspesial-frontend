import { Card, CardDescription, CardFooter } from "~/components/atoms/card";
import CustomStarRating from "~/components/atoms/custom-star-rating";
import { Marquee } from "~/components/atoms/marquee";
import { cn } from "~/lib/utils";

const getInitials = (name: string): string => {
    const words = name.split(" ").filter((word) => word.length > 0);
    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
    }
    return words
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
};

export const Highlight = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <span
            className={cn(
                "text-primary p-1 py-0.5 font-medium dark:font-semibold",
                className
            )}
        >
            {children}
        </span>
    );
};

export interface TestimonialCardProps
    extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    role: string;
    img?: string;
    description: React.ReactNode;
    rating?: number;
    className?: string;
}

export const TestimonialCard = ({
    description,
    name,
    img,
    role,
    rating,
    className,
    ...props
}: TestimonialCardProps) => {
    const initials = getInitials(name);

    return (
        <Card
            className={cn(
                "flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-none p-4",
                "bg-secondary",
                "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_8px_12px_-4px_rgba(15,12,12,0.08),0px_1px_2px_0px_rgba(15,12,12,0.10)] dark:shadow-[0px_0px_0px_1px_rgba(250,250,250,0.1),0px_0px_0px_1px_#18181B,0px_8px_12px_-4px_rgba(15,12,12,0.3),0px_1px_2px_0px_rgba(15,12,12,0.3)]",
                className
            )}
            {...props}
        >
            <CardDescription className="text-foreground/90 !w-full leading-relaxed font-normal select-none">
                {description}
                {rating && (
                    <div className="mt-2 flex items-center gap-2">
                        <CustomStarRating
                            value={rating}
                            maxStars={5}
                            size={14}
                            showText={false}
                        />
                    </div>
                )}
            </CardDescription>

            <CardFooter className="flex w-full items-center justify-start gap-3.5 px-0 select-none">
                {img ? (
                    <img
                        src={img}
                        alt={name}
                        className="size-8 rounded-full"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                                const initialsDiv =
                                    document.createElement("div");
                                initialsDiv.className =
                                    "bg-foreground/20 text-white flex size-8 items-center justify-center rounded-full text-xs font-medium";
                                initialsDiv.textContent = initials;
                                parent.appendChild(initialsDiv);
                            }
                        }}
                    />
                ) : (
                    <div className="bg-primary/10 flex size-8 items-center justify-center rounded-full">
                        <span className="text-primary text-xs font-medium">
                            {initials}
                        </span>
                    </div>
                )}

                <div>
                    <p className="text-foreground/90 font-medium">{name}</p>
                    <p className="text-foreground/50 text-xs font-normal">
                        {role}
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
};

interface Testimonial {
    id: string;
    name: string;
    role: string;
    img: string;
    description: React.ReactNode;
    rating?: number;
}

export function SocialProofTestimonials({
    testimonials,
}: {
    testimonials: Testimonial[];
}) {
    const distributeTestimonials = (
        items: Testimonial[],
        maxPerMarquee = 5
    ) => {
        const total = Math.min(items.length, maxPerMarquee * 3);
        const activeItems = items.slice(0, total);

        const marquees: Testimonial[][] = [[], [], []];

        for (let i = 0; i < activeItems.length; i++) {
            if (i === 0) {
                marquees[1].push(activeItems[i]);
            } else if (i === 1) {
                marquees[0].push(activeItems[i]);
            } else if (i === 2) {
                marquees[2].push(activeItems[i]);
            } else {
                const cycle = (i - 3) % 3;
                const targetIndex = cycle === 0 ? 1 : cycle === 1 ? 0 : 2;

                if (marquees[targetIndex].length < maxPerMarquee) {
                    marquees[targetIndex].push(activeItems[i]);
                }
            }
        }

        return marquees;
    };

    const distributedTestimonials = distributeTestimonials(testimonials, 5);

    return (
        <div className="relative max-h-[750px] overflow-hidden">
            <div className="gap-0 md:columns-2 xl:columns-3">
                {distributedTestimonials.map(
                    (marqueeItems, i) =>
                        marqueeItems.length > 0 && (
                            <Marquee
                                vertical
                                key={i}
                                className={cn({
                                    "[--duration:60s]": i === 0,
                                    "[--duration:30s]": i === 1,
                                    "[--duration:70s]": i === 2,
                                })}
                            >
                                {marqueeItems.map((card, idx) => (
                                    <TestimonialCard
                                        key={card.id || `${i}-${idx}`}
                                        name={card.name}
                                        role={card.role}
                                        img={card.img}
                                        description={card.description}
                                        rating={card.rating}
                                    />
                                ))}
                            </Marquee>
                        )
                )}
            </div>
            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/6 w-full bg-gradient-to-t from-20% md:h-1/5" />
            <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/6 w-full bg-gradient-to-b from-20% md:h-1/5" />
        </div>
    );
}
