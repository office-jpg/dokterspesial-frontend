import { Outlet } from "react-router";

import Footer from "./footer";
import Navbar from "./navbar";
import { ScrollProgressToTop } from "~/components/molecules/scroll-progress-to-top";

export default function MainLayout() {
    return (
        <main id="main" className="bg-background text-foreground min-h-screen transition-colors duration-300">
            <Navbar />
            <section id="content">
                <Outlet />
            </section>
            <Footer />
            <ScrollProgressToTop showThemeToggle={true} />
        </main>
    );
}
