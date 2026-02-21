import type { CollectionConfig } from 'payload'
import { isAdminOrSelf,isAdmin,isAdminFieldLevel } from '@/access/accessControl'
import { ROLES,ROLE_OPTIONS } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'roles', 'sites'],
  },
  auth: {
    tokenExpiration: 28800,
    useAPIKey: true, 
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: [ROLES.SITE_MANAGER],
      options: ROLE_OPTIONS,
      saveToJWT: true,
      access: {
        update: isAdminFieldLevel,
        create: isAdminFieldLevel,
      },
      admin: {
        description: 'User roles determine access level across the system',
      },
    },
    {
      name: 'sites',
      type: 'relationship',
      relationTo: 'sites',
      hasMany: true,
      admin: {
        description: 'Sites this user has access to (applies to site-manager role)',
        condition: ({ roles }) => roles && !roles.includes(ROLES.ADMIN),
      },
      access: {
        update: isAdminFieldLevel,
        create: isAdminFieldLevel,
      },
    },
  ],
}
