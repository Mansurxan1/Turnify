interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  colorScheme: "light" | "dark";
  onEvent: (event: string, callback: () => void) => void;
  setHeaderColor: (color: string) => void;
  isFullscreen: boolean;
  isFullscreenAvailable: boolean;
  requestFullscreen: {
    isAvailable: () => boolean;
  } & (() => void);
  openMainMenu: () => void;
  enableClosingConfirmation: () => void;
  initDataUnsafe?: {
    user?: {
      first_name?: string;
      last_name?: string;
      photo_url?: string;
      id?: number;
    };
  };
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
} 