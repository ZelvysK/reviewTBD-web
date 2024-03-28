import { atomWithStorage } from "jotai/utils";

type TokenType = "Bearer";

export type AuthData = {
  tokenType: TokenType;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

export const authAtom = atomWithStorage<AuthData | undefined | null>(
  "auth",
  undefined
);

export const userAtom = atomWithStorage<UserData | undefined | null>(
  "user",
  undefined
);

type Role = "User" | "Admin";

export type UserData = {
  id: string;
  userName: string;
  email: string;
  phoneNumber?: string;
  role: Role;
  firstTimeLogin?: boolean;
};
