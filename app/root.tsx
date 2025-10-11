import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse,
} from "react-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

import type { Route } from "./+types/root";
import { ReactQueryProvider } from "./providers/react-query-provider";
import { THEME, getStorageItem, setStorageItem } from "./utils/local-storage";
import { initializeTheme } from "./lib/theme";
import { siteConfig } from "./lib/site";
import {
    JsonLd,
    createOrganizationSchema,
    createWebsiteSchema,
    createSitelinkSearchBoxSchema,
} from "./lib/json-ld";
import "./styles/globals.css";

export const handle = {
    id: "root",
};

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
    { rel: "manifest", href: "/site.webmanifest" },
    { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
    { rel: "canonical", href: siteConfig.url },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/favicon-96x96.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
    },
    { rel: "msapplication-config", href: "/browserconfig.xml" },
];

export function Layout({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined" || !window.localStorage) {
            return "light";
        }
        return initializeTheme();
    });

    useLayoutEffect(() => {
        const storedTheme = getStorageItem(THEME);
        if (storedTheme === "light" || storedTheme === "dark") {
            setTheme(storedTheme);
        } else {
            const initialTheme = initializeTheme();
            setTheme(initialTheme);
        }
    }, []);

    useEffect(() => {
        setStorageItem(THEME, theme);
    }, [theme]);
    
    return (
        <html lang="en" suppressHydrationWarning className={theme === "dark" ? "dark" : ""}>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function () {
                                try {
                                    var theme = localStorage.getItem("theme");
                                    if (!theme) {
                                        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                                    }
                                    if (theme === "dark") {
                                        document.documentElement.classList.add("dark");
                                    } else {
                                        document.documentElement.classList.remove("dark");
                                    }
                                } catch (_) {}
                            })();
                        `,
                    }}
                />
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                {/* Primary Meta Tags */}
                <title>{siteConfig.name} - {siteConfig.tagline}</title>
                <meta name="title" content={`${siteConfig.name} - ${siteConfig.tagline}`} />
                <meta name="description" content={siteConfig.description} />
                <meta name="keywords" content={siteConfig.keywords.join(", ")} />
                <meta name="author" content={siteConfig.name} />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="Indonesian" />
                <meta name="revisit-after" content="7 days" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={siteConfig.url} />
                <meta property="og:title" content={`${siteConfig.name} - ${siteConfig.tagline}`} />
                <meta property="og:description" content={siteConfig.description} />
                <meta property="og:image" content={`${siteConfig.url}${siteConfig.ogImage}`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content={siteConfig.name} />
                <meta property="og:locale" content="id_ID" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={siteConfig.url} />
                <meta property="twitter:title" content={`${siteConfig.name} - ${siteConfig.tagline}`} />
                <meta property="twitter:description" content={siteConfig.description} />
                <meta property="twitter:image" content={`${siteConfig.url}${siteConfig.ogImage}`} />

                {/* Additional Meta Tags */}
                <meta name="theme-color" content="#ea580c" />
                <meta name="msapplication-TileColor" content="#ea580c" />
                <meta name="msapplication-TileImage" content="/web-app-manifest-192x192.png" />

                {/* JSON-LD Structured Data */}
                <JsonLd data={createOrganizationSchema()} />
                <JsonLd data={createWebsiteSchema()} />
                <JsonLd data={createSitelinkSearchBoxSchema()} />

                <Meta />
                <Links />
            </head>
                <body>
                    <NuqsAdapter>
                        <ReactQueryProvider>
                            {children}
                        </ReactQueryProvider>
                    </NuqsAdapter>
                    <ScrollRestoration />
                    <Scripts />
                </body>
            </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="container mx-auto p-4 pt-16">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full overflow-x-auto p-4">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
