import { Link } from 'react-router'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm text-muted-foreground mb-6 ${className}`}>
      <Link 
        to="/" 
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="size-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="size-4" />
          {item.href && !item.isActive ? (
            <Link 
              to={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className={`${
                item.isActive 
                  ? "text-foreground font-medium line-clamp-1" 
                  : "text-muted-foreground"
              }`}
            >
              {item.isActive && item.label.length > 50 
                ? `${item.label.substring(0, 50)}...` 
                : item.label
              }
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
