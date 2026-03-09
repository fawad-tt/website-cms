import type { CollectionConfig, Validate } from 'payload'
import { isAdmin, isAdminOrAPIUser } from '../../access'
import { validateURL } from '@/utils/validators'
import { REBATE_TAG_OPTIONS } from './constants'

const BRAND_OPTIONS = [
  { label: 'BFGoodrich', value: 'bfgoodrich' },
  { label: 'Bridgestone', value: 'bridgestone' },
  { label: 'Continental', value: 'continental' },
  { label: 'Cooper', value: 'cooper' },
  { label: 'Firestone', value: 'firestone' },
  { label: 'General Tire', value: 'general-tire' },
  { label: 'Goodyear', value: 'goodyear' },
  { label: 'Hankook', value: 'hankook' },
  { label: 'Hercules', value: 'hercules' },
  { label: 'Kumho', value: 'kumho' },
  { label: 'Laufenn', value: 'laufenn' },
  { label: 'Michelin', value: 'michelin' },
  { label: 'Mickey Thompson', value: 'mickey-thompson' },
  { label: 'Milestar', value: 'milestar' },
  { label: 'Toyo', value: 'toyo' },
  { label: 'Uniroyal', value: 'uniroyal' },
]

const validateOfferStart: Validate = (value, { data }) => {
  if (!value || !data?.offerValidEnd) return true

  const startDate = new Date(value as string)
  const endDate = new Date(data.offerValidEnd as string)

  if (startDate > endDate) {
    return 'Offer Valid Start date must be equal to or less than Offer Valid End date'
  }

  return true
}

const validateOfferEnd: Validate = (value, { data }) => {
  if (!value || !data?.offerValidStart) return true

  const startDate = new Date(data.offerValidStart as string)
  const endDate = new Date(value as string)

  if (endDate < startDate) {
    return 'Offer Valid End date must be equal to or greater than Offer Valid Start date'
  }

  return true
}

const validateSubmitBy: Validate = (value, { data }) => {
  if (!value || !data?.offerValidStart) return true

  const startDate = new Date(data.offerValidStart as string)
  const submitByDate = new Date(value as string)

  if (submitByDate < startDate) {
    return 'Submit By date must be equal to or greater than Offer Valid Start date'
  }

  return true
}

const validateOnlineFormURL: Validate = (value, ctx) => {
  if (!value && !ctx.data?.mailInFormURL) {
    return 'Online Form URL is required if Mail-In Form URL is not provided'
  }

  if (value) {
    return validateURL(value, ctx)
  }

  return true
}

export const Rebates: CollectionConfig = {
  slug: 'rebates',
  labels: {
    singular: 'Rebate',
    plural: 'Rebates',
  },
  admin: {
    useAsTitle: 'heading',
    defaultColumns: ['heading', 'brand', 'active', 'tags'],
    description: 'Manage tire rebate offers and promotions',
  },
  access: {
    read: isAdminOrAPIUser,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Headline',
      admin: {
        description:
          'Main rebate headline, e.g., "Get up to $100 Off". Include "(Tire Pros Exclusive)" if applicable.',
      },
    },
    {
      name: 'paragraph',
      type: 'textarea',
      required: true,
      label: 'Description',
      admin: {
        description: 'Detailed rebate info including models and disclaimer.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Rebate Image',
      admin: {
        description: 'Rebate card image. Required for display on site.',
      },
    },
    {
      name: 'brand',
      type: 'select',
      required: true,
      label: 'Brand',
      options: BRAND_OPTIONS,
      admin: {
        description: 'Select the tire manufacturer from the predefined list.',
      },
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      required: true,
      label: 'Tags',
      options: REBATE_TAG_OPTIONS,
      admin: {
        description: 'Select one or more tags to classify the rebate.',
      },
    },
    {
      name: 'offerValidStart',
      type: 'date',
      required: true,
      label: 'Offer Valid Start',
      validate: validateOfferStart,
      admin: {
        description: 'Start date when the rebate purchase is valid.',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'offerValidEnd',
      type: 'date',
      required: true,
      label: 'Offer Valid End',
      validate: validateOfferEnd,
      admin: {
        description: 'End date when the rebate purchase is valid.',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'showAfter',
      type: 'date',
      label: 'Show After',
      required: true,
      admin: {
        description: 'Date to start displaying rebate on site.',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'hideAfter',
      type: 'date',
      label: 'Hide After',
      required: true,
      admin: {
        description: 'Date to stop displaying rebate on site.',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'submitBy',
      type: 'date',
      label: 'Submit By',
      validate: validateSubmitBy,
      admin: {
        description: 'Deadline to submit rebate for redemption.',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'onlineFormURL',
      type: 'text',
      label: 'Online Form URL',
      validate: validateOnlineFormURL,
      admin: {
        description: 'URL for manufacturer online rebate submission form.',
      },
    },
    {
      name: 'mailInFormURL',
      type: 'text',
      label: 'Mail-In Form URL',
      validate: validateURL,
      admin: {
        description: 'Link to printable mail-in form.',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      virtual: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Automatically calculated based on showAfter, hideAfter',
      },
    },
  ],
  hooks: {
    afterRead: [
      ({ doc }) => {
        const now = new Date()
        const showAfter = new Date(doc.showAfter)
        const hideAfter = new Date(doc.hideAfter)

        doc.active = now >= showAfter && now <= hideAfter

        return doc
      },
    ],
  },
  timestamps: true,
}
