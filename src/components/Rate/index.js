import React, { useState } from "react";

import { Grade } from "@material-ui/icons";

import PopupNotif from "../PopupNotif";

const Rate = () => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(0);
  const [color, setColor] = useState("gold");
  const [showPopup, setPopup] = useState(false);

  const submit = () => {
    setPopup(!showPopup);
  };

  return (
    <div>
      <PopupNotif
        show={showPopup}
        toggleModal={submit}
        title="Thank you for grading our website"
        status="success"
      />
      {show && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "white",
            height: 100,
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bottom: "50%",
            right: "50%",
            transform: "translate(50%, -50%)",
            borderRadius: 10,
            filter: "drop-shadow(0 0 0.75rem black)",
            cursor: "pointer",
            padding: 20,
          }}
          onClick={() => {
            setShow(!show);
          }}
        >
          {Array.apply(null, Array(5)).map((item, key) => (
            <Grade
              fontSize="large"
              style={{ color: key <= value ? "gold" : "gray" }}
              key={key}
              onClick={() => {
                setValue(key);
                submit();
              }}
            />
          ))}
        </div>
      )}
      <div
        style={{
          position: "fixed",
          backgroundColor: "white",
          width: 200,
          height: 100,
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          bottom: 10,
          right: 10,
          borderRadius: 10,
          filter: "drop-shadow(0 0 0.75rem black)",
          cursor: "pointer",
        }}
        onClick={() => {
          setShow(!show);
        }}
      >
        <Grade fontSize="large" style={{ color: "gold" }} />
        <p>Grade Website</p>
      </div>
    </div>
  );
};

export default Rate;
