import React from "react";
import { Route, Redirect } from "react-router-dom";
import userState from "./state";

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  const adminSession = sessionStorage.getItem("admin");
  return (
    <Route
      {...rest}
      render={(props) =>
        adminSession ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/admin/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AdminPrivateRoute;
