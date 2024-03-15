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
    Ready: !!authData?.accessToken,
  };

  const [_user, executeMe] = useAxios<UserData>(
    {
      url: getUrl(["user", "me"]),
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

  const [_refresh, executeRefresh] = useAxios<AuthData>(
    {
      url: getUrl("refresh"),
      method: "post",
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    if (userData === null || authData === null) {
      navigate("/login");
    }
  }, [userData, authData]);

  const logout = () => {
    setAuthData(null);
    setUserData(null);
  };

  const login = async (email: string, password: string) => {
    const loginResponse = await executeLogin({
      data: {
        email,
        password,
      },
    });

    if (loginResponse.status !== 200) {
      throw new Error("Failed to login");
    }

    const meResponse = await executeMe({
      headers: {
        Authorization: `Bearer ${loginResponse.data.accessToken}`,
      },
    });

    if (meResponse.status !== 200) {
      throw new Error("Failed to fetch user after succesful login");
    }

    setAuthData(loginResponse.data);
    setUserData(meResponse.data);
  };

  const refresh = async () => {
    const refreshResponse = await executeRefresh({
      data: {
        refreshToken: authData?.refreshToken,
      },
    });

    if (refreshResponse.status !== 200) {
      navigate("/login");
    }

    setAuthData(refreshResponse.data);
    navigate("/");
  };

  return {
    headers,
    user: userData,
    logout,
    login,
    refresh,
  };
};
