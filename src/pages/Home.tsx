import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Home = () => {
  const theme = useSelector((state: RootState) => state.telegram.theme);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen w-full ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-8 ${
          theme === "dark" ? "text-blue-400" : "text-blue-600"
        }`}
      >
        Bosh Sahifa
      </h1>
      <Link
        to="/profile"
        className={`px-6 py-3 rounded-lg font-medium text-lg transition-all duration-300 ${
          theme === "dark"
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
          theme === "dark"
            ? "bg-gray-800 hover:bg-gray-700 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        Til
      </Link>
    </div>
  );
};

export default Home;