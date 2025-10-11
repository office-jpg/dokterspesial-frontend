import { Calendar, MapPin, Users, Clock, Video, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ScheduleDetail {
  icon: LucideIcon;
  text: string;
}

export interface ScheduleItem {
  id: number;
  title: string;
  icon: LucideIcon;
  color: string;
  details: ScheduleDetail[];
}

export const SCHEDULE_INFO_DATA: ScheduleItem[] = [
  {
    id: 1,
    title: "Workshop (Offline)",
    icon: Users,
    color: "bg-orange-500",
    details: [
      {
        icon: Clock,
        text: "Diselenggarakan rutin setiap 3-4 kali dalam sebulan"
      },
      {
        icon: MapPin,
        text: "Lokasi: Surabaya"
      },
      {
        icon: Users,
        text: "Peserta terbatas, sistem registrasi early-bird"
      }
    ]
  },
  {
    id: 2,
    title: "Webinar (Online)",
    icon: Video,
    color: "bg-blue-500",
    details: [
      {
        icon: Calendar,
        text: "Diadakan setiap minggu dengan berbagai topik klinis"
      },
      {
        icon: Video,
        text: "Bisa diakses dari mana saja dan kapan saja, dengan rekaman tersedia"
      },
      {
        icon: Award,
        text: "Sertifikat & materi disediakan"
      }
    ]
  }
];

export const SCHEDULE_HIGHLIGHT = {
  title: "Event diselenggarakan dengan sistem terjadwal untuk kualitas optimal",
  description: "Komitmen kami untuk memberikan pengalaman belajar yang terstruktur dan berkualitas tinggi"
};
