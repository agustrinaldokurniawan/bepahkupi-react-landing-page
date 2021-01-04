import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import ReadBlog from "./pages/Blog/readBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermOfService from "./pages/TermofService";

import HomeStore from "./pages/HomeStore";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order";

import LoginAdmin from "./pages/admin/Login";
import DashboardAdmin from "./pages/admin/Dashboard";

import PrivateRoute from "./utils/privateRoute";
import AdminPrivateRoute from "./utils/adminPrivateRoute";

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

        <Route exact path="/admin/login" component={LoginAdmin} />
        <AdminPrivateRoute
          exact
          path="/admin/dashboard"
          component={DashboardAdmin}
        />

        <Route exact path="/shop" component={HomeStore} />
        <Route exact path="/product/:productSlug" component={Product} />
        <PrivateRoute exact path="/cart" component={Cart} />
        <PrivateRoute exact path="/order" component={Order} />
      </Switch>
    </Router>
  );
};

export default App;
