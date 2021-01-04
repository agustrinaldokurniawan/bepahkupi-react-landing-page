import React, { useState } from "react";

import Auth from "../../../components/Auth";

const LoginAdmin = () => {
  const [modalState, setModalState] = useState({
    show: true,
    typeModal: "adminAuth",
  });
  const { show } = modalState;

  const toggleModal = (type) => {
    // setModalState({
    //   typeModal: type,
    //   show: !show,
    // });
  };
  const ContentAuth = () => {
    return (
      <Auth
        typeModal={modalState.typeModal}
        show={show}
        toggleModal={toggleModal}
        back={false}
      />
    );
  };
  return <ContentAuth />;
};

export default LoginAdmin;
