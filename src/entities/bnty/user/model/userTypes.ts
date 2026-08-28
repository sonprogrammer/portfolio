export type BntyUserRole = 'member' | 'trainer' | null;

export type BntyUser = {
  id: string;
  name: string;
  role: BntyUserRole;
  ptCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateBntyUserRequest = {
  name: string;
  role: BntyUserRole;
};

export type CreateBntyUserResponse = {
  user: BntyUser;
};