import React, { useEffect, useState } from "react";

import SignupModal from "./signup";
import LoginModal from "./login";
import CheckEmail from "./checkEmail";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const AuthModal = (props) => {
  const [changedTyped, setChangedType] = useState(props.typeModal);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.show}
      onClose={props.toggleModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Fade in={props.show}>
        <div
          className="row justify-content-center align-items-center pt-5 pb-5"
          style={{
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <div
            className="row justify-content-center align-items-center "
            style={{ width: 300 }}
          >
            <div className="col-12">
              {changedTyped == "login" ? (
                <LoginModal props={props} />
              ) : changedTyped == "signup" ? (
                <SignupModal props={props} />
              ) : (
                <CheckEmail props={props} />
              )}
            </div>

            <div className="col-12">
              {changedTyped == "login" ? (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  <small>
                    <span
                      style={{ cursor: "pointer", color: "darkslategray" }}
                      onClick={() => setChangedType("forgotPassword")}
                    >
                      Forgot password
                    </span>
                  </small>
                  <small>
                    Don't have account?{" "}
                    <span
                      style={{ cursor: "pointer", color: "darkslategray" }}
                      onClick={() => setChangedType("signup")}
                    >
                      Signup Now
                    </span>
                  </small>
                </div>
              ) : changedTyped == "signup" ? (
                <small>
                  Already have account?{" "}
                  <span
                    style={{ cursor: "pointer", color: "darkslategray" }}
                    onClick={() => setChangedType("login")}
                  >
                    Login Now
                  </span>
                </small>
              ) : (
                <small>
                  Back{" "}
                  <span
                    style={{ cursor: "pointer", color: "darkslategray" }}
                    onClick={() => setChangedType("login")}
                  >
                    to login
                  </span>
                </small>
              )}
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default AuthModal;
