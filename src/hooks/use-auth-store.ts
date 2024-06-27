import { gql } from "@/__generated__";
import { SignInPayload } from "@/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { useNavigate } from "@tanstack/react-router";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthData = SignInPayload["auth"];

type Actions = {
  logout: () => void;
  setAuth: (auth: AuthData | undefined) => void;
};

type State = {
  auth?: AuthData;
};

export const useAuthStore = create(
  persist<Actions & State>(
    (set) => ({
      logout: () => set({ auth: null }),
      setAuth(auther) {
        set({ auth: auther });
      },
    }),
    {
      name: "review-auth-storage",
    },
  ),
);

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

export const useAuth = () => {
  const [signIn] = useMutation(SIGN_IN_MUTATION);
  const [signUp] = useMutation(SIGN_UP_MUTATION);
  const navigate = useNavigate();
  const setAuth = useAuthStore((e) => e.setAuth);

  const login = async (credentials: { email: string; password: string }) => {
    const { data, errors } = await signIn({
      variables: {
        input: credentials,
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

  const register = async (credentials: {
    email: string;
    password: string;
    displayName: string;
  }) => {
    const { data, errors } = await signUp({
      variables: {
        input: credentials,
      },
    });

    const auth = data?.signUp.auth;

    if (auth && !errors) {
      setAuth(auth);
      navigate({
        to: "/about",
      });
    }
  };

  return {
    login,
    register,
  };
};
