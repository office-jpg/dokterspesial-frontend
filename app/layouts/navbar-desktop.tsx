import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";

import { buttonVariants } from "~/components/atoms/button";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "~/components/atoms/navigation-menu";
import { ThemeToggleButton } from "~/components/molecules/toggle-theme-button";
import { MenuListItem } from "~/components/molecules/menu-list-item";
import { NAV_ITEMS } from "~/contents/navigation";
import { useWhatsAppUrl } from "~/hooks/use-whatsapp";
import { cn } from "~/lib/utils";

const BrandLogoSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const brands = [
        {
            light: "/brand/gpa.webp",
            dark: "/brand/gpa-dark.webp",
            alt: "Global Pain Academy"
        },
        {
            light: "/brand/dd.webp", 
            dark: "/brand/dd-dark.webp",
            alt: "Dokter Dentist"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % brands.length);
        }, 2000); // Change every 2 seconds

        return () => clearInterval(interval);
    }, [brands.length]);

    return (
        <div className="mb-2 flex items-center justify-center h-24">
            <div className="relative w-24 h-24 overflow-hidden">
                {brands.map((brand, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                            index === currentIndex 
                                ? 'opacity-100 transform translate-x-0' 
                                : 'opacity-0 transform translate-x-full'
                        }`}
                    >
                        <img
                            src={brand.light}
                            alt={brand.alt}
                            className="block h-full w-full object-contain dark:hidden"
                        />
                        <img
                            src={brand.dark}
                            alt={brand.alt}
                            className="hidden h-full w-full object-contain dark:block"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

interface NavbarDesktopProps {
    scrolled: boolean;
}

export default function NavbarDesktop({ scrolled }: NavbarDesktopProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    const whatsappUrl = useWhatsAppUrl();

    return (
        <header
            id="header"
            className={`fixed top-0 right-0 left-0 z-50 hidden transition-all duration-300 md:block ${
                scrolled
                    ? "bg-background/80 py-3 backdrop-blur-md"
                    : "bg-transparent py-5"
            }`}
        >
            <MaxWidthWrapper>
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center">
                        <img
                            src="/logo/logo-1.webp"
                            alt="DokterSpesial Logo"
                            className="block h-10 w-auto object-contain dark:hidden"
                        />
                        <img
                            src="/logo/logo-1-dark.webp"
                            alt="DokterSpesial Logo"
                            className="hidden h-10 w-auto object-contain dark:block"
                        />
                    </Link>

                    <div className="flex items-center justify-center text-sm font-medium">
                        <NavigationMenu>
                            <NavigationMenuList className="flex items-center gap-2">
                                {NAV_ITEMS.map((item) => (
                                    <NavigationMenuItem key={item.id}>
                                        {item.menu ? (
                                            <>
                                                <NavigationMenuTrigger
                                                    onClick={() =>
                                                        navigate(item.slug)
                                                    }
                                                    className={cn(
                                                        "cursor-pointer px-4 py-2 font-medium transition-all duration-500",
                                                        pathname ===
                                                            item.slug ||
                                                            item.menu.some(
                                                                (menuItem) =>
                                                                    pathname ===
                                                                    menuItem.href
                                                            )
                                                            ? "text-primary bg-primary/10"
                                                            : "text-foreground hover:text-primary hover:bg-primary/10 bg-transparent"
                                                    )}
                                                >
                                                    {item.name}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    <ul
                                                        className={cn(
                                                            "grid gap-1 p-4 md:w-[400px] lg:w-[500px]",
                                                            item.name === "Produk" || item.name === "Our Brand"
                                                                ? "lg:grid-cols-[.75fr_1fr]"
                                                                : "lg:grid-cols-2"
                                                        )}
                                                    >
                                                        {item.name === "Produk" && (
                                                            <li className="relative row-span-4 overflow-hidden pr-2">
                                                                <div className="absolute inset-0 z-10 h-full w-full bg-[linear-gradient(to_right,rgb(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0,0,0,0.05)_1px,transparent_1px)] bg-[size:1rem_1rem] dark:bg-[linear-gradient(to_right,rgb(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255,255,255,0.1)_1px,transparent_1px)]" />
                                                                <NavigationMenuLink asChild>
                                                                    <Link
                                                                        to="/produk"
                                                                        className="from-muted/50 to-muted relative z-20 flex h-full w-full flex-col justify-end bg-gradient-to-b p-4 no-underline outline-none select-none focus:shadow-md"
                                                                    >
                                                                        <div className="mb-2 flex items-center justify-center">
                                                                            <img
                                                                                src="/logo/logo-1.webp"
                                                                                alt="DokterSpesial Logo"
                                                                                className="block h-20 w-auto object-contain dark:hidden"
                                                                            />
                                                                            <img
                                                                                src="/logo/logo-1-dark.webp"
                                                                                alt="DokterSpesial Logo"
                                                                                className="hidden h-20 w-auto object-contain dark:block"
                                                                            />
                                                                        </div>
                                                                        <h6 className="mt-4 mb-2 text-lg font-medium">
                                                                            Semua Event
                                                                        </h6>
                                                                        <p className="text-muted-foreground text-sm leading-tight">
                                                                            Gunakan layanan kami untuk memudahkan Anda.
                                                                        </p>
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        )}
                                                        {item.name === "Our Brand" && (
                                                            <li className="relative row-span-4 overflow-hidden pr-2">
                                                                <div className="absolute inset-0 z-10 h-full w-full bg-[linear-gradient(to_right,rgb(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0,0,0,0.05)_1px,transparent_1px)] bg-[size:1rem_1rem] dark:bg-[linear-gradient(to_right,rgb(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255,255,255,0.1)_1px,transparent_1px)]" />
                                                                <NavigationMenuLink asChild>
                                                                    <Link
                                                                        to="/our-brand"
                                                                        className="from-muted/50 to-muted relative z-20 flex h-full w-full flex-col justify-end bg-gradient-to-b p-4 no-underline outline-none select-none focus:shadow-md"
                                                                    >
                                                                        <BrandLogoSlider />
                                                                        <h6 className="mt-4 mb-2 text-lg font-medium">
                                                                            Our Brand
                                                                        </h6>
                                                                        <p className="text-muted-foreground text-sm leading-tight">
                                                                            Jelajahi brand eksklusif kami.
                                                                        </p>
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        )}
                                                        {item.menu.map((menuItem) => (
                                                            <MenuListItem
                                                                key={menuItem.title}
                                                                title={menuItem.title}
                                                                href={menuItem.href}
                                                                icon={menuItem.icon}
                                                                logo={menuItem.logo}
                                                                logoDark={menuItem.logoDark}
                                                                isBrand={item.name === "Our Brand"}
                                                            >
                                                                {menuItem.tagline}
                                                            </MenuListItem>
                                                        ))}
                                                    </ul>
                                                </NavigationMenuContent>
                                            </>
                                        ) : (
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    to={item.slug}
                                                    className={cn(
                                                        navigationMenuTriggerStyle(),
                                                        "px-4 py-2 font-medium transition-all duration-500",
                                                        pathname === item.slug
                                                            ? "text-primary bg-primary/10"
                                                            : "text-foreground hover:text-primary hover:bg-primary/10 bg-transparent"
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            </NavigationMenuLink>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggleButton />
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
                                    size: "default",
                                }),
                                "font-medium"
                            )}
                        >
                            Hubungi Kami
                        </a>
                    </div>
                </div>
            </MaxWidthWrapper>
        </header>
    );
}
