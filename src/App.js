import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./context/auth-context";
/* main job of react:render UI& react to user input
 *evaluate and render JSX
 *manage state and props
 *React to user event & input
 * Re-evaluate component upon state& props change
 */
/* sideEffect:
 *store data in browser storage
 *send http request to backend server
 *set&manage timers or interval
 this task not related to bring something on screen
 sending the request it self and handle error that's something not for react
 this tasks must happen outside of the normal component evaluation and render cycle especially since they 
 might block /delay rendering (eg: http request) */
/* useEffect:
it's called with two argument with two parameters
first argument is func should be executed after every comp evaluation if the specified dependency change
(side effect goes on this func)
send arg is dependencies the func only run if the dependency changes(specify your dep of func ) */
function App() {
  /* const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  }; */
  const ctx = useContext(AuthContext);
  return (
    /*providing mean that you wrap in your jsx code all component that should be able to tap into that context
     AuthContext.Provider is component we can wrap it around other component
      ,descendent component,all other children&children of children 
      *no need to fragment because AuthContext is wrapper component
      we can listen by two way:
      consumer or react hook
      technically you don't need provider when you have default value but in realty you use context 
      to have a value could be change and that's only possible with provider
    should add value props with provider to avoid app crash and the name of props should be (value) and
    pass your object inside the props value,changing is easy in provider,
    { isLoggedIn: isLoggedIn } the value object change when state is updated and then pass it down
    no need to use props to forward that
    to all listen component  */
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
