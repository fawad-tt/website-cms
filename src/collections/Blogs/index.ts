import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import {
  canCreateForSites,
  canUpdateSiteContent,
  canDeleteSiteContent,
  isAdminOrHasSiteAccess,
} from '../../access'
import { userSitesFilter, selectedSiteOrGlobalFilter } from '../../utils'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'site', 'orderNo', 'isFeatured', 'updatedAt'],
    description: 'Manage blog posts for each site',
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
        description: 'Select the site this blog post belongs to',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Blog Title',
              admin: {
                description: 'Title of the blog post',
              },
            },
            slugField({ fieldToUse: 'title' }),
            {
              name: 'order',
              type: 'number',
              required: true,
              defaultValue: 1,
              min: 0,
              label: 'Display Order',
              admin: {
                description: 'Display order for sorting blog posts (lower numbers appear first)',
              },
            },
            {
              name: 'isFeatured',
              type: 'checkbox',
              label: 'Featured Post',
              defaultValue: false,
              admin: {
                description: 'Display this blog post on the home page',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Featured Image',
              filterOptions: selectedSiteOrGlobalFilter,
              admin: {
                description: 'Featured image for the blog post',
              },
            },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              label: 'Summary',
              admin: {
                description: 'Brief summary/excerpt displayed on blog cards and listings',
              },
            },
            {
              name: 'readingTime',
              type: 'number',
              label: 'Reading Time (minutes)',
              admin: {
                description: 'Estimated reading time in minutes',
              },
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              label: 'Blog Content',
              admin: {
                description: 'Main content of the blog post (rich text editor)',
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
