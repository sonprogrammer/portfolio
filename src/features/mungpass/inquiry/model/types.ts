import { MungpassRole } from '@/features/mungpass/nav/model/types';

export type MInquiryStatus = 'waiting' | 'answered' | 'closed';
export type MInquiryRole = 'member' | 'owner' | 'admin';

export interface MInquiryRoom {
    id: string;
    user_id: string;
    user_type: MungpassRole;
    category: string;
    title: string;
    status: MInquiryStatus;
    created_at: string;
    updated_at: string;
}

export interface MInquiryMessage {
    id: string;
    room_id: string;
    sender_id: string;
    sender_role: MungpassRole;
    message: string;
    created_at: string;
}

export interface MCreateInquiryRoomPayload {
    userType: MungpassRole;
    category: string;
    title: string;
    message: string
}

export interface MSendInquiryMessagePayload {
    roomId: string;
    senderRole: MungpassRole;
    message: string;
}