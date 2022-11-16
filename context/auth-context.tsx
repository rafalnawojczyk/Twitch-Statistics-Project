import { MINIMUM_TOKEN_DURATION_SECONDS } from "config";
import React, { useCallback, useEffect, useState } from "react";

let logoutTimer: NodeJS.Timeout;

interface AuthContextInterface {
    token: string | undefined;
    isLoggedIn: boolean;
    login: (token: string, expirationTime: string) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextInterface>({
    token: "",
    isLoggedIn: false,
    login: (token: string) => {},
    logout: () => {},
});

const calcRemainingTime = (expTime: string) => {
    const actualTime = new Date().getTime();
    const adjustedExpirationTime = new Date(expTime).getTime();

    return adjustedExpirationTime - actualTime;
};

const getStoredToken = () => {
    // guard clause for serverside tasks
    if (typeof window === "undefined") {
        return null;
    }

    const storedToken = localStorage?.getItem("authToken");
    const storedExpDate = localStorage?.getItem("expirationTime");

    if (!storedToken || !storedExpDate) return null;

    const remainingTime = calcRemainingTime(storedExpDate);

    if (remainingTime <= MINIMUM_TOKEN_DURATION_SECONDS) {
        localStorage?.removeItem("authToken");
        localStorage?.removeItem("expirationTime");
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime,
    };
};

type AuthContextProviderProps = { children: React.ReactNode | React.ReactNode[] };

export const AuthContextProvider = (props: AuthContextProviderProps) => {
    const tokenData: { token: string; duration: number } | null = getStoredToken();

    let initialToken: string | undefined;
    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);

    const userIsLogged = !!token;

    const logoutHandler = useCallback(() => {
        setToken(undefined);
        localStorage?.removeItem("authToken");
        localStorage?.removeItem("expirationTime");

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token: string, expirationTime: string) => {
        setToken(token);
        localStorage?.setItem("authToken", token);
        localStorage?.setItem("expirationTime", expirationTime);

        const remainingTime = calcRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLogged,
        login: loginHandler,
        logout: logoutHandler,
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
