import type { CollectionConfig } from 'payload'
import {
  isAdminOrHasSiteAccess,
  canCreateForSites,
  canUpdateSiteContent,
  canDeleteSiteContent,
} from '../../access'
import { validateUniquePageType } from './hooks/validateUniquePageType'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'site', 'isEnabled'],
  },
  access: {
    read: isAdminOrHasSiteAccess,
    create: canCreateForSites,
    update: canUpdateSiteContent,
    delete: canDeleteSiteContent,
  },
  hooks: {
    beforeChange: [validateUniquePageType],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'site',
              type: 'relationship',
              relationTo: 'sites',
              required: true,
              index: true,
              admin: {
                description: 'The site this page belongs to',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Page Title',
            },
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Home', value: 'home' },
                { label: 'About', value: 'about' },
                { label: 'Contact', value: 'contact' },
                { label: 'Reviews', value: 'reviews' },
              ],
              required: true,
              defaultValue: 'home',
              index: true,
              admin: {
                description: 'Page type - each site can only have one page of each type',
              },
            },
            {
              name: 'isEnabled',
              type: 'checkbox',
              defaultValue: true,
              label: 'Enabled',
              admin: {
                description: 'Enable or disable this page',
              },
            },
            {
              name: 'includeInSiteMap',
              type: 'checkbox',
              defaultValue: true,
              label: 'Include in Sitemap',
              admin: {
                description: 'Include this page in the sitemap.xml',
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
              label: 'Meta Title',
              admin: {
                description: 'SEO meta title (recommended: 50-60 characters)',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              admin: {
                description: 'SEO meta description (recommended: 150-160 characters)',
              },
            },
          ],
        },
        {
          label: 'Custom Code',
          fields: [
            {
              name: 'customHeadCode',
              type: 'code',
              label: 'Custom Head Code',
              admin: {
                language: 'html',
                description: 'Custom HTML code to inject in the <head> section',
              },
            },
            {
              name: 'customFooterCode',
              type: 'code',
              label: 'Custom Footer Code',
              admin: {
                language: 'html',
                description: 'Custom HTML code to inject before </body>',
              },
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
