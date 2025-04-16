import { ChevronDown } from "lucide-react";
import { getThemeStyles, Theme } from "../themeConfig";

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

interface TimeZoneModalProps {
  setShowTimeZoneModal: (value: boolean) => void;
  setShowUsernameModal: (value: boolean) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (value: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  isKeyboardVisible: boolean;
  setShowSuccessModal: (value: boolean) => void;
  navigate: (path: string) => void;
  setProgress: (value: number) => void;
  theme: Theme;
  buttonPositionClass: string;
  t: (key: string) => string;
}

const TimeZoneModal: React.FC<TimeZoneModalProps> = ({
  setShowTimeZoneModal,
  setShowUsernameModal,
  searchTerm,
  setSearchTerm,
  selectedCountry,
  setSelectedCountry,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownRef,
  isKeyboardVisible,
  setShowSuccessModal,
  navigate,
  setProgress,
  theme,
  buttonPositionClass,
  t,
}) => {
  const styles = getThemeStyles(theme);
  const progressBarStyle = {
    height: "3px",
    backgroundImage: `linear-gradient(to right, #0061FF 0%, #52DAFF ${
      selectedCountry ? 100 : 85
    }%, #E5E7EB ${selectedCountry ? 100 : 85}%, #E5E7EB 100%)`,
    width: "100%",
    transition: "background-image 0.3s ease",
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
      <div
        className={`h-screen max-w-[450px] w-full mx-auto flex flex-col items-center justify-start ${styles.bgColor} overflow-y-auto`}
      >
        <div className="w-full max-w-[450px] sticky top-0 flex flex-col z-10 bg-inherit">
          <button
            onClick={() => {
              setShowTimeZoneModal(false);
              setShowUsernameModal(true);
              setProgress(85);
            }}
            className={`${styles.textColor} px-4 text-[24px] pt-20 phone:pt-5 self-start`}
          >
            <ChevronDown className="h-6 w-6 transform rotate-90" strokeWidth={3} />
          </button>
          <div style={progressBarStyle} className="mt-2"></div>
        </div>
        <div className="px-8 pb-24 w-full">
          <h2
            className={`mt-10 text-xl font-bold ${styles.textColor} leading-tight`}
          >
            {t("select_timezone")}
          </h2>
          <p className={`mt-4 text-[#768C9E] text-sm leading-relaxed`}>
            {t("timezone_instructions")}
          </p>
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
                className={`${
                  isKeyboardVisible
                    ? "absolute bottom-full mb-1"
                    : "absolute top-full mt-1"
                } w-full ${styles.controlBg} rounded-lg max-h-[200px] overflow-y-auto z-20 ${styles.dropdownShadow}`}
              >
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <div
                      key={country}
                      className={`p-3 cursor-pointer ${
                        selectedCountry === country
                          ? `${styles.timeBg} text-white`
                          : `${
                              theme === "light"
                                ? "hover:bg-[#2B5278] hover:text-white"
                                : "hover:bg-[#5EB5F7] hover:text-white"
                            } text-[#768C9E]`
                      }`}
                      onClick={() => handleCountrySelect(country)}
                    >
                      {country}
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-gray-500">
                    {t("no_results")}
                  </div>
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
            className={`max-w-[385px] mx-auto p-3 rounded-xl font-semibold transition-colors ${
              selectedCountry
                ? "bg-gradient-to-r from-[#0061FF] to-[#52DAFF]"
                : `border ${styles.borderColor} ${styles.bgColor} cursor-not-allowed ${styles.textColor}`
            } ${
              selectedCountry ? styles.activeButtonTextColor : ""
            } ${buttonPositionClass}`}
          >
            {t("done")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeZoneModal;