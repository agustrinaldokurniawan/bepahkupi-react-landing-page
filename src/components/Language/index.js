import React from "react";

import LangUtils from "../../utils/lang";

const LanguageChanger = (props) => {
  const { lang, changeLang, getDataLang } = LangUtils();

  return (
    <div
      className={`btn-group  ${
        props.direction === "up" ? "dropup" : "dropdown"
      }`}
    >
      <button
        type="button"
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: props.color ? props.color : "transparent",
          border: "none",
        }}
      >
        <p
          style={{
            marginBottom: 0,
            marginRight: 10,
          }}
        >
          {getDataLang(lang).name}
        </p>
        <img
          src={getDataLang(lang).icon}
          alt={getDataLang(lang).name}
          style={{ marginRight: 10 }}
        />
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <button
            onClick={() => changeLang("cn")}
            className="dropdown-item"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ marginBottom: 0, marginRight: 10 }}>
              {getDataLang("cn").name}
            </p>
            <img
              src={getDataLang("cn").icon}
              alt={getDataLang("cn").name}
              style={{ marginRight: 10 }}
            />
          </button>
        </li>
        <li>
          <button
            onClick={() => changeLang("id")}
            className="dropdown-item"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ marginBottom: 0, marginRight: 10 }}>
              {getDataLang("id").name}
            </p>
            <img
              src={getDataLang("id").icon}
              alt={getDataLang("id").name}
              style={{ marginRight: 10 }}
            />
          </button>
        </li>
        <li>
          <button
            onClick={() => changeLang("en")}
            className="dropdown-item"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ marginBottom: 0, marginRight: 10 }}>
              {getDataLang("en").name}
            </p>
            <img
              src={getDataLang("en").icon}
              alt={getDataLang("en").name}
              style={{ marginRight: 10 }}
            />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LanguageChanger;
