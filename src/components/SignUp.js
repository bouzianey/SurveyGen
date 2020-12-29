import React, {useState} from "react";
import './styling.css'


const SignUpForm = () => {

  const [firstNamelState, setfirstNamelState] = useState(null);
  const [lastNamelState, setLastlState] = useState(null);
  const [emailState, setemailState] = useState(null);
  const [passwordState, setpasswordState] = useState(null);
  const [formErrorsState, setformErrorsState] = useState({firstName:"", lastName:"",email:"", password:""});

  const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const formValid = () => {
    let valid = true;
    console.log(formErrorsState);
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
            firstName: firstNamelState,
            lastName : lastNamelState,
            email: emailState,
            password: passwordState
        }
      fetch("https://survey-manager-yb-scsu.herokuapp.com/signup_instructor", {
                method: "POST",
                //mode: "no-cors",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(objectToSend),
            })
              .then((res) => res.json())
              .then((res) => {
              });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  const handleFirstNameChange = (e) => {

      setfirstNamelState(e.target.value);
      formErrorsState.firstName = e.target.value.length < 3 ? "minimum 3 characaters required" : "";
  };

  const handleLastNameChange = (e) => {

    setLastlState(e.target.value);
    formErrorsState.lastName = e.target.value.length < 3 ? "minimum 3 characaters required" : "";

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
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrorsState.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={handleFirstNameChange}
              />
              {formErrorsState.firstName.length > 0 && (
                <span className="errorMessage">{formErrorsState.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrorsState.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={handleLastNameChange}
              />
              {formErrorsState.lastName.length > 0 && (
                <span className="errorMessage">{formErrorsState.lastName}</span>
              )}
            </div>
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
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );

}

export default SignUpForm;