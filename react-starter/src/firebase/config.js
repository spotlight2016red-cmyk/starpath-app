import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDd2QNtRd80LwZiXTfGF9n8_DqMFoaoXis",
  authDomain: "starpath-39f0d.firebaseapp.com",
  projectId: "starpath-39f0d",
  storageBucket: "starpath-39f0d.firebasestorage.app",
  messagingSenderId: "1072842330537",
  appId: "1:1072842330537:web:35b33dafa3476bd790b4b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;





