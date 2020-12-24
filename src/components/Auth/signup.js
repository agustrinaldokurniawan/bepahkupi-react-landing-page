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

const Signup = ({ props }) => {
  const { setUserToSession } = UserState();
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
    email: "",
    name: "",
    type: "signup",
  });
  const [message, setMessage] = useState();

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
    if (
      values.name.length > 0 &&
      values.email.length > 0 &&
      values.password.length > 0
    ) {
      const nameRegex = /^[A-Za-z ]+$/g;
      if (nameRegex.test(values.name)) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRegex.test(values.email)) {
          if (values.password.length > 7) {
            const passwordRegex = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\)\(+\=\._-]+$/g;
            if (passwordRegex.test(values.password)) {
              return true;
            } else {
              return "Invalid password character";
            }
          } else {
            return "Password should contain 7 character";
          }
        } else {
          return "Email invalid";
        }
      } else {
        return "Invalid name character";
      }
    } else {
      return "Please fill the form";
    }
  };

  const onSubmit = () => {
    if (validateData() == true) {
      Axios.post(`${process.env.REACT_APP_API}/user/account/create`, {
        name: values.name,
        email: values.email,
        password: values.password,
      })
        .then((response) => {
          if (response.data.account) {
            setUserToSession(response.data.account);
            props.toggleModal();
            window.location.reload();
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
        <h1>Signup</h1>
      </div>
      <div className="col-12 mt-5">
        <FormControl variant="outlined" style={{ width: "100%" }}>
          <InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={values.name}
            onChange={handleChange("name")}
            labelWidth={70}
          />
        </FormControl>
        <FormControl
          variant="outlined"
          style={{ width: "100%" }}
          className="mt-5"
        >
          <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={values.email}
            onChange={handleChange("email")}
            labelWidth={70}
          />
        </FormControl>
        <FormControl
          variant="outlined"
          style={{ width: "100%" }}
          className="mt-5"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
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
          Signup
        </Button>
      </div>
    </div>
  );
};

export default Signup;
