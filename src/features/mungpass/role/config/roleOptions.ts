import { MungpassRole } from "@/features/mungpass/nav/model/types"

export const roleOptions = [
    {
        value: 'member',
        label: '일반 사용자'
    },
    {
        value: 'owner',
        label: '사장님'
    },
    {
        value: 'admin',
        label: '관리자'
    }
] satisfies {
    value: MungpassRole
    label: string
}[]