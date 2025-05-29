// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDtoejagCWcNijAe3tacET1bt6AFVzXfyQ',
  authDomain: 'yuquizapp.firebaseapp.com',
  projectId: 'yuquizapp',
  storageBucket: 'yuquizapp.appspot.com',
  messagingSenderId: '644410021767',
  appId: '1:644410021767:web:eccef9c7ea69bfd0ec6522',
  measurementId: 'G-P3BHW5WQ1P',
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
