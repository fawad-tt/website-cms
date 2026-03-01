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
        {
          label: 'Widget Credentials',
          fields: [
            {
              name: 'widgets',
              type: 'group',
              fields: [
                {
                  name: 'tireTutor',
                  label: 'Tire Tutor',
                  type: 'group',
                  admin: {
                    description:
                      'Tire Tutor widget credentials (supports Schedule Service, Get Quote, Shop for Tires)',
                  },
                  fields: [
                    {
                      name: 'dealerId',
                      type: 'text',
                      label: 'Dealer ID',
                      admin: {
                        description:
                          'Tire Tutor dealer ID - required if any action uses Tire Tutor',
                      },
                    },
                  ],
                },
                {
                  name: 'tireAnytime',
                  label: 'Tire Anytime',
                  type: 'group',
                  admin: {
                    description: 'Tire Anytime widget credentials (supports Shop for Tires)',
                  },
                  fields: [
                    {
                      name: 'dealerCode',
                      type: 'text',
                      label: 'Dealer Code',
                      admin: {
                        description:
                          'Tire Anytime dealer code - required if any action uses Tire Anytime',
                      },
                    },
                  ],
                },
                {
                  name: 'autoOps',
                  label: 'AutoOps',
                  type: 'group',
                  admin: {
                    description: 'AutoOps widget credentials (supports Schedule Service)',
                  },
                  fields: [
                    {
                      name: 'apiKey',
                      type: 'text',
                      label: 'API Key',
                      admin: {
                        description: 'AutoOps API key - required if any action uses AutoOps',
                      },
                    },
                  ],
                },
                {
                  name: 'repairAnytime',
                  label: 'Repair Anytime',
                  type: 'group',
                  admin: {
                    description: 'Repair Anytime widget credentials (supports Get Quote)',
                  },
                  fields: [
                    {
                      name: 'locationRedirects',
                      label: 'Location Redirect Mapping',
                      type: 'array',
                      admin: {
                        description:
                          'Map each location to its Repair Anytime redirect URL - required if any action uses Repair Anytime',
                      },
                      fields: [
                        {
                          name: 'location',
                          type: 'relationship',
                          relationTo: 'locations',
                          required: true,
                          label: 'Location',
                          filterOptions: ({ data, siblingData }) => {
                            const locationRedirects =
                              data?.widgets?.repairAnytime?.locationRedirects ?? []

                            const currentLocationId = (siblingData as any)?.location

                            const selectedLocationIds = locationRedirects
                              .map(({ location }: any) => location)
                              .filter((id: any) => id != null && id !== currentLocationId)

                            if (!selectedLocationIds.length) return true

                            return {
                              id: {
                                not_in: selectedLocationIds,
                              },
                            }
                          },
                          admin: {
                            description:
                              'Select a location (already selected locations are filtered out)',
                          },
                        },
                        {
                          name: 'redirectUrl',
                          type: 'text',
                          label: 'Redirect URL',
                          required: true,
                          validate: validateURL,
                          admin: {
                            description: 'Full redirect URL for this location',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Action Configuration',
          fields: [
            {
              name: 'actions',
              type: 'group',
              fields: [
                {
                  name: 'shopTires',
                  label: 'Shop Tires',
                  type: 'group',
                  fields: [
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      defaultValue: false,
                      label: 'Enable Shop Tires Action',
                      admin: {
                        description: 'Enable or disable the Shop Tires action on the frontend',
                      },
                    },
                    {
                      name: 'provider',
                      type: 'radio',
                      label: 'Widget Provider',
                      options: [
                        { label: 'Tire Tutor', value: 'tireTutor' },
                        { label: 'Tire Anytime', value: 'tireAnytime' },
                      ],
                      defaultValue: 'tireTutor',
                      admin: {
                        description:
                          'Select which widget provider to use for the Shop Tires action',
                        condition: (data) => data?.actions?.shopTires?.enabled === true,
                      },
                    },
                  ],
                },
                {
                  name: 'scheduleService',
                  label: 'Schedule Service',
                  type: 'group',
                  fields: [
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      defaultValue: false,
                      label: 'Enable Schedule Service Action',
                      admin: {
                        description:
                          'Enable or disable the Schedule Service action on the frontend',
                      },
                    },
                    {
                      name: 'provider',
                      type: 'radio',
                      label: 'Widget Provider',
                      options: [
                        { label: 'Tire Tutor', value: 'tireTutor' },
                        { label: 'AutoOps', value: 'autoOps' },
                      ],
                      defaultValue: 'tireTutor',
                      admin: {
                        description:
                          'Select which widget provider to use for the Schedule Service action',
                        condition: (data) => data?.actions?.scheduleService?.enabled === true,
                      },
                    },
                  ],
                },
                {
                  name: 'getQuote',
                  label: 'Get Quote',
                  type: 'group',
                  fields: [
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      defaultValue: false,
                      label: 'Enable Get Quote Action',
                      admin: {
                        description: 'Enable or disable the Get Quote action on the frontend',
                      },
                    },
                    {
                      name: 'provider',
                      type: 'radio',
                      label: 'Widget Provider',
                      options: [
                        { label: 'Tire Tutor', value: 'tireTutor' },
                        { label: 'Repair Anytime', value: 'repairAnytime' },
                      ],
                      defaultValue: 'tireTutor',
                      admin: {
                        description: 'Select which widget provider to use for the Get Quote action',
                        condition: (data) => data?.actions?.getQuote?.enabled === true,
                      },
                    },
                  ],
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
