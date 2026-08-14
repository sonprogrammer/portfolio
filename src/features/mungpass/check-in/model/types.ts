export interface MCheckInShop {
    id: string;
    name: string;
    address_name: string;
    road_address_name: string | null;
    is_demo: boolean;
}

export interface MShopProduct {
    id: string;
    shop_id: string;
    name: string;
    price: number;
    duration_minutes: number;
    overtime_unit_mins: number;
    overtime_unit_price: number;
    grace_period_mins: number;
}

export interface MCheckInPayload {
    shopId: string;
    productId: string;
    dogId: string;
}

export interface MCheckInResult {
    success: boolean;
    message: string;
}

export interface MCheckInQrPayload {
    type: 'mungpass-check-in';
    shopId: string;
}

export type UsageStatus =
  | 'staying'
  | 'completed'
  | 'cancelled'

export interface GetMyPetUsageParams {
  statuses?: UsageStatus[]
}

export interface MyPetUsageAllInfo {
  id: string
  status: UsageStatus
  created_at: string
  started_at: string
  expected_ended_at: string
  ended_at: string | null
  dog: {
    id: string
    name: string
  }

  shop: {
    id: string
    name: string
  }

  product: {
    id: string
    name: string
    duration_minutes: number
    grace_period_mins: number
    overtime_unit_mins:number
    overtime_unit_price: number
  }
}