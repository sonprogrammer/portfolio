export interface MDog {
    id: string
    name: string
    breed: string
    birth_date: string
    weight: number
}

export interface MDogPayload {
    name: string
    breed: string
    birth_date: string;
    weight: number
}

export interface MungpassDogActionResult {
    success: boolean
    message: string
    dog: MDog | null
}