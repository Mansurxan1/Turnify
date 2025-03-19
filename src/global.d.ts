declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        colorScheme: "light" | "dark";
        onEvent: (event: string, callback: () => void) => void;
        initDataUnsafe?: {
          user?: {
            first_name?: string;
            last_name?: string;
            photo_url?: string;
          }; 
        };
      };
    };
  }
}

export {};

