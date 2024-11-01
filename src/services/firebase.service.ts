import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
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

/**
 * Fetches all users from the 'users' collection in Firestore.
 * @returns A list of `User` objects, each containing the user's id, uId, firstName, lastName, email, phone, initials, color, status, and lastLogin.
 * @throws Throws any error encountered while fetching the users.
 */
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

/**
 * Fetches all tasks from the 'tasks' collection in Firestore.
 * @returns A list of `Task` objects, each containing the task's id, title, description, category, status, priority, subtasksTitle, subtasksDone, assigned, creator, and date.
 * @throws Throws any error encountered while fetching the tasks.
 */
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

/**
 * Updates the status of a task with the given id in Firestore.
 * @param {string} taskId - The id of the task to update.
 * @param {string} newStatus - The new status of the task.
 * @throws Throws any error encountered while updating the task status.
 */
export const updateTaskStatus = async (taskId: string, newStatus: string) => {
  try {
    const taskRef = doc(firestore, "tasks", taskId);
    await updateDoc(taskRef, { status: newStatus });
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

/**
 * Adds a new task to the 'tasks' collection in Firestore.
 * @param {Task} newTask - The task object to be added.
 * @returns The id of the newly created task.
 * @throws Throws any error encountered while adding the task.
 */
export const addNewTask = async (newTask: Task): Promise<string> => {
  try {
    const tasksCollection = collection(firestore, "tasks");
    const docRef = await addDoc(tasksCollection, newTask);
    return docRef.id;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

/**
 * Deletes a task from the 'tasks' collection in Firestore by its ID.
 * @param {string} taskId - The id of the task to delete.
 * @throws Throws any error encountered while deleting the task.
 */
export const deleteTask = async (taskId: string) => {
  try {
    const taskRef = doc(firestore, "tasks", taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

// Add new contact
export const addNewContact = async (contact: User) => {
  const contactsCollection = collection(firestore, "users");
  try {
    await addDoc(contactsCollection, contact);
  } catch (error) {
    console.error(error);
  }
};

// Delete contact
export const deleteContact = async (contactId: string) => {
  const contactsCollection = collection(firestore, "users");
  try {
    await deleteDoc(doc(contactsCollection, contactId));
  } catch (error) {
    console.error(error);
  }
};

// Update contact
export const updateContact = async (contactId: string, contact: User) => {
  const contactsCollection = collection(firestore, "users");
  try {
    const { uId, ...updatedData } = contact;
    await updateDoc(doc(contactsCollection, contactId), updatedData);
  } catch (error) {
    console.error(error);
  }
};

export default app;
