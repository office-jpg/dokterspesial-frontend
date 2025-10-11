import { Breadcrumb, type BreadcrumbItem } from '~/components/organisms/breadcrumb'

interface BlogBreadcrumbProps {
  category?: string
  title?: string
}

export function BlogDetailBreadcrumb({ category, title }: BlogBreadcrumbProps) {
  const items: BreadcrumbItem[] = [
    {
      label: 'Blog',
      href: '/blog'
    }
  ]

  if (category) {
    items.push({
      label: category,
      href: `/blog?category=${encodeURIComponent(category)}`
    })
  }

  if (title) {
    items.push({
      label: title,
      isActive: true
    })
  }

  return <Breadcrumb items={items} />
}
