import { MungpassUser } from "@/entities/mungpass/user/model/types"

export type MInquiryManageStatus =
    | 'waiting'
    | 'answered'
    | 'closed'

export type MInquiryManageStatusFilter =
    | 'all'
    | MInquiryManageStatus

export type MInquirySenderRole =
    | 'member'
    | 'owner'
    | 'admin'

export interface MInquiryManageRoom {
    id: string
    userId: string
    userName: string
    userType: MInquirySenderRole
    category: string
    title: string
    status: MInquiryManageStatus
    createdAt: string
    updatedAt: string
}

export interface MInquiryManageMessage {
    id: string
    roomId: string
    senderId: string
    senderRole: MInquirySenderRole
    message: string
    createdAt: string
    senderInfo?: MungpassUser
}

export interface MSendAdminInquiryMessagePayload {
    roomId: string
    message: string
}