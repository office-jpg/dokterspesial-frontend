import { Eye, Smile, Sparkles, Target, Syringe, Stethoscope, Hand } from "lucide-react";
import { HeartPulse, type LucideIcon } from "lucide-react";

const medicalIconMap: Record<string, LucideIcon> = {
    Smile: Smile,
    Sparkles: Sparkles,
    Target: Target,
    Eye: Eye,
    Syringe: Syringe,
    Hand: Hand,
    Stethoscope: Stethoscope,
    HeartPulse: HeartPulse
};

export interface MedicalSpecialization {
    id: number;
    title: string;
    content: string;
    image: string;
    iconName: string;
}

export const MEDICAL_SPECIALIZATIONS_DATA: MedicalSpecialization[] = [
   
    {
        id: 1,
        title: "Aesthetic",
        content:
            "Topik bahasan mencakup teknik terkini di bidang estetika medis, seperti **Skin Booster**, **Botox**, **Rejuvenation**, **Threadlift**, hingga tren perawatan lainnya. Semua disajikan dengan pendekatan ilmiah dan aplikatif, sehingga dokter dapat langsung mengintegrasikannya ke dalam praktik.",
        image: "/images/product/product-1.webp",
        iconName: "Sparkles",
    },
    {
        id: 2,
        title: "Akupunktur",
        content:
            "Skill akupunktur medis untuk manajemen nyeri, rehabilitasi, hingga indikasi klinis modern. Diajarkan dengan pendekatan evidence-based medicine sehingga relevan untuk praktik klinis masa kini.",
        image: "/images/product/product-2.webp",
        iconName: "Hand",
    },
    {
        id: 3,
        title: "Oftalmologi (Mata)",
        content:
            "Workshop dan webinar yang membahas teknik diagnostik dan terapi terkini di bidang oftalmologi, termasuk **pemeriksaan imaging**, **bedah minor**, hingga **tren terapi modern**. Dirancang untuk memperluas kompetensi klinis dan meningkatkan kualitas layanan mata.",
        image: "/images/product/product-3.webp",
        iconName: "Eye",
    },
    {
        id: 4,
        title: "Bedah Series",
        content: "Fokus pada peningkatan skill bedah mulai dari **Bariatric Surgery**, **Lung Resection**, **Rhinoplasty**, hingga berbagai prosedur bedah lainnya. Materi dirancang untuk memperkuat kompetensi klinis dalam menghadapi kasus kompleks maupun elektif.",
        image: "/images/product/product-4.webp",
        iconName: "Syringe",
    },
     {
        id: 5,
        title: "Cardiac",
        content:
            "Mendalami skill kardiologi dengan topik terkini seperti **Echocardiography**, **Cardiac CT**, hingga inovasi lain di bidang kardiovaskular. Ditujukan untuk memperkaya wawasan diagnostik dan intervensi yang aplikatif di praktik klinis.",
        image: "/images/product/product-5.webp",
        iconName: "HeartPulse",
    },
];

export { medicalIconMap };
