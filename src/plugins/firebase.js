import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLWL3DMVZ-NAv7dbp5kGDO33X3go2PFIM",
  authDomain: "fmds-avaliacao-3.firebaseapp.com",
  projectId: "fmds-avaliacao-3",
  storageBucket: "fmds-avaliacao-3.appspot.com",
  messagingSenderId: "110683144631",
  appId: "1:110683144631:web:c18eb061e3f761a5f82832",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
