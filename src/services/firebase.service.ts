import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Task } from "../interfaces/task.interface";
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

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const usersCollection = collection(firestore, "users");
    const snapshot = await getDocs(usersCollection);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        uId: data.uId || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        initials: data.initials || "",
        color: data.color || "",
        status: data.status || false,
        lastLogin: data.lastLogin || 0,
      };
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const tasksCollection = collection(firestore, "tasks");
    const snapshot = await getDocs(tasksCollection);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        status: data.status || "",
        priority: data.priority || "",
        subtasksTitle: data.subtasksTitle || [],
        subtasksDone: data.subtasksDone || [],
        assigned: data.assigned || [],
        creator: data.creator || "",
        date: data.date || "",
      };
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export default app;
