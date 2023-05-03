import React from "react";

// create the context
export type IAuthContext = {
  authInfo: {
    loggedIn: boolean;
    user: {
      user: string;
      password: string;
      id: string;
      is_logedin: boolean;
    };
  };
  logOut: any;
  logIn: any;
};
const AuthContext = React.createContext<any>(undefined);

// create the context provider, we are using use state to ensure that
// we get reactive values from the context...
// We need:
// Necessary changes as children is deprecated
// "@types/react": "^16.9.17", in package json
export const AuthProvider: React.FC = ({ children }) => {
  // the reactive values
  const [authInfo, setAuthInfo] = React.useState<any>();

  const logOut = () => {
    return new Promise((resolve) => {
      setAuthInfo({ loggedIn: false, user: null });
      setTimeout(() => {
        return resolve(true);
      }, 1000);
    });
  };

  const logIn = (user: string, password: string) => {
    return new Promise((resolve) => {
      let v = {
        user: { user, id: new Date().getTime() + "", is_logedin: false },
      };
      setAuthInfo(v);
      let b = password === process.env.REACT_APP_PASSWORD;
      //console.log("process.env.REACT_APP_PASSWORD="+process.env.REACT_APP_PASSWORD);
      //b = true;  // The logon condition was moved to LoginPage line 75
      if (b) {
        v.user.is_logedin = true;
        setTimeout(() => {
          return resolve(true);
        }, 1000);
      }
    });
  };

  let v = {
    authInfo,
    logOut: logOut,
    logIn: logIn,
  };

  return <AuthContext.Provider value={v}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext) as IAuthContext;
