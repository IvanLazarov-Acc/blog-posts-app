/* eslint-disable */
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        //remove the user from storage
        localStorage.removeItem("user");

        //dispatch logout action
        dispatch({ type: "LOGOUT", payload: null });
    }

    return { logout };
}