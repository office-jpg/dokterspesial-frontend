export interface BlogCategory {
  id: number
  name: string
  label?: string
  blogs_count?: number
}

export interface ServiceCategory {
  id: number
  name: string
  label?: string
  services_count?: number
}

export interface ServiceStatus {
  key: string
  label: string
  alias: string
  services_count?: number
}

export interface ServiceLocation {
  key: string
  label: string
  services_count?: number
}

export interface FilterCategory {
  id: number
  name: string
  label?: string
  count?: number
}
