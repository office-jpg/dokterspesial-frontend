import {
  Video,
  BookOpen,
  UserCheck,
  Settings,
  Building,
  GraduationCap,
  Award,
  Users,
  Stethoscope,
} from 'lucide-react'

import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Video: Video,
  BookOpen: BookOpen,
  UserCheck: UserCheck,
  Settings: Settings,
  Building: Building,
  GraduationCap: GraduationCap,
  Award: Award,
  Users: Users,
  Stethoscope: Stethoscope,
}

const FEATURED_DETAIL_DATA = [
  {
    title: 'Pelatihan Klinis Aplikatif',
    description:
      'Pengalaman belajar hands-on dengan kasus nyata dari praktik sehari-hari. Setiap sesi dirancang untuk langsung dapat diterapkan di praktik dokter dengan pendekatan step-by-step yang mudah dipahami.',
    content: '/featured/featured-mentor-2.webp',
  },
  {
    title: 'Workshop Teknik Intervensi',
    description:
      'Kuasai teknik-teknik intervensi terbaru dalam berbagai bidang spesialisasi. Mulai dari prosedur estetik, akupunktur medis, hingga teknik oftalmologi dengan bimbingan langsung dari para ahli.',
    content: '/featured/featured-mentor-3.webp',
  },
  {
    title: 'Sertifikasi Resmi',
    description:
      'Dapatkan sertifikat resmi dan SKP (Satuan Kredit Profesi) yang diakui untuk memenuhi kewajiban pendidikan berkelanjutan dokter sesuai standar Kementerian Kesehatan.',
    content: '/featured/featured-mentor-4.webp',
  },
]

const FEATURE_MENTOR_DATA = [
  {
    name: 'Webinar Klinis',
  },
  {
    name: 'Workshop Praktis',
  },
  {
    name: 'Pelatihan Intervensi',
  },
  {
    name: 'Sertifikasi Profesi',
  },
]

const FEATURED_BENEFIT_DATA = [
  {
    id: 1,
    iconName: 'BookOpen',
    title: 'Pelatihan Berbasis Praktik',
    description:
      'Pembelajaran hands-on dengan kasus nyata yang langsung bisa diterapkan dalam praktik kedokteran sehari-hari dengan pendekatan aplikatif.',
    alignment: 'start',
  },
  {
    id: 2,
    iconName: 'UserCheck',
    title: 'Mentor Praktisi Ahli',
    description:
      'Dibimbing langsung oleh dokter spesialis dan praktisi berpengalaman yang aktif dalam bidang kedokteran gigi, estetik, akupunktur, dan oftalmologi.',
    alignment: 'end',
  },
  {
    id: 3,
    iconName: 'Award',
    title: 'Akses Eksklusif Materi',
    description:
      'Dapatkan akses eksklusif ke seluruh rekaman webinar dan workshop klinis. Dirancang untuk dokter yang ingin belajar mendalam tanpa batas waktu, kapan saja dan di mana saja.',
    alignment: 'start',
  },
  {
    id: 4,
    iconName: 'Users',
    title: 'Komunitas Dokter Aktif',
    description:
      'Bergabung dengan komunitas dokter umum dan spesialis untuk sharing knowledge, diskusi kasus, dan networking profesional berkelanjutan.',
    alignment: 'end',
  },
]

const FEATURED_BENEFIT_ROW_DATA = [
  {
    count: 1500,
    subcount: '+',
    iconName: 'Users',
    desc: 'Dokter Tergabung',
  },
  {
    count: 75,
    subcount: '+',
    iconName: 'BookOpen',
    desc: 'Webinar & Workshop',
  },
  {
    count: 4,
    subcount: '',
    iconName: 'Award',
    desc: 'Bidang Spesialisasi',
  },
  {
    count: 20,
    subcount: '+',
    iconName: 'Stethoscope',
    desc: 'Mentor Spesialis',
  },
  {
    count: 100,
    subcount: '%',
    iconName: 'GraduationCap',
    desc: 'Metode Aplikatif',
  },
]

const FEATURED_MODULE_DATA = [
  {
    title: 'Program Webinar Ekslusif',
    subtitle: 'Sesi edukatif ilmiah',
    description:
      'Sesi edukatif ilmiah yang bisa diikuti secara live atau melalui rekaman fleksibel. Cocok untuk dokter dan peneliti yang ingin upgrade pengetahuan dari mana saja.',
    features: [
      'Webinar tematik bulanan',
      'Topik riset & publikasi ilmiah',
      'Sertifikat resmi',
      'Akses rekaman kapan saja',
      'Diskusi interaktif dengan mentor',
      'Diskusi interaktif dengan mentor',
      'Diskusi interaktif dengan mentor',
    ],
    iconName: 'Video',
  },
  {
    title: 'Program Workshop Intensif',
    subtitle: 'Pelatihan berbasis praktik',
    description:
      'Pelatihan berbasis praktik untuk menguasai metode riset dan penulisan ilmiah. Materi disusun step-by-step dan langsung bisa dipraktikkan.',
    features: [
      'Hands-on latihan naskah',
      'Studi kasus publikasi nyata',
      'Template jurnal siap pakai',
      'Akses materi pasca kelas',
      'Sertifikat',
    ],
    iconName: 'BookOpen',
  },
  {
    title: 'Program Mentoring & Konsultasi',
    subtitle: 'Bimbingan personal',
    description:
      'Bimbingan personal atau kelompok untuk membantu peserta menyelesaikan naskah dan submit ke jurnal yang sesuai.',
    features: [
      'Sesi 1-on-1 & group',
      'Review naskah secara langsung',
      'Bantuan revisi reviewer',
      'Strategi pilih jurnal',
      'Jadwal mentoring fleksibel',
    ],
    iconName: 'UserCheck',
  },
  {
    title: 'Program Tools & Teknologi Ilmiah',
    subtitle: 'Tutorial praktis',
    description:
      'Tutorial praktis penggunaan aplikasi & teknologi pendukung riset dan publikasi. Cocok untuk mempercepat proses menulis ilmiah.',
    features: [
      'Zotero & Mendeley',
      'Grammarly & QuillBot',
      'PRISMA, RevMan, Rayyan',
      'VOSviewer',
      'Docking',
    ],
    iconName: 'Settings',
  },
  {
    title: 'Program In House Training',
    subtitle: 'Pelatihan eksklusif institusi',
    description:
      'Pelatihan eksklusif yang dirancang khusus untuk institusi, rumah sakit, atau kampus. Materi bisa disesuaikan dengan kebutuhan tim dan disampaikan langsung oleh mentor ahli.',
    features: [
      'Topik fleksibel sesuai permintaan',
      'Bisa dilakukan onsite atau online',
      'Materi & sertifikat resmi',
      'Bimbingan oleh pakar terverifikasi',
      'Cocok untuk pelatihan internal tim',
    ],
    iconName: 'Building',
  },
  {
    title: 'Program Kelas Intensif Terapan',
    subtitle: 'Program lanjutan',
    description:
      'Program lanjutan dari workshop, dirancang untuk peserta yang ingin pendalaman materi secara lebih teknis dan aplikatif. Dilengkapi sesi bimbingan terbatas, latihan studi kasus, dan final project.',
    features: [
      'Jumlah peserta terbatas (kelas eksklusif)',
      'Bimbingan bertahap dari mentor ahli',
      'Latihan studi kasus & revisi naskah',
      'Output: manuskrip siap submit ke jurnal',
      'Tersedia final review & evaluasi naskah',
    ],
    iconName: 'GraduationCap',
  },
]

export {
  FEATURED_DETAIL_DATA,
  FEATURE_MENTOR_DATA,
  FEATURED_BENEFIT_DATA,
  FEATURED_BENEFIT_ROW_DATA,
  FEATURED_MODULE_DATA,
  iconMap,
}
