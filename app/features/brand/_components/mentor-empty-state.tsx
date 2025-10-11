import { Users, Search } from 'lucide-react'
import { Card, CardContent } from '~/components/atoms/card'

const MentorEmptyState: React.FC<{
  searchTerm: string
  hasError?: boolean
}> = ({ searchTerm, hasError = false }) => {
  const hasSearch = searchTerm && searchTerm.trim().length > 0

  const getMentorEmptyStateContent = () => {
    if (hasError) {
      return {
        title: 'Gagal memuat data mentor',
        message:
          'Terjadi kesalahan saat mengambil data mentor. Silakan coba lagi nanti atau periksa koneksi internet Anda.',
      }
    }

    if (hasSearch) {
      return {
        title: 'Mentor tidak ditemukan',
        message: `Tidak ada mentor yang cocok dengan pencarian "${searchTerm}". Coba gunakan kata kunci yang berbeda atau periksa ejaan Anda.`,
      }
    }

    return {
      title: 'Belum ada mentor',
      message:
        'Mentor akan ditampilkan di sini setelah data tersedia. Tim kami sedang bekerja untuk menambahkan mentor terbaik.',
    }
  }

  const content = getMentorEmptyStateContent()

  return (
    <Card className='col-span-full border-2 border-dashed bg-orange-50/80 dark:bg-gray-900/60 backdrop-blur-lg shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)] dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(55,65,81,0.8)]'>
      <CardContent className='flex flex-col items-center justify-center px-4 py-12 text-center lg:py-16'>
        <div className='mx-auto flex size-16 items-center justify-center rounded-full bg-muted/50 lg:h-20 lg:w-20'>
          {hasSearch ? (
            <Search className='size-8 text-muted-foreground lg:h-10 lg:w-10' />
          ) : (
            <Users className='size-8 text-muted-foreground lg:h-10 lg:w-10' />
          )}
        </div>
        <h3 className='mt-4 text-lg font-semibold text-foreground lg:mt-6 lg:text-xl'>
          {content.title}
        </h3>
        <p className='mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground lg:mt-3'>
          {content.message}
        </p>
        {hasError && (
          <button
            onClick={() => window.location.reload()}
            className='mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors duration-200'
          >
            Coba Lagi
          </button>
        )}
      </CardContent>
    </Card>
  )
}

export default MentorEmptyState
