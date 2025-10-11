import { Breadcrumb, type BreadcrumbItem } from '~/components/organisms/breadcrumb'

interface ServiceDetailBreadcrumbProps {
  title: string
}

function ServiceDetailBreadcrumb({ title }: ServiceDetailBreadcrumbProps) {
  const items: BreadcrumbItem[] = [
    {
      label: 'Event',
      href: '/event'
    },
    {
      label: title,
      isActive: true
    }
  ]

  return <Breadcrumb items={items} />
}

export { ServiceDetailBreadcrumb }
