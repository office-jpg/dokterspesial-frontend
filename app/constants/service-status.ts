/**
 * Service Status Constants
 * Hardcoded status values as the backend uses enum
 */

export const SERVICE_STATUS = {
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing', 
  ENDED: 'ended'
} as const;

export const SERVICE_STATUS_LABELS = {
  [SERVICE_STATUS.UPCOMING]: 'Akan Datang',
  [SERVICE_STATUS.ONGOING]: 'Sedang Berlangsung',
  [SERVICE_STATUS.ENDED]: 'Telah Berakhir'
} as const;

export const SERVICE_STATUS_LIST = [
  {
    key: SERVICE_STATUS.UPCOMING,
    label: SERVICE_STATUS_LABELS[SERVICE_STATUS.UPCOMING],
    alias: 'Akan Datang',
    emoji: '🕒'
  },
  {
    key: SERVICE_STATUS.ONGOING,
    label: SERVICE_STATUS_LABELS[SERVICE_STATUS.ONGOING],
    alias: 'Sedang Berlangsung',
    emoji: '▶️'
  },
  {
    key: SERVICE_STATUS.ENDED,
    label: SERVICE_STATUS_LABELS[SERVICE_STATUS.ENDED],
    alias: 'Selesai',
    emoji: '✅'
  }
] as const;

export type ServiceStatusType = typeof SERVICE_STATUS[keyof typeof SERVICE_STATUS];

/**
 * Get all status keys
 */
export function getAllStatusKeys(): ServiceStatusType[] {
  return [SERVICE_STATUS.UPCOMING, SERVICE_STATUS.ONGOING, SERVICE_STATUS.ENDED];
}

/**
 * Get default selected statuses (ongoing and upcoming only)
 */
export function getDefaultStatusKeys(): ServiceStatusType[] {
  return [SERVICE_STATUS.UPCOMING, SERVICE_STATUS.ONGOING];
}

/**
 * Get all status keys for when user wants to see all events
 */
export function getAllActiveStatusKeys(): ServiceStatusType[] {
  return getAllStatusKeys();
}

/**
 * Get Indonesian label for status key
 */
export function getStatusLabel(statusKey: string): string {
  const status = SERVICE_STATUS_LIST.find((s) => s.key === statusKey);
  return status?.label || statusKey;
}

/**
 * Get status key from label
 */
export function getStatusKey(label: string): string {
  const status = SERVICE_STATUS_LIST.find((s) => s.label === label || s.alias === label);
  return status?.key || label;
}
