import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import './styling.css'


const SignInForm = ({onChangeLogin}) => {

    const [emailState, setemailState] = useState(null);
    const [passwordState, setpasswordState] = useState(null);
    const [surveySuccessState, setSurveySuccessState] = useState("");
    const [formErrorsState, setformErrorsState] = useState({email:"", password:""});
    const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    //History
    const history = useHistory();
    const formValid = () => {

      let valid = true;
      // validate form errors being empty & the form was filled out
      Object.values(formErrorsState).forEach(val => {
        val.length > 0 && (valid = false);
      });

      return valid;
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValid()) {

      const objectToSend = {
            email: emailState,
            password: passwordState
        }
      fetch("https://survey-manager-yb-scsu.herokuapp.com/login_instructor", {
                method: "POST",
                //mode: "no-cors",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(objectToSend),
            })
              .then((res) => res.json())
              .then((res) => {

                  if (res.logged_in){
                      onChangeLogin(res.user)
                      history.push("/DisplaySurvey");
                  }
                  else
                  {
                      setSurveySuccessState("Invalid Email Address or/and Password");
                  }
              });
    }
    else {
      setSurveySuccessState("Error! ALL fields are required");
    }
  };

  const handlePasswordChange = (e) => {

      setpasswordState(e.target.value);
      formErrorsState.password = e.target.value.length < 6 ? "minimum 6 characaters required" : "";
  };

  const handleEmailChange = (e) => {

    setemailState(e.target.value);
    formErrorsState.email = emailRegex.test(e.target.value) ? "" : "invalid email address";

  };

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrorsState.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={handleEmailChange}
              />
              {formErrorsState.email.length > 0 && (
                <span className="errorMessage">{formErrorsState.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrorsState.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={handlePasswordChange}
              />
              {formErrorsState.password.length > 0 && (
                <span className="errorMessage">{formErrorsState.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Sign In</button>
                {surveySuccessState.length > 0 && (
                <span className="errorMessage">{surveySuccessState}</span>
            )}
            </div>
          </form>
        </div>
      </div>
    );
}

export default SignInForm;