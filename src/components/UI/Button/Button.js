import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  /* button should be reusable,if we use context here we can't use the button for anything else
  on click={ctx.onLogout} so the button just use for logout
  props for configuration,context for state management
  context limitations:
  * is not optimized for high frequency changes: if we have multiple change per second,use redux better
  for this
  *shouldn't use to replace all comp communication and props:component should still be configure via
  props and short "props chain" might not need any replacement  */
  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
