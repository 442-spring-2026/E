import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCipTbazPSyuYh0dIwmLJG-H2JYIR71KL8",
  authDomain: "nestly-40b0c.firebaseapp.com",
  projectId: "nestly-40b0c",
  storageBucket: "nestly-40b0c.firebasestorage.app",
  messagingSenderId: "236373676259",
  appId: "1:236373676259:web:a74ef68fae59ffb8e535d6"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
