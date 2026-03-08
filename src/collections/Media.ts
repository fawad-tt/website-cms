import type { CollectionConfig } from 'payload'
import { ValidationError } from 'payload'
import {
  isAdminOrHasSiteAccess,
  canCreateForSites,
  canUpdateSiteContent,
  canDeleteSiteContent,
  isAdmin,
} from '../access'
import { userSitesFilter } from '../utils/filters'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'site', 'updatedAt'],
  },
  access: {
    read: ({ req }) => {
      // Allow public access to file serving (when accessing /api/media/file/*)
      // This checks if the request is for a file download vs collection data
      if (req.url?.includes('/api/media/file/')) {
        return true
      }
      // Otherwise use normal access control for collection data
      return isAdminOrHasSiteAccess({ req })
    },
    create: canCreateForSites,
    update: canUpdateSiteContent,
    delete: canDeleteSiteContent,
  },
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create') {
          if (!isAdmin({ req }) && !data.site) {
            throw new ValidationError({
              errors: [
                {
                  path: 'site',
                  message:
                    'Please select a site. You are not allowed to create media without a site.',
                },
              ],
            })
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'site',
      type: 'relationship',
      relationTo: 'sites',
      required: false,
      index: true,
      label: 'Site',
      filterOptions: userSitesFilter,
      admin: {
        description:
          'Select the site this media belongs to. Leave empty for global media (admin only).',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Alternative text for the image (for accessibility and SEO)',
      },
    },
  ],
  upload: true,
}
