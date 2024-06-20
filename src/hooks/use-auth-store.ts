import { gql } from "@/__generated__";
import {
  FirebaseLoginResponse,
  Maybe,
  SignInPayload,
} from "@/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserData } from "../auth";
import { useNavigate } from "@tanstack/react-router";

type AuthData = SignInPayload["auth"];

type Actions = {
  logout: () => void;
  setAuth: (auth: Maybe<FirebaseLoginResponse> | undefined) => void;
};

type State = {
  user: UserData | null | undefined;
  auth: AuthData;
};

export const SIGN_IN_MUTATION = gql(/* GraphQL */ `
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      auth {
        email
        idToken
        email
        refreshToken
        expiresIn
        localId
        displayName
        registered
      }
    }
  }
`);

export const useAuth = () => {
  const [mutate] = useMutation(SIGN_IN_MUTATION);
  const navigate = useNavigate();

  const setAuth = useAuthStore((e) => e.setAuth);

  const login = async (credentials: { email: string; password: string }) => {
    const { data, errors } = await mutate({
      variables: {
        input: {
          ...credentials,
        },
      },
    });

    const auth = data?.signIn.auth;

    if (auth && !errors) {
      setAuth(auth);
      navigate({
        to: "/about",
      });
    }
  };

  return {
    login,
  };
};

export const useAuthStore = create(
  persist<Actions & State>(
    (set) => ({
      user: undefined,
      auth: undefined,
      logout: () => set({ auth: null, user: null }),
      setAuth(auther) {
        set({ auth: auther });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
