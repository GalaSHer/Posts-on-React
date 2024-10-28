import React from "react";
import classes from "./myInput.module.css";

export const MyInput = (props) => {
  return (
    <input {...props} className={classes.myInput} />
  )
}