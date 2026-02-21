import type { CollectionConfig } from 'payload'
import { ensureOnePrimaryDomain } from './hooks/ensureOnePrimaryDomain'
import {
  isAdminOrHasSiteAccess,
  canCreateForSites,
  canUpdateSiteContent,
  canDeleteSiteContent,
} from '../../access'

export const Domain: CollectionConfig = {
  slug: 'domains',
  admin: {
    useAsTitle: 'domain',
    defaultColumns: ['domain', 'site', 'isPrimary', 'createdAt'],
  },
  access: {
    read: isAdminOrHasSiteAccess,
    create: canCreateForSites,
    update: canUpdateSiteContent,
    delete: canDeleteSiteContent,
  },
  fields: [
    {
      name: 'domain',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Domain',
      validate: (value: unknown) => {
        // Domain validation pattern
        const domainPattern = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i

        if (!value || typeof value !== 'string') {
          return 'Domain is required'
        }

        // Basic domain format validation
        if (!domainPattern.test(value)) {
          return 'Please enter a valid domain (e.g., example.com, subdomain.example.com)'
        }

        // Check for valid length
        if (value.length > 253) {
          return 'Domain must be 253 characters or less'
        }

        return true
      },
      admin: {
        description: 'Full domain name (e.g., example.com, www.example.com)',
      },
    },
    {
      name: 'site',
      type: 'relationship',
      relationTo: 'sites',
      required: true,
      index: true,
      label: 'Site',
      admin: {
        description: 'The site this domain belongs to',
      },
    },
    {
      name: 'isPrimary',
      type: 'checkbox',
      defaultValue: false,
      label: 'Primary Domain',
      admin: {
        description: 'Mark this as the primary domain for the site. Only one domain per site can be primary.',
      },
    },
  ],
  hooks: {
    beforeChange: [ensureOnePrimaryDomain],
  },
  timestamps: true,
}
