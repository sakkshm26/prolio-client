import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";

export const AuthContext = createContext({
  user: null
});

function useAuth() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile") as string)
  );
  const navigate = useNavigate();
  const location = useLocation();

  // console.log("User ", user);

  const logout = () => {
    localStorage.clear();

    navigate("/login");
    setUser(null);
  };

  useEffect(() => {
    // console.log('AUTH RENDER')
    const token = user?.token;

    if (token) {
      const decodedToken: any = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile") as string));
  }, []);

  return { user, logout };
}

export const AuthProvider: React.FC<any> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth} children={children} />;
};
