import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  addDoc,
} from "firebase/firestore";
import { User } from "../interfaces/user.interface";
import { ColorUtil } from "./shared.service";

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

// Log-in function
export const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Log-in with Google
export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    const usersCollection = collection(firestore, "users");
    const querySnapshot = await getDocs(
      query(usersCollection, where("uId", "==", user.uid))
    );

    if (querySnapshot.empty) {
      const displayName = user.displayName || "";
      const [firstName = "", lastName = ""] = displayName.split(" ");
      await createUserInFirestore({
        uId: user.uid,
        email: user.email || "no mail",
        firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        status: true,
        phone: "",
        initials: firstName.slice(0, 1) + lastName.slice(0, 1),
        color: ColorUtil.generateRandomColor(),
        lastLogin: 0,
      });
    }
  } catch (error) {
    console.error("Google login error:", error);
  }
};

// Log-out function
export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// Monitor Auth status
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

// Get user by uid
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

// Create user in Firestore
const createUserInFirestore = async (user: User) => {
  const userDataToSave: User = {
    uId: user.uId,
    email: user.email,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    status: true,
    phone: "",
    initials: user.initials,
    color: user.color,
    lastLogin: new Date().getTime(),
  };
  const usersCollection = collection(firestore, "users");
  try {
    await addDoc(usersCollection, userDataToSave);
  } catch (error) {
    console.error(error);
  }
};
