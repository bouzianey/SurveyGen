import React from "react";
import SignInForm from "./SignIn";
import surveyImage from "../static/online_survey.jpg";

function Home({onLogin}) {
  const handleLogin =(data) =>
  {
    onLogin(data);
  }
  return (
    <div className="home">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src={surveyImage}
              alt=""
            />
          </div>
          <div className="col-lg-5">
          <SignInForm  onChangeLogin={handleLogin}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;