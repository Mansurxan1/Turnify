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

          // Request fullscreen mode
          if (webApp.requestFullscreen && webApp.requestFullscreen.isAvailable()) {
            webApp.requestFullscreen();
          }

          // Set header color to transparent to avoid Telegram's default header styling
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
          });

          webApp.onEvent("fullscreenChanged", () => {
            console.log("Fullscreen mode:", webApp.isFullscreen);
          });

          // Optional: Handle the close button (X) functionality
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

  // Function to handle the close button (X)
  const handleClose = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.close();
    }
  };

  // Function to handle the menu button (three dots)
  const handleMenu = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openMainMenu(); // Opens Telegram's main menu if available
      // Alternatively, you can show a custom menu here
      console.log("Menu clicked");
    }
  };

  return (
    <div
      className={`min-h-screen max-w-[450px] mx-auto ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
      style={{
        paddingTop: "0px",
      }}
    >
      {/* Custom Header */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4"
        style={{
          background: theme === "dark" ? "#1C2526" : "#FFFFFF", // Match the dark background from the image
          height: "56px", // Adjust height to match the image
          borderBottom: theme === "dark" ? "1px solid #2A3435" : "1px solid #E5E7EB", // Subtle border for separation
        }}
      >
        {/* Title */}
        <div className="text-lg font-semibold">
          Turnify
        </div>

        {/* Icons on the right */}
        <div className="flex items-center space-x-3">
          {/* Three Dots (Menu) */}
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

          {/* Close Button (X) */}
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

      {/* Content with padding to avoid overlap with the fixed header */}
      <div className="pt-[56px]">
        <AppRouter />
      </div>
    </div>
  );
};

export default App;