export type Theme = "light" | "dark";

interface ThemeConfig {
  textColor: string; //text rangi
  bgColor: string; // Background rangi
  overlayBg: string; // 450pxdan tashqari bg uchun
  footerTextColor: string; // Loader shartnoma text rangi
  controlBg: string; //Language button va input bg ranglari
  timeBg: string; // Mamlakatlar uchun bg rangi
  activeButtonTextColor: string; // LoginLanguageModaldagi next tugmalari
  inputTextColor: string; // Input ichidagi text rangi
  borderColor: string; // border ranglari
  dropdownShadow: string; // dropdownlar uchun shadow
  searchInputBg: string; // search input bg rangi
  searchHeader: string // search header rangi
  searchCardBg: string // search card bg rangi
}

const themes: Record<Theme, ThemeConfig> = {
  light: {
    textColor: "text-black",
    bgColor: "bg-[#F1F1F1]",
    overlayBg: "bg-gray-900 bg-opacity-50",
    footerTextColor: "text-gray-500",
    controlBg: "bg-white",
    timeBg: "bg-[#2B5278]",
    activeButtonTextColor: "text-white",
    inputTextColor: "text-[#4B5563]",
    borderColor: "border-[#BFC8CF]",
    dropdownShadow: "shadow-[0px_10px_15px_-3px_#00000026]",
    searchInputBg: "bg-[#FFFFFF]",
    searchHeader: "bg-[#F1F1F1]",
    searchCardBg: "bg-[#FFFFFF]"
  },
  dark: {
    textColor: "text-white",
    bgColor: "bg-[#17212B]",
    overlayBg: "bg-gray-900 bg-opacity-75",
    footerTextColor: "text-gray-300",
    controlBg: "bg-[#293A4C]",
    timeBg: "bg-[#5EB5F7]",
    activeButtonTextColor: "text-white",
    inputTextColor: "text-[#D1D5DB]",
    borderColor: "border-[#768C9E]",
    dropdownShadow: "shadow-[0px_10px_15px_-3px_#12121233",
    searchInputBg: "bg-[#242F3D]",
    searchHeader: "bg-[#17212B]",
    searchCardBg: "bg-[#182533]"
  },
};

export const getThemeStyles = (theme: Theme): ThemeConfig => themes[theme];