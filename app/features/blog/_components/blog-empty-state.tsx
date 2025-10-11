import { FileText, Search } from 'lucide-react'
import { Card, CardContent } from '~/components/atoms/card'

const BlogEmptyState: React.FC<{
  searchTerm: string
  selectedCategories: string
  isExplicitAllSelection?: boolean
}> = ({ searchTerm, selectedCategories, isExplicitAllSelection = false }) => {
  const hasFilters = searchTerm || selectedCategories
  const hasSearch = searchTerm && searchTerm.trim().length > 0
  const hasCategories =
    selectedCategories && selectedCategories.trim().length > 0
  const categoriesArray = selectedCategories
    ? selectedCategories.split(',').filter((c) => c.trim())
    : []

  const getBlogEmptyStateContent = () => {
    if (!selectedCategories && !isExplicitAllSelection && !searchTerm) {
      return {
        title: 'Pilih kategori untuk melihat artikel',
        message:
          "Silakan pilih minimal satu kategori dari filter di samping untuk melihat artikel yang tersedia, atau klik 'Semua' untuk melihat semua artikel.",
      }
    }

    if (hasSearch && hasCategories) {
      const categoryList = categoriesArray.join(', ')
      return {
        title: 'Artikel tidak ditemukan',
        message: `Tidak ada artikel yang cocok dengan pencarian "${searchTerm}" dalam kategori "${categoryList}". Coba gunakan kata kunci lain atau pilih kategori yang berbeda.`,
      }
    } else if (hasSearch) {
      return {
        title: 'Artikel yang Anda cari tidak ditemukan',
        message: `Tidak ada artikel yang cocok dengan pencarian "${searchTerm}". Coba gunakan kata kunci yang berbeda atau periksa ejaan Anda.`,
      }
    } else if (hasCategories) {
      const categoryList = categoriesArray.join(', ')
      return {
        title: 'Tidak ada artikel dalam kategori ini',
        message: `Belum ada artikel yang dipublikasikan dalam kategori "${categoryList}". Coba pilih kategori lain atau lihat semua artikel.`,
      }
    } else {
      return {
        title: 'Belum ada artikel',
        message: 'Artikel akan ditampilkan di sini setelah dipublikasikan.',
      }
    }
  }

  const content = getBlogEmptyStateContent()

  return (
    <Card className='col-span-1 md:col-span-2 lg:col-span-3 border-2 border-dashed bg-orange-50/80 dark:bg-gray-900/60 backdrop-blur-lg shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)] dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(55,65,81,0.8)]'>
      <CardContent className='flex flex-col items-center justify-center px-4 py-12 text-center lg:py-16'>
        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 lg:h-20 lg:w-20'>
          {hasFilters ? (
            <Search className='h-8 w-8 text-muted-foreground lg:h-10 lg:w-10' />
          ) : (
            <FileText className='h-8 w-8 text-muted-foreground lg:h-10 lg:w-10' />
          )}
        </div>
        <h3 className='mt-4 text-lg font-semibold text-foreground lg:mt-6 lg:text-xl'>
          {content.title}
        </h3>
        <p className='mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground lg:mt-3'>
          {content.message}
        </p>
      </CardContent>
    </Card>
  )
}

export default BlogEmptyState
