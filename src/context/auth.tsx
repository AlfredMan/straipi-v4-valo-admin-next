import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "../model/user";
// import { authenticateAPI, unauthenticateAPI } from "../../util/api";
//api here is an axios instance which has the baseURL set according to the env.
import api from "../utils/api";
import { authenticateAPI, unauthenticateAPI } from "../utils/api";

// const AuthContext = createContext({});

const AuthContext = React.createContext(
  {} as {
    user: User | null;
    authenticate: (newToken: string) => Promise<void>;
    logout: ({ redirectLocation }: { redirectLocation: string }) => void;
    isLoading: boolean;
    isAuthenticated: boolean;
    token: string | undefined;
  }
);

export const AuthProvider = ({
  children,
}: // ...props
{
  children: ReactNode;
  // props: any;
}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const isAuthenticated = !!user;

  // const logout = useCallback(
  //   ({ redirectLocation = "/login" }: { redirectLocation?: string }) => {
  //     // Cookies.remove('token');
  //     // setUser(null);
  //     // delete api.defaults.headers.common.Authorization;
  //     // window.location.pathname = '/login';

  //     Cookies.remove("token");
  //     unauthenticateAPI();
  //     setUser(null);
  //     setIsLoading(false);
  //     console.log("Redirecting");
  //     router.push(redirectLocation || "/login");
  //   },
  //   [router]
  // );
  const logout = useCallback(
    ({ redirectLocation = "/login" }: { redirectLocation?: string }) => {
      // Cookies.remove('token');
      // setUser(null);
      // delete api.defaults.headers.common.Authorization;
      // window.location.pathname = '/login';

      Cookies.remove("token");
      console.log("logout: -> unauthenticateApi");
      unauthenticateAPI();
      setUser(null);
      setIsLoading(false);
      console.log("Redirecting");
      if (router.pathname !== (redirectLocation || "/login")) {
        router.push(redirectLocation || "/login");
      }
    },
    [router]
  );

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;
    authenticate(token);
  }, []);

  useEffect(() => {
    // const Component = children.type;

    // If it doesn't require auth, everything's good.
    // if (!Component.requiresAuth) return;

    // If we're already authenticated, everything's good.
    if (isAuthenticated) return;

    // If we don't have a token in the cookies, logout
    const token = Cookies.get("token");
    console.log("token from Cookies", token);
    if (router.pathname !== "/login") {
      if (!token) {
        // return logout({ redirectLocation: Component.redirectUnauthenticatedTo });
        console.log("no cookie token, logout");
        return logout({ redirectLocation: "/login" });
      }
    }

    // If we're not loading give the try to authenticate with the given token.
    if (!isLoading) {
      if (!!token) {
        authenticate(token);
      }
    }
    // }, [isLoading, isAuthenticated, children.type.requiresAuth]);
  }, [isLoading, isAuthenticated, user, logout, router.pathname]);

  const authenticate = async (token: string) => {
    setIsLoading(true);
    authenticateAPI(token);
    try {
      // const { data: user } = await routes.user.me.request();
      const { data: user } = await api.get("users/me");
      setUser(user);
      Cookies.set("token", token);
    } catch (error) {
      console.error("fail fetching users/me");
      console.log({ error });
      unauthenticateAPI();
      setUser(null);
      Cookies.remove("token");
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticate,
        logout,
        isLoading,
        isAuthenticated: !!user,
        token: Cookies.get("token"),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
