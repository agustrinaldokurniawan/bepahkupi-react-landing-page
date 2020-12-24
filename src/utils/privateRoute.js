import React from "react";
import { Route, Redirect } from "react-router-dom";
import userState from "../utils/state";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userSession } = userState();
  return (
    <Route
      {...rest}
      render={(props) =>
        userSession ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/shop", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
