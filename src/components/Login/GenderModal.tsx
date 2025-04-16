import { ChevronDown } from "lucide-react";
import { getThemeStyles, Theme } from "../themeConfig"; 

interface GenderModalProps {
  setShowGenderModal: (value: boolean) => void;
  setGender: (value: string | null) => void;
  gender: string | null;
  setShowDetailsModal: (value: boolean) => void;
  setProgress: (value: number) => void;
  theme: Theme; 
  buttonPositionClass: string;
  t: (key: string) => string;
}

const GenderModal: React.FC<GenderModalProps> = ({
  setShowGenderModal,
  setGender,
  gender,
  setShowDetailsModal,
  setProgress,
  theme,
  buttonPositionClass,
  t,
}) => {
  const styles = getThemeStyles(theme);
  const progressBarStyle = {
    height: "3px",
    backgroundImage: `linear-gradient(to right, #0061FF 0%, #52DAFF ${gender ? 50 : 40}%, #E5E7EB ${gender ? 50 : 40}%, #E5E7EB 100%)`,
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
              setShowGenderModal(false);
              setGender(null);
              setProgress(33);
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
            {t("select_gender")}
          </h2>
          <p className={`mt-2 text-[#768C9E] text-sm leading-relaxed`}>
            {t("gender_instructions")}
          </p>
          <div className="flex flex-col">
            <div className="flex flex-col gap-5 mt-4">
              <button
                onClick={() => setGender("female")}
                className={`w-full p-3 rounded-lg font-medium ${
                  gender === "female"
                    ? "bg-[#5EB5F7] text-white"
                    : `${styles.controlBg} text-[#768C9E]`
                }`}
              >
                {t("female")}
              </button>
              <button
                onClick={() => setGender("male")}
                className={`w-full p-3 rounded-lg font-medium ${
                  gender === "male"
                    ? "bg-[#5EB5F7] text-white"
                    : `${styles.controlBg} text-[#768C9E]`
                }`}
              >
                {t("male")}
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              if (gender) {
                setShowGenderModal(false);
                setShowDetailsModal(true);
              }
            }}
            disabled={!gender}
            className={`max-w-[385px] mx-auto p-3 rounded-xl font-semibold transition-colors ${
              gender
                ? "bg-gradient-to-r from-[#0061FF] to-[#52DAFF]"
                : `border ${styles.borderColor} ${styles.bgColor} cursor-not-allowed ${styles.textColor}`
            } ${gender ? styles.activeButtonTextColor : ""} ${buttonPositionClass}`}
          >
            {t("next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenderModal;