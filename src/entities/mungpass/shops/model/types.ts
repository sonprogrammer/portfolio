export interface KakaoPlace{
    id: string;
    place_name: string;
    category_name: string;
    address_name: string;
    road_address_name: string;
    category_group_name?: string;
    phone: string;
    x: string; //경도
    y: string; // 위도
    distance?: string;
}

export interface PartnerKakaoPlace extends KakaoPlace{
    isPartner?: boolean;    //* 제휴 매장인지
    shopId?: string; //* shops테이블 id
}

export interface Coords{
    lat: number;
    lon: number;
}

export interface Bound{
    sw: Coords
    ne: Coords
}
