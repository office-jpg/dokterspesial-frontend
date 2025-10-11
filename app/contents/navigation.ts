import {
    BookOpen,
    Calendar,
    Home,
    LayoutGrid,
    Phone,
    Sparkles,
    Stethoscope,
    UserCheck,
    Waypoints,
} from "lucide-react";

export interface MenuItemType {
    title: string;
    href: string;
    icon: any;
    tagline: string;
    logo?: string;
    logoDark?: string;
}

export interface NavItemType {
    id: number;
    name: string;
    slug: string;
    icon: any;
    menu?: MenuItemType[];
}

export const NAV_ITEMS: NavItemType[] = [
    {
        id: 1,
        name: "Home",
        slug: "/",
        icon: Home,
    },
    // {
    //     id: 2,
    //     name: "Produk",
    //     slug: "/produk",
    //     icon: Sparkles,
    //     menu: [
    //         {
    //             title: "Program Peningkatan Skill",
    //             href: "/produk#program-peningkatan-skill",
    //             icon: Waypoints,
    //             tagline:
    //                 "Event diselenggarakan dengan sistem terjadwal untuk kualitas optimal",
    //         },
    //         {
    //             title: "Dokter Spesial",
    //             href: "/produk#dokter-spesial",
    //             icon: LayoutGrid,
    //             tagline:
    //                 "Pelatihan klinis aplikatif untuk berbagai bidang medis dengan pendekatan praktis, terstruktur, dan relevan dengan kebutuhan lapangan.",
    //         },
    //         {
    //             title: "Global Pain Academy",
    //             href: "/produk#global-pain-academy",
    //             icon: Stethoscope,
    //             tagline:
    //                 "Program peningkatan skill khusus manajemen nyeri yang difasilitasi oleh Dokter Spesial",
    //         },
    //         {
    //             title: "Dokter Dentist ",
    //             href: "/produk#dokter-dentist",
    //             icon: Stethoscope,
    //             tagline: "Konsultasi dengan mentor berpengalaman",
    //         },
    //     ],
    // },
    {
        id: 3,
        name: "Event",
        slug: "/event",
        icon: Calendar,
    },
    {
        id: 4,
        name: "Our Brand",
        slug: "/our-brand",
        icon: UserCheck,
        menu: [
            {
                title: "Global Pain Academy",
                href: "/our-brand#global-pain-academy-brand",
                icon: Stethoscope,
                tagline: "Brand yang berfokus pada pendidikan intervensi manajemen nyeri modern untuk dokter spesialis yang ingin menguasai keterampilan terbaru dalam menangani berbagai kasus nyeri muskuloskeletal maupun kronis.",
                logo: "/brand/gpa.webp",
                logoDark: "/brand/gpa-dark.webp",
            },
            {
                title: "Dokter Dentist",
                href: "/our-brand#doctor-dentist-brand", 
                icon: Stethoscope,
                tagline: "Brand edukasi yang dirancang khusus untuk dokter gigi umum dan spesialis. Fokus kami adalah menghadirkan ilmu kedokteran gigi terkini dengan pendekatan praktis, aplikatif, dan bisa langsung diterapkan dalam praktik sehari-hari.",
                logo: "/brand/dd.webp",
                logoDark: "/brand/dd-dark.webp",
            },
        ],
    },
    {
        id: 5,
        name: "Blog",
        slug: "/blog",
        icon: BookOpen,
    },
    {
        id: 6,
        name: "Kontak",
        slug: "/kontak",
        icon: Phone,
    },
];
