import Pagination from '~/components/organisms/pagination'

type MentorPaginationProps = {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  onPageChange?: (page: number) => void
}

const MentorPagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  onPageChange,
}: MentorPaginationProps) => {
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

export default MentorPagination
