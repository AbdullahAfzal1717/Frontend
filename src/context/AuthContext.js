import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { message } from "antd";

export const AuthContext = createContext();

const initialState = { isAuthenticated: false, user: {} };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: payload.user };
    case "SET_PROFILE":
      return { ...state, user: payload.user };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAppLoading, setIsAppLoading] = useState(false);

  const setuser = useCallback(async (token) => {
    setIsAppLoading(true)


    axios.get("https://hackthonfinal.vercel.app/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(({ status, data }) => {
        if (status === 200) {
          const user = data.user;
          dispatch({ type: "LOGIN", payload: { user } })
          setIsAppLoading(false)
        }
        else {
          console.log("User data not found")
        }

      })
      .catch((error) => {
        message.error("Something went wrong while login")
        console.log("erroorrr", error)
        localStorage.removeItem("token")
        setIsAppLoading(false)
      })


  }, [])

  useEffect(() => {
    setIsAppLoading(true)
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      setIsAppLoading(false);
      return
    }
    else {
      setuser(token)
    }
  }, [setuser]);

  const logout = () => {
    localStorage.removeItem("token");

    dispatch({ type: "LOGOUT" });

  };
  return (
    <AuthContext.Provider
      value={{ ...state, isAppLoading, setIsAppLoading, dispatch, logout, setuser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
