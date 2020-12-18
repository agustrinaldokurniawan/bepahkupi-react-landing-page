import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import ReadBlog from "./pages/Blog/readBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermOfService from "./pages/TermofService";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/blog/:slug" component={ReadBlog} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/term-of-service" component={TermOfService} />
      </Switch>
    </Router>
  );
};

export default App;
