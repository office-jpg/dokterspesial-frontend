import {
    BookOpen,
    GraduationCap,
    Lightbulb,
    MapPin,
    Microscope,
    Presentation,
    Users,
    Video,
} from "lucide-react";

export const ABOUT_METRICS = [
    {
        number: 25,
        suffix: "+",
        label: "Mentor Berpengalaman Ahli",
        icon: GraduationCap,
        reverse: false,
    },
    {
        number: 20,
        suffix: "+",
        label: "Workshop",
        icon: Video,
        reverse: true,
    },

    {
        number: 3000,
        suffix: "+",
        label: "Alumni",
        icon: Users,
        reverse: true,
    },
    {
        number: 100,
        suffix: "+",
        label: "Webinar",
        icon: Presentation,
        reverse: false,
    },
];

export const ABOUT_FEATURES = [
    
    {
        title: "Flexible",
        description: "Fleksibel: bisa diakses dari mana saja",
        icon: MapPin,
    },
    {
        title: "Expert-Led",
        description: "Dibimbing langsung oleh para ahli di bidangnya",
        icon: Lightbulb,
    },
    {
        title: "Evidence-Based",
        description: "Mengangkat kasus-kasus nyata dan evidence-based",
        icon: Microscope,
    },
    {
        title: "Practical",
        description: "Disusun sesuai kebutuhan dokter di lapangan",
        icon: BookOpen,
    },
] as const;

export const PARTNER = [
    {
        name: "Dokter Dentist",
        logo: "/brand/dd.webp",
        darkLogo: "/brand/dd-dark.webp",
    },
    {
        name: "Global Pain Academy",
        logo: "/brand/gpa.webp",
        darkLogo: "/brand/gpa-dark.webp",
    },
    {
        name: "Klinik Ilmiah",
        logo: "/partner/klinik-ilmiah.webp",
        darkLogo: "/partner/klinik-ilmiah-dark.webp",
    },
    {
        name: "Dokter Cares",
        logo: "/partner/dokter-cares.webp",
        darkLogo: "/partner/dokter-cares-dark.webp",
    },
    {
        name: "Dokter Post",
        logo: "/partner/dokter-post.webp",
        darkLogo: "/partner/dokter-post-dark.webp",
    },
    {
        name: "JDental",
        logo: "/partner/jdental.webp",
        darkLogo: "/partner/jdental-dark.webp",
    },
    {
        name: "MyoniDLE",
        logo: "/partner/myonidle.webp",
        darkLogo: "/partner/myonidle-dark.webp",
    },
    {
        name: "OneSmile",
        logo: "/partner/onesmile.webp",
        darkLogo: "/partner/onesmile-dark.webp",
    },
    {
        name: "Poltekes Malang",
        logo: "/partner/poltekes-malang.webp",
        darkLogo: "/partner/poltekes-malang-dark.webp",
    },
    {
        name: "RSMH",
        logo: "/partner/rsmh.webp",
        darkLogo: "/partner/rsmh-dark.webp",
    },
    {
        name: "RSSA",
        logo: "/partner/rssa.webp",
        darkLogo: "/partner/rssa-dark.webp",
    },
    {
        name: "RSUD Banyumas",
        logo: "/partner/rsud-banyumas.webp",
        darkLogo: "/partner/rsud-banyumas-dark.webp",
    },
    {
        name: "Sky Ultima",
        logo: "/partner/sky-ultima.webp",
        darkLogo: "/partner/sky-ultima-dark.webp",
    },
    {
        name: "Tanda",
        logo: "/partner/tanda.webp",
        darkLogo: "/partner/tanda-dark.webp",
    },
] as const;

export type AboutMetric = {
    number: number;
    suffix?: string;
    label: string;
    icon: React.ComponentType<any>;
    reverse: boolean;
};

export type AboutFeature = {
    title: string;
    description: string;
    icon: React.ComponentType<any>;
};

export type Partner = {
    name: string;
    logo: string;
    darkLogo: string;
};
