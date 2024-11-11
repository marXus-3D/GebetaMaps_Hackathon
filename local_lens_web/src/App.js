import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import app, { db } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

import React, { useEffect, useState } from "react";
import "./App.css";
import MapComponent from "./components/MapComponent";
import EstablishmentPopup from "./components/EstablishmentPopup";
import SidePanel from "./components/SidePanel";
import "leaflet/dist/leaflet.css";
import L, { Map } from "leaflet";

const auth = app.auth();
const provider = new GoogleAuthProvider();

// Set a default position (latitude, longitude)
// Coordinates for London, UK

function AuthPopup({ onClose, setUser }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  console.log("isSignUp:", isSignUp);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log("Submitted:", { email, password, isSignUp });
    if (isSignUp) {
      SignUpByEmail(email, password);
    } else {
      SignInByEmail(email, password);
    }
    onClose();
  };

  //To sign in using email
  const SignInByEmail = async (email, password) => {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const user = result.user;
      setUser(user);
    } catch (error) {
      setUser(null);
      console.error(error);
      alert("Failed to sign in. Please check your email and password.");
    }
  };

  //To sign up using email
  const SignUpByEmail = async (email, password) => {
    alert("Attempting to sign-up...");
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      await storeUserData(user, email, name);
      setUser(user);
    } catch (error) {
      setUser(null);
      if (error.code === "auth/invalid-email") {
        alert("Invalid email format.");
      } else if (error.code === "auth/email-already-in-use") {
        alert("Email is already in use.");
      } else {
        alert("Error:", error.message);
      }
    }
  };

  //To sign in using your google account
  const signInByGoogle = async () => {
    try {
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
      await storeUserData(user, email, user.displayName);
      setUser(user); // Update state or store user info
      alert("Google sign-in successful:", user);
    } catch (error) {
      setUser(null);
      alert("Google sign-in error:", error);
    }
  };

  const storeUserData = async (user, email, name) => {
    try {
      // const db = firebase.firestore();
      await db.collection("users").doc(user.uid).set({
        uid: user.uid,
        name: name, // Or `user.name` if you're using a different method for name
        email: email,
        //profilePicture: profilePicture || null,
      });
    } catch (error) {
      console.error(error);
      //throw new Error('Failed to store user data');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 transition-all">
        <h2 className="text-2xl font-bold mb-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded mb-4 font-bold hover:bg-opacity-80 transition-all"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <button
          className="w-full bg-red-500 text-white p-2 rounded mb-4"
          onClick={() => {
            signInByGoogle();
            onClose();
          }}
        >
          Sign in with Google
        </button>
        <p className="text-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            className="text-blue-500 ml-1 font-semibold underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

function Drawer({ isOpen, onClose, setUser }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-20`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <ul>
          <li className="mb-2">
            <button className="text-blue-500">Home</button>
          </li>
          <li className="mb-2">
            <button className="text-blue-500">Profile</button>
          </li>
          <li className="mb-2">
            <button className="text-blue-500">Settings</button>
          </li>
        </ul>
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <button
        className="absolute bottom-1 right-2 text-red-400 underline font-semibold"
        onClick={() => {
          auth.signOut();
        }}
      >
        Log Out
      </button>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEstablishmentPopupOpen, setIsEstablishmentPopupOpen] =
    useState(false);
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetail(docSnap.data());
          console.log("User", docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        // setError(error);
        console.log("fetch error",error);
      } finally {
        // setLoading(false);
      }
    };
    if (user) {
      setIsAuthenticated(true);
      fetchUser();
    } else {
      setIsAuthenticated(false);
      setUserDetail(null);
    }
  }, [user]);

  //To validate the password
  const SignUpForm = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = (e) => {
      e.preventDefault(); // Prevent form submission

      // Password validation criteria
      const minLength = 8;
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*]/.test(password); // Special character check

      // Check if all criteria are met
      if (password.length < minLength) {
        setError("Password must be at least 8 characters long.");
      } else if (!hasNumber) {
        setError("Password must contain at least one number.");
      } else if (!hasSpecialChar) {
        setError("Password must contain at least one special character.");
      } else {
        setError("");
        console.log("Sign-up successful:", password);
      }
    };
  };

  return (
    <div className="w-full h-screen relative">
      <div className="h-full w-full relative z-0">
        {/* <Map /> */}
        <MapComponent addEstablishment={setIsEstablishmentPopupOpen} />
      </div>
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="absolute top-4 left-12 bg-black text-white p-2 rounded-full shadow-lg z-10 aspect-square w-12 h-12 font-bold text-lg"
      >
        {userDetail && userDetail.name[0].toUpperCase() + userDetail.name.split(' ')[1][0].toUpperCase() }
      </button>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        setUser={setUser}
      />
      <EstablishmentPopup
        isOpen={isEstablishmentPopupOpen}
        onClose={() => setIsEstablishmentPopupOpen(false)}
      />
        <SidePanel />
      {!isAuthenticated && (
        <AuthPopup
          onClose={() => {
            user == null ? setIsAuthenticated(false) : setIsAuthenticated(true);
          }}
          setUser={setUser}
        />
      )}
    </div>
  );
}

export default App;
