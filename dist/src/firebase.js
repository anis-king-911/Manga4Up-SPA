import {
  initializeApp
} from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js';
import {
  getDatabase, ref, onValue,
  query, orderByChild, limitToLast
} from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyAwI_lwV52VuKJYjeSID811WEv5u2AF70w",
  authDomain: "manga4up-vercel.firebaseapp.com",
  databaseURL: "https://manga4up-vercel-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "manga4up-vercel",
  storageBucket: "manga4up-vercel.appspot.com",
  messagingSenderId: "1063989292418",
  appId: "1:1063989292418:web:427fb5e5422fc4858bf39b"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {
  database, ref, onValue, query,
  orderByChild, limitToLast
}