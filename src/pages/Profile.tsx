import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { firstName, lastName, photoUrl, theme, telegramId, username } = useSelector(
    (state: RootState) => state.telegram
  );

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${
        theme === "light" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <button
        onClick={handleBack}
        className={`absolute top-4 left-4 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
          theme === "light"
            ? "bg-gray-800 hover:bg-gray-700 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        Ortga
      </button>

      <h1
        className={`text-2xl font-bold mb-4 ${
          theme === "light" ? "text-blue-400" : "text-blue-600"
        }`}
      >
        Xush kelibsiz, {firstName} {lastName}
      </h1>
      {photoUrl ? (
        <img
          src={photoUrl}
          alt="Foydalanuvchi rasmi"
          className="w-32 h-32 rounded-full mb-4 object-cover border-2 border-blue-500"
        />
      ) : (
        <div
          className={`w-32 h-32 rounded-full mb-4 flex items-center justify-center ${
            theme === "light"
              ? "bg-gray-700 text-gray-400"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Rasm yo‘q
        </div>
      )}
      <p className="mb-2">Telegram ID: {telegramId}</p>
      <p className="mb-2">Username: {username ? `@ ${username}` : "Yo‘q"}</p>
    </div>
  );
};

export default Profile;