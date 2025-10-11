import {
    Instagram,
    Mail,
    Phone,
    Globe,
} from "lucide-react";

import { Button } from "~/components/atoms/button";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader from "~/components/atoms/section-header";

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="relative overflow-hidden md:py-24 py-8"
        >
            <MaxWidthWrapper className="relative z-10">
                <SectionHeader
                    badge="Hubungi Kami"
                    title={
                        <>
                            Mari Diskusi
                            <br />
                            <span className="text-primary">Kebutuhan Anda</span>
                        </>
                    }
                />

                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    <form className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="text-muted-foreground mb-2 block text-sm tracking-widest uppercase"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="bg-muted/20 border-border text-foreground placeholder:text-muted-foreground focus:border-foreground w-full border-2 p-3 transition-colors focus:outline-none"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="text-muted-foreground mb-2 block text-sm tracking-widest uppercase"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="bg-muted/20 border-border text-foreground placeholder:text-muted-foreground focus:border-foreground w-full border-2 p-3 transition-colors focus:outline-none"
                                placeholder="your.email@example.com"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="text-muted-foreground mb-2 block text-sm tracking-widest uppercase"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={5}
                                className="bg-muted/20 border-border text-foreground placeholder:text-muted-foreground focus:border-foreground w-full border-2 p-3 transition-colors focus:outline-none"
                                placeholder="Ceritakan kebutuhan pembelajaran medis Anda..."
                            ></textarea>
                        </div>
                        <Button
                            variant="default"
                            size="lg"
                            className="w-full py-3 font-medium tracking-widest uppercase"
                        >
                            Kirim Pesan
                        </Button>
                    </form>
                    <div className="border-border bg-card/50 h-full border-2 p-8 backdrop-blur-sm">
                        <h3 className="text-foreground mb-6 text-2xl font-bold">
                            Informasi Kontak
                        </h3>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="bg-muted/50 mr-4 rounded-sm p-2">
                                    <Mail className="text-foreground size-5" />
                                </div>
                                <div>
                                    <div className="text-muted-foreground mb-2 text-sm tracking-widest uppercase">
                                        Email
                                    </div>
                                    <a
                                        href="mailto:office@dokterspesial.id"
                                        className="text-foreground hover:text-muted-foreground transition-colors"
                                    >
                                        office@dokterspesial.id
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-muted/50 mr-4 rounded-sm p-2">
                                    <Phone className="text-foreground size-5" />
                                </div>
                                <div>
                                    <div className="text-muted-foreground mb-2 text-sm tracking-widest uppercase">
                                        WhatsApp
                                    </div>
                                    <a
                                        href="https://wa.me/6281291501571"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-foreground hover:text-muted-foreground transition-colors"
                                    >
                                        +62 812-9150-1571
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-muted/50 mr-4 rounded-sm p-2">
                                    <Globe className="text-foreground size-5" />
                                </div>
                                <div>
                                    <div className="text-muted-foreground mb-2 text-sm tracking-widest uppercase">
                                        Website
                                    </div>
                                    <a
                                        href="https://dokterspesial.id"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-foreground hover:text-muted-foreground transition-colors"
                                    >
                                        dokterspesial.id
                                    </a>
                                </div>
                            </div>

                            <div>
                                <div className="text-muted-foreground mb-3 text-sm tracking-widest uppercase">
                                    Social Media
                                </div>
                                <div className="flex gap-4">
                                    <a
                                        href="https://instagram.com/dokterspesial"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-muted/50 hover:bg-muted group rounded-sm p-2 transition-colors"
                                        aria-label="Follow us on Instagram @dokterspesial"
                                    >
                                        <Instagram className="text-muted-foreground group-hover:text-foreground size-5 transition-colors" />
                                    </a>
                                    <a
                                        href="https://tiktok.com/@dokterspesial"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-muted/50 hover:bg-muted group rounded-sm p-2 transition-colors"
                                        aria-label="Follow us on TikTok @dokterspesial"
                                    >
                                        <svg className="text-muted-foreground group-hover:text-foreground size-5 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                        </svg>
                                    </a>
                                </div>
                                <div className="mt-2 text-sm text-muted-foreground">
                                    Instagram: @dokterspesial | TikTok: dokterspesial
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>

            <div className="border-border/50 absolute top-40 right-20 size-32 border-2" />
            <div className="border-border/20 absolute bottom-20 left-10 size-48 border" />
        </section>
    );
}
