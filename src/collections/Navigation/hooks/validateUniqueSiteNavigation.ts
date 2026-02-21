import type { CollectionBeforeChangeHook } from 'payload'
import { ValidationError } from 'payload'

/**
 * Validates that each site can only have one navigation document
 * Ensures uniqueness of site field
 */
export const validateUniqueSiteNavigation: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {

  const siteId = typeof data.site === 'string' ? data.site : data.site?.id

  if (!siteId) {
    return data
  }

  const existingNavigation = await req.payload.find({
    collection: 'navigation',
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

  if (existingNavigation.docs.length > 0) {
    throw new ValidationError({
      errors: [
        {
          message: 'Navigation already exists for this site. Each site can only have one navigation.',
          path: 'site',
        },
      ],
    })
  }

  return data
}
