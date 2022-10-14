import React, { useState, useEffect, useReducer, useContext } from "react";
/* use state:the main state management tool,great for independent pieces state/data change,
great if state update easy and limited to a few kinds of update.
use reducer: great if you need more power,should be considered if you have related piece of state/data,
can be helpful if you have more complex state update
 */
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";
import Input from "../UI/Input/Input";
/* use reducer can be used as replacement of use state if you need more powerful state management
if update state which depends on  anther state then merging this into one state could be good idea
  */
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};
/*created outside of comp func because inside red func we don't need any data
that's generated inside comp func,it's can created outside the scope because it doesn't need to to interact
with anything inside comp func,all data we need will pass to this func when it's executed by react auto*/
const Login = (props) => {
  /*  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(); */
  /* const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(); */
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });
  /*emailState: state snapshot used in component re-render,re-evaluation cycle
  dispatchEmail:func that used to dispatch a new action(eg :trigger an update of state)
  reducerFunc: func that triggered auto once an action is dispatch(it's receive the last state snapshot
  and should return the new update state);
   {value: "",isValid: false}: is the initial state,
   we can pass another argument init Fn is func to set the initial state programmatically(ex:result of http request)
  */
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = emailState;
  /*{ isValid: passwordIsValid } this is alias assignment it's part of object destructing
  we used object destructuring to add object properties as dependencies to useEffect()
  we pass specific properties instead of the entire object as a dependency
  we use this ti avoid the effect function would re-run whenever ANY property of someObject changes -
 not just the one property */
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("validation");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500); //only run once,not like clean up func when dependency change always run;

    return () => {
      console.log("Clean Up");
      clearTimeout(timer);
      /*cleanup func will run when component is remove from dom
      when next side effect is due we can set new timer,clear the last timer before we set new one*/
    }; //will run when it's unmount from the dom,not run in initial side effect execution
  }, [emailIsValid, passwordIsValid]); //if any of this change the func will execute
  /*setFormIsValid without () because it will return the result of func you just need yo add pointer to func
  you can delete setFormIsValid func because state update func by default are insured by react to never change
  side effect or user entering data*/

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    /*  setFormIsValid(event.target.value.includes("@") && passwordState.isValid); */
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    /* setFormIsValid(emailState.isValid && event.target.value.trim().length > 6); */
  };

  const validateEmailHandler = () => {
    /* setEmailIsValid(emailState.isValid); */
    dispatchEmail({ type: "INPUT_BLUR" }); //no need to pass data just care about input lost focus
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onlLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        {/*  <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
