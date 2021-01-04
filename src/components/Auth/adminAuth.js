import React, { useEffect, useState } from "react";

import logo from "../../assets/icons/logo.png";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

import UserState from "../../utils/state";
import Axios from "axios";

import ChangePassword from "./changePassword";

const AdminAuth = ({ props }) => {
  const { setUserToSession, userSession } = UserState();
  const [account, setAccount] = useState();
  const [codeForm, setCodeForm] = useState(false);
  const [values, setValues] = useState({
    code: "",
    code: "",
  });
  const [message, setMessage] = useState();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const goToDashboard = () => {
    window.location.href = "/admin/dashboard";
  };

  useEffect(() => {
    sessionStorage.getItem("admin") ===
      "31f060c5-5222-4b97-b10d-b7b322cb6aa2" && goToDashboard();
  }, []);

  const onSubmit = () => {
    if (values.code == "31f060c5-5222-4b97-b10d-b7b322cb6aa2") {
      sessionStorage.setItem("admin", values.code);
      window.location.href = "/admin/dashboard";
    } else {
      setMessage("Wrong Code!");
    }
  };

  const ContentVerificationCode = () => {
    return (
      <ChangePassword props={props} code={values.code} code={values.code} />
    );
  };

  return (
    <div
      className="row justify-content-center align-items-center"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          onSubmit();
        }
      }}
    >
      <div className="col-12 text-center">
        <img src={logo} alt={props.status} />
      </div>
      <div className="col-12 text-center mt-3">
        <h1>Admin Code Access</h1>
      </div>
      <div className="col-12 mt-5">
        <FormControl
          variant="outlined"
          style={{ width: "100%" }}
          disabled={codeForm ? true : false}
        >
          <InputLabel htmlFor="outlined-adornment-password">Code</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={values.code}
            onChange={handleChange("code")}
            labelWidth={70}
          />
        </FormControl>

        {codeForm && <ContentVerificationCode />}

        {!codeForm && message && (
          <div
            style={{
              backgroundColor: "red",
              marginTop: 10,
              marginBottom: 10,
              padding: 5,
              borderRadius: 5,
              color: "white",
            }}
          >
            <div className="row m-0 justify-content-between">
              <div className="col-10">
                <small>{message}</small>
              </div>
              <div className="col-2">
                <small>
                  <CloseIcon
                    fontSize="small"
                    style={{
                      color: "white",
                      float: "right",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setMessage();
                    }}
                  />
                </small>
              </div>
            </div>
          </div>
        )}
        {!codeForm && (
          <Button
            className="mt-3 pt-3 pb-3"
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#DC5708",
              color: "white",
              width: "100%",
            }}
            onClick={onSubmit}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminAuth;
