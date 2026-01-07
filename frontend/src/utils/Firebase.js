import { initializeApp, setLogLevel } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-f6804.firebaseapp.com",
  projectId: "loginonecart-f6804",
  storageBucket: "loginonecart-f6804.firebasestorage.app",
  messagingSenderId: "437875691402",
  appId: "1:437875691402:web:373722fdbef48974184273",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
