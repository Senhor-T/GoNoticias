import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const Auth = () => {
  const { user } = useSelector((state) => state.auth);

  const [auth, setAuth] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuth(true);
    } else {
      setAuth(false);
    }


  }, [token]);

  return { auth};
};