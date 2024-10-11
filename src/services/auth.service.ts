import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { User } from "../interfaces/user.interface";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY as string,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env
    .REACT_APP_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.REACT_APP_FIREBASE_APP_ID as string,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Login-Funktion
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// User Abrufen
export const getUserByUid = async (uid: string): Promise<User | null> => {
  try {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("uId", "==", uid));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data() as User;
      return {
        id: querySnapshot.docs[0].id,
        uId: userData.uId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        initials: userData.initials,
        color: userData.color,
        status: userData.status,
        lastLogin: userData.lastLogin,
      };
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

// Auth-Status überwachen
export const observeAuthState = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await getUserByUid(user.uid);
      callback(userData);
    } else {
      callback(null);
    }
  });
};
