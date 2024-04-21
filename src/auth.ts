type TokenType = "Bearer";

export type AuthData = {
  tokenType: TokenType;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

export const createAuthHeader = (auth: AuthData | undefined | null) => ({
  Authorization: "Bearer " + auth?.accessToken,
});

type Role = "User" | "Admin";

export type UserData = {
  id: string;
  userName: string;
  email: string;
  phoneNumber?: string;
  role: Role;
  firstTimeLogin?: boolean;
};
