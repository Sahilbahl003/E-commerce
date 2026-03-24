import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  //  WATCH TOKEN CHANGE (LOGIN / LOGOUT)
  useEffect(() => {

    const interval = setInterval(() => {

      const currentToken = localStorage.getItem("token");
      const currentUser = localStorage.getItem("user");

      setToken((prev) => {
        if (prev !== currentToken) {
          return currentToken;
        }
        return prev;
      });

      if (currentUser) {
        setUser(JSON.parse(currentUser));
      } else {
        setUser(null);
      }

    }, 200);

    return () => clearInterval(interval);

  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        setUser: updateUser,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );

};