import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("fullName");

    if (token) {
      setIsLoggedIn(true);
      setFullName(storedUser);
      console.log("AuthContext Loaded: ", { token, storedUser });
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", user);
    setIsLoggedIn(true);
    setFullName(user.fullName);
    console.log("User logged in: ", { token, fullName });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setFullName("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, fullName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
