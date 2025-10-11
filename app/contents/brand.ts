import type { LucideIcon } from "lucide-react";
import {
    AlignStartVertical,
    Award,
    Bone,
    BookOpen,
    Brain,
    Drill,
    FileText,
    GraduationCap,
    Hospital,
    Library,
    Scissors,
    Smile,
    Sparkles,
    Star,
    Syringe,
    Target,
    Trophy,
    User,
    Users,
    Zap,
} from "lucide-react";

// Type definitions
export interface BrandStats {
    number: string;
    label: string;
    icon: LucideIcon;
}

export interface BrandBentoFeature {
    Icon: LucideIcon;
    name: string;
    description: string;
}

export interface BrandBenefit {
    text: string;
}

export interface BrandTarget {
    icon: LucideIcon;
    title: string;
    description: string;
}

export interface BrandImages {
    gpa: string[];
    dd: string[];
}

// Enhanced content data with simplified colors
export const BRAND_STATS: BrandStats[] = [
    { number: "5000+", label: "Medical Professionals Trained", icon: Users },
    { number: "50+", label: "Expert Instructors", icon: Award },
    { number: "100+", label: "Training Programs", icon: BookOpen },
    { number: "98%", label: "Satisfaction Rate", icon: Star },
];

export const GPA_BENTO_FEATURES: BrandBentoFeature[] = [
    {
        Icon: Target,
        name: "Workshop Dry Needling",
        description:
            "Teknik penanganan nyeri otot trigger point berbasis anatomi",
    },
    {
        Icon: Zap,
        name: "USG-Guided Pain Management",
        description:
            "Injeksi presisi dengan panduan ultrasonografi",
    },
    {
        Icon: Trophy,
        name: "Blind Injection Training",
        description:
            "Teknik injeksi tanpa alat pandu dengan orientasi anatomi klinis",
    },
    {
        Icon: FileText,
        name: "C-ARM Guided Intervention",
        description:
            "Manajemen nyeri menggunakan fluoroscopy untuk sendi besar & kompleks",
    },
];

export const DD_BENTO_FEATURES: BrandBentoFeature[] = [
    {
        Icon: AlignStartVertical,
        name: "Clear Aligner",
        description:
            "Tren ortodonti modern dengan aligner transparan untuk perawatan estetis & minim invasif",
    },
    {
        Icon: Drill,
        name: "Endodontics",
        description:
            "Teknik perawatan saluran akar terkini dengan hasil lebih presisi",
    },
    {
        Icon: Scissors,
        name: "Odontectomy",
        description:
            "Pencabutan gigi impaksi dengan pendekatan operatif yang aman & minim komplikasi",
    },
    {
        Icon: Sparkles,
        name: "Scaling & Polishing",
        description:
            "Teknik periodontal modern untuk perawatan gigi & gusi yang optimal",
    },
];

export const GPA_BENEFITS: BrandBenefit[] = [
    { text: "Materi berbasis bukti dan tren internasional" },
    { text: "Pemateri ahli di bidang nyeri intervensi" },
    { text: "Hands-on training dengan fasilitas lengkap" },
    { text: "Akses rekaman & materi selamanya" },
    { text: "Pengabdian Masyarakat & Bakti Sosial" },
];

export const DD_BENEFITS: BrandBenefit[] = [
    { text: "Materi relevan dengan kebutuhan klinis sehari-hari" },
    { text: "Pemateri spesialis berpengalaman" },
    { text: "Kombinasi teori & praktik langsung" },
    { text: "Akses materi jangka panjang" },
    { text: "Affordable dengan kualitas premium" },
];

export const GPA_TARGET_AUDIENCE: BrandTarget[] = [
    {
        icon: Brain,
        title: "Neurologi (Sp.N)",
        description: "Fokus pada dokter saraf yang sering menangani kasus nyeri neuropatik, radikulopati, migraine, neuralgia, dan butuh pendekatan intervensi presisi untuk manajemen nyeri kronis.",
    },
    {
        icon: Hospital,
        title: "Kedokteran Fisik & Rehabilitasi (Sp.KFR)",
        description: "Dokter rehab medik yang ingin menguasai USG-guided injection, dry needling, trigger point therapy, untuk mendukung pemulihan fungsi pasien dengan nyeri muskuloskeletal.",
    },
    {
        icon: Syringe,
        title: "Anestesiologi (Sp.An)",
        description: "Spesialis anestesi yang berperan penting dalam intervensi nyeri kronis & perioperatif, termasuk teknik C-ARM guided intervention dan blok saraf.",
    },
    {
        icon: Bone,
        title: "Ortopedi (Sp.OT)",
        description: "Dokter ortopedi yang sering menangani kasus osteoarthritis, nyeri sendi besar, dan trauma muskuloskeletal, sehingga perlu skill injeksi intra-artikular dengan USG atau fluoroscopy.",
    },
];

export const DD_TARGET_AUDIENCE: BrandTarget[] = [
    {
        icon: Smile,
        title: "Dokter Gigi Umum",
        description: "Yang ingin meningkatkan skill klinis sehari-hari seperti scaling & polishing, odontektomi sederhana, sampai perawatan estetik modern (misalnya clear aligner).",
    },
    {
        icon: User,
        title: "Dokter Gigi Spesialis",
        description: "Spesialis konservasi gigi, ortodonti, bedah mulut, periodonsia, dan lainnya yang ingin update teknik terbaru atau memperdalam keterampilan tertentu sesuai bidangnya.",
    },
    {
        icon: GraduationCap,
        title: "Mahasiswa Profesi Kedokteran Gigi (Koas)",
        description: "Calon dokter gigi yang sedang menempuh profesi, supaya dapat gambaran nyata dan skill tambahan yang akan berguna saat praktik mandiri.",
    },
    {
        icon: Library,
        title: "Dosen & Akademisi Kedokteran Gigi",
        description: "Untuk memperkaya metode ajar, menambah wawasan tren terkini, serta mendapatkan perspektif praktis dari berbagai spesialis.",
    },
];

export const BRAND_IMAGES: BrandImages = {
    gpa: [
        "/images/brand/gpa-1.webp",
        "/images/brand/gpa-2.webp",
        "/images/brand/gpa-3.webp",
    ],
    dd: [
        "/images/brand/dd-1.webp",
        "/images/brand/dd-2.webp",
        "/images/brand/dd-3.webp",
    ],
};
