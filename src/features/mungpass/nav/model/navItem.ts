import type {MungpassPage, MungpassRole} from './types'

interface MungpassNavItem {
    id: MungpassPage
    label: string
}

export const mungpassNavItems: Record<MungpassRole, MungpassNavItem[]> = {
    member: [
        {
            id: 'home',
            label: '홈',
        },
        {
            id: 'shops',
            label: '시설 찾기',
        },
        {
            id: 'usage',
            label: '이용 내역',
        },
        {
            id: 'inquiry',
            label: '문의',
        },
    ],

    owner: [
        {
            id: 'dashboard',
            label: '대시보드',
        },
        {
            id: 'usage',
            label: '이용 현황',
        },
        {
            id: 'sales',
            label: '매출',
        },
        {
            id: 'shop',
            label: '매장 관리',
        },
    ],

    admin: [
        {
            id: 'dashboard',
            label: '대시보드',
        },
        {
            id: 'shops',
            label: '입점 관리',
        },
        {
            id: 'users',
            label: '회원 관리',
        },
        {
            id: 'inquiries',
            label: '문의 관리',
        },
    ],
}

export const mungpassDefaultPage: Record<MungpassRole, MungpassPage> = {
    member: 'home',
    owner: 'dashboard',
    admin: 'dashboard',
}