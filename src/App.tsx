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

          // Customize header
          webApp.setHeaderColor('transparent'); // Transparent background
          
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

          // Handle theme changes
          webApp.onEvent("themeChanged", () => {
            dispatch(toggleTheme());
          });

          // Handle fullscreen events
          webApp.onEvent("fullscreenChanged", () => {
            console.log("Fullscreen mode:", webApp.isFullscreen);
          });
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

  return (
    <div
      className={`min-h-screen max-w-[450px] mx-auto ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
      style={{
        paddingTop: '0px', 
      }}
    >
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'transparent',
          height: '48px', 
        }}
      >
      </div>
      <div className="pt-[48px]">
        <AppRouter />
      </div>
    </div>
  );
};

export default App;