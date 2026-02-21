import type { Access, FieldAccess } from 'payload'
import { ROLES } from './roles'


export const isAuthenticated: Access = ({ req: { user } }) => {
  return Boolean(user)
}

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes(ROLES.ADMIN))
}

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    if (user.roles?.includes(ROLES.ADMIN)) {
      return true;
    }

    return {
      id: {
        equals: user.id,
      }
    }
  }
  return false;
}


export const isSiteManager: Access = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes(ROLES.SITE_MANAGER))
}


export const isAPIUser: Access = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes(ROLES.API_USER))
}


export const isAdminOrSiteManager: Access = ({ req: { user } }) => {
  return Boolean(
    user?.roles?.includes(ROLES.ADMIN) || user?.roles?.includes(ROLES.SITE_MANAGER),
  )
}


export const isAdminOrAPIUser: Access = ({ req: { user } }) => {
  return Boolean(
    user?.roles?.includes(ROLES.ADMIN) || user?.roles?.includes(ROLES.API_USER),
  )
}


export const isAdminOrHasSiteAccess: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user?.roles?.includes(ROLES.ADMIN)) return true

  if (user?.roles?.includes(ROLES.API_USER)) return true

  if (
    user?.roles?.includes(ROLES.SITE_MANAGER) &&
    user?.sites?.length &&
    user?.sites?.length > 0
  ) {
    const siteIds = user.sites.map((site) => {
      if (typeof site === 'string' || typeof site === 'number') return site
      return site.id
    })

    return {
      or: [
        {
          site: {
            in: siteIds,
          },
        },
        {
          site: {
            exists: false,
          },
        },
      ],
    }
  }

  return false
}


export const canCreateForSites: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user?.roles?.includes(ROLES.ADMIN)) return true

  if (
    user?.roles?.includes(ROLES.SITE_MANAGER) &&
    user?.sites?.length &&
    user?.sites?.length > 0
  ) {
    return true
  }

  return false
}


export const canUpdateSiteContent: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user?.roles?.includes(ROLES.ADMIN)) return true

  if (
    user?.roles?.includes(ROLES.SITE_MANAGER) &&
    user?.sites?.length &&
    user?.sites?.length > 0
  ) {
    const siteIds = user.sites.map((site) => {
      if (typeof site === 'string' || typeof site === 'number') return site
      return site.id
    })

    return {
      or: [
        {
          site: {
            in: siteIds,
          },
        },
        {
          site: {
            exists: false,
          },
        },
      ],
    }
  }

  return false
}


export const canDeleteSiteContent: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user?.roles?.includes(ROLES.ADMIN)) return true

  if (
    user?.roles?.includes(ROLES.SITE_MANAGER) &&
    user?.sites?.length &&
    user?.sites?.length > 0
  ) {
    const siteIds = user.sites.map((site) => {
      if (typeof site === 'string' || typeof site === 'number') return site
      return site.id
    })

    return {
      or: [
        {
          site: {
            in: siteIds,
          },
        },
        {
          site: {
            exists: false,
          },
        },
      ],
    }
  }

  return false
}


export const canReadSites: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user?.roles?.includes(ROLES.ADMIN)) return true

  if (user?.roles?.includes(ROLES.API_USER)) return true

  if (
    user?.roles?.includes(ROLES.SITE_MANAGER) &&
    user?.sites?.length &&
    user?.sites?.length > 0
  ) {
    const siteIds = user.sites.map((site) => {
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


export const canUpdateSites: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user?.roles?.includes(ROLES.ADMIN)) return true

  if (
    user?.roles?.includes(ROLES.SITE_MANAGER) &&
    user?.sites?.length &&
    user?.sites?.length > 0
  ) {
    const siteIds = user.sites.map((site) => {
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

export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes(ROLES.ADMIN))
}

export const isAdminOrSiteManagerFieldLevel: FieldAccess = ({ req: { user } }) => {
  return Boolean(
    user?.roles?.includes(ROLES.ADMIN) || user?.roles?.includes(ROLES.SITE_MANAGER),
  )
}
