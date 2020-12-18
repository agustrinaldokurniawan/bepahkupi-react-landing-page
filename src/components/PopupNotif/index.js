import React from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import success from "../../assets/icons/success.png";
import error from "../../assets/icons/error.png";

const PopupNotif = ({ show, status, title, message, toggleModal }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={show}
      onClose={toggleModal}
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
      <Fade in={show}>
        <div
          className="text-center"
          style={{ backgroundColor: "white", padding: 20, borderRadius: 30 }}
        >
          <img src={status == "success" ? success : error} alt={status} />
          <h2 id="transition-modal-title">{title}</h2>
          <p id="transition-modal-description">{message}</p>
        </div>
      </Fade>
    </Modal>
  );
};

export default PopupNotif;
