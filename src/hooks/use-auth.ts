import useAxios from "axios-hooks";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { AuthData, UserData, authAtom, userAtom } from "../auth";
import { getUrl } from "../utils/navigation";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [authData, setAuthData] = useAtom(authAtom);
  const [userData, setUserData] = useAtom(userAtom);
  const navigate = useNavigate();

  const headers = {
    Authorization: `Bearer ${authData?.accessToken}`,
  };

  const [_user, getUser] = useAxios<UserData>(
    {
      url: getUrl(["user", "me"]),
      headers,
    },
    {
      manual: true,
    }
  );

  const [_login, executeLogin] = useAxios<AuthData>(
    {
      url: getUrl("login"),
      method: "post",
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    const fetch = async () => {
      if (!authData) {
        navigate("/login");
      }

      if (authData?.accessToken && !userData) {
        const response = await getUser();

        if (response.status !== 200) {
          navigate("/login");
        }

        setUserData(response.data);
      }
    };

    fetch();
  }, [authData]);

  const logout = () => {
    setAuthData(undefined);
    setUserData(undefined);
  };

  const login = async (email: string, password: string) => {
    const response = await executeLogin({
      data: {
        email,
        password,
      },
    });

    setAuthData(response.data);
  };

  return {
    headers,
    user: userData,
    logout,
    login,
  };
};
