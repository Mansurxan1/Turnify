import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { getThemeStyles, Theme } from "../components/themeConfig"; 

const Profile = () => {
  const navigate = useNavigate();
  const { firstName, lastName, photoUrl, theme, telegramId, username } = useSelector(
    (state: RootState) => state.telegram
  );

  const effectiveTheme = (theme || "light") as Theme;
  const themeStyles = getThemeStyles(effectiveTheme);

  const getUserData = () => {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user || {};
    return {
      firstName: firstName || user.first_name || "Unknown",
      lastName: lastName || user.last_name || "",
      photoUrl: photoUrl || user.photo_url || null,
      telegramId: telegramId || user.id,
      username: username || user.username,
    };
  };

  const userData = getUserData();

  const containerClass = "relative top-16 phone:top-0 flex flex-col mx-auto max-w-[450px] items-center min-h-screen w-full pt-20 pb-8";
  const buttonClass = `absolute top-4 left-4 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 z-10 ${
    effectiveTheme === "dark" ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-black"
  }`;
  const titleClass = `text-2xl font-bold mb-4 ${effectiveTheme === "dark" ? "text-blue-400" : "text-blue-600"}`;
  const placeholderClass = `w-32 h-32 rounded-full mb-4 flex items-center justify-center ${
    effectiveTheme === "dark" ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-600"
  }`;

  return (
    <div className={`${themeStyles.overlayBg}`}>
      <div className={`${themeStyles.bgColor} mx-auto max-w-[450px]`}>
        <div className={`${containerClass}`}>
          <button onClick={() => navigate(-1)} className={`${buttonClass}`}>
            Ortga
          </button>

          <h1 className={titleClass}>
            Xush kelibsiz, {userData.firstName} {userData.lastName}
          </h1>

          {userData.photoUrl ? (
            <img
              src={userData.photoUrl}
              alt="Foydalanuvchi rasmi"
              className="w-32 h-32 rounded-full mb-4 object-cover border-2 border-blue-500"
              onError={(e) => {
                console.log("Rasm yuklanmadi:", userData.photoUrl);
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  userData.firstName
                )}&background=random`;
              }}
            />
          ) : (
            <div className={placeholderClass}>{userData.firstName.charAt(0).toUpperCase()}</div>
          )}

          <p className="mb-2">Telegram ID: {userData.telegramId}</p>
          <p className="mb-2">
            Username:{" "}
            {userData.username
              ? userData.username.startsWith("@")
                ? userData.username
                : `@${userData.username}`
              : "Yo'q"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;