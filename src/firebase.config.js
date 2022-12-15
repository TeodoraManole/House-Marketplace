
// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC6ZmREQuxsHHcBU5UKc7MWulqsIoHf_BE",
//   authDomain: "dreamhouse-marketplace-app.firebaseapp.com",
//   projectId: "dreamhouse-marketplace-app",
//   storageBucket: "dreamhouse-marketplace-app.appspot.com",
//   messagingSenderId: "413312450771",
//   appId: "1:413312450771:web:a27ebe6f8cc35ec3bb9426"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore()


// // HAPPENED AGAIN X2

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBtdW4e8Soi2klm-AwLWuYZrDedQB1MH74",
//   authDomain: "dreamhouse-marketplace-app.firebaseapp.com",
//   projectId: "dreamhouse-marketplace-app",
//   storageBucket: "dreamhouse-marketplace-app.appspot.com",
//   messagingSenderId: "413312450771",
//   appId: "1:413312450771:web:a27ebe6f8cc35ec3bb9426"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore()

import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtdW4e8Soi2klm-AwLWuYZrDedQB1MH74",
  authDomain: "dreamhouse-marketplace-app.firebaseapp.com",
  projectId: "dreamhouse-marketplace-app",
  storageBucket: "dreamhouse-marketplace-app.appspot.com",
  messagingSenderId: "413312450771",
  appId: "1:413312450771:web:a27ebe6f8cc35ec3bb9426"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()