import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "~/components/atoms/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/atoms/accordion";
import { ScrollArea } from "~/components/atoms/scroll-area";
import { NAV_ITEMS } from "~/contents/navigation";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";

interface NavbarMobileProps {
    scrolled: boolean;
}

export default function NavbarMobile({ scrolled }: NavbarMobileProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [openAccordion, setOpenAccordion] = useState<string>("");

    const handleNavigation = () => {
        setIsOpen(false);
    };

    const renderNavItem = (item: any, level: number = 0) => {
        if (item.menu) {
            return (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * level }}
                    key={item.name}
                >
                    <Accordion
                        type="single"
                        collapsible
                        value={openAccordion}
                        onValueChange={setOpenAccordion}
                    >
                        <AccordionItem
                            value={item.name}
                            className="border-none"
                        >
                            <AccordionTrigger className="text-foreground hover:text-primary hover:bg-accent w-full justify-between rounded-md px-2 py-3 text-left text-lg font-medium transition-colors hover:no-underline">
                                {item.name}
                            </AccordionTrigger>
                            <AccordionContent className="space-y-1 pb-2 pl-4">
                                {item.menu.map((child: any, index: number) => (
                                    <Link
                                        key={index}
                                        to={child.href}
                                        className="text-muted-foreground hover:text-foreground hover:bg-accent block rounded-md px-2 py-2 text-base transition-colors"
                                        onClick={handleNavigation}
                                    >
                                        {child.title}
                                    </Link>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </motion.div>
            );
        } else {
            return (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * level }}
                    key={item.name}
                >
                    <Link
                        to={item.slug}
                        className="text-foreground hover:text-primary hover:bg-accent block rounded-md px-2 py-3 text-lg font-medium transition-colors"
                        onClick={handleNavigation}
                    >
                        {item.name}
                    </Link>
                </motion.div>
            );
        }
    };

    return (
        <>
            <header
                id="header-mobile"
                className="fixed top-0 right-0 left-0 z-[999] block transition-all duration-300 md:hidden bg-background/80 py-3 backdrop-blur-md"
            >
                <MaxWidthWrapper>
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center">
                            <img
                                src="/logo/logo-1.webp"
                                alt="DokterSpesial Logo"
                                className="h-auto w-24 object-contain"
                            />
                        </Link>

                        <div className="flex items-center gap-2">
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setIsOpen((v) => !v)}
                                className="text-foreground relative z-[70] md:hidden"
                                aria-expanded={isOpen}
                                aria-label="Toggle menu"
                            >
                                <motion.div className="absolute top-1/2 left-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform">
                                    <motion.span
                                        className="absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out"
                                        animate={{
                                            rotate: isOpen ? 45 : 0,
                                            y: isOpen ? 0 : -6,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            ease: "easeInOut",
                                        }}
                                    />

                                    <motion.span
                                        className="absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out"
                                        animate={{
                                            opacity: isOpen ? 0 : 1,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            ease: "easeInOut",
                                        }}
                                    />

                                    <motion.span
                                        className="absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out"
                                        animate={{
                                            rotate: isOpen ? -45 : 0,
                                            y: isOpen ? 0 : 6,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </motion.div>
                            </Button>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                            className="bg-background/95 border-border fixed top-0 right-0 z-[99] h-full w-[340px] border-l shadow-2xl backdrop-blur-xl md:hidden"
                        >
                            <div className="flex h-full w-full flex-col pt-16">
                                <div className="sr-only">Navigation Menu</div>
                                <div className="sr-only">
                                    Main navigation menu with links to all
                                    sections of the website
                                </div>

                                {/* Scrollable Menu Area */}
                                <div className="flex-1 overflow-hidden">
                                    <ScrollArea className="h-full px-6 py-4">
                                        <div className="space-y-2 pb-4">
                                            {NAV_ITEMS.map((menu, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 * i }}
                                                >
                                                    {renderNavItem(menu)}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>

                                {/* Fixed Contact Section at Bottom */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="border-border bg-background/95 space-y-4 border-t p-6 backdrop-blur-sm"
                                >
                                    <div className="text-center">
                                        <h3 className="mb-1 text-base font-semibold">
                                            Hubungi Kami
                                        </h3>
                                        <p className="text-muted-foreground mb-3 text-sm">
                                            Konsultasi & Informasi
                                        </p>
                                    </div>
                                    <div className="space-y-3">
                                        <Link
                                            to="/kontak"
                                            onClick={handleNavigation}
                                        >
                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="w-full font-medium transition-all hover:scale-105"
                                            >
                                                Hubungi Kami
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
