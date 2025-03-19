// import { useState, useEffect, useRef } from "react";
// import type React from "react";
// import { useTranslation } from "react-i18next";
// import { Check, ChevronDown } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../store/store";

// const countries = [
//     "Afghanistan",
//     "Albania",
//     "Algeria",
//     "Andorra",
//     "Angola",
//     "Antigua and Barbuda",
//     "Argentina",
//     "Armenia",
//     "Australia",
// ];

// const LanguageModal = () => {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const [selectedLang, setSelectedLang] = useState<string | null>(localStorage.getItem("language"));
//   const theme = useSelector((state: RootState) => state.telegram.theme);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showTimeZoneModal, setShowTimeZoneModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [usernameError, setUsernameError] = useState<string | null>(null);
//   const [progress, setProgress] = useState(selectedLang ? 33 : 0);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (selectedLang) i18n.changeLanguage(selectedLang);
//   }, [selectedLang, i18n]);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (!selectedLang) {
//       setProgress(0);
//     } else if (showDetailsModal) {
//       if (name.trim() && !username.trim()) setProgress(49.5);
//       else if (name.trim() && username.trim()) setProgress(66);
//       else setProgress(33);
//     } else if (showTimeZoneModal) {
//       if (selectedCountry) setProgress(100);
//       else setProgress(66.6);
//     } else {
//       setProgress(33);
//     }
//   }, [selectedLang, name, username, showDetailsModal, showTimeZoneModal, selectedCountry]);

//   const handleLanguageSelect = (lang: string) => {
//     setSelectedLang(lang);
//     localStorage.setItem("language", lang);
//     i18n.changeLanguage(lang);
//   };

//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const value = e.target.value; 
//   let cleanedValue = value.replace(/^\s+/, "");
//   cleanedValue = cleanedValue.replace(/\s+/g, " ");
//   if (/^[a-zA-Z\s]*$/.test(cleanedValue)) {
//     setName(cleanedValue); 
//   }
// };

//   const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (/^[a-zA-Z0-9-]*$/.test(value)) {
//       setUsername(value);
//       if (value.startsWith("-")) {
//         setUsernameError(t("username_error"));
//       } else if (value.endsWith("-")) {
//         setUsernameError(t("username_error"));
//       } else {
//         setUsernameError(null);
//       }
//     }
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     setIsDropdownOpen(true);
//     if (!value.trim()) {
//       setSelectedCountry("");
//     }
//   };

//   const handleCountrySelect = (country: string) => {
//     setSelectedCountry(country);
//     setSearchTerm(country);
//     setIsDropdownOpen(false);
//     setProgress(100);
//   };

//   const filteredCountries = countries.filter((country) =>
//     country.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const textColor = theme === "light" ? "text-white" : "text-black";
//   const bgColor = theme === "light" ? "bg-[#242f3d]" : "bg-[#F1F1F1]";
//   const buttonBg = theme === "light" ? "bg-[#293A4C]" : "bg-white";
//   const timeBg = theme === "light" ? "bg-[#5EB5F7]" : "bg-[#2B5278]";

//   const buttonBackground = (condition: boolean) => {
//     if (condition) {
//       return "bg-gradient-to-r from-[#0061FF] to-[#52DAFF]";
//     }
//     return theme === "light" ? "bg-[#2B5278]" : "bg-[#BFC8CF]";
//   };

//   const dropdownShadow = theme === "light"
//     ? "shadow-[0px_10px_15px_-3px_#00000026]"
//     : "shadow-[0px_10px_15px_-3px_#00000033]";

//   const progressBarStyle = {
//     height: "4px",
//     backgroundImage: `linear-gradient(to right, #0061FF 0%, #52DAFF ${progress}%, #E5E7EB ${progress}%, #E5E7EB 100%)`,
//     width: "100%",
//     transition: "background-image 0.3s ease",
//   };

//   return (
//     <>
//       <div className={`flex flex-col items-center justify-center h-screen ${bgColor} px-8`}>
//         <div className="w-full absolute pt-2 mx-auto max-w-[450px] top-10 flex justify-start">
//           <div style={progressBarStyle}></div>
//         </div>
//         <h2 className={`text-3xl w-60 text-center font-inter font-bold ${textColor} mb-6`}>
//           {t("language")}
//         </h2>
//         <div className="w-full max-w-[390px] space-y-3">
//           {["uz", "en", "ru"].map((lang) => (
//             <button
//               key={lang}
//               onClick={() => handleLanguageSelect(lang)}
//               className={`w-full relative ${buttonBg} p-3 rounded-lg text-center font-medium flex items-center justify-center transition-colors ${
//                 selectedLang === lang ? "text-[#5EB5F7]" : "text-[#768C9E]"
//               }`}
//             >
//               <span>{t(lang)}</span>
//               {selectedLang === lang && (
//                 <span className="ml-2 text-[#5EB5F7] absolute right-4">
//                   <Check className="h-4 w-4" />
//                 </span>
//               )}
//             </button>
//           ))}
//           <button
//             onClick={() => selectedLang && setShowDetailsModal(true)}
//             disabled={!selectedLang}
//             className={`fixed bottom-8 max-w-[385px] mx-auto left-7 right-7 p-3 rounded-xl text-white font-semibold transition-colors ${
//               buttonBackground(!!selectedLang)
//             } ${!selectedLang && "cursor-not-allowed"}`}
//           >
//             {t("next")}
//           </button>
//         </div>
//       </div>

//       {showDetailsModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className={`h-screen max-w-[450px] w-full mx-auto flex flex-col ${bgColor} justify-start`}>
//             <div className="max-w-[450px] w-full absolute top-4 flex flex-col">
//               <button
//                 onClick={() => (setShowDetailsModal(false), setProgress(33))}
//                 className={`${textColor} text-[24px] px-4 self-start`}
//               >
//                 <ChevronDown className="h-6 w-6 transform rotate-90" strokeWidth={3} />
//               </button>
//               <div style={progressBarStyle} className="mt-2"></div>
//             </div>
//             <div className="px-8">
//               <h2 className={`mt-24 text-xl font-bold ${textColor} leading-tight`}>
//                 {t("enter_details")}
//               </h2>
//               <p className={`mt-4 text-[#768C9E] text-sm leading-relaxed`}>
//                 {t("name_instructions")}
//               </p>
//               <div className="flex flex-col">
//                 <input
//                   value={name}
//                   onChange={handleNameChange}
//                   placeholder={t("your_name")}
//                   className={`w-full max-w-[390px] mt-4 p-3 ${buttonBg} rounded-xl text-[#5EB5F7] text-[16px] focus:outline-none`}
//                 />

//                 <p className={`mt-6 text-[#768C9E] text-sm leading-relaxed`}>
//                   {t("username_instructions")}
//                 </p>

//                 <input
//                   value={username}
//                   onChange={handleUsernameChange}
//                   placeholder="@username"
//                   className={`w-full max-w-[390px] text-[#5EB5F7] mt-4 p-3 ${buttonBg} rounded-xl text-[16px] focus:outline-none`}
//                 />
//               </div>

//               {usernameError && (
//                 <p className="mt-2 text-[12px] text-red-500 text-center">{usernameError}</p>
//               )}
//               <p className="mt-2 text-[12px] text-[#768C9E] text-center">{t("username_rules")}</p>

//               <button
//                 onClick={() => {
//                   if (name.trim() && username.trim() && !username.startsWith("-") && !username.endsWith("-")) {
//                     setShowDetailsModal(false);
//                     setShowTimeZoneModal(true);
//                   }
//                 }}
//                 disabled={!name.trim() || !username.trim() || username.startsWith("-") || username.endsWith("-")}
//                 className={`fixed bottom-8 mx-auto left-7 right-7 max-w-[385px] p-3 rounded-xl text-white font-semibold transition-colors ${
//                   buttonBackground(!!(name.trim() && username.trim() && !username.startsWith("-") && !username.endsWith("-")))
//                 } ${(!name.trim() || !username.trim() || username.startsWith("-") || username.endsWith("-")) ? "cursor-not-allowed" : ""}`}
//               >
//                 {t("done")}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showTimeZoneModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className={`h-screen max-w-[450px] w-full mx-auto flex flex-col items-center justify-start ${bgColor}`}>
//             <div className="w-full max-w-[450px] absolute top-4 flex flex-col">
//               <button
//                 onClick={() => (setShowTimeZoneModal(false), setShowDetailsModal(true), setProgress(66))}
//                 className={`${textColor} px-4 text-[24px] self-start`}
//               >
//                 <ChevronDown className="h-6 w-6 transform rotate-90" strokeWidth={3} />
//               </button>
//               <div style={progressBarStyle} className="mt-2"></div>
//             </div>
//             <div className="px-8">
//               <h2 className={`mt-24 text-[24px] font-bold ${textColor} leading-tight`}>
//                 {t("select_timezone")}
//               </h2>
//               <p className={`mt-4 text-[#768C9E] text-[14px] leading-relaxed`}>
//                 {t("timezone_instructions")}
//               </p>
//               <div className="w-full max-w-[420px] mt-6 relative" ref={dropdownRef}>
//                 <div className="relative">
//                   <input
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     onFocus={() => setIsDropdownOpen(true)}
//                     placeholder={t("country_or_city")}
//                     className={`w-full p-3 ${buttonBg} rounded-lg text-[#5EB5F7] text-base focus:outline-none pr-10`}
//                   />
//                   <ChevronDown
//                     className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-transform duration-300 ${
//                       isDropdownOpen ? "rotate-180" : "rotate-0"
//                     }`}
//                   />
//                 </div>
//                 {isDropdownOpen && (
//                   <div
//                     className={`absolute w-full mt-1 ${buttonBg} rounded-lg max-h-[200px] overflow-y-auto z-10 ${dropdownShadow}`}
//                   >
//                     {filteredCountries.length > 0 ? (
//                       filteredCountries.map((country) => (
//                         <div
//                           key={country}
//                           className={`p-3 cursor-pointer ${
//                             selectedCountry === country
//                               ? `${timeBg} text-white`
//                               : `${theme === "light" ? "hover:bg-[#5EB5F7] hover:text-white" : "hover:bg-[#2B5278] hover:text-white"} text-[#768C9E]`
//                           }`}
//                           onClick={() => handleCountrySelect(country)}
//                         >
//                           {country}
//                         </div>
//                       ))
//                     ) : (
//                       <div className="p-3 text-center text-gray-500">{t("no_results")}</div>
//                     )}
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={() => {
//                   if (selectedCountry) {
//                     setShowTimeZoneModal(false);
//                     setShowSuccessModal(true);
//                     setTimeout(() => (setShowSuccessModal(false), navigate("/")), 3000);
//                   }
//                 }}
//                 disabled={!selectedCountry}
//                 className={`fixed left-7 right-7 bottom-8 mx-auto max-w-[385px] p-3 rounded-xl text-white font-semibold transition-colors ${
//                   buttonBackground(!!selectedCountry)
//                 } ${!selectedCountry ? "cursor-not-allowed" : ""}`}
//               >
//                 {t("done")}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showSuccessModal && (
//         <div className={`fixed inset-0 flex flex-col items-center justify-center ${bgColor} px-4 z-50`}>
//           <div className="flex flex-col items-center justify-center">
//             <div className="w-16 h-16 bg-gradient-to-r from-[#0061FF] to-[#52DAFF] rounded-lg flex items-center justify-center mb-4 transform rotate-12">
//               <Check className="h-8 w-8 text-white" />
//             </div>
//             <h2 className="text-[#0061FF] text-2xl font-bold text-center mb-2">{t("success")}</h2>
//             <p className="text-[#0061FF] text-lg text-center">{t("registered")}</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default LanguageModal;

"use client"

import { useState, useEffect, useRef } from "react"
import type React from "react"
import { useTranslation } from "react-i18next"
import { Check, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
]

const LanguageModal = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [selectedLang, setSelectedLang] = useState<string | null>(localStorage.getItem("language"))
  const theme = useSelector((state: RootState) => state.telegram.theme)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showTimeZoneModal, setShowTimeZoneModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [usernameError, setUsernameError] = useState<string | null>(null)
  const [progress, setProgress] = useState(selectedLang ? 33 : 0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    if (selectedLang) i18n.changeLanguage(selectedLang)
  }, [selectedLang, i18n])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Detect keyboard visibility
  useEffect(() => {
    const detectKeyboard = () => {
      // Check if the viewport height is significantly reduced (keyboard is likely visible)
      const viewportHeight = window.visualViewport?.height || window.innerHeight
      const windowHeight = window.innerHeight

      // If viewport height is significantly less than window height, keyboard is likely visible
      setIsKeyboardVisible(viewportHeight < windowHeight * 0.8)
    }

    // Listen to viewport changes (this works better than resize for mobile keyboards)
    window.visualViewport?.addEventListener("resize", detectKeyboard)
    window.addEventListener("resize", detectKeyboard)

    return () => {
      window.visualViewport?.removeEventListener("resize", detectKeyboard)
      window.addEventListener("resize", detectKeyboard)
    }
  }, [])

  useEffect(() => {
    if (!selectedLang) {
      setProgress(0)
    } else if (showDetailsModal) {
      if (name.trim() && !username.trim()) setProgress(49.5)
      else if (name.trim() && username.trim()) setProgress(66)
      else setProgress(33)
    } else if (showTimeZoneModal) {
      if (selectedCountry) setProgress(100)
      else setProgress(66.6)
    } else {
      setProgress(33)
    }
  }, [selectedLang, name, username, showDetailsModal, showTimeZoneModal, selectedCountry])

  const handleLanguageSelect = (lang: string) => {
    setSelectedLang(lang)
    localStorage.setItem("language", lang)
    i18n.changeLanguage(lang)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let cleanedValue = value.replace(/^\s+/, "")
    cleanedValue = cleanedValue.replace(/\s+/g, " ")
    if (/^[a-zA-Z\s]*$/.test(cleanedValue)) {
      setName(cleanedValue)
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^[a-zA-Z0-9-]*$/.test(value)) {
      setUsername(value)
      if (value.startsWith("-")) {
        setUsernameError(t("username_error"))
      } else if (value.endsWith("-")) {
        setUsernameError(t("username_error"))
      } else {
        setUsernameError(null)
      }
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setIsDropdownOpen(true)
    if (!value.trim()) {
      setSelectedCountry("")
    }
  }

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
    setSearchTerm(country)
    setIsDropdownOpen(false)
    setProgress(100)
  }

  const filteredCountries = countries.filter((country) => country.toLowerCase().includes(searchTerm.toLowerCase()))

  const textColor = theme === "light" ? "text-white" : "text-black"
  const bgColor = theme === "light" ? "bg-[#242f3d]" : "bg-[#F1F1F1]"
  const buttonBg = theme === "light" ? "bg-[#293A4C]" : "bg-white"
  const timeBg = theme === "light" ? "bg-[#5EB5F7]" : "bg-[#2B5278]"

  const buttonBackground = (condition: boolean) => {
    if (condition) {
      return "bg-gradient-to-r from-[#0061FF] to-[#52DAFF]"
    }
    return theme === "light" ? "bg-[#2B5278]" : "bg-[#BFC8CF]"
  }

  const dropdownShadow =
    theme === "light" ? "shadow-[0px_10px_15px_-3px_#00000026]" : "shadow-[0px_10px_15px_-3px_#00000033]"

  const progressBarStyle = {
    height: "4px",
    backgroundImage: `linear-gradient(to right, #0061FF 0%, #52DAFF ${progress}%, #E5E7EB ${progress}%, #E5E7EB 100%)`,
    width: "100%",
    transition: "background-image 0.3s ease",
  }

  // Determine button positioning class based on keyboard visibility
  const buttonPositionClass = isKeyboardVisible
    ? "relative mt-8 mb-4" // When keyboard is visible, use relative positioning
    : "fixed bottom-8 left-7 right-7" // When keyboard is hidden, use fixed positioning

  return (
    <>
      <div className={`flex flex-col items-center justify-center min-h-screen ${bgColor} px-8 pb-20`}>
        <div className="w-full absolute pt-2 mx-auto max-w-[450px] top-10 flex justify-start">
          <div style={progressBarStyle}></div>
        </div>
        <h2 className={`text-3xl w-60 text-center font-inter font-bold ${textColor} mb-6`}>{t("language")}</h2>
        <div className="w-full max-w-[390px] space-y-3">
          {["uz", "en", "ru"].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageSelect(lang)}
              className={`w-full relative ${buttonBg} p-3 rounded-lg text-center font-medium flex items-center justify-center transition-colors ${
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
            className={`max-w-[385px] mx-auto w-full p-3 rounded-xl text-white font-semibold transition-colors ${buttonBackground(
              !!selectedLang,
            )} ${!selectedLang && "cursor-not-allowed"} ${buttonPositionClass}`}
          >
            {t("next")}
          </button>
        </div>
      </div>

      {showDetailsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className={`h-screen max-w-[450px] w-full mx-auto flex flex-col ${bgColor} justify-start overflow-y-auto`}
          >
            <div className="max-w-[450px] w-full sticky top-0 flex flex-col z-10 bg-inherit">
              <button
                onClick={() => (setShowDetailsModal(false), setProgress(33))}
                className={`${textColor} text-[24px] px-4 self-start`}
              >
                <ChevronDown className="h-6 w-6 transform rotate-90" strokeWidth={3} />
              </button>
              <div style={progressBarStyle} className="mt-2"></div>
            </div>
            <div className="px-8 pb-24">
              <h2 className={`mt-24 text-xl font-bold ${textColor} leading-tight`}>{t("enter_details")}</h2>
              <p className={`mt-4 text-[#768C9E] text-sm leading-relaxed`}>{t("name_instructions")}</p>
              <div className="flex flex-col">
                <input
                  value={name}
                  onChange={handleNameChange}
                  placeholder={t("your_name")}
                  className={`w-full max-w-[390px] mt-4 p-3 ${buttonBg} rounded-xl text-[#5EB5F7] text-[16px] focus:outline-none`}
                />

                <p className={`mt-6 text-[#768C9E] text-sm leading-relaxed`}>{t("username_instructions")}</p>

                <input
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="@username"
                  className={`w-full max-w-[390px] text-[#5EB5F7] mt-4 p-3 ${buttonBg} rounded-xl text-[16px] focus:outline-none`}
                />
              </div>

              {usernameError && <p className="mt-2 text-[12px] text-red-500 text-center">{usernameError}</p>}
              <p className="mt-2 text-[12px] text-[#768C9E] text-center">{t("username_rules")}</p>

              <button
                onClick={() => {
                  if (name.trim() && username.trim() && !username.startsWith("-") && !username.endsWith("-")) {
                    setShowDetailsModal(false)
                    setShowTimeZoneModal(true)
                  }
                }}
                disabled={!name.trim() || !username.trim() || username.startsWith("-") || username.endsWith("-")}
                className={`max-w-[385px] w-full p-3 rounded-xl text-white font-semibold transition-colors ${buttonBackground(
                  !!(name.trim() && username.trim() && !username.startsWith("-") && !username.endsWith("-")),
                )} ${!name.trim() || !username.trim() || username.startsWith("-") || username.endsWith("-") ? "cursor-not-allowed" : ""} ${buttonPositionClass}`}
              >
                {t("done")}
              </button>
            </div>
          </div>
        </div>
      )}

      {showTimeZoneModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className={`h-screen max-w-[450px] w-full mx-auto flex flex-col items-center justify-start ${bgColor} overflow-y-auto`}
          >
            <div className="w-full max-w-[450px] sticky top-0 flex flex-col z-10 bg-inherit">
              <button
                onClick={() => (setShowTimeZoneModal(false), setShowDetailsModal(true), setProgress(66))}
                className={`${textColor} px-4 text-[24px] self-start`}
              >
                <ChevronDown className="h-6 w-6 transform rotate-90" strokeWidth={3} />
              </button>
              <div style={progressBarStyle} className="mt-2"></div>
            </div>
            <div className="px-8 pb-24 w-full">
              <h2 className={`mt-24 text-[24px] font-bold ${textColor} leading-tight`}>{t("select_timezone")}</h2>
              <p className={`mt-4 text-[#768C9E] text-[14px] leading-relaxed`}>{t("timezone_instructions")}</p>
              <div className="w-full max-w-[420px] mt-6 relative" ref={dropdownRef}>
                <div className="relative">
                  <input
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder={t("country_or_city")}
                    className={`w-full p-3 ${buttonBg} rounded-lg text-[#5EB5F7] text-base focus:outline-none pr-10`}
                  />
                  <ChevronDown
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                {isDropdownOpen && (
                  <div
                    className={`absolute w-full mt-1 ${buttonBg} rounded-lg max-h-[200px] overflow-y-auto z-10 ${dropdownShadow}`}
                  >
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <div
                          key={country}
                          className={`p-3 cursor-pointer ${
                            selectedCountry === country
                              ? `${timeBg} text-white`
                              : `${theme === "light" ? "hover:bg-[#5EB5F7] hover:text-white" : "hover:bg-[#2B5278] hover:text-white"} text-[#768C9E]`
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
                    setShowTimeZoneModal(false)
                    setShowSuccessModal(true)
                    setTimeout(() => (setShowSuccessModal(false), navigate("/")), 3000)
                  }
                }}
                disabled={!selectedCountry}
                className={`max-w-[385px] w-full p-3 rounded-xl text-white font-semibold transition-colors ${buttonBackground(
                  !!selectedCountry,
                )} ${!selectedCountry ? "cursor-not-allowed" : ""} ${buttonPositionClass}`}
              >
                {t("done")}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className={`fixed inset-0 flex flex-col items-center justify-center ${bgColor} px-4 z-50`}>
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#0061FF] to-[#52DAFF] rounded-lg flex items-center justify-center mb-4 transform rotate-12">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-[#0061FF] text-2xl font-bold text-center mb-2">{t("success")}</h2>
            <p className="text-[#0061FF] text-lg text-center">{t("registered")}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default LanguageModal

