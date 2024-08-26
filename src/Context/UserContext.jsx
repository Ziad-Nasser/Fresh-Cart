import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState(
    localStorage.getItem("userToken")
      ? jwtDecode(localStorage.getItem("userToken"))
      : null,
  );

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
