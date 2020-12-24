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

const ChangePassword = (props) => {
  const { setUserToSession, userSession } = UserState();
  const [values, setValues] = useState({
    code: "",
    password: "",
  });
  console.log(props.props);
  const [message, setMessage] = useState();

  useEffect(() => {
    setMessage("Check your email for verification code");
  }, []);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateData = () => {
    if (values.code.length > 0 && values.password.length > 0) {
      const codeRegex = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\)\(+\=\._-]+$/g;
      if (codeRegex.test(values.code)) {
        // console.log({ code: props.code });
        if (props.code === values.code) {
          const passwordRegex = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\)\(+\=\._-]+$/g;
          if (passwordRegex.test(values.password)) {
            return true;
          } else {
            return "Invalid password character";
          }
        } else {
          return "Invalid verification code";
        }
      } else {
        return "Invalid code character";
      }
    } else {
      return "Please fill form correctly";
    }
  };

  const onSubmit = () => {
    if (validateData() === true) {
      Axios.post(`${process.env.REACT_APP_API}/user/account/change-password`, {
        email: props.email,
        code: values.code,
        password: values.password,
      })
        .then((response) => {
          if (response.data.account) {
            setUserToSession(response.data.account);
            props.props.toggleModal();
            window.location.reload();
          } else {
            return response.data.message;
          }
        })
        .catch((error) => {
          return "Error while fetching data from server";
        });
    } else {
      setMessage(validateData());
    }
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
      <div className="col-12 mt-5">
        <FormControl variant="outlined" style={{ width: "100%" }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Verification Code
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={values.code}
            onChange={handleChange("code")}
            labelWidth={70}
          />
        </FormControl>
        <FormControl
          variant="outlined"
          style={{ width: "100%" }}
          className="mt-5"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            New Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>

        {message && (
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
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
