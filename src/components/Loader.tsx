import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import logodark from "../assets/images/logodark.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Loader: React.FC = () => {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.telegram.theme) || "light"; // To'g'ridan-to'g'ri Redux'dan
  const [showText, setShowText] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowText(true), 2500);
    const timer2 = setTimeout(() => setIsOpen(false), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!isOpen) return null;

  const currentLogo = theme === "dark" ? logodark : logo;
  const bgColor = theme === "dark" ? "bg-[#17212B]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const overlayBg = theme === "dark" ? "bg-gray-900 bg-opacity-75" : "bg-gray-900 bg-opacity-50";
  const footerTextColor = theme === "dark" ? "text-gray-300" : "text-gray-500";

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center ${overlayBg} z-50 w-full`}>
      <div className={`flex flex-col items-center justify-center w-full min-h-screen ${bgColor}`}>
        {showText ? (
          <h3 className={`text-lg px-2 font-bold ${textColor} text-center`}>{t("slogan")}</h3>
        ) : (
          <img src={currentLogo} alt="Turnify Logo" className="h-24 w-auto object-cover mb-4" />
        )}
      </div>
      <div className={`fixed bottom-8 px-4 ${footerTextColor} text-sm w-full text-center`}>
        {t("copyright")} <br />
        <div className="flex mt-1 justify-center text-xs max-w-[400px] mx-auto">
          <Link to={"/terms"} className="text-blue-500 pr-3">{t("terms")}</Link> |{" "}
          <Link to={"/privacy"} className="text-blue-500 pl-3">{t("privacy")}</Link>
        </div>
      </div>
    </div>
  );
};

export default Loader;