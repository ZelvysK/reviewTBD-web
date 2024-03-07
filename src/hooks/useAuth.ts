import useAxios from "axios-hooks";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { UserData, authAtom, userAtom } from "../auth";
import { getUrl } from "../utils/navigation";

export const useAuth = () => {
  const [authData, setAuthData] = useAtom(authAtom);
  const [userData, setUserData] = useAtom(userAtom);

  const headers = {
    Authorization: `Bearer ${authData?.accessToken}`,
  };

  const [_, getUser] = useAxios<UserData>(
    {
      url: getUrl(["user", "me"]),
      headers,
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    const fetch = async () => {
      if (authData?.accessToken && !userData) {
        const response = await getUser();

        setUserData(response.data);
      }
    };

    fetch();
  }, [authData]);

  const logout = () => {
    setAuthData(undefined);
    setUserData(undefined);
  };

  return {
    headers,
    user: userData,
    logout,
  };
};
