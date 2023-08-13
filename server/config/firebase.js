// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDkL3ZyzVeApQ9lRATndCej4mi-U8pVoyM",
  authDomain: "ecommercesupermart.firebaseapp.com",
  projectId: "ecommercesupermart",
  storageBucket: "ecommercesupermart.appspot.com",
  messagingSenderId: "801507429965",
  appId: "1:801507429965:web:51dca756fe7e7afaa95604",
  measurementId: "G-GM6NSG648J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export storage references
export const firbaseStorage = getStorage(app);
