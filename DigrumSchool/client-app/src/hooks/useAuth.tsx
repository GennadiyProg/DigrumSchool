import {useMemo} from "react";
import {userStore} from "../stores/UserStore";

export function useAuth() {
  return useMemo(() => {
    return !!userStore.user
  }, [userStore.user])
}