import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Check, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getThemeStyles } from "./themeConfig";

const countries: string[] = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
];

const LoginLanguageModal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState<string | null>(localStorage.getItem("language"));
  const theme = useSelector((state: RootState) => state.telegram.theme) || "light";
  const styles = getThemeStyles(theme);
  const telegramUsername = useSelector((state: RootState) => state.telegram.username);

  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [showUsernameModal, setShowUsernameModal] = useState<boolean>(false);
  const [showTimeZoneModal, setShowTimeZoneModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>(telegramUsername ? `@${telegramUsername}` : "");
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const detectKeyboard = () => {
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
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
    else if (showDetailsModal) {
      if (firstName.trim() && !lastName.trim()) setProgress(49.5);
      else if (firstName.trim() && lastName.trim()) setProgress(66);
      else setProgress(33);
    } else if (showUsernameModal) {
      setProgress(username.trim() && username !== "@" ? 75 : 66);
    } else if (showTimeZoneModal) {
      setProgress(selectedCountry ? 100 : 75);
    } else {
      setProgress(33);
    }
  }, [selectedLang, firstName, lastName, username, showDetailsModal, showUsernameModal, showTimeZoneModal, selectedCountry]);

  const handleLanguageSelect = (lang: string) => {
    setSelectedLang(lang);
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[^\d\s!@#$%^&*()_+=[\]{}|;:'",.<>?~`]*$/.test(value)) {
      setFirstName(value);
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[^\d\s!@#$%^&*()_+=[\]{}|;:'",.<>?~`]*$/.test(value)) {
      setLastName(value);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (telegramUsername) {
      if (!value.startsWith("@")) {
        setUsername(username || "@");
      } else {
        const afterAt = value.slice(1);
        if (/^[a-zA-Z0-9-]*$/.test(afterAt)) {
          setUsername(`@${afterAt}`);
          if (afterAt.startsWith("-") || afterAt.endsWith("-")) {
            setUsernameError(t("username_error"));
          } else {
            setUsernameError(null);
          }
        }
      }
    } else {
      if (/^[@a-zA-Z0-9-]*$/.test(value)) {
        setUsername(value);
        if (value.startsWith("-") || value.endsWith("-")) {
          setUsernameError(t("username_error"));
        } else {
          setUsernameError(null);
        }
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsDropdownOpen(true);
    if (!value.trim()) setSelectedCountry("");
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setSearchTerm(country);
    setIsDropdownOpen(false);
    setProgress(100);
  };

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const buttonPositionClass = isKeyboardVisible ? "relative mt-8 mb-4" : "fixed bottom-8 left-7 right-7";

  return (
    <div className={`${styles.overlayBg}`}>
      <div className={`flex pt-5 flex-col items-center justify-center mx-auto max-w-[450px] min-h-screen w-full ${styles.bgColor} px-8 pb-20`}>
        <div className="w-full absolute pt-20 phone:pt-5 mx-auto max-w-[450px] top-8 flex justify-start">
          <div style={progressBarStyle}></div>
        </div>
        <h2 className={`text-3xl w-60 text-center font-inter font-bold ${styles.textColor} mb-6`}>{t("language")}</h2>
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
            onClick={() => selectedLang && setShowDetailsModal(true)}
            disabled={!selectedLang}
            className={`max-w-[385px] mx-auto p-3 rounded-xl font-semibold transition-colors ${buttonBackground(
              !!selectedLang
            )} ${!selectedLang ? `cursor-not-allowed ${styles.textColor}` : styles.activeButtonTextColor} ${buttonPositionClass}`}
          >
            {t("nextt")}
          </button>
        </div>

        {showDetailsModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
            <div className={`h-screen max-w-[450px] w-full mx-auto flex flex-col ${styles.bgColor} justify-start overflow-y-auto`}>
              <div className="max-w-[450px] w-full sticky top-0 flex flex-col z-10 bg-inherit">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setProgress(33);
                  }}
                  className={`${styles.textColor} text-[24px] px-4 pt-20 phone:pt-5 self-start`}
                >
                  <ChevronDown className="h-6 w-6 transform rotate-90" strokeWidth={3} />
                </button>
                <div style={progressBarStyle} className="mt-2"></div>
              </div>
              <div className="px-8 pb-24">
                <h2 className={`mt-10 text-xl uppercase font-bold ${styles.textColor} leading-tight`}>{t("enter_details")}</h2>
                <p className={`mt-2 text-[#768C9E] text-sm leading-relaxed`}>{t("name_instructions")}</p>
                <div className="flex flex-col space-y-4">
                  <input
                    value={firstName}
                    onChange={handleFirstNameChange}
                    placeholder={t("first_name")}
                    className={`w-full max-w-[390px] capitalize mt-4 p-3 ${styles.controlBg} rounded-xl ${styles.inputTextColor} text-[16px] focus:outline-none border ${styles.borderColor}`}
                  />
                  <input
                    value={lastName}
                    onChange={handleLastNameChange}
                    placeholder={t("last_name")}
                    className={`w-full max-w-[390px] p-3 ${styles.controlBg} rounded-xl ${styles.inputTextColor} text-[16px] focus:outline-none border ${styles.borderColor}`}
                  />
                </div>
                <button
                  onClick={() => {
                    if (firstName.trim() && lastName.trim()) {
                      setShowDetailsModal(false);
                      setShowUsernameModal(true);
                    }
                  }}
                  disabled={!firstName.trim() || !lastName.trim()}
                  className={`max-w-[385px] mx-auto p-3 rounded-xl font-semibold transition-colors ${buttonBackground(
                    !!(firstName.trim() && lastName.trim())
                  )} ${!firstName.trim() || !lastName.trim() ? `cursor-not-allowed ${styles.textColor}` : styles.activeButtonTextColor} ${buttonPositionClass}`}
                >
                  {t("next")}
                </button>
              </div>
            </div>
          </div>
        )}

        {showUsernameModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
            <div className={`h-screen max-w-[450px] w-full mx-auto flex flex-col ${styles.bgColor} justify-start overflow-y-auto`}>
              <div className="max-w-[450px] w-full sticky top-0 flex flex-col z-10 bg-inherit">
                <button
                  onClick={() => {
                    setShowUsernameModal(false);
                    setShowDetailsModal(true);
                    setProgress(66);
                  }}
                  className={`${styles.textColor} text-[24px] px-4 pt-20 phone:pt-5 self-start`}
                >
                  <ChevronDown className="h-6 w-6 transform rotate-90" strokeWidth={3} />
                </button>
                <div style={progressBarStyle} className="mt-2"></div>
              </div>
              <div className="px-8 pb-24">
                <h2 className={`mt-10 text-xl font-bold ${styles.textColor} leading-tight`}>{t("enter_username")}</h2>
                <p className={`mt-4 text-[#768C9E] text-sm leading-relaxed`}>{t("username_instructions")}</p>
                <input
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="@username"
                  className={`w-full max-w-[390px] mt-4 p-3 ${styles.controlBg} rounded-xl ${styles.inputTextColor} text-[16px] focus:outline-none border ${styles.borderColor}`}
                />
                {usernameError && <p className="mt-2 text-[12px] text-red-500 text-center">{usernameError}</p>}
                <p className="mt-2 text-[12px] text-[#768C9E] text-center">{t("username_rules")}</p>
                <button
                  onClick={() => {
                    if (username.trim() && username !== "@" && !username.startsWith("-") && !username.endsWith("-")) {
                      setShowUsernameModal(false);
                      setShowTimeZoneModal(true);
                    }
                  }}
                  disabled={!username.trim() || username === "@" || username.startsWith("-") || username.endsWith("-")}
                  className={`max-w-[385px] mx-auto p-3 rounded-xl font-semibold transition-colors ${buttonBackground(
                    !!(username.trim() && username !== "@" && !username.startsWith("-") && !username.endsWith("-"))
                  )} ${!username.trim() || username === "@" || username.startsWith("-") || username.endsWith("-") ? `cursor-not-allowed ${styles.textColor}` : styles.activeButtonTextColor} ${buttonPositionClass}`}
                >
                  {t("next")}
                </button>
              </div>
            </div>
          </div>
        )}

        {showTimeZoneModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
            <div className={`h-screen max-w-[450px] w-full mx-auto flex flex-col items-center justify-start ${styles.bgColor} overflow-y-auto`}>
              <div className="w-full max-w-[450px] sticky top-0 flex flex-col z-10 bg-inherit">
                <button
                  onClick={() => {
                    setShowTimeZoneModal(false);
                    setShowUsernameModal(true);
                    setProgress(75);
                  }}
                  className={`${styles.textColor} px-4 text-[24px] pt-20 phone:pt-5 self-start`}
                >
                  <ChevronDown className="h-6 w-6 transform rotate-90" strokeWidth={3} />
                </button>
                <div style={progressBarStyle} className="mt-2"></div>
              </div>
              <div className="px-8 pb-24 w-full">
                <h2 className={`mt-10 text-xl font-bold ${styles.textColor} leading-tight`}>{t("select_timezone")}</h2>
                <p className={`mt-4 text-[#768C9E] text-sm leading-relaxed`}>{t("timezone_instructions")}</p>
                <div className="w-full max-w-[420px] mt-6 relative" ref={dropdownRef}>
                  <div className="relative">
                    <input
                      value={searchTerm}
                      onChange={handleSearchChange}
                      onFocus={() => setIsDropdownOpen(true)}
                      placeholder={t("country_or_city")}
                      className={`w-full p-3 ${styles.controlBg} rounded-lg ${styles.inputTextColor} text-base focus:outline-none pr-10 border ${styles.borderColor}`}
                    />
                    <ChevronDown
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                  {isDropdownOpen && (
                    <div
                      className={`${isKeyboardVisible ? "absolute bottom-full mb-1" : "absolute top-full mt-1"} w-full ${styles.controlBg} rounded-lg max-h-[200px] overflow-y-auto z-20 ${styles.dropdownShadow}`}
                    >
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                          <div
                            key={country}
                            className={`p-3 cursor-pointer ${
                              selectedCountry === country
                                ? `${styles.timeBg} text-white`
                                : `${theme === "light" ? "hover:bg-[#2B5278] hover:text-white" : "hover:bg-[#5EB5F7] hover:text-white"} text-[#768C9E]`
                            }`}
                            onClick={() => handleCountrySelect(country)}
                          >
                            {country}
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-center text-gray-500">{t("no_results")}</div>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    if (selectedCountry) {
                      setShowTimeZoneModal(false);
                      setShowSuccessModal(true);
                      setTimeout(() => {
                        setShowSuccessModal(false);
                        navigate("/");
                      }, 3000);
                    }
                  }}
                  disabled={!selectedCountry}
                  className={`max-w-[385px] mx-auto p-3 rounded-xl font-semibold transition-colors ${buttonBackground(
                    !!selectedCountry
                  )} ${!selectedCountry ? `cursor-not-allowed ${styles.textColor}` : styles.activeButtonTextColor} ${buttonPositionClass}`}
                >
                  {t("done")}
                </button>
              </div>
            </div>
          </div>
        )}

        {showSuccessModal && (
          <div className={`fixed inset-0 flex flex-col items-center justify-center ${styles.bgColor} px-4 z-50 w-full`}>
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#0061FF] to-[#52DAFF] rounded-lg flex items-center justify-center mb-4 transform rotate-12">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-[#0061FF] text-2xl font-bold text-center mb-2">{t("success")}</h2>
              <p className="text-[#0061FF] text-lg text-center">{t("registered")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginLanguageModal;