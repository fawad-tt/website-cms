import type { CollectionBeforeChangeHook } from 'payload'
import { ValidationError } from 'payload'

/**
 * Validates that each site can only have one page of each type
 * Ensures composite uniqueness of (site + type)
 */
export const validateUniquePageType: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  // Only validate if both site and type are provided
  if (!data.type) {
    return data
  }

  // Extract siteId, handling various formats
  let siteId: string | number | null = null

  if (data.site) {
    if (typeof data.site === 'string' || typeof data.site === 'number') {
      siteId = data.site
    } else if (typeof data.site === 'object' && data.site.id) {
      siteId = data.site.id
    }
  }

  // If no valid siteId, skip validation (will be caught by required field validation)
  if (!siteId) {
    return data
  }

  // Check if a page with the same site and type already exists
  const existingPages = await req.payload.find({
    collection: 'pages',
    where: {
      and: [
        { site: { equals: siteId } },
        { type: { equals: data.type } },
        // Exclude current document when updating
        ...(operation === 'update' && originalDoc?.id
          ? [{ id: { not_equals: originalDoc.id } }]
          : []),
      ],
    },
    limit: 1,
    req,
  })

  if (existingPages.docs.length > 0) {
    throw new ValidationError({
      errors: [
        {
          message: `A ${data.type} page already exists for this site. Each site can only have one page of each type.`,
          path: 'type',
        },
      ],
    })
  }

  return data
}
