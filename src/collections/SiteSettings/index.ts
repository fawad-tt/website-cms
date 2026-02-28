import type { CollectionConfig } from 'payload'
import {
  isAdmin,
  canCreateForSites,
  canUpdateSiteContent,
  isAdminOrHasSiteAccess,
} from '../../access'
import { validateUniqueSiteSettings } from './hooks/validateUniqueSiteSettings'
import { userSitesFilter, selectedSiteFilter, validateURL, validateEmail } from '../../utils'

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['site', 'updatedAt'],
    description: 'Manage site-specific settings including branding, contact info, and integrations',
  },
  access: {
    read: isAdminOrHasSiteAccess,
    create: canCreateForSites,
    update: canUpdateSiteContent,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [validateUniqueSiteSettings],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          async ({ data, req, collection }) => {
            if (!data?.site) return
            const siteDoc = await req.payload.findByID({ collection: 'sites', id: data.site })
            return `${siteDoc?.name || 'Site'} - Site Settings`
          },
        ],
      },
    },
    {
      name: 'site',
      type: 'relationship',
      relationTo: 'sites',
      required: true,
      unique: true,
      index: true,
      label: 'Site',
      filterOptions: userSitesFilter,
      admin: {
        description:
          'Select the site these settings belong to. Each site can only have one settings record.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Site Logo',
              filterOptions: selectedSiteFilter,
              admin: {
                description: 'Main logo for the site (filtered by site)',
              },
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              label: 'Favicon',
              filterOptions: selectedSiteFilter,
              admin: {
                description:
                  'Small icon displayed in browser tabs (16x16 or 32x32 pixels, filtered by site)',
              },
            },
          ],
        },
        {
          label: 'Contact Information',
          fields: [
            {
              name: 'email',
              type: 'email',
              label: 'Contact Email',
              validate: validateEmail,
              admin: {
                description: 'Primary contact email address for the site',
              },
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook URL',
              validate: validateURL,
              admin: {
                description: 'Full URL to Facebook page (e.g., https://facebook.com/yourpage)',
              },
            },
            {
              name: 'twitter',
              type: 'text',
              label: 'Twitter URL',
              validate: validateURL,
              admin: {
                description: 'Full URL to Twitter/X profile (e.g., https://twitter.com/yourhandle)',
              },
            },
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram URL',
              validate: validateURL,
              admin: {
                description:
                  'Full URL to Instagram profile (e.g., https://instagram.com/yourhandle)',
              },
            },
            {
              name: 'linkedin',
              type: 'text',
              label: 'LinkedIn URL',
              validate: validateURL,
              admin: {
                description:
                  'Full URL to LinkedIn company page (e.g., https://linkedin.com/company/yourcompany)',
              },
            },
          ],
        },
        {
          label: 'SEO & Analytics',
          fields: [
            {
              name: 'googleAnalyticsId',
              type: 'text',
              label: 'Google Analytics ID',
              admin: {
                description:
                  'Google Analytics measurement ID (e.g., G-XXXXXXXXXX or UA-XXXXXXXXX-X)',
              },
            },
            {
              name: 'metaPixelId',
              type: 'text',
              label: 'Meta (Facebook) Pixel ID',
              admin: {
                description: 'Facebook/Meta Pixel ID for tracking and analytics',
              },
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
