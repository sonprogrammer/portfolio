import { MDog } from "@/entities/mungpass/dog/model/types";

export type MUsageStatus = 'staying' | 'completed' | 'cancelled';

export interface MOwnerUsageItem {
    id: string;
    shop_id: string;
    product_id: string;
    dog_id: string;
    started_at: string;
    expected_ended_at: string;
    ended_at: string | null;
    status: MUsageStatus;
    total_price: number;
    extra_charge: number;
    dog: MDog,
    product: {
        name: string;
    } | null;
}

export interface MOwnerDashboardUsage {
    currentCount: number;
    expectedSales: number;
    currentLogs: MOwnerUsageItem[];
}


export interface MOwnerUsageDetail {
    id: string
    shop_id: string
    product_id: string
    dog_id: string
    started_at: string
    expected_ended_at: string
    ended_at: string | null
    status: MUsageStatus
    extra_charge: number
    total_price: number
    dog: MDog
    product: {
        name: string
        overtime_unit_mins: number
        overtime_unit_price: number
        grace_period_mins: number
    }
}

export interface MCheckoutUsagePayload {
    shopId: string
    usageId: string
}

export interface MCheckoutUsageResult {
    usageId: string
    endedAt: string
    overtimeMinutes: number
    extraCharge: number
    totalPrice: number
}
