import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthData, UserData } from "../auth";
import { getUrl } from "../utils/navigation";

type Actions = {
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  refresh: () => Promise<void>;
};

type State = {
  user: UserData | null | undefined;
  auth: AuthData | undefined | null;
};

export const useAuthStore = create(
  persist<Actions & State>(
    (set, get) => ({
      user: undefined,
      auth: undefined,
      logout: () => set({ auth: null, user: null }),
      login: async (email: string, password: string) => {
        const loginResponse = await axios.post<AuthData>(getUrl("login"), {
          email,
          password,
        });

        if (loginResponse.status !== 200) {
          throw new Error("Failed to login");
        }

        const meResponse = await axios.get<UserData>(getUrl(["user", "me"]), {
          headers: {
            Authorization: `Bearer ${loginResponse.data.accessToken}`,
          },
        });

        if (meResponse.status !== 200) {
          throw new Error("Failed to fetch user after succesful login");
        }

        set({
          auth: loginResponse.data,
          user: meResponse.data,
        });
      },
      refresh: async () => {
        const refreshResponse = await axios.post<AuthData>(getUrl("refresh"), {
          refreshToken: get().auth?.refreshToken,
        });

        if (refreshResponse.status !== 200) {
          throw new Error("Failed to refresh");
        }

        const meResponse = await axios.get<UserData>(getUrl(["user", "me"]), {
          headers: {
            Authorization: `Bearer ${refreshResponse.data.accessToken}`,
          },
        });

        if (meResponse.status !== 200) {
          throw new Error("Failed to fetch user after refresh");
        }

        set({
          auth: refreshResponse.data,
          user: meResponse.data,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
