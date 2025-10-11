import { memo } from "react";

import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader from "~/components/atoms/section-header";
import CustomStarRating from "~/components/atoms/custom-star-rating";
import type { Review } from "~/types/api";
import { sanitizeContentAsText } from "~/lib/utils";

import { SocialProofTestimonials } from "../_components/testimonial-scroll";

interface TestimonialsSectionProps {
    loaderData?: {
        reviews: Review[];
    };
}

function getInitials(name: string): string {
    const words = name.split(" ").filter((word) => word.length > 0);
    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
    }
    return words
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
}

function convertReviewToTestimonial(review: Review) {
    return {
        id: review.id.toString(),
        name: review.author,
        role: `Peserta ${review.event.name}`,
        img: "",
        description: sanitizeContentAsText(review.review),
        rating: review.rating,
    };
}

function distributeTestimonials(testimonials: any[], maxPerMarquee = 5) {
    const total = Math.min(testimonials.length, maxPerMarquee * 3);
    const activeTestimonials = testimonials.slice(0, total);

    const marquees: any[][] = [[], [], []];

    const centerIndex = 1;
    const leftIndex = 0;
    const rightIndex = 2;

    for (let i = 0; i < activeTestimonials.length; i++) {
        if (i === 0) {
            marquees[centerIndex].push(activeTestimonials[i]);
        } else if (i === 1) {
            marquees[leftIndex].push(activeTestimonials[i]);
        } else if (i === 2) {
            marquees[rightIndex].push(activeTestimonials[i]);
        } else {
            const targetIndex = (i - 3) % 3;
            const actualIndex =
                targetIndex === 0
                    ? centerIndex
                    : targetIndex === 1
                      ? leftIndex
                      : rightIndex;

            if (marquees[actualIndex].length < maxPerMarquee) {
                marquees[actualIndex].push(activeTestimonials[i]);
            }
        }
    }

    return marquees;
}

function TestimonialsSection({
    loaderData,
}: TestimonialsSectionProps) {
    const testimonials =
        loaderData?.reviews?.map(convertReviewToTestimonial) || [];

    const distributedTestimonials = distributeTestimonials(testimonials, 5);

    const allTestimonials = distributedTestimonials.flat();
    return (
        <section id='testimonials' className="relative bg-muted/20 overflow-hidden md:py-24 py-8">
            <MaxWidthWrapper className="relative z-10">
                <SectionHeader
                    badge="Testimoni"
                    title={
                        <>
                            Kata Para Dokter
                            <br />
                            <span className="text-primary">
                                Tentang Platform Kami
                            </span>
                        </>
                    }
                />

                <SocialProofTestimonials testimonials={allTestimonials} />
            </MaxWidthWrapper>

            <div className="border-border/20 absolute top-40 right-20 size-56 border" />
            <div className="border-border/50 absolute bottom-20 left-10 size-32 border-2" />
        </section>
    );
}

export default memo(TestimonialsSection);
