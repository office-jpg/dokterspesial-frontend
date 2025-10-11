import { Link } from "react-router";

import {
    ChevronRightIcon,
    Instagram,
    Linkedin,
    Twitter,
    Youtube,
} from "lucide-react";

import { FlickeringGrid } from "~/components/atoms/flickering-grid";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import { FOOTER_CONFIG } from "~/contents/footer";
import { useMediaQuery } from "~/hooks/use-media-query";

export default function Footer() {
    const tablet = useMediaQuery("(max-width: 1024px)");

    return (
        <footer
            id="footer"
            className="border-border relative border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]"
        >
            <div className="bg-foreground absolute top-0 right-1/2 left-1/2 h-1.5 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full" />

            <MaxWidthWrapper>
                <div className="flex flex-col gap-8 pt-12 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex max-w-xs flex-col items-start justify-start gap-y-5 lg:max-w-md">
                        <Link to="/" className="flex items-center gap-2">
                            <img
                                src="/logo/logo-1.webp"
                                alt="DokterSpesial Logo"
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-muted-foreground font-medium tracking-tight">
                            {FOOTER_CONFIG.hero.description}
                        </p>
                    </div>
                    <div className="pt-5 md:w-2/3 md:pt-0">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                            {FOOTER_CONFIG.footerLinks.map(
                                (column, columnIndex) => (
                                    <div
                                        key={columnIndex}
                                        className={`flex flex-col space-y-3 ${
                                            column.title === "Produk"
                                                ? "md:col-span-1 lg:col-span-1"
                                                : ""
                                        }`}
                                    >
                                        <h3 className="text-primary text-sm font-semibold">
                                            {column.title}
                                        </h3>
                                        <ul className="space-y-2">
                                            {column.links.map((link) => (
                                                <li
                                                    key={link.id}
                                                    className="group"
                                                >
                                                    <Link
                                                        to={link.url}
                                                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors duration-200"
                                                    >
                                                        {link.title}
                                                        <ChevronRightIcon className="size-3 translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-border/50 mt-8 border-t pt-8">
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} {FOOTER_CONFIG.name}. All
                        rights reserved.
                    </p>
                </div>
            </MaxWidthWrapper>
            <div className="relative z-0 mt-24 h-48 w-full md:h-64">
                <div className="to-background absolute inset-0 z-10 bg-gradient-to-t from-transparent from-40%" />
                <div className="absolute inset-0">
                    <FlickeringGrid
                        text={
                            tablet
                                ? "Dokter Spesial"
                                : "Empower Medical Specialists To The Next Level"
                        }
                        fontSize={tablet ? 70 : 60}
                        className="h-full w-full"
                        squareSize={2}
                        gridGap={tablet ? 2 : 2}
                        color="#6B7280"
                        maxOpacity={0.5}
                        flickerChance={0.1}
                    />
                </div>
            </div>
        </footer>
    );
}
