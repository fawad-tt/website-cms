import type { CollectionConfig } from 'payload'
import {
  canCreateForSites,
  canUpdateSiteContent,
  canDeleteSiteContent,
  isAdminOrHasSiteAccess,
} from '../../access'
import { userSitesFilter, selectedSiteFilter, validateURL } from '../../utils'

export const FinanceOptions: CollectionConfig = {
  slug: 'finance-options',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'site', 'orderNo', 'updatedAt'],
    description: 'Manage financing options available for each site',
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
        description: 'Select the site this finance option belongs to',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Finance Option Name',
      admin: {
        description: 'Name of the financing provider or program (e.g., "Synchrony", "PayPal Credit")',
      },
    },
    {
      name: 'orderNo',
      type: 'number',
      required: true,
      defaultValue: 1,
      min: 0,
      label: 'Display Order',
      admin: {
        description: 'Display order for sorting finance options (lower numbers appear first)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo/Image',
      filterOptions: selectedSiteFilter,
      admin: {
        description: 'Logo or image for the finance option (filtered by site)',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description',
      maxLength: 500,
      admin: {
        description: 'Brief description of the finance option (max 500 characters, ideally 1-2 lines)',
      },
      validate: (value: unknown) => {
        const val = value as string
        if (val && val.length > 500) {
          return 'Description must be less than 500 characters'
        }
        return true
      },
    },
    {
      name: 'linkType',
      type: 'radio',
      required: true,
      defaultValue: 'apply',
      options: [
        {
          label: 'Apply Link',
          value: 'apply',
        },
        {
          label: 'Contact Us',
          value: 'contact',
        },
      ],
      label: 'Link Type',
      admin: {
        description: 'Choose whether to link to an application or contact page',
        layout: 'horizontal',
      },
    },
    {
      name: 'applyLink',
      type: 'text',
      label: 'Application Link',
      validate: validateURL,
      admin: {
        description: 'URL to the finance application page',
        condition: (data, siblingData) => siblingData?.linkType === 'apply',
      },
    },
  ],
  timestamps: true,
}
