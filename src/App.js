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


function App() {

        const [loggedInStatus, setloggedInStatus] = useState("NOT_LOGGED_IN");
        const [user, setUser] = useState({});

  const checkLoginStatus= (id) => {

    fetch("http://localhost:5000/login_instructor", {
                method: "POST",
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
      console.log("Log out : ",loggedInStatus);

  }

  const handleLogin = (data) => {
      console.log(data);
    setloggedInStatus("LOGGED_IN")
      setUser(data)
  }

  return (
    <div className="App">
      <Router>
        <Navigation loggedInStatus={loggedInStatus}/>
        <Switch>
          <Route path="/" exact component={() => <Home />} />

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
        <Footer />
      </Router>
    </div>
  );
}

export default App;