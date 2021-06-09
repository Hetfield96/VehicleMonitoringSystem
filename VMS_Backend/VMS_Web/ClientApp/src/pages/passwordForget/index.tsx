import * as React from "react";
import { Link } from "react-router-dom";
import { PasswordForgetForm } from "./passwordForgetForm";
import strings from "../../constants/strings";

export const PasswordForget = () => (
  <div>
    <h1>{strings.passwordForget}</h1>
    <PasswordForgetForm />
  </div>
);

export const PasswordForgetLink = () => (
  <p>
    <Link to="/pw-forget" style={{alignSelf: 'center'}}>{strings.forgotPassword}</Link>
  </p>
);
