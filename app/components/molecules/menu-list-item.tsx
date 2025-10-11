import { Link } from "react-router";

import { Stethoscope } from "lucide-react";

import { NavigationMenuLink } from "~/components/atoms/navigation-menu";
import { cn } from "~/lib/utils";

interface MenuListItemProps {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
    children?: React.ReactNode;
    className?: string;
    logo?: string;
    logoDark?: string;
    isBrand?: boolean;
}

export function MenuListItem({
    title,
    href,
    icon: Icon,
    children,
    className,
    logo,
    logoDark,
    isBrand = false,
}: MenuListItemProps) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    to={href}
                    className={cn(
                        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 p-3 leading-none no-underline transition-all duration-100 ease-out outline-none select-none",
                        className
                    )}
                >
                    <div className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
                        {Icon ? (
                            <Icon className="size-4" />
                        ) : logo ? (
                            <>
                                <img
                                    src={logo}
                                    alt={title}
                                    className="block h-4 w-4 object-contain dark:hidden"
                                />
                                <img
                                    src={logoDark}
                                    alt={title}
                                    className="hidden h-4 w-4 object-contain dark:block"
                                />
                            </>
                        ) : (
                            <Stethoscope className="size-4" />
                        )}
                        <h6 className="text-sm !leading-none font-medium">
                            {title}
                        </h6>
                    </div>
                    <p className={`text-muted-foreground ${isBrand ? 'line-clamp-4' : 'line-clamp-2'} text-sm leading-snug`}>
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}

export default MenuListItem;
