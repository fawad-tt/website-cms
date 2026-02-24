import type { CollectionBeforeChangeHook } from 'payload'
import { ValidationError } from 'payload'

/**
 * Validates that each site can only have one page contents document
 * Ensures uniqueness of site field
 */
export const validateUniquePageContents: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {

  const siteId = typeof data.site === 'string' ? data.site : data.site?.id

  if (!siteId) {
    return data
  }

  const existingPageContents = await req.payload.find({
    collection: 'page-contents',
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

  if (existingPageContents.docs.length > 0) {
    throw new ValidationError({
      errors: [
        {
          message: 'Page contents already exists for this site. Each site can only have one page contents record.',
          path: 'site',
        },
      ],
    })
  }

  return data
}
