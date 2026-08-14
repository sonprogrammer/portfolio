export interface MungpassUser {
    id: string;
    name: string;
}

export interface MungpassUserRes{
    success: boolean
    message: string
    user: MungpassUser | null
}