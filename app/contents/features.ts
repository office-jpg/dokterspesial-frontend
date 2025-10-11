import {
    BookOpen,
    GraduationCap,
    Shield,
    Users,
    Stethoscope,
    Brain,
    Globe,
    Plane,
} from "lucide-react";

export const GENERAL_FEATURES = [
    {
        icon: BookOpen,
        title: "Pembelajaran Berbasis Kasus",
        description:
            "Belajar melalui studi kasus medis nyata dan simulasi diagnosis interaktif.",
    },
    {
        icon: GraduationCap,
        title: "Sertifikat SKP IDI",
        description:
            "Dapatkan Satuan Kredit Profesi yang diakui IDI untuk re-registrasi dokter.",
    },
    {
        icon: Shield,
        title: "Standar Medis Internasional",
        description:
            "Materi pembelajaran mengikuti guidelines dan standar medis terkini dunia.",
    },
    {
        icon: Users,
        title: "Mentoring Profesor",
        description:
            "Bimbingan langsung dari profesor dan dokter spesialis berpengalaman.",
    },
];

export const HOME_FEATURES = [
    {
        icon: Stethoscope,
        title: "Dokter Spesialis",
        description:
            "Dokter Spesialis yang ingin memperdalam skill subspesifik dan mengikuti perkembangan teknik terkini",
    },
    {
        icon: Brain,
        title: "Dokter Umum",
        description:
            "Dokter Umum yang ingin naik level dengan pelatihan teknis lanjutan di bidang klinis",
    },
    {
        icon: Globe,
        title: "Dokter Praktisi",
        description:
            "Dokter Praktisi di berbagai wilayah Indonesia yang membutuhkan pelatihan terjangkau dan fleksibel",
    },
    {
        icon: Plane,
        title: "Dokter Fellowship",
        description:
            "Dokter yang ingin bersiap mengikuti fellowship atau pelatihan internasional",
    },
];

export type Feature = {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
};

export type GeneralFeaturesType = typeof GENERAL_FEATURES;
export type HomeFeaturesType = typeof HOME_FEATURES;
