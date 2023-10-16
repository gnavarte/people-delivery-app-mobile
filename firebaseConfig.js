// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwiNWG_UZ4EsVZPC5F-dig71EGjq1I0Cs",
  authDomain: "driverpeopledelivery-d7e85.firebaseapp.com",
  projectId: "driverpeopledelivery-d7e85",
  storageBucket: "driverpeopledelivery-d7e85.appspot.com",
  messagingSenderId: "97000579604",
  appId: "1:97000579604:web:dda568933bed616bcdbd01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);