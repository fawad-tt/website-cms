import type { CollectionConfig } from 'payload'
import {
  canCreateForSites,
  canUpdateSiteContent,
  canDeleteSiteContent,
  isAdminOrHasSiteAccess,
} from '../../access'
import { userSitesFilter } from '../../utils'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'site', 'order', 'isFeatured', 'updatedAt'],
    description: 'Manage frequently asked questions for each site',
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
        description: 'Select the site this FAQ belongs to',
      },
    },
    {
      name: 'question',
      type: 'textarea',
      required: true,
      label: 'Question',
      admin: {
        description: 'The frequently asked question',
      },
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      label: 'Answer',
      admin: {
        description: 'The answer to the question',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
      min: 0,
      label: 'Display Order',
      admin: {
        description: 'Display order for sorting FAQs (lower numbers appear first)',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      required: true,
      label: 'Featured FAQ',
      defaultValue: false,
      admin: {
        description: 'Display this FAQ on the home page or as a commonly asked question',
      },
    },
  ],
  timestamps: true,
}
