import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import {
  canCreateForSites,
  canUpdateSiteContent,
  canDeleteSiteContent,
  isAdminOrHasSiteAccess,
} from '../../access'
import { userSitesFilter, selectedSiteFilter } from '../../utils'

export const TireBrands: CollectionConfig = {
  slug: 'tire-brands',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'site', 'order', 'isFeatured', 'updatedAt'],
    description: 'Manage tire brands for each site',
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
        description: 'Select the site this tire brand belongs to',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Brand Name',
              admin: {
                description: 'Name of the tire brand',
              },
            },
            slugField({ fieldToUse: 'name' }),
            {
              name: 'order',
              type: 'number',
              required: true,
              defaultValue: 1,
              min: 0,
              label: 'Display Order',
              admin: {
                description: 'Display order for sorting tire brands (lower numbers appear first)',
              },
            },
            {
              name: 'isFeatured',
              type: 'checkbox',
              label: 'Featured Brand',
              defaultValue: false,
              admin: {
                description: 'Display this tire brand as featured',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Brand Logo/Image',
              filterOptions: selectedSiteFilter,
              admin: {
                description: 'Logo or image for the tire brand',
              },
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
              label: 'Brand Description',
              admin: {
                description: 'Detailed description and information about the tire brand',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              required: true,
              label: 'Meta Title',
              admin: {
                description: 'SEO meta title (shown in search results and browser tabs)',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              required: true,
              label: 'Meta Description',
              admin: {
                description: 'SEO meta description (shown in search results)',
              },
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
