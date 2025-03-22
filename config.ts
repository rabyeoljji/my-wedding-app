"use strict";
// import dotenv from "dotenv";

export const configInfo = {
  port: import.meta.env.VITE_APP_PORT,
  host: import.meta.env.VITE_APP_HOST,
  url: import.meta.env.DEV ? import.meta.env.VITE_APP_HOST_URL : import.meta.env.VITE_APP_AUTH_DOMAIN,
  firebaseConfig: {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID,
  },
};
