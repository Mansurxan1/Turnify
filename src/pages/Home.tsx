import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getThemeStyles, Theme } from "../components/themeConfig"; 

const Home = () => {
  const theme = useSelector((state: RootState) => state.telegram.theme);
  const effectiveTheme = (theme || "light") as Theme;
  const themeStyles = getThemeStyles(effectiveTheme); 
  
  return (
    <div className={`${themeStyles.overlayBg}`}>
      <div className={`${themeStyles.bgColor} max-w-[450px] mx-auto`}>
        <div
          className={`flex flex-col items-center justify-center min-h-screen w-full ${themeStyles.textColor}`}
        >
          <h1
            className={`text-3xl font-bold mb-8 ${
              effectiveTheme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Bosh Sahifa
          </h1>
          <Link
            to="/profile"
            className={`px-6 py-3 rounded-lg font-medium text-lg transition-all duration-300 ${
              effectiveTheme === "dark"
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Profilga o'tish
          </Link>
          <br />
          <Link
            to="/language"
            className={`px-6 py-3 mt-4 rounded-lg font-medium text-lg transition-all duration-300 ${
              effectiveTheme === "dark"
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Til
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;