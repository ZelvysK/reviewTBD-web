import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

type TokenType = "Bearer";

export type AuthData = {
  tokenType: TokenType;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

export const authAtom = atomWithStorage<AuthData | undefined>(
  "auth",
  undefined
);

export const userAtom = atom<UserData | undefined>(undefined);

type Role = "User" | "Admin";

export type UserData = {
  id: string;
  userName: string;
  email: string;
  phoneNumber?: string;
  role: Role;
};
