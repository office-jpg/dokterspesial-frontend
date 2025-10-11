import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import type { JSX } from 'react'
import { Button } from '~/components/atoms/button'
import {
  Pagination as PaginationBase,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/atoms/pagination'

type PaginationProps = {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  onPageChange?: (page: number) => void
  previousLabel?: string
  nextLabel?: string
  firstPageLabel?: string
  lastPageLabel?: string
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  onPageChange,
  previousLabel = 'Sebelumnya',
  nextLabel = 'Selanjutnya',
  firstPageLabel = 'Halaman Pertama',
  lastPageLabel = 'Halaman Terakhir',
}: PaginationProps) => {
  const handlePageChange = (e: React.MouseEvent, page: number) => {
    e.preventDefault()
    setCurrentPage(page)
    if (onPageChange) {
      onPageChange(page)
    }
  }

  const renderPageLinks = () => {
    const pages: JSX.Element[] = []
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

    if (totalPages <= 3 || isMobile) {
      const maxPages = isMobile ? 3 : totalPages
      const startPage = Math.max(1, currentPage - 1)
      const endPage = Math.min(totalPages, startPage + maxPages - 1)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href='#'
              isActive={currentPage === i}
              onClick={(e) => handlePageChange(e, i)}
              className={`${
                currentPage === i
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary border-0 hover:bg-primary/10 hover:text-primary'
              } transition-all duration-300 text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-10 w-8 sm:w-10`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            href='#'
            isActive={currentPage === 1}
            onClick={(e) => handlePageChange(e, 1)}
            className={`${
              currentPage === 1
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary border-0 hover:bg-primary/10 hover:text-primary'
            } transition-all duration-300 text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-10 w-8 sm:w-10`}
          >
            1
          </PaginationLink>
        </PaginationItem>
      )

      if (currentPage > 3) {
        pages.push(
          <PaginationItem key='start-ellipsis' className='hidden sm:block'>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href='#'
              isActive={currentPage === i}
              onClick={(e) => handlePageChange(e, i)}
              className={`${
                currentPage === i
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary border-0 hover:bg-primary/10 hover:text-primary'
              } transition-all duration-300 text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-10 w-8 sm:w-10`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <PaginationItem key='end-ellipsis' className='hidden sm:block'>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      if (totalPages > 1) {
        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href='#'
              isActive={currentPage === totalPages}
              onClick={(e) => handlePageChange(e, totalPages)}
              className={`${
                currentPage === totalPages
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary border-0 hover:bg-primary/10 hover:text-primary'
              } transition-all duration-300 text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-10 w-8 sm:w-10`}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )
      }
    }

    return pages
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <PaginationBase>
      <PaginationContent className='gap-1 sm:gap-2'>
        <PaginationItem>
          <Button
            variant='ghost'
            size='icon'
            onClick={(e) => handlePageChange(e, 1)}
            disabled={currentPage === 1}
            className='bg-secondary border-0 hover:bg-primary/10 hover:text-primarytransition-all duration-300 disabled:opacity-50'
            title={firstPageLabel}
          >
            <ChevronsLeft className='size-4' />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={(e) => handlePageChange(e, Math.max(currentPage - 1, 1))}
            className={`${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            } bg-secondary border-0 hover:bg-primary/10 hover:text-primary transition-all duration-300 text-xs sm:text-sm px-2 sm:px-3`}
          >
            <span className='hidden sm:inline'>{previousLabel}</span>
            <span className='sm:hidden'>Sebelumnya</span>
          </PaginationPrevious>
        </PaginationItem>

        <div className='flex items-center gap-1 sm:gap-2'>
          {renderPageLinks()}
        </div>

        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={(e) =>
              handlePageChange(e, Math.min(currentPage + 1, totalPages))
            }
            className={`${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            } bg-secondary border-0 hover:bg-primary/10 hover:text-primary transition-all duration-300 text-xs sm:text-sm px-2 sm:px-3`}
          >
            <span className='hidden sm:inline'>{nextLabel}</span>
            <span className='sm:hidden'>Selanjutnya</span>
          </PaginationNext>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant='ghost'
            size='icon'
            onClick={(e) => handlePageChange(e, totalPages)}
            disabled={currentPage === totalPages}
            className='bg-secondary border-0 hover:bg-primary/10 hover:text-primary transition-all duration-300 disabled:opacity-50'
            title={lastPageLabel}
          >
            <ChevronsRight className='size-4' />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </PaginationBase>
  )
}

export default Pagination
