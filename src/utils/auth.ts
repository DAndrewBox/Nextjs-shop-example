import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getReduxStore } from "@/store";
import { User } from "@/types/user";

/**
 * Custom hook that ensures the user is authenticated before rendering the component.
 * If the user is not authenticated, it redirects to the login page with an error message.
 */
export const useEnsureUserIsAuthenticated = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const { isAuthenticated, user } = getReduxStore().auth;
    if (!isAuthenticated) {
      router.push("/login?error=auth");
    }
    setUserIsAuthenticated(isAuthenticated);
    setCurrentUser(user);
  }, [router]);

  return { userIsAuthenticated, currentUser };
};
