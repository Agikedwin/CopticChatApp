import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // require premimum account

const firebaseConfig = {
  apiKey: "AIzaSyBrDRX4xhTgEISaCUbbQaMkFM-2iHQP7Yc",
  authDomain: "copticmessagingapp-6aac0.firebaseapp.com",
  projectId: "copticmessagingapp-6aac0",
  storageBucket: "copticmessagingapp-6aac0.firebasestorage.app",
  messagingSenderId: "53467773955",
  appId: "1:53467773955:web:07e897478d12b245296236"
};

console.log(firebaseConfig)

const app = initializeApp(firebaseConfig);

export const auth  = getAuth()
export const db = getFirestore()
export const storage = getStorage()