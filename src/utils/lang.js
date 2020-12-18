import usa from "../assets/icons/usa.png";
import indonesia from "../assets/icons/indonesia.png";
import china from "../assets/icons/china.png";

const Lang = (props) => {
  const lang = sessionStorage.getItem("lang") || "en";

  const langData = {
    en: {
      icon: usa,
      name: "English",
    },
    cn: {
      icon: china,
      name: "普通话",
    },
    id: {
      icon: indonesia,
      name: "Bahasa",
    },
  };

  const getDataLang = (code) => {
    return langData[code];
  };

  const changeLang = (code) => {
    sessionStorage.setItem("lang", code);
    window.location.reload();
  };

  return { lang, changeLang, langData, getDataLang };
};

export default Lang;
