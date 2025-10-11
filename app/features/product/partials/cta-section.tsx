import { memo } from "react";
import { Link } from "react-router";

import { motion } from "framer-motion";
import { ChevronRight, HeartHandshake, MessageCircle } from "lucide-react";

import { Button } from "~/components/atoms/button";
import { Marquee } from "~/components/atoms/marquee";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import { useSectionAnimations } from "~/components/atoms/section-header";
import { useWhatsAppUrl } from "~/hooks/use-whatsapp";
import { cn, sanitizeContentAsHtml } from "~/lib/utils";

interface ReviewCardProps {
    author: string;
    review: string;
    rating: number;
    eventName: string;
}

const ReviewCard = ({ author, review, rating, eventName }: ReviewCardProps) => {
    return (
        <figure
            className={cn(
                "relative w-64 h-40 cursor-pointer overflow-hidden border p-4",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-col items-start justify-center gap-2">
                <div className="flex flex-row items-center gap-2">
                        <div className="bg-primary/10 flex size-8 items-center justify-center rounded-full">
                            <span className="text-primary text-xs font-medium">
                                {author.charAt(0)}
                            </span>
                        </div>
                    <div className="flex flex-col">
                        <figcaption className="line-clamp-1 text-sm font-medium dark:text-white">
                            {author.split(" ").slice(0, 2).join(" ")}
                        </figcaption>
                        <p className="text-xs font-medium dark:text-white/40">
                            {eventName.split(" - ")[1] || "Workshop"}
                        </p>
                    </div>
                </div>
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <span
                            key={i}
                            className={`text-xs ${
                                i < rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>
            <blockquote
                className="mt-2 line-clamp-3 text-sm"
                dangerouslySetInnerHTML={sanitizeContentAsHtml(review)}
            />
        </figure>
    );
};

interface CTASectionProps {
    reviews: Array<{
        id: number;
        review: string;
        rating: number;
        author: string;
        event: {
            id: number;
            name: string;
        };
    }>;
}

function CTASectionComponent({ reviews }: CTASectionProps) {
    const { sectionRef, isInView, itemVariants } = useSectionAnimations();

    const whatsappUrl = useWhatsAppUrl(
        "Halo Dokter Spesial, saya ingin konsultasi tentang program peningkatan skill yang sesuai dengan bidang saya"
    );

    const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
    const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

    return (
        <section id="konsultasi" className="py-14" ref={sectionRef}>
            <MaxWidthWrapper>
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="container flex w-full flex-col items-center justify-center p-4"
                >
                    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden border p-10 py-14">
                        <div className="absolute rotate-[35deg]">
                            <Marquee
                                pauseOnHover
                                className="[--duration:100s]"
                                repeat={3}
                            >
                                {firstRow.map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        author={review.author}
                                        review={review.review}
                                        rating={review.rating}
                                        eventName={review.event.name}
                                    />
                                ))}
                            </Marquee>
                            <Marquee
                                reverse
                                pauseOnHover
                                className="[--duration:100s]"
                                repeat={3}
                            >
                                {secondRow.map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        author={review.author}
                                        review={review.review}
                                        rating={review.rating}
                                        eventName={review.event.name}
                                    />
                                ))}
                            </Marquee>
                            <Marquee
                                pauseOnHover
                                className="[--duration:120s]"
                                repeat={3}
                            >
                                {firstRow.map((review) => (
                                    <ReviewCard
                                        key={`third-${review.id}`}
                                        author={review.author}
                                        review={review.review}
                                        rating={review.rating}
                                        eventName={review.event.name}
                                    />
                                ))}
                            </Marquee>
                            <Marquee
                                reverse
                                pauseOnHover
                                className="[--duration:80s]"
                                repeat={3}
                            >
                                {secondRow.map((review) => (
                                    <ReviewCard
                                        key={`fourth-${review.id}`}
                                        author={review.author}
                                        review={review.review}
                                        rating={review.rating}
                                        eventName={review.event.name}
                                    />
                                ))}
                            </Marquee>
                            <Marquee
                                pauseOnHover
                                className="[--duration:90s]"
                                repeat={3}
                            >
                                {firstRow.map((review) => (
                                    <ReviewCard
                                        key={`fifth-${review.id}`}
                                        author={review.author}
                                        review={review.review}
                                        rating={review.rating}
                                        eventName={review.event.name}
                                    />
                                ))}
                            </Marquee>
                        </div>

                        <div className="z-10 mx-auto size-24 border bg-white/10 p-3 shadow-2xl backdrop-blur-md lg:size-32 dark:bg-black/10">
                            <HeartHandshake className="mx-auto size-16 text-black lg:size-24 dark:text-white" />
                        </div>

                        <div className="z-10 mt-4 flex flex-col items-center text-center text-black dark:text-white">
                            <div className="mb-3 flex items-center gap-2">
                                <span className="text-primary text-sm font-medium tracking-wider uppercase">
                                    Konsultasi Gratis
                                </span>
                            </div>

                            <h1 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">
                                Butuh Rekomendasi Program?
                            </h1>

                            <p className="text-muted-foreground mt-2 max-w-md text-sm md:text-base">
                                Ingin tahu pelatihan mana yang cocok dengan
                                bidang dokter saat ini? Klik tombol di bawah
                                untuk berkonsultasi langsung dengan tim Dokter
                                Spesial.
                            </p>

                            <Button
                                asChild
                                size="lg"
                                className="group mt-6 bg-green-600 px-8 text-white hover:bg-green-700"
                            >
                                <Link
                                    to={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle className="mr-2 size-4" />
                                    Konsultasi Sekarang via WhatsApp
                                    <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-white to-70% dark:to-black" />
                    </div>
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
}

export const CTASection = memo(CTASectionComponent);
