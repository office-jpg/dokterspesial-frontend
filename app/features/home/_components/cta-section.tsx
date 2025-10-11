import { Button } from "~/components/atoms/button";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";
import { useWhatsAppUrl } from "~/hooks/use-whatsapp";

interface CTASectionProps {
    id: string;
    title: string;
    backgroundImage: string;
    rightImage?: string;
    rightImageClassName?: string;
    leftImage?: string;
    leftImageClassName?: string;
    buttonText: string;
    whatsappMessage: string;
    phoneNumber?: string;
    description: string;
    altText: string;
    backgroundColor?: string;
}

export default function CTASection({
    id,
    title,
    backgroundImage,
    rightImage,
    rightImageClassName,
    leftImage,
    leftImageClassName,
    buttonText,
    whatsappMessage,
    phoneNumber,
    description,
    altText,
    backgroundColor = "bg-tertiary dark:bg-tertiary",
}: CTASectionProps) {
    const whatsappUrl = useWhatsAppUrl(whatsappMessage, phoneNumber);
    return (
        <section
            id={id}
            className="flex w-full flex-col items-center justify-center md:py-24 py-8"
        >
            <MaxWidthWrapper className="relative overflow-hidden">
                <motion.div 
                    className={cn(
                        "border-border flex flex-col items-center justify-center relative z-20 h-[400px] w-full overflow-hidden border shadow-xl md:h-[400px]",
                        backgroundColor
                    )}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <img
                        src={backgroundImage}
                        alt={altText}
                        className="absolute inset-0 z-10 h-full w-full object-cover object-right md:object-center"
                    />
                    <div className="z-30 relative flex flex-col items-center justify-center gap-24">
                        <motion.h1 
                            className="max-w-xs text-center text-4xl font-medium tracking-tighter text-white md:max-w-xl md:text-6xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            {title}
                        </motion.h1>
                        <motion.div 
                            className="flex flex-col items-center justify-center gap-4 text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <span className="max-w-md text-sm text-white">
                                {description}
                            </span>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.9 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button 
                                    variant={"outline"} 
                                    size={"lg"}
                                    onClick={() => window.open(whatsappUrl, '_blank')}
                                    className="cursor-pointer bg-white dark:bg-white text-gray-900 dark:text-gray-700 hover:bg-white/80 dark:hover:bg-white/90"
                                >
                                    {buttonText}
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
                {leftImage && (
                    <motion.img
                        src={leftImage}
                        alt={altText}
                        className={cn("md:flex hidden absolute max-w-full", leftImageClassName)}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    />
                )}
                {rightImage && (
                    <motion.img
                        src={rightImage}
                        alt={altText}
                        className={cn("md:flex hidden absolute max-w-full", rightImageClassName)}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    />
                )}
            </MaxWidthWrapper>
        </section>
    );
}
