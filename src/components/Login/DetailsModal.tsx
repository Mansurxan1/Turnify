import { ChevronDown } from "lucide-react";
import { getThemeStyles, Theme } from "../themeConfig";

interface DetailsModalProps {
  setShowDetailsModal: (value: boolean) => void;
  setShowGenderModal: (value: boolean) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  setShowUsernameModal: (value: boolean) => void;
  setProgress: (value: number) => void;
  theme: Theme;
  buttonPositionClass: string;
  t: (key: string) => string;
}

const DetailsModal: React.FC<DetailsModalProps> = ({
  setShowDetailsModal,
  setShowGenderModal,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  setShowUsernameModal,
  setProgress,
  theme,
  buttonPositionClass,
  t,
}) => {
  const styles = getThemeStyles(theme);
  const progressBarStyle = {
    height: "3px",
    backgroundImage: `linear-gradient(to right, #0061FF 0%, #52DAFF ${
      firstName.trim() && lastName.trim() ? 70 : firstName.trim() ? 55 : 50
    }%, #E5E7EB ${
      firstName.trim() && lastName.trim() ? 70 : firstName.trim() ? 55 : 50
    }%, #E5E7EB 100%)`,
    width: "100%",
    transition: "background-image 0.3s ease",
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Zа-яА-ЯёЁ]*$/.test(value)) {
      setFirstName(value);
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Zа-яА-ЯёЁ]*$/.test(value)) {
      setLastName(value);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
      <div
        className={`h-screen max-w-[450px] w-full mx-auto flex flex-col ${styles.bgColor} justify-start overflow-y-auto`}
      >
        <div className="max-w-[450px] w-full sticky top-0 flex flex-col z-10 bg-inherit">
          <button
            onClick={() => {
              setShowDetailsModal(false);
              setShowGenderModal(true);
              setProgress(50);
            }}
            className={`${styles.textColor} text-[24px] px-4 pt-20 phone:pt-5 self-start`}
          >
            <ChevronDown className="h-6 w-6 transform rotate-90" strokeWidth={3} />
          </button>
          <div style={progressBarStyle} className="mt-2"></div>
        </div>
        <div className="px-8 pb-24">
          <h2
            className={`mt-10 text-xl uppercase font-bold ${styles.textColor} leading-tight`}
          >
            {t("enter_details")}
          </h2>
          <p className={`mt-2 text-[#768C9E] text-sm leading-relaxed`}>
            {t("name_instructions")}
          </p>
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
            className={`max-w-[385px] mx-auto p-3 rounded-xl font-semibold transition-colors ${
              firstName.trim() && lastName.trim()
                ? "bg-gradient-to-r from-[#0061FF] to-[#52DAFF]"
                : `border ${styles.borderColor} ${styles.bgColor} cursor-not-allowed ${styles.textColor}`
            } ${
              firstName.trim() && lastName.trim()
                ? styles.activeButtonTextColor
                : ""
            } ${buttonPositionClass}`}
          >
            {t("next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;