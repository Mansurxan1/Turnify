import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import logodark from "../assets/images/logodark.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Loader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [showText, setShowText] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const theme = useSelector((state: RootState) => state.telegram.theme);

  useEffect(() => {
    const handleLanguageChange = () => {};
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowText(true);
    }, 2500);

    const timer2 = setTimeout(() => {
      setIsOpen(false);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!isOpen) return null;

  const currentLogo = theme === "light" ? logodark : logo;
  const bgColor = theme === "light" ? "bg-[#17212B]" : "bg-white";
  const textColor = theme === "light" ? "text-white" : "text-black";
  const overlayBg = theme === "light" ? "bg-gray-900 bg-opacity-75" : "bg-gray-900 bg-opacity-50";
  const footerTextColor = theme === "light" ? "text-gray-300" : "text-gray-500";

  return (
    <div className={`fixed inset-0 min-h-screen flex justify-center ${overlayBg} z-50`}>
      <div className={`flex max-w-[450px] w-full flex-col items-center justify-center ${bgColor}`}>
        {showText ? (
          <h3 className={`text-xl font-bold ${textColor}`}>
            {t("slogan")}
          </h3>
        ) : (
          <img src={currentLogo} alt="Turnify Logo" className="w-full h-24 mb-4" />
        )}
      </div>

      <div className={`fixed bottom-8 ${footerTextColor} text-sm text-center max-w-[390px]`}>
        {t("copyright")} <br />
        <div className="flex px-4 justify-between">
          <Link to={"/terms"} className="text-blue-500 w-1/2">{t("terms")}</Link> |{" "}
          <Link to={"/privacy"} className="text-blue-500 w-1/2">{t("privacy")}</Link>
        </div>
      </div>
    </div>
  );
};

export default Loader;