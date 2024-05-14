"use strict";
// import dotenv from "dotenv";

const {
  VITE_APP_PORT,
  VITE_APP_HOST,
  VITE_APP_HOST_URL,
  VITE_APP_API_KEY,
  VITE_APP_AUTH_DOMAIN,
  VITE_APP_PROJECT_ID,
  VITE_APP_STORAGE_BUCKET,
  VITE_APP_MESSAGING_SENDER_ID,
  VITE_APP_APP_ID,
} = import.meta.env;

export const configInfo = {
  port: VITE_APP_PORT,
  host: VITE_APP_HOST,
  url: VITE_APP_HOST_URL,
  firebaseConfig: {
    apiKey: VITE_APP_API_KEY,
    authDomain: VITE_APP_AUTH_DOMAIN,
    projectId: VITE_APP_PROJECT_ID,
    storageBucket: VITE_APP_STORAGE_BUCKET,
    messagingSenderId: VITE_APP_MESSAGING_SENDER_ID,
    appId: VITE_APP_APP_ID,
  },
};
