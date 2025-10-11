export const PRICING_PLANS = [
  {
    name: "Paket Residents",
    description: "Untuk dokter residen dan fresh graduate",
    price: {
      monthly: 299000,
      yearly: 2990000,
    },
    features: [
      "Akses ke 50+ modul pembelajaran spesialisasi",
      "Video kasus klinis interaktif",
      "Simulasi diagnosis berbasis AI",
      "E-journal medis terkini",
      "Konsultasi dengan senior dokter",
      "Sertifikat SKP (Satuan Kredit Profesi)",
      "Akses 24/7 selama 6 bulan",
    ],
    cta: "Mulai Belajar",
    popular: false,
    color: "default",
  },
  {
    name: "Paket Specialist",
    description: "Untuk dokter spesialis yang ingin mengembangkan expertise",
    price: {
      monthly: 599000,
      yearly: 5990000,
    },
    features: [
      "Semua fitur Paket Residents",
      "Mentoring 1-on-1 dengan profesor",
      "Akses exclusive webinar internasional",
      "Case study review personal",
      "Live surgery observation",
      "Research collaboration opportunity",
      "Continuing Medical Education (CME)",
      "International conference access",
      "Akses selamanya",
    ],
    cta: "Upgrade Specialist",
    popular: true,
    color: "primary",
  },
  {
    name: "Paket Institution",
    description: "Untuk rumah sakit dan institusi pendidikan",
    price: {
      monthly: 1299000,
      yearly: 12990000,
    },
    features: [
      "Semua fitur Paket Specialist",
      "Custom curriculum development",
      "Multi-user dashboard analytics",
      "Dedicated medical education consultant",
      "On-site training dan workshop",
      "Custom certification program",
      "EMR integration support",
      "Priority medical support",
      "Bulk user management system",
      "Quality assurance reporting",
    ],
    cta: "Hubungi Tim Medical",
    popular: false,
    color: "secondary",
  },
];

export const PRICING_FAQ = [
  {
    question: "Apakah ada uji coba gratis untuk dokter?",
    answer: "Ya, kami menyediakan akses gratis selama 14 hari untuk semua paket. Dokter dapat mencoba semua fitur pembelajaran medis tanpa komitmen.",
  },
  {
    question: "Bagaimana cara pembayaran untuk institusi medis?",
    answer: "Kami menerima pembayaran melalui transfer bank, e-wallet, dan kartu kredit. Untuk institusi, tersedia sistem invoice dan pembayaran korporat.",
  },
  {
    question: "Apakah SKP (Satuan Kredit Profesi) diakui IDI?",
    answer: "Ya, semua sertifikat dan SKP yang kami berikan telah diakui oleh Ikatan Dokter Indonesia (IDI) dan dapat digunakan untuk re-registrasi.",
  },
  {
    question: "Apakah tersedia update materi medis terbaru?",
    answer: "Materi pembelajaran kami selalu diperbarui sesuai dengan perkembangan ilmu kedokteran terkini dan guidelines internasional terbaru.",
  },
];