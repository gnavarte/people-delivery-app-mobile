// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzd9pg1k8ZShhiFT3Y86_brK-a7-xQ_Es",
  authDomain: "driverpeopledelivery.firebaseapp.com",
  projectId: "driverpeopledelivery",
  storageBucket: "driverpeopledelivery.appspot.com",
  messagingSenderId: "716124601907",
  appId: "1:716124601907:web:057ed454a791f3770f2d46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);