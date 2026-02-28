import type { FilterOptions } from 'payload'

/**
 * Filter that restricts site selection based on user role
 * - Admins can see all sites
 * - Site managers can only see their assigned sites
 *
 * Use this filter on the site relationship field itself
 */
export const userSitesFilter: FilterOptions<any> = ({ user }) => {
  // Admin can see all sites
  if (user?.roles?.includes('admin')) {
    return true
  }

  if (user?.roles?.includes('site-manager') && user?.sites?.length && user?.sites?.length > 0) {
    const siteIds = user.sites.map((site: any) => {
      if (typeof site === 'string' || typeof site === 'number') return site
      return site.id
    })

    return {
      id: {
        in: siteIds,
      },
    }
  }

  return false
}

/**
 * Filter that shows only items from the same site as the current document
 * Used in relationships to ensure content is site-specific (e.g., media, pages)
 *
 * Assumes the related collection has a 'site' field
 */
export const selectedSiteFilter: FilterOptions<any> = ({ data }) => {
  const siteId =
    typeof data?.site === 'string' || typeof data?.site === 'number' ? data.site : data?.site?.id

  if (!siteId) return false
  return {
    site: {
      equals: siteId,
    },
  }
}
