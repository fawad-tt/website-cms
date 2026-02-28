import type { CollectionConfig } from 'payload'
import {
  canCreateForSites,
  canUpdateSiteContent,
  canDeleteSiteContent,
  isAdminOrHasSiteAccess,
} from '../../access'
import {
  userSitesFilter,
  validateURL,
  validateEmail,
  validateLatitude,
  validateLongitude,
  validatePositiveNumber,
} from '../../utils'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'site', 'orderNo', 'updatedAt'],
    description: 'Manage store locations for each site',
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
        description: 'Select the site this location belongs to',
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
              label: 'Location Name',
              admin: {
                description: 'Name of the store location',
              },
            },
            {
              name: 'orderNo',
              type: 'number',
              required: true,
              defaultValue: 1,
              min: 0,
              label: 'Order Number',
              admin: {
                description: 'Display order for sorting locations (lower numbers appear first)',
              },
            },
            {
              name: 'phoneDisplay',
              type: 'text',
              label: 'Phone Number (Display)',
              admin: {
                description:
                  'Phone number as it should appear on the website (e.g., "(555) 123-4567")',
              },
            },
            {
              name: 'phoneLink',
              type: 'text',
              label: 'Phone Number (Link)',
              admin: {
                description:
                  'Phone number for tel: links and tracking (e.g., "+15551234567" or tracking number)',
              },
            },
            {
              name: 'email',
              type: 'email',
              label: 'Location Email',
              validate: validateEmail,
              admin: {
                description: 'Contact email address for this location',
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
              name: 'yelp',
              type: 'text',
              label: 'Yelp URL',
              validate: validateURL,
              admin: {
                description:
                  'Full URL to Yelp business page (e.g., https://yelp.com/biz/your-business)',
              },
            },
            {
              name: 'google',
              type: 'text',
              label: 'Google Business URL',
              validate: validateURL,
              admin: {
                description:
                  'Full URL to Google Business profile (e.g., https://g.page/your-business)',
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
              name: 'youtube',
              type: 'text',
              label: 'YouTube URL',
              validate: validateURL,
              admin: {
                description: 'Full URL to YouTube channel (e.g., https://youtube.com/@yourchannel)',
              },
            },
          ],
        },
        {
          label: 'Reviews & Directions',
          fields: [
            {
              name: 'googleReviewLink',
              type: 'text',
              label: 'Google Write a Review Link',
              validate: validateURL,
              admin: {
                description: 'Direct link for customers to write a Google review',
              },
            },
            {
              name: 'directionsLink',
              type: 'text',
              label: 'Get Directions Link',
              validate: validateURL,
              admin: {
                description: 'Link to get directions (e.g., Google Maps link)',
              },
            },
            {
              name: 'totalReviewCount',
              type: 'number',
              label: 'Total Review Count',
              min: 0,
              validate: validatePositiveNumber,
              admin: {
                description: 'Total number of reviews from Google',
              },
            },
            {
              name: 'aggregateRating',
              type: 'number',
              label: 'Aggregate Rating',
              min: 0,
              max: 5,
              admin: {
                description: 'Average rating from Google (0-5 stars)',
              },
            },
          ],
        },
        {
          label: 'Address',
          fields: [
            {
              name: 'address',
              type: 'text',
              required: true,
              label: 'Full Address',
              admin: {
                description: 'Complete address as a single line',
              },
            },
            {
              name: 'streetAddress',
              type: 'text',
              required: true,
              label: 'Street Address',
              admin: {
                description: 'Street number and name (e.g., "123 Main St")',
              },
            },
            {
              name: 'locality',
              type: 'text',
              required: true,
              label: 'City/Locality',
              admin: {
                description: 'City or locality name',
              },
            },
            {
              name: 'region',
              type: 'text',
              required: true,
              label: 'State/Region',
              admin: {
                description: 'State, province, or region (e.g., "CA" or "California")',
              },
            },
            {
              name: 'postalCode',
              type: 'text',
              required: true,
              label: 'Postal Code',
              admin: {
                description: 'ZIP code or postal code',
              },
            },
            {
              name: 'latitude',
              type: 'number',
              label: 'Latitude',
              validate: validateLatitude,
              admin: {
                description: 'Latitude coordinate (-90 to 90)',
              },
            },
            {
              name: 'longitude',
              type: 'number',
              label: 'Longitude',
              validate: validateLongitude,
              admin: {
                description: 'Longitude coordinate (-180 to 180)',
              },
            },
            {
              name: 'googlePlaceId',
              type: 'text',
              label: 'Google Place ID',
              admin: {
                description: 'Google Place ID for the location',
              },
            },
          ],
        },
        {
          label: 'Working Hours',
          fields: [
            {
              name: 'mondayHours',
              type: 'text',
              label: 'Monday Hours',
              admin: {
                description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
              },
            },
            {
              name: 'tuesdayHours',
              type: 'text',
              label: 'Tuesday Hours',
              admin: {
                description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
              },
            },
            {
              name: 'wednesdayHours',
              type: 'text',
              label: 'Wednesday Hours',
              admin: {
                description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
              },
            },
            {
              name: 'thursdayHours',
              type: 'text',
              label: 'Thursday Hours',
              admin: {
                description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
              },
            },
            {
              name: 'fridayHours',
              type: 'text',
              label: 'Friday Hours',
              admin: {
                description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
              },
            },
            {
              name: 'saturdayHours',
              type: 'text',
              label: 'Saturday Hours',
              admin: {
                description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
              },
            },
            {
              name: 'sundayHours',
              type: 'text',
              label: 'Sunday Hours',
              admin: {
                description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
              },
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
