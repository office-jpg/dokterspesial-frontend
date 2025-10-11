import type { BlogProps } from '~/types'
import type { Blog } from '~/types/api'
import { transformBlogToProps } from '~/lib/blog-transformer'

const RAW_BLOG_DATA: Blog[] = [
  {
    id: 1,
    name: '5 Kesalahan Umum dalam Menulis Systematic Review',
    slug: '5-kesalahan-umum-dalam-menulis-systematic-review',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80',
    content:
      '<p>Pelajari kesalahan yang sering dilakukan peneliti pemula dalam menulis systematic review. Ketahui cara menghindari kesalahan tersebut untuk meningkatkan kualitas penelitian Anda. Tips praktis untuk menyusun systematic review yang sesuai dengan standar jurnal ilmiah.</p>',
    category: 'Tips',
    author: 'Dr. Sarah Johnson',
    created_at: '2024-01-15T00:00:00.000000Z',
    updated_at: '2024-01-15T00:00:00.000000Z',

    featured: true,
    title: '5 Kesalahan Umum dalam Menulis Systematic Review',
    excerpt:
      'Pelajari kesalahan yang sering dilakukan peneliti pemula dan cara menghindarinya untuk menghasilkan systematic review berkualitas tinggi.',
    readTime: '5 min read',
    publishedAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Cara Memilih Jurnal yang Tepat untuk Publikasi',
    slug: 'cara-memilih-jurnal-yang-tepat-untuk-publikasi',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80',
    content:
      '<p>Strategi jitu untuk memilih jurnal yang sesuai dengan penelitian Anda. Meningkatkan peluang acceptance dengan memahami kriteria jurnal. Tips praktis untuk menyesuaikan manuskrip dengan pedoman jurnal.</p>',
    category: 'Artikel',
    author: 'Prof. Ahmad Rahman',
    created_at: '2024-01-10T00:00:00.000000Z',
    updated_at: '2024-01-10T00:00:00.000000Z',
    featured: false,
    title: 'Cara Memilih Jurnal yang Tepat untuk Publikasi',
    excerpt:
      'Strategi jitu untuk memilih jurnal yang sesuai dengan penelitian Anda dan meningkatkan peluang acceptance.',
    readTime: '7 min read',
    publishedAt: '2024-01-10',
  },
  {
    id: 3,
    name: 'Meta-Analysis: Dari Konsep hingga Implementasi',
    slug: 'meta-analysis-dari-konsep-hingga-implementasi',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80',
    content:
      '<p>Panduan lengkap untuk memahami konsep meta-analysis. Langkah-langkah praktis untuk melakukan meta-analysis dalam penelitian kesehatan. Tips untuk mengatasi tantangan umum dalam meta-analysis.</p>',
    category: 'Tips',
    author: 'Dr. Maria Santos',
    created_at: '2024-01-05T00:00:00.000000Z',
    updated_at: '2024-01-05T00:00:00.000000Z',
    featured: false,
    title: 'Meta-Analysis: Dari Konsep hingga Implementasi',
    excerpt:
      'Panduan lengkap untuk memahami dan melakukan meta-analysis dalam penelitian kesehatan dengan pendekatan praktis.',
    readTime: '10 min read',
    publishedAt: '2024-01-05',
  },
  {
    id: 4,
    name: 'Panduan Lengkap Literature Review untuk Penelitian Kesehatan',
    slug: 'panduan-lengkap-literature-review-untuk-penelitian-kesehatan',
    image:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80',
    content:
      '<p>Strategi untuk melakukan literature review yang efektif. Cara menyusun literature review secara sistematis. Tips untuk mengidentifikasi sumber literatur yang relevan.</p>',
    category: 'Artikel',
    author: 'Dr. Bambang Prasetyo',
    created_at: '2024-01-20T00:00:00.000000Z',
    updated_at: '2024-01-20T00:00:00.000000Z',
    featured: true,
    title: 'Panduan Lengkap Literature Review untuk Penelitian Kesehatan',
    excerpt:
      'Strategi komprehensif untuk melakukan literature review yang efektif dan sistematis dalam penelitian kesehatan.',
    readTime: '8 min read',
    publishedAt: '2024-01-20',
  },
  {
    id: 5,
    name: 'Menguasai Statistik Dasar untuk Penelitian Medis',
    slug: 'menguasai-statistik-dasar-untuk-penelitian-medis',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80',
    content:
      '<p>Konsep statistik fundamental untuk penelitian medis. Cara menganalisis data dengan tepat menggunakan alat statistik. Studi kasus untuk memahami penerapan statistik dalam penelitian.</p>',
    category: 'Tips',
    author: 'Prof. Dr. Siti Aminah',
    created_at: '2024-01-25T00:00:00.000000Z',
    updated_at: '2024-01-25T00:00:00.000000Z',
    featured: false,
    title: 'Menguasai Statistik Dasar untuk Penelitian Medis',
    excerpt:
      'Pelajari konsep statistik fundamental yang diperlukan untuk menganalisis data penelitian medis dengan tepat.',
    readTime: '12 min read',
    publishedAt: '2024-01-25',
  },
]

const BLOG_POSTS: BlogProps[] = RAW_BLOG_DATA.map(transformBlogToProps)

export { BLOG_POSTS }
