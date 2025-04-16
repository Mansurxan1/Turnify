import { ChevronDown } from "lucide-react";
import { getThemeStyles, Theme } from "../themeConfig";

interface UsernameModalProps {
  setShowUsernameModal: (value: boolean) => void;
  setShowDetailsModal: (value: boolean) => void;
  username: string;
  setUsername: (value: string) => void;
  usernameError: string | null;
  setUsernameError: (value: string | null) => void;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowTimeZoneModal: (value: boolean) => void;
  setProgress: (value: number) => void;
  theme: Theme;
  buttonPositionClass: string;
  t: (key: string) => string;
}

const UsernameModal: React.FC<UsernameModalProps> = ({
  setShowUsernameModal,
  setShowDetailsModal,
  username,
  usernameError,
  handleUsernameChange,
  setShowTimeZoneModal,
  setProgress,
  theme,
  buttonPositionClass,
  t,
}) => {
  const styles = getThemeStyles(theme);
  const progressBarStyle = {
    height: "3px",
    backgroundImage: `linear-gradient(to right, #0061FF 0%, #52DAFF ${
      username.trim() && username !== "@" ? 85 : 70
    }%, #E5E7EB ${username.trim() && username !== "@" ? 85 : 70}%, #E5E7EB 100%)`,
    width: "100%",
    transition: "background-image 0.3s ease",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
      <div
        className={`h-screen max-w-[450px] w-full mx-auto flex flex-col ${styles.bgColor} justify-start overflow-y-auto`}
      >
        <div className="max-w-[450px] w-full sticky top-0 flex flex-col z-10 bg-inherit">
          <button
            onClick={() => {
              setShowUsernameModal(false);
              setShowDetailsModal(true);
              setProgress(70);
            }}
            className={`${styles.textColor} text-[24px] px-4 pt-20 phone:pt-5 self-start`}
          >
            <ChevronDown className="h-6 w-6 transform rotate-90" strokeWidth={3} />
          </button>
          <div style={progressBarStyle} className="mt-2"></div>
        </div>
        <div className="px-8 pb-24">
          <h2
            className={`mt-10 text-xl font-bold ${styles.textColor} leading-tight`}
          >
            {t("enter_username")}
          </h2>
          <p className={`mt-4 text-[#768C9E] text-sm leading-relaxed`}>
            {t("username_instructions")}
          </p>
          <input
            value={username}
            onChange={handleUsernameChange}
            placeholder="@username"
            className={`w-full max-w-[390px] mt-4 p-3 ${styles.controlBg} rounded-xl ${styles.inputTextColor} text-[16px] focus:outline-none border ${styles.borderColor}`}
          />
          {usernameError && (
            <p className="mt-2 text-[12px] text-red-500 text-center">
              {usernameError}
            </p>
          )}
          <p className="mt-2 text-[12px] text-[#768C9E] text-center">
            {t("username_rules")}
          </p>
          <button
            onClick={() => {
              if (
                username.trim() &&
                username !== "@" &&
                !username.startsWith("-") &&
                !username.endsWith("-")
              ) {
                setShowUsernameModal(false);
                setShowTimeZoneModal(true);
              }
            }}
            disabled={
              !username.trim() ||
              username === "@" ||
              username.startsWith("-") ||
              username.endsWith("-")
            }
            className={`max-w-[385px] mx-auto p-3 rounded-xl font-semibold transition-colors ${
              username.trim() &&
              username !== "@" &&
              !username.startsWith("-") &&
              !username.endsWith("-")
                ? "bg-gradient-to-r from-[#0061FF] to-[#52DAFF]"
                : `border ${styles.borderColor} ${styles.bgColor} cursor-not-allowed ${styles.textColor}`
            } ${
              username.trim() &&
              username !== "@" &&
              !username.startsWith("-") &&
              !username.endsWith("-")
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

export default UsernameModal;