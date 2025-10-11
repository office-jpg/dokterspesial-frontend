import { ServiceBoxSkeleton } from './service-box-skeleton'
import { ServiceListSkeleton } from './service-list-skeleton'

interface ResponsiveServiceSkeletonProps {
  count?: number
  showDaftarButton?: boolean
  cardHeight?: string
  contentHeight?: string
  buttonLayout?: 'row' | 'col'
}

export function ResponsiveServiceSkeleton({
  count = 6,
  showDaftarButton = true,
  cardHeight = 'h-[23.5rem]',
  contentHeight = 'h-40',
  buttonLayout = 'row',
}: ResponsiveServiceSkeletonProps) {
  return (
    <>
      <div className='hidden md:contents'>
        <ServiceBoxSkeleton
          count={count}
          showPresenter={true}
          showDaftarButton={showDaftarButton}
          cardHeight={cardHeight}
          contentHeight={contentHeight}
          buttonLayout={buttonLayout}
        />
      </div>

      <div className='flex md:hidden flex-col gap-4 w-full'>
        <ServiceListSkeleton />
      </div>
    </>
  )
}
