import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/atoms/accordion";
import { FlickeringGrid } from "~/components/atoms/flickering-grid";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader from "~/components/atoms/section-header";
import { FAQ_ITEMS } from "~/contents/faq";

export default function FAQSection() {
    return (
        <section
            id="faq"
            className="relative overflow-hidden pt-20 pb-8 md:pt-24 md:pb-24"
        >
            <div className="absolute top-0 left-0 z-0 h-[200px] w-full [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
                <FlickeringGrid
                    className="absolute top-0 left-0 size-full"
                    squareSize={4}
                    gridGap={6}
                    color="#6B7280"
                    maxOpacity={0.2}
                    flickerChance={0.05}
                />
            </div>
            <MaxWidthWrapper className="relative z-10">
                <SectionHeader
                    badge="FAQ"
                    title={
                        <>
                            Pertanyaan yang Sering
                            <br />
                            <span className="text-primary">Diajukan</span>
                        </>
                    }
                />

                <Accordion
                    type="single"
                    collapsible
                    className="grid w-full gap-2 border-b-0"
                >
                    {FAQ_ITEMS.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={index.toString()}
                            className="grid gap-2 border-0"
                        >
                            <AccordionTrigger className="bg-accent border-border data-[state=open]:ring-primary/20 cursor-pointer rounded-none border px-4 py-3.5 no-underline hover:no-underline data-[state=open]:ring">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-foreground bg-accent rounded-none border p-3">
                                <p className="text-foreground leading-relaxed font-medium">
                                    {faq.answer}
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </MaxWidthWrapper>

            <div className="border-border/20 absolute top-40 right-20 size-56 border" />
            <div className="border-border/50 absolute bottom-20 left-10 size-32 border-2" />
        </section>
    );
}
