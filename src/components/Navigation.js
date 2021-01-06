import React from "react";
import { Link, withRouter } from "react-router-dom";
import home_icon from "../static/survey-icon.png"

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Smart Survey
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {props.loggedInStatus === "NOT_LOGGED_IN" ?
                  <li
                      className={`nav-item  ${
                          props.location.pathname === "/" ? "active" : ""
                      }`}
                  >
                    <Link className="nav-link" to="/">
                      Home
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  :
                  ""
              }
              { props.loggedInStatus === "LOGGED_IN" ?
              <li
                  className={`nav-item  ${
                      props.location.pathname === "/" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/DisplaySurvey">
                  Home
                </Link>
              </li>
                  : ""
              }
               { props.loggedInStatus === "LOGGED_IN" ?
              <li
                  className={`nav-item  ${
                      props.location.pathname === "/SurveyFormGenerator" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/SurveyFormGenerator">
                  Create Survey
                </Link>
              </li>: ""
              }
               { props.loggedInStatus === "LOGGED_IN" ?
              <li
                  className={`nav-item  ${
                      props.location.pathname === "/ClassManager" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/ClassManager">
                  Manage Class
                </Link>
              </li>
                  : ""
              }
              { props.loggedInStatus === "LOGGED_IN" ?
              <li
                  className={`nav-item  ${
                      props.location.pathname === "/DataVisualization" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/DataVisualization">
                  Data Visualization
                </Link>
              </li>
                  : ""
              }
              { props.loggedInStatus === "NOT_LOGGED_IN" ?
              <li
                  className={`nav-item  ${
                      props.location.pathname === "/SignUp" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/SignUp">
                  Sign up
                </Link>
              </li> : ""
              }
              { props.loggedInStatus === "NOT_LOGGED_IN"  ?
              <li
                  className={`nav-item  ${
                      props.location.pathname === "/SignIn" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/SignIn">
                  Sign in
                </Link>
              </li>: ""
              }

              { props.loggedInStatus === "LOGGED_IN"  ?
                <li
                  className={`nav-item  ${
                      props.location.pathname === "/LogOut" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/LogOut">
                  Log out
                </Link>
              </li> : ""
              }
              <li
                  className={`nav-item  ${
                      props.location.pathname === "/contact" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li
                  className={`nav-item  ${
                      props.location.pathname === "/about" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);