// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserData, toggleTheme } from "./store/telegramSlice";
// import { RootState } from "./store/store";
// import AppRouter from "./router/AppRouter";

// const App = () => {
//   const dispatch = useDispatch();
//   const theme = useSelector((state: RootState) => state.telegram.theme);
//   useEffect(() => {
//     const checkTelegram = () => {
//       try {
//         if (window.Telegram?.WebApp) {
//           const webApp = window.Telegram.WebApp;
//           webApp.ready();
//           webApp.expand();

//           const user = (webApp as any).initDataUnsafe?.user || {};
//           dispatch(
//             setUserData({
//               firstName: user.first_name || "Noma'lum",
//               lastName: user.last_name || "",
//               photoUrl: user.photo_url || null,
//               theme: webApp.colorScheme === "dark" ? "dark" : "light",
//               telegramId: user.id?.toString() || "",
//             })
//           );

//           webApp.onEvent("themeChanged", () => {
//             dispatch(toggleTheme());
//           });
//         } else {
//           console.error("Telegram WebApp yuklanmadi");
//         }
//       } catch (error) {
//         console.error("Telegram WebApp bilan xatolik:", error);
//       }
//     };

//     if (!window.Telegram) {
//       const script = document.createElement("script");
//       script.src = "https://telegram.org/js/telegram-web-app.js";
//       script.async = true;
//       script.onload = checkTelegram;
//       document.head.appendChild(script);
//     } else {
//       checkTelegram();
//     }
//   }, [dispatch]);

//   return (
//     <div
//       className={`min-h-screen max-w-[450px] mx-auto ${
//         theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
//       }`}
//     >
//       <AppRouter />
//     </div>
//   );
// };

// export default App;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, toggleTheme } from "./store/telegramSlice";
import { RootState } from "./store/store";
import AppRouter from "./router/AppRouter";

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.telegram.theme);

  useEffect(() => {
    const checkTelegram = () => {
      try {
        if (window.Telegram?.WebApp) {
          const webApp = window.Telegram.WebApp;
          webApp.ready();
          webApp.expand();

          // To‘liq ekran rejimini yoqish
          if (webApp.requestFullscreen && webApp.isFullscreenAvailable) {
            webApp.requestFullscreen();
          }

          // Telegramning o‘z headerini shaffof qilish
          webApp.setHeaderColor("transparent");

          const user = (webApp as any).initDataUnsafe?.user || {};
          dispatch(
            setUserData({
              firstName: user.first_name || "Noma'lum",
              lastName: user.last_name || "",
              photoUrl: user.photo_url || null,
              theme: webApp.colorScheme === "dark" ? "dark" : "light",
              telegramId: user.id?.toString() || "",
            })
          );

          webApp.onEvent("themeChanged", () => {
            dispatch(toggleTheme());
            webApp.setHeaderColor("transparent"); // Tema o‘zgarganda ham shaffof bo‘lib qoladi
          });

          webApp.onEvent("fullscreenChanged", () => {
            console.log("To‘liq ekran rejimi:", webApp.isFullscreen);
          });

          // Yopish tugmasi uchun tasdiqlashni yoqish
          webApp.enableClosingConfirmation();
        } else {
          console.error("Telegram WebApp yuklanmadi");
        }
      } catch (error) {
        console.error("Telegram WebApp bilan xatolik:", error);
      }
    };

    if (!window.Telegram) {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-web-app.js";
      script.async = true;
      script.onload = checkTelegram;
      document.head.appendChild(script);
    } else {
      checkTelegram();
    }
  }, [dispatch]);

  // Yopish tugmasi (X) uchun funksiya
  const handleClose = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.close();
    }
  };

  // Menyu tugmasi (uch nuqta) uchun funksiya
  const handleMenu = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openMainMenu();
      console.log("Menyu bosildi");
    }
  };

  return (
    <div
      className={`min-h-screen max-w-[450px] mx-auto ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
      style={{
        paddingTop: "0px", // Header uchun qo‘shimcha joy ochmaymiz
      }}
    >
      {/* Maxsus Header */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4"
        style={{
          background: "transparent", // Maxsus header shaffof bo‘ladi
          height: "56px", // Telegram header balandligiga moslashtiramiz
        }}
      >
        {/* Sarlavha */}
        <div className="text-lg font-semibold">
          Turnify
        </div>

        {/* O‘ng tarafdagi ikonalar */}
        <div className="flex items-center space-x-3">
          {/* Uch nuqta (Menyu) */}
          <button onClick={handleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>

          {/* Yopish tugmasi (X) */}
          <button onClick={handleClose} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Kontent */}
      <div className="pt-[56px]">
        <AppRouter />
      </div>
    </div>
  );
};

export default App;