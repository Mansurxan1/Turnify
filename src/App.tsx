"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUserData, toggleTheme } from "./store/telegramSlice"
import type { RootState } from "./store/store"
import AppRouter from "./router/AppRouter"
import { TelegramWebApp } from "./types/telegram-webapp"

const App = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.telegram.theme)

  useEffect(() => {
    const checkTelegram = () => {
      try {
        if (window.Telegram?.WebApp) {
          const webApp = window.Telegram.WebApp
          webApp.ready()
          webApp.expand()

          // Set header color based on theme
          if (theme === "dark") {
            webApp.setHeaderColor("#111827") // Match your bg-gray-900
          } else {
            webApp.setHeaderColor("#FFFFFF") // Match your bg-white
          }

          // Set the background color to match your theme
          webApp.setBackgroundColor(theme === "dark" ? "#111827" : "#FFFFFF")

          const user = (webApp as any).initDataUnsafe?.user || {}
          dispatch(
            setUserData({
              firstName: user.first_name || "Noma'lum",
              lastName: user.last_name || "",
              photoUrl: user.photo_url || null,
              theme: webApp.colorScheme === "dark" ? "dark" : "light",
              telegramId: user.id?.toString() || "",
            }),
          )

          webApp.onEvent("themeChanged", () => {
            dispatch(toggleTheme())
            // Update header color when theme changes
            if (webApp.colorScheme === "dark") {
              webApp.setHeaderColor("#111827")
              webApp.setBackgroundColor("#111827")
            } else {
              webApp.setHeaderColor("#FFFFFF")
              webApp.setBackgroundColor("#FFFFFF")
            }
          })
        } else {
          console.error("Telegram WebApp yuklanmadi")
        }
      } catch (error) {
        console.error("Telegram WebApp bilan xatolik:", error)
      }
    }

    if (!window.Telegram) {
      const script = document.createElement("script")
      script.src = "https://telegram.org/js/telegram-web-app.js"
      script.async = true
      script.onload = checkTelegram
      document.head.appendChild(script)
    } else {
      checkTelegram()
    }
  }, [dispatch, theme])

  return (
    <div
      className={`min-h-screen max-w-[450px] mx-auto ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <AppRouter />
    </div>
  )
}

export default App

