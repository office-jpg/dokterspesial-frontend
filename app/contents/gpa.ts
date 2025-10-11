import { Zap, Waves, Target, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface GPAItem {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const GPA_TECHNIQUES: GPAItem[] = [
  {
    title: "Workshop Dry Needling",
    description: "Teknik penanganan nyeri otot trigger point berbasis anatomi",
    icon: Zap,
    color: "bg-yellow-500"
  },
  {
    title: "USG-Guided Pain Management", 
    description: "Pelatihan injeksi presisi dengan panduan ultrasonografi",
    icon: Waves,
    color: "bg-blue-500"
  },
  {
    title: "Blind Injection Training",
    description: "Teknik injeksi tanpa alat pandu dengan orientasi anatomi klinis",
    icon: Target,
    color: "bg-red-500"
  },
  {
    title: "C-ARM Guided Intervention",
    description: "Manajemen nyeri menggunakan fluoroscopy untuk sendi besar & kompleks",
    icon: Settings,
    color: "bg-green-500"
  }
];
