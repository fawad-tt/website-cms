import type { CollectionConfig } from 'payload'
import {
  canCreateForSites,
  canUpdateSiteContent,
  canDeleteSiteContent,
  isAdminOrHasSiteAccess,
} from '../../access'
import { userSitesFilter, validateURL } from '../../utils'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'rating', 'site', 'orderNo', 'isFeatured', 'updatedAt'],
    description: 'Manage customer reviews from Google for each site',
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
        description: 'Select the site this review belongs to',
      },
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Author Name',
      admin: {
        description: 'Name of the person who wrote the review',
      },
    },
    {
      name: 'review',
      type: 'textarea',
      required: true,
      label: 'Review Text',
      admin: {
        description: 'The review content/testimonial',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      label: 'Rating',
      admin: {
        description: 'Rating from 1 to 5 stars',
      },
      validate: (value: unknown) => {
        const val = value as number
        if (val != null && (val < 1 || val > 5)) {
          return 'Rating must be between 1 and 5'
        }
        return true
      },
    },
    {
      name: 'reviewLink',
      type: 'text',
      label: 'Google Review Link',
      validate: validateURL,
      admin: {
        description: 'Direct link to the Google review',
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
        description: 'Display order for sorting reviews (lower numbers appear first)',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured Review',
      defaultValue: false,
      admin: {
        description: 'Display this review on the home page or as a featured testimonial',
      },
    },
  ],
  timestamps: true,
}
