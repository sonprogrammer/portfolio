export type MNotificationRole =
    | 'member'
    | 'owner'
    | 'admin'

export type MNotificationType =
    | 'inquiry_answer'
    | 'shop_approved'
    | 'shop_rejected'
    | 'inquiry_waiting'
    | 'shop_pending'

export type MNotificationBadgeColor =
    | 'orange'
    | 'blue'
    | 'red'

export interface MNotificationBadge {
    count: number
    color: MNotificationBadgeColor
}

export interface MRoleNotifications {
    member: MNotificationBadge
    owner: MNotificationBadge
    admin: MNotificationBadge
}