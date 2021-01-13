import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Contact  from "./components/Contact";
import Form from "./components/SurveyFormGen"
import DisplayClassSurvey from "./components/DisplaySurvey"
import SignUpForm from "./components/SignUp"
import SignInForm from "./components/SignIn"
import LogOutForm from "./components/LogOut"
import ClassManager from "./components/ClassManager"
import DataVisualization from "./components/DataVisualization"


function App() {

        const [loggedInStatus, setloggedInStatus] = useState("NOT_LOGGED_IN");
        const [user, setUser] = useState({});

  const checkLoginStatus= (id) => {

    fetch("https://survey-manager-yb-scsu.herokuapp.com/login_instructor", {
                method: "POST",
                mode: "no-cors",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(id),
            })
              .then((res) => res.json())
              .then((res) => {
                     if (
                          res.data.logged_in &&
                          this.state.loggedInStatus === "NOT_LOGGED_IN"
                        ) {
                          this.setState({
                            loggedInStatus: "LOGGED_IN",
                            user: res.data.user
                          });
                        } else if (
                          !res.data.logged_in &
                          (this.state.loggedInStatus === "LOGGED_IN")
                        ) {
                          this.setState({
                            loggedInStatus: "NOT_LOGGED_IN",
                            user: {}
                          });
                          }
              });
  }

  const componentDidMount= () => {
    this.checkLoginStatus();
  }

  const handleLogout = (val) => {

      setloggedInStatus(val);
      setUser({});
  }

  const handleLogin = (data) => {

    setloggedInStatus("LOGGED_IN")
      setUser(data)
  }

  return (
    <div className="App" key="main_app">
      <Router>
        <Navigation loggedInStatus={loggedInStatus}/>
        <Switch>
          <Route
              path="/"
              exact component={() => loggedInStatus  === "NOT_LOGGED_IN" ?  <Home onLogin={handleLogin}/> : ""}
          />
          <Route
              path="/"
              exact component={() => loggedInStatus  === "LOGGED_IN" ? <DisplayClassSurvey user={user}/> : ""}
          />
          <Route
              path="/SurveyFormGenerator"
              exact component={() => loggedInStatus  === "LOGGED_IN" ? <Form user={user}/> : ""}
          />
          <Route
              path="/DisplaySurvey"
              exact component={() => loggedInStatus  === "LOGGED_IN" ? <DisplayClassSurvey user={user}/> : ""}
          />
          <Route path="/ClassManager"
                 exact component={() => loggedInStatus  === "LOGGED_IN" ? <ClassManager  user={user}/> : ""}
          />
          <Route path="/DataVisualization"
                 exact component={() => loggedInStatus  === "LOGGED_IN" ? <DataVisualization  user={user}/> : ""}
          />
          <Route path="/SignUp"
                 exact component={() => loggedInStatus  === "NOT_LOGGED_IN" ? <SignUpForm  onChangeLogin={handleLogin}/> : ""}
          />
          <Route path="/SignIn"
                 exact component={() => loggedInStatus  === "NOT_LOGGED_IN" ? <SignInForm  onChangeLogin={handleLogin}/> : ""}
          />
          <Route path="/LogOut"
                 exact component={() => loggedInStatus  === "LOGGED_IN" ? <LogOutForm onChangeLogout={handleLogout} /> : ""}
          />
          <Route path="/contact" exact component={() => <Contact />} />
          <Route path="/about" exact component={() => <About />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;