import { gql } from "@/__generated__";
import { SignInPayload } from "@/__generated__/graphql";
import { client } from "@/main";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthData = SignInPayload["auth"];

type Actions = {
  register: (credentials: {
    email: string;
    password: string;
    displayName: string;
  }) => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

type State = {
  auth?: AuthData;
};

export const SIGN_IN_MUTATION = gql(/* GraphQL */ `
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      auth {
        token
        refreshToken
      }
    }
  }
`);

export const SIGN_UP_MUTATION = gql(/* GraphQL */ `
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      auth {
        token
        refreshToken
      }
    }
  }
`);

export const useAuthStore = create(
  persist<Actions & State>(
    (set) => ({
      logout: () => set({ auth: null }),
      login: async (credentials) => {
        const { data, errors } = await client.mutate({
          mutation: SIGN_IN_MUTATION,
          variables: {
            input: credentials,
          },
        });

        const auth = data?.signIn.auth;

        if (auth && !errors) {
          set({ auth });
        }
      },
      register: async (credentials) => {
        const { data, errors } = await client.mutate({
          mutation: SIGN_UP_MUTATION,
          variables: {
            input: credentials,
          },
        });

        const auth = data?.signUp.auth;

        if (auth && !errors) {
          set({ auth });
        }
      },
    }),
    {
      name: "review-auth-storage",
    },
  ),
);
