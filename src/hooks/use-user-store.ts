import { gql } from "@/__generated__";
import { MeQuery } from "@/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { useNavigate } from "@tanstack/react-router";
import { create } from "zustand";

type User = MeQuery["me"];

type Actions = {
  setUser: (user: User) => void;
};

type State = {
  user?: User;
};

export const useUserStore = create<Actions & State>((set) => ({
  setUser: (user) => set(() => ({ user })),
}));

export const ME_QUERY = gql(/* GraphQL */ `
  query Me {
    me {
      id
      name
      email
      role
    }
  }
`);

export const useUser = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  useQuery(ME_QUERY, {
    skip: !!user,
    onCompleted: ({ me }) => setUser(me),
    onError: () => {
      navigate({
        to: "/login",
      });
    },
  });

  return { user };
};
