import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  canCreateForSites,
  canUpdateSiteContent,
  canDeleteSiteContent,
  isAdminOrHasSiteAccess,
} from '../../access'
import { userSitesFilter } from '../../utils'

export const ServiceArea: CollectionConfig = {
  slug: 'service-area',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'site', 'updatedAt'],
    description: 'Manage service areas for each site',
  },
  access: {
    read: isAdminOrHasSiteAccess,
    create: canCreateForSites,
    update: canUpdateSiteContent,
    delete: canDeleteSiteContent,
  },
  fields: [
    {
      name: 'site',
      type: 'relationship',
      relationTo: 'sites',
      required: true,
      index: true,
      label: 'Site',
      filterOptions: userSitesFilter,
      admin: {
        description: 'Select the site this service area belongs to',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Service Area Name',
      admin: {
        description: 'Name of the service area (e.g., Downtown, North Side, etc.)',
      },
    },
    slugField({ fieldToUse: 'name' }),
    {
      name: 'content',
      type: 'richText',
      required: false,
      label: 'Content',
      editor: lexicalEditor(),
      admin: {
        description: 'Detailed content about this service area',
      },
    },
  ],
  timestamps: true,
}
