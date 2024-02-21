import { useAtom } from "jotai";
import { UserData, authAtom, userAtom } from "../auth";
import useAxios from "axios-hooks";
import { getUrl } from "../utils/navigation";
import { useEffect } from "react";

export const useAuth = () => {
  const [authData, setAuthData] = useAtom(authAtom);
  const [userData, setUserData] = useAtom(userAtom);

  const headers = {
    Authorization: `Bearer ${authData?.accessToken}`,
  };

  const [_, getUser] = useAxios<UserData>(
    {
      url: getUrl(["manage", "info"]),
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

  return {
    headers,
    user: userData,
  };
};
