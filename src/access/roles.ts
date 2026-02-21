export const ROLES = {
  ADMIN: 'admin',
  SITE_MANAGER: 'site-manager',
  API_USER: 'api-user',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]


export const ROLE_OPTIONS = [
  { label: 'Admin', value: ROLES.ADMIN },
  { label: 'Site Manager', value: ROLES.SITE_MANAGER },
  { label: 'API User', value: ROLES.API_USER },
]
