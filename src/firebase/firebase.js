import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAklQIFUYbUMrUQpzWzxcx4j6E8B6rqhVk",
  authDomain: "my-website-portfolio-c2cc5.firebaseapp.com",
  projectId: "my-website-portfolio-c2cc5",
  storageBucket: "my-website-portfolio-c2cc5.appspot.com",
  messagingSenderId: "41652938159",
  appId: "1:41652938159:web:1a866a27dbe0b4a87e3b5a",
  measurementId: "G-7M54XD3KY9"
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); 

export { firestore };