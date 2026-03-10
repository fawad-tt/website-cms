import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import {
  canCreateForSites,
  canUpdateSiteContent,
  canDeleteSiteContent,
  isAdminOrHasSiteAccess,
} from '../../access'
import { userSitesFilter, selectedSiteOrGlobalFilter } from '../../utils'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'site', 'order', 'isFeatured', 'updatedAt'],
    description: 'Manage services offered for each site',
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
        description: 'Select the site this service belongs to',
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
              label: 'Service Name',
              admin: {
                description: 'Name of the service',
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
                description: 'Display order for sorting services (lower numbers appear first)',
              },
            },
            {
              name: 'isFeatured',
              type: 'checkbox',
              label: 'Featured Service',
              defaultValue: false,
              admin: {
                description: 'Display this service on the home page',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Service Image',
              filterOptions: selectedSiteOrGlobalFilter,
              admin: {
                description: 'Image for the service',
              },
            },
            {
              name: 'cardDescription',
              type: 'textarea',
              required: true,
              label: 'Card Description',
              admin: {
                description: 'Brief description displayed on service cards/listings',
              },
            },
          ],
        },
        {
          label: 'Detail Page',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Page Heading (H1)',
              admin: {
                description: 'Main heading displayed on the service detail page',
              },
            },
            {
              name: 'paragraph',
              type: 'textarea',
              required: true,
              label: 'Page Paragraph',
              admin: {
                description:
                  'Paragraph text displayed below the main heading (rendered in <p> tag)',
              },
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
              label: 'Page Content',
              admin: {
                description: 'Main content for the service detail page (rich text editor)',
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
