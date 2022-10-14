import react, { useState, useEffect } from "react";
/* it's such a context obj component with state ,state could be string or object */
const AuthContext = react.createContext({
  isLoggedIn: false,
  onlLogout: () => {}, //for better IDE auto-completion,use dummy func
  onlLogin: (email, password) => {}, //for better IDE auto-completion,use dummy func
});
/*AuthContext is object contains component
maybe sometimes app crash because we have default value here,the default value only used if we
wold consume here without having a provider */
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    //to avoid infinite loop we use use effect
    const auth = localStorage.getItem("isLoggedIn");
    if (auth === "1") {
      setIsLoggedIn(true);
    }
  }, []); //just run once when app start,this data fetching is side effect it's not related to UI

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
    //no need to use effect because it func run just when click the button
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onlLogout: logoutHandler,
        onlLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
/* to make it's available in other file */
