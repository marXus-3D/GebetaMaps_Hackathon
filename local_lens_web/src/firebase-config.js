// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW3p70Bs5sb8oCjJgrccfE2JcdtvqdkvA",
  authDomain: "local-lens-b69ea.firebaseapp.com",
  projectId: "local-lens-b69ea",
  storageBucket: "local-lens-b69ea.firebasestorage.app",
  messagingSenderId: "31714200393",
  appId: "1:31714200393:web:9dbf95aafffe65f273e898",
  measurementId: "G-1NVM79BK6Y"
};

const app = firebase.initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export default app;
