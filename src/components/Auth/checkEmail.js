import React, { useState } from "react";

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

const CheckEmail = ({ props }) => {
  const { setUserToSession, userSession } = UserState();
  const [account, setAccount] = useState();
  const [codeForm, setCodeForm] = useState(false);
  const [values, setValues] = useState({
    email: "",
    code: "",
  });
  const [message, setMessage] = useState();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const validateData = () => {
    if (values.email.length > 0) {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRegex.test(values.email)) {
        return true;
      } else {
        return "Email invalid";
      }
    } else {
      return "Please fill the form";
    }
  };

  const onSubmit = () => {
    if (validateData() == true) {
      Axios.post(`${process.env.REACT_APP_API}/user/account/forgot-password`, {
        email: values.email,
      })
        .then((response) => {
          if (response.data.account) {
            setValues({ ...values, code: response.data.account.issue });
            setMessage("Check email for verification code");
            setCodeForm(true);
          } else {
            setMessage(response.data.message);
          }
        })
        .catch((error) =>
          console.log("Error while fetching product data from server")
        );
    } else {
      setMessage(validateData());
    }
  };

  const ContentVerificationCode = () => {
    return (
      <ChangePassword props={props} email={values.email} code={values.code} />
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
        <h1>Forgot Password</h1>
      </div>
      <div className="col-12 mt-5">
        <FormControl
          variant="outlined"
          style={{ width: "100%" }}
          disabled={codeForm ? true : false}
        >
          <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={values.email}
            onChange={handleChange("email")}
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
            Check Email
          </Button>
        )}
      </div>
    </div>
  );
};

export default CheckEmail;
