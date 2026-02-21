import type { CollectionConfig, FilterOptions } from 'payload'
import {
  isAdminOrHasSiteAccess,
  canCreateForSites,
  canUpdateSiteContent,
  canDeleteSiteContent,
} from '../../access'
import { validateUniqueSiteNavigation } from './hooks/validateUniqueSiteNavigation'


const selectedSitePageFilter: FilterOptions<any> = ({ data }) => {
  const siteId = 
    typeof data?.site === 'string' || typeof data?.site === 'number'
      ? data.site
      : data?.site?.id;

  if (!siteId) return false;
  // Only show pages from the same site              
  return {
    site: {
      equals: siteId,
    },
  };
}

export const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: {
    useAsTitle: 'site',
    defaultColumns: ['site', 'updatedAt'],
  },
  access: {
    read: isAdminOrHasSiteAccess,
    create: canCreateForSites,
    update: canUpdateSiteContent,
    delete: canDeleteSiteContent,
  },
  hooks: {
    beforeChange: [validateUniqueSiteNavigation],
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
                description: 'The site this navigation belongs to (one navigation per site)',
              },
            },
          ],
        },
        {
          label: 'Header Navigation',
          fields: [
            {
              name: 'header',
              type: 'array',
              labels: {
                singular: 'Header Item',
                plural: 'Header Items',
              },
              admin: {
                description: 'Navigation items for the header menu',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Label',
                },
                {
                  name: 'linkType',
                  type: 'radio',
                  required: true,
                  defaultValue: 'internal',
                  options: [
                    { label: 'Internal Page', value: 'internal' },
                    { label: 'External URL', value: 'external' },
                  ],
                  admin: {
                    layout: 'horizontal',
                  },
                },
                {
                  name: 'page',
                  type: 'relationship',
                  relationTo: 'pages',
                  label: 'Internal Page',
                  filterOptions: selectedSitePageFilter,
                  required: true,
                  admin: {
                    description: 'Link to an internal page (filtered by selected site)',
                    condition: (data, siblingData) => siblingData?.linkType === 'internal',
                  },
                },
                {
                  name: 'externalUrl',
                  type: 'text',
                  label: 'External URL',
                  required: true,
                  admin: {
                    description: 'Link to an external URL (e.g., https://example.com)',
                    condition: (data, siblingData) => siblingData?.linkType === 'external',
                  },
                },
                {
                  name: 'openInNewTab',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Open in New Tab',
                },
                {
                  name: 'order',
                  type: 'number',
                  required: true,
                  defaultValue: 0,
                  label: 'Order',
                  admin: {
                    description: 'Display order (lower numbers appear first)',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Footer Navigation',
          fields: [
            {
              name: 'footer',
              type: 'array',
              labels: {
                singular: 'Footer Item',
                plural: 'Footer Items',
              },
              admin: {
                description: 'Navigation items for the footer menu',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Label',
                },
                {
                  name: 'linkType',
                  type: 'radio',
                  required: true,
                  defaultValue: 'internal',
                  options: [
                    { label: 'Internal Page', value: 'internal' },
                    { label: 'External URL', value: 'external' },
                  ],
                  admin: {
                    layout: 'horizontal',
                  },
                },
                {
                  name: 'page',
                  type: 'relationship',
                  relationTo: 'pages',
                  label: 'Internal Page',
                  filterOptions: selectedSitePageFilter,
                  required: true,
                  admin: {
                    description: 'Link to an internal page (filtered by selected site)',
                    condition: (data, siblingData) => siblingData?.linkType === 'internal',
                  },
                },
                {
                  name: 'externalUrl',
                  type: 'text',
                  label: 'External URL',
                  required: true,
                  admin: {
                    description: 'Link to an external URL (e.g., https://example.com)',
                    condition: (data, siblingData) => siblingData?.linkType === 'external',
                  },
                },
                {
                  name: 'openInNewTab',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Open in New Tab',
                },
                {
                  name: 'order',
                  type: 'number',
                  required: true,
                  defaultValue: 0,
                  label: 'Order',
                  admin: {
                    description: 'Display order (lower numbers appear first)',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
