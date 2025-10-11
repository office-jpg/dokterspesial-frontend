import Pagination from '~/components/organisms/pagination'

type BlogPaginationProps = {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  onPageChange?: (page: number) => void
}

const BlogPagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  onPageChange,
}: BlogPaginationProps) => {
  return (
    <Pagination
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      previousLabel="Sebelumnya"
      nextLabel="Selanjutnya"
      firstPageLabel="Halaman Pertama"
      lastPageLabel="Halaman Terakhir"
    />
  )
}

export default BlogPagination
