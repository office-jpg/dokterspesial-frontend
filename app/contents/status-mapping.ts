/**
 * Status Mapping Configuration
 * Maps API status keys to Indonesian labels
 */

export interface StatusMapping {
  key: string
  label: string
  alias: string
  count?: number
}

export const STATUS_LIST: StatusMapping[] = [
  {
    key: 'upcoming',
    label: 'Akan Datang',
    alias: 'Akan Datang',
  },
  {
    key: 'ongoing',
    label: 'Sedang Berlangsung',
    alias: 'Sedang Berlangsung',
  },
  {
    key: 'ended',
    label: 'Selesai',
    alias: 'Selesai',
  },
]

/**
 * Get default selected statuses (upcoming and ongoing only - excludes ended)
 */
export function getDefaultStatusKeys(): string[] {
  return ['upcoming', 'ongoing']
}

/**
 * Get Indonesian label for status key
 */
export function getStatusLabel(statusKey: string): string {
  const status = STATUS_LIST.find((s) => s.key === statusKey)
  return status?.label || statusKey
}

/**
 * Get status key from label
 */
export function getStatusKey(label: string): string {
  const status = STATUS_LIST.find((s) => s.label === label || s.alias === label)
  return status?.key || label
}

/**
 * Get all status keys
 */
export function getAllStatusKeys(): string[] {
  return STATUS_LIST.map((s) => s.key)
}

/**
 * Get active status keys (only upcoming and ongoing for filtering)
 */
export function getActiveStatusKeys(): string[] {
  return STATUS_LIST.filter((s) => s.key !== 'ended').map((s) => s.key)
}

/**
 * Get all status labels
 */
export function getAllStatusLabels(): string[] {
  return STATUS_LIST.map((s) => s.label)
}

/**
 * Get active status labels (only upcoming and ongoing for filtering)
 */
export function getActiveStatusLabels(): string[] {
  return STATUS_LIST.filter((s) => s.key !== 'ended').map((s) => s.label)
}

/**
 * Get status list with counts based on service data
 */
export function getStatusListWithCounts(serviceData: any[]): StatusMapping[] {
  return STATUS_LIST.map(status => {
    const count = serviceData.filter(service => service.status === status.key).length
    return {
      ...status,
      count
    }
  })
}
