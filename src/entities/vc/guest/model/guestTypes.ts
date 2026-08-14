export interface VcGuest {
  id: string;
  nickname: string;
  krwBalance: number;
  lockedKrw: number;
}

export interface VcGuestSessionRes {
  guest: VcGuest | null;
}