export type MungpassMemberPage =
    | 'home'
    | 'shops'
    | 'usage'
    | 'inquiry'

export type MungpassOwnerPage =
    | 'dashboard'
    | 'shop'
    | 'usage'
    | 'sales'

export type MungpassAdminPage =
    | 'dashboard'
    | 'users'
    | 'inquiries'
    | 'shops'

export type MungpassPage =
    | MungpassMemberPage
    | MungpassOwnerPage
    | MungpassAdminPage

export type MungpassRole =
    | 'member'
    | 'owner'
    | 'admin'