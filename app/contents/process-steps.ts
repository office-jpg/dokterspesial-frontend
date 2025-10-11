export const GPA_PROCESS_STEPS = [
    {
        number: "01",
        title: "Dry Needling",
        description:
            "Teknik intervensi dengan menggunakan jarum filiformis halus dimasukkan ke dalam kulit & otot untuk menstimulasi titik pemicu myofascial (myofascial trigger points) guna mengatasi nyeri neuromuskuloskeletal",
    },
    {
        number: "02",
        title: "USG-Guided Pain Management",
        description:
            "Pelatihan injeksi presisi dengan panduan ultrasonografi. Dokter akan belajar meningkatkan akurasi terapi, mengurangi risiko komplikasi, dan memberikan hasil klinis yang lebih optimal.",
    },
    {
        number: "03",
        title: "Blind Injection berbasis anatomi",
        description:
            "Mengasah keterampilan injeksi tanpa alat pandu, hanya dengan orientasi anatomi klinis. Cocok untuk praktik sehari-hari dengan keterbatasan fasilitas.",
    },
    {
        number: "04",
        title: "Intervensi nyeri dengan C-ARM",
        description:
            "Pelatihan penggunaan fluoroscopy (C-ARM) untuk manajemen nyeri sendi besar dan kompleks. Memberikan pengalaman langsung dalam prosedur intervensi tingkat lanjut.",
    },
    {
        number: "05",
        title: "Prolotherapy Pain Management",
        description:
            "Metode regeneratif untuk mengatasi nyeri kronis dengan injeksi larutan iritan. Membantu dokter memahami indikasi, teknik, dan evidence-based practice untuk hasil terapi yang lebih baik.",
    },
];

export const DD_PROCESS_STEPS = [
    {
        number: "01",
        title: "Clear Aligner",
        description:
            "Pelatihan komprehensif penggunaan clear aligner untuk koreksi maloklusi ringan hingga sedang. Mencakup case selection, treatment planning, dan monitoring progress untuk hasil ortodontik yang optimal.",
    },
    {
        number: "02",
        title: "Endodontics",
        description:
            "Teknik perawatan saluran akar modern dengan instrumentasi rotary dan irrigasi canggih. Meningkatkan success rate dan efisiensi perawatan endodontik dalam praktik sehari-hari.",
    },
    {
        number: "03",
        title: "Odontectomy",
        description:
            "Prosedur pencabutan gigi impaksi dan bedah mulut minor dengan teknik minimal invasive. Focus pada pain management, wound healing, dan komplikasi prevention.",
    },
    {
        number: "04",
        title: "Scaling",
        description:
            "Teknik pembersihan karang gigi dan plak yang efektif untuk menjaga kesehatan periodontal. Kombinasi manual scaling dan ultrasonic untuk hasil yang maksimal dengan patient comfort.",
    },
];

export type ProcessStep = {
    number: string;
    title: string;
    description: string;
};

export type GpaProcessStepsType = typeof GPA_PROCESS_STEPS;
export type DdProcessStepsType = typeof DD_PROCESS_STEPS;

export const PROCESS_STEPS = GPA_PROCESS_STEPS;
export type ProcessStepsType = typeof PROCESS_STEPS;
