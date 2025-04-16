import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getThemeStyles } from "../components/themeConfig";
import GenderModal from "../components/Login/GenderModal";
import DetailsModal from "../components/Login/DetailsModal";
import UsernameModal from "../components/Login/UsernameModal";
import TimeZoneModal from "../components/Login/TimeZoneModal";

const LoginLanguageModal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState<string | null>(
    localStorage.getItem("language")
  );
  const theme = useSelector((state: RootState) => state.telegram.theme) || "light";
  const styles = getThemeStyles(theme);
  const telegramUsername = useSelector(
    (state: RootState) => state.telegram.username
  );

  const [showGenderModal, setShowGenderModal] = useState<boolean>(false);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [showUsernameModal, setShowUsernameModal] = useState<boolean>(false);
  const [showTimeZoneModal, setShowTimeZoneModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string | null>(null);
  const [username, setUsername] = useState<string>(
    telegramUsername ? `@${telegramUsername}` : ""
  );
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(selectedLang ? 33 : 0);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    if (selectedLang) i18n.changeLanguage(selectedLang);
  }, [selectedLang, i18n]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const detectKeyboard = () => {
      const viewportHeight =
        window.visualViewport?.height || window.innerHeight;
      const windowHeight = window.innerHeight;
      setIsKeyboardVisible(viewportHeight < windowHeight * 0.8);
    };
    window.visualViewport?.addEventListener("resize", detectKeyboard);
    window.addEventListener("resize", detectKeyboard);
    return () => {
      window.visualViewport?.removeEventListener("resize", detectKeyboard);
      window.removeEventListener("resize", detectKeyboard);
    };
  }, []);

  useEffect(() => {
    if (!selectedLang) setProgress(0);
    else if (showGenderModal) {
      setProgress(gender ? 50 : 40);
    } else if (showDetailsModal) {
      if (firstName.trim() && !lastName.trim()) setProgress(55);
      else if (firstName.trim() && lastName.trim()) setProgress(70);
      else setProgress(50);
    } else if (showUsernameModal) {
      setProgress(username.trim() && username !== "@" ? 85 : 70);
    } else if (showTimeZoneModal) {
      setProgress(selectedCountry ? 100 : 85);
    } else {
      setProgress(33);
    }
  }, [
    selectedLang,
    showGenderModal,
    gender,
    showDetailsModal,
    firstName,
    lastName,
    username,
    showUsernameModal,
    showTimeZoneModal,
    selectedCountry,
  ]);

  const handleLanguageSelect = (lang: string) => {
    setSelectedLang(lang);
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (telegramUsername) {
      const afterAt = value.startsWith("@") ? value.slice(1) : value;
      if (/^[a-zA-Z0-9-]*$/.test(afterAt)) {
        setUsername(`@${afterAt}`);
        if (afterAt.startsWith("-") || afterAt.endsWith("-")) {
          setUsernameError(t("username_error"));
        } else {
          setUsernameError(null);
        }
      }
    } else {
      if (!value.startsWith("@")) {
        value = `@${value}`;
      }
      const afterAt = value.slice(1);
      if (/^[a-zA-Z0-9-]*$/.test(afterAt)) {
        setUsername(value);
        if (afterAt.startsWith("-") || afterAt.endsWith("-")) {
          setUsernameError(t("username_error"));
        } else {
          setUsernameError(null);
        }
      }
    }
  };

  const buttonBackground = (condition: boolean): string =>
    condition
      ? "bg-gradient-to-r from-[#0061FF] to-[#52DAFF]"
      : `border ${styles.borderColor} ${styles.bgColor}`;

  const progressBarStyle = {
    height: "3px",
    backgroundImage: `linear-gradient(to right, #0061FF 0%, #52DAFF ${progress}%, #E5E7EB ${progress}%, #E5E7EB 100%)`,
    width: "100%",
    transition: "background-image 0.3s ease",
  };

  const buttonPositionClass = isKeyboardVisible
    ? "relative mt-8 mb-4"
    : "fixed bottom-8 left-7 right-7";

  return (
    <div className={`${styles.overlayBg}`}>
      <div
        className={`flex pt-5 flex-col items-center justify-center mx-auto max-w-[450px] min-h-screen w-full ${styles.bgColor} px-8 pb-20`}
      >
        <div className="w-full absolute pt-20 phone:pt-5 mx-auto max-w-[450px] top-8 flex justify-start">
          <div style={progressBarStyle}></div>
        </div>
        <h2
          className={`text-3xl w-60 text-center font-inter font-bold ${styles.textColor} mb-6`}
        >
          {t("language")}
        </h2>
        <div className="w-full max-w-[390px] space-y-3">
          {["uz", "en", "ru"].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageSelect(lang)}
              className={`w-full relative ${styles.controlBg} p-3 rounded-lg text-center font-medium flex items-center justify-center transition-colors ${
                selectedLang === lang ? "text-[#5EB5F7]" : "text-[#768C9E]"
              }`}
            >
              <span>{t(lang)}</span>
              {selectedLang === lang && (
                <span className="ml-2 text-[#5EB5F7] absolute right-4">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </button>
          ))}
          <button
            onClick={() => selectedLang && setShowGenderModal(true)}
            disabled={!selectedLang}
            className={`max-w-[385px] mx-auto p-3 rounded-xl font-semibold transition-colors ${buttonBackground(
              !!selectedLang
            )} ${
              !selectedLang
                ? `cursor-not-allowed ${styles.textColor}`
                : styles.activeButtonTextColor
            } ${buttonPositionClass}`}
          >
            {t("nextt")}
          </button>
        </div>

        {showGenderModal && (
          <GenderModal
            setShowGenderModal={setShowGenderModal}
            setGender={setGender}
            gender={gender}
            setShowDetailsModal={setShowDetailsModal}
            setProgress={setProgress}
            theme={theme}
            buttonPositionClass={buttonPositionClass}
            t={t}
          />
        )}

        {showDetailsModal && (
          <DetailsModal
            setShowDetailsModal={setShowDetailsModal}
            setShowGenderModal={setShowGenderModal}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            setShowUsernameModal={setShowUsernameModal}
            setProgress={setProgress}
            theme={theme}
            buttonPositionClass={buttonPositionClass}
            t={t}
          />
        )}

        {showUsernameModal && (
          <UsernameModal
            setShowUsernameModal={setShowUsernameModal}
            setShowDetailsModal={setShowDetailsModal}
            username={username}
            setUsername={setUsername}
            usernameError={usernameError}
            setUsernameError={setUsernameError}
            handleUsernameChange={handleUsernameChange}
            setShowTimeZoneModal={setShowTimeZoneModal}
            setProgress={setProgress}
            theme={theme}
            buttonPositionClass={buttonPositionClass}
            t={t}
          />
        )}

        {showTimeZoneModal && (
          <TimeZoneModal
            setShowTimeZoneModal={setShowTimeZoneModal}
            setShowUsernameModal={setShowUsernameModal}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            dropdownRef={dropdownRef}
            isKeyboardVisible={isKeyboardVisible}
            setShowSuccessModal={setShowSuccessModal}
            navigate={navigate}
            setProgress={setProgress}
            theme={theme}
            buttonPositionClass={buttonPositionClass}
            t={t}
          />
        )}

        {showSuccessModal && (
          <div
            className={`fixed inset-0 flex flex-col mx-auto max-w-[450px] items-center justify-center ${styles.bgColor} px-4 z-50 w-full`}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#0061FF] to-[#52DAFF] rounded-lg flex items-center justify-center mb-4 transform rotate-12">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-[#0061FF] text-2xl font-bold text-center mb-2">
                {t("success")}
              </h2>
              <p className="text-[#0061FF] text-lg text-center">
                {t("registered")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginLanguageModal;