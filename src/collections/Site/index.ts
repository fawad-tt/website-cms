import type { CollectionConfig } from 'payload'
import { canReadSites, isAdmin, canUpdateSites, isAdminFieldLevel } from '../../access'

export const Site: CollectionConfig = {
  slug: 'sites',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'createdAt'],
  },
  access: {
    read: canReadSites,
    create: isAdmin,
    update: canUpdateSites,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Site Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug',
      access:{
        update: isAdminFieldLevel,
      },
      maxLength: 40,
      validate: (value: unknown) => {
        // Slug format: lowercase letters, numbers, and hyphens only
        const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

        if (!value || typeof value !== 'string') {
          return 'Slug is required'
        }

        if (value.length > 40) {
          return 'Slug must be 40 characters or less'
        }

        if (!slugPattern.test(value)) {
          return 'Slug must be lowercase letters, numbers, and hyphens only (e.g., my-site-name)'
        }

        return true
      },
      admin: {
        description: 'URL-friendly identifier (lowercase, numbers, hyphens only, max 40 characters)',
      },
    },
  ],
  timestamps: true,
}
