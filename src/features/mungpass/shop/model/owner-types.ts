export type MShopStatus = 'pending' | 'approved' | 'rejected';

export interface MOwnerShop {
    id: string;
    owner_id: string | null;
    name: string;
    address_name: string;
    road_address_name: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
    status: MShopStatus;
    is_demo: boolean;
    created_at: string;
}

export interface MCreateShopPayload {
    name: string;
    addressName: string;
    roadAddressName: string;
    phone: string;
}

export interface MCreateShopResult {
    success: boolean;
    message: string;
    shop: MOwnerShop | null;
}