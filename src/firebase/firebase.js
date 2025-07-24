import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// تابع جدید برای ذخیره فاکتور
const saveInvoice = async (invoiceData) => {
  try {
    const docRef = await addDoc(collection(db, "invoices"), {
      ...invoiceData,
      createdAt: serverTimestamp(),
      status: "completed"
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding invoice: ", e);
    return null;
  }
};

export { db, saveInvoice };