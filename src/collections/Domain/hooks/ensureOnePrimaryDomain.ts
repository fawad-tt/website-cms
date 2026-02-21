import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Ensures only one domain per site can be marked as primary.
 * When a domain is set as primary, all other domains for the same site
 * are automatically set to non-primary.
 */
export const ensureOnePrimaryDomain: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  if (data.isPrimary === true) {
    // Site is required at schema level, so it will always be present here
    const siteId = typeof data.site === 'string' ? data.site : data.site?.id

    if (siteId) {
      // Find all other domains for this site that are marked as primary
      const existingPrimaryDomains = await req.payload.find({
        collection: 'domains',
        where: {
          and: [
            { site: { equals: siteId } },
            { isPrimary: { equals: true } },
            // Exclude current document when updating
            ...(operation === 'update' && originalDoc?.id
              ? [{ id: { not_equals: originalDoc.id } }]
              : []),
          ],
        },
        req,
      })

      // If there are other primary domains, unset them
      if (existingPrimaryDomains.docs.length > 0) {
        for (const domain of existingPrimaryDomains.docs) {
          await req.payload.update({
            collection: 'domains',
            id: domain.id,
            data: {
              isPrimary: false,
            },
            req,
          })
        }
      }
    }
  }

  return data
}
