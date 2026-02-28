import type { CollectionBeforeChangeHook } from 'payload'
import { ValidationError } from 'payload'

/**
 * Validates that each site can only have one site settings document
 * Ensures uniqueness of site field
 */
export const validateUniqueSiteSettings: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  const siteId = typeof data.site === 'string' ? data.site : data.site?.id

  if (!siteId) {
    return data
  }

  const existingSiteSettings = await req.payload.find({
    collection: 'site-settings',
    where: {
      and: [
        { site: { equals: siteId } },
        ...(operation === 'update' && originalDoc?.id
          ? [{ id: { not_equals: originalDoc.id } }]
          : []),
      ],
    },
    limit: 1,
    req,
  })

  if (existingSiteSettings.docs.length > 0) {
    throw new ValidationError({
      errors: [
        {
          message:
            'Site settings already exist for this site. Each site can only have one settings record.',
          path: 'site',
        },
      ],
    })
  }

  return data
}
