import type { CollectionConfig } from 'payload'
import { isAuthenticated, isAdminOrSiteManager } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: isAuthenticated, 
    create: isAdminOrSiteManager, 
    update: isAdminOrSiteManager, 
    delete: isAdminOrSiteManager, 
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
