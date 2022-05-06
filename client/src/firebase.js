// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCGvqYbxIMJTtf0xa5T0sjPIl8CuxUMrkg',
  authDomain: 'dtaxi-e75d5.firebaseapp.com',
  projectId: 'dtaxi-e75d5',
  storageBucket: 'dtaxi-e75d5.appspot.com',
  messagingSenderId: '1093857410526',
  appId: '1:1093857410526:web:15754beb732d85d38d714f'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export default db