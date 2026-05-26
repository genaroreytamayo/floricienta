import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDfCW80A9L328ER49gaFP7hzofpxSTAx-w",
  authDomain: "floricienta-458fc.firebaseapp.com",
  projectId: "floricienta-458fc",
  storageBucket: "floricienta-458fc.firebasestorage.app",
  messagingSenderId: "82370255565",
  appId: "1:82370255565:web:0d51573b9d306ed496a784"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)