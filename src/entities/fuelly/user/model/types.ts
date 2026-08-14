export type FuellyGender =
    | 'male'
    | 'female';

export type FuellyActivityLevel =
    | 'sedentary'
    | 'light'
    | 'moderate'
    | 'active';

export type FuellyGoal =
    | 'bulk'
    | 'diet'
    | 'maintain';


export interface FuellyProfile {
    height: number;
    weight: number;
    age: number;
    gender: FuellyGender;
    activityLevel: FuellyActivityLevel;
    goal: FuellyGoal;
}

export interface FuellyUser {
    id: string;
    name: string;
    profile: FuellyProfile | null;
}

export interface GetFuellyUserResponse {
    user: FuellyUser | null;
}

export interface LoginFuellyUserPayload {
    name: string;
}


