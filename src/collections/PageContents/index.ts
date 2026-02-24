import type { CollectionConfig } from 'payload'
import { isAdmin, canUpdateSiteContent, canReadSiteContent } from '../../access'
import { validateUniquePageContents } from './hooks/validateUniquePageContents'

export const PageContents: CollectionConfig = {
  slug: 'page-contents',
  admin: {
    useAsTitle: 'site',
    defaultColumns: ['site', 'updatedAt'],
    description: 'Manage page contents for a site',
  },
  access: {
    read: isAdminOrHasSiteAccess,
    create: canUpdateSiteContent,
    update: canUpdateSiteContent,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [validateUniquePageContents],
  },
  fields: [
    {
      name: 'site',
      type: 'relationship',
      relationTo: 'sites',
      required: true,
      unique: true,
      index: true,
      label: 'Site',
      admin: {
        description:
          'Select the site this page content belongs to. Each site can only have one page contents record.',
      },
    },
    {
      name: 'homeHero',
      type: 'group',
      label: 'Home Page Hero Section',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          admin: {
            description: 'Main heading for the home page hero section',
          },
        },
        {
          name: 'paragraph',
          type: 'textarea',
          required: true,
          label: 'Paragraph',
          admin: {
            description: 'Paragraph text for the home page hero section',
          },
        },
      ],
    },
    {
      name: 'aboutHero',
      type: 'group',
      label: 'About Page Hero Section',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          admin: {
            description: 'Main heading for the about page hero section',
          },
        },
        {
          name: 'paragraph',
          type: 'textarea',
          required: true,
          label: 'Paragraph',
          admin: {
            description: 'Paragraph text for the about page hero section',
          },
        },
      ],
    },
  ],
  timestamps: true,
}
