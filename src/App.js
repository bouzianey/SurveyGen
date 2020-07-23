import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Contact  from "./components/Contact";
import Form from "./components/SurveyFormGen"
import DisplayClassSurvey from "./components/DisplaySurvey"

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/contact" exact component={() => <Contact />} />
          <Route path="/SurveyFormGenerator" exact component={() => <Form />} />
          <Route path="/DisplaySurvey" exact component={() => <DisplayClassSurvey />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;