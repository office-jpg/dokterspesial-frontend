import { AlignStartVertical, Drill, Scissors, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface DDItem {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const DD_TECHNIQUES: DDItem[] = [
  {
    title: "Clear Aligner",
    description: "Tren ortodonti modern dengan aligner transparan untuk perawatan estetis dan minim invasif",
    icon: AlignStartVertical,
    color: "bg-blue-500"
  },
  {
    title: "Endodontics", 
    description: "Teknik perawatan saluran akar terkini dengan hasil lebih presisi dan risiko komplikasi rendah",
    icon: Drill,
    color: "bg-green-500"
  },
  {
    title: "Odontectomy",
    description: "Pencabutan gigi impaksi dengan pendekatan operatif yang aman, minim nyeri, dan efisien",
    icon: Scissors,
    color: "bg-red-500"
  },
  {
    title: "Scaling",
    description: "Teknik scaling & polishing terbaru untuk perawatan periodontal yang optimal dan nyaman",
    icon: Sparkles,
    color: "bg-purple-500"
  }
];
