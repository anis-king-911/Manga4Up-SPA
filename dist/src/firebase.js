import {
  initializeApp
} from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js';
import {
  getDatabase, ref, child, onValue,
  query, orderByChild, limitToLast,
  push, set
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

let path = 'Manga4Up/',pathList = 'List/', blog = 'blog/';
let order = 'Volume Data/Time', orderList = 'Title';

function GetAllData(Container, size) {
  const databaseRef = ref(database, path);
  const databaseOrder = query(databaseRef, orderByChild(order));
  const databaseLimit = query(databaseOrder, limitToLast(size));
  
  onValue(databaseLimit, (snapshot)=> {
    Container.innerHTML = ''; 
    snapshot.forEach((snap)=> {
      const key = snap.key;
      const value = snap.val();
      const data = value['Volume Data'];
      
      Container.innerHTML = RecentArticle(data) + Container.innerHTML;
    })
  })
}

function GetListData(Container) {
  const databaseRef = ref(database, pathList);
  const databaseOrder = query(databaseRef, orderByChild(orderList));
  
  onValue(databaseOrder, (snapshot)=> {
    Container.innerHTML = ''; 
    snapshot.forEach((snap)=> {
      const key = snap.key;
      const data = snap.val();
      
      Container.innerHTML += ListArticle(data);
    })
  })
}

function GetOneData(MangaTitle, Container) {
  const databaseRef = ref(database, path);
  
  onValue(databaseRef, (snapshot)=> {
    Container.innerHTML = ''; 
    snapshot.forEach((snap)=> {
      const key = snap.key;
      const value = snap.val();
      const data = value['Volume Data'];
      
      if(data['Manga Title'] === MangaTitle) {
        Container.innerHTML += RecentArticle(data);
      }
    })
  })
}

function RecentArticle(data) {
  let div =
  `
<article>
  <div class="Cover">
    <img src="${data['Volume Cover']}"/>
  </div>
  <div class="Content">
    <span class="Title">
      ${data['Manga Title']}: ${data['Volume Number']}
    </span>
  </div>
  <div class="Actions">
    <button type="button">Downlod</button>
  </div>
</article>
  `;
  
  return div;
}
function ListArticle(data) {
  let div =
  `
<article>
  <div class="Cover">
    <img src="${data.Cover}"/>
  </div>
  <div class="Content">
    <span class="Title">Manga Title: ${data.Title}</span>
    <span class="Info">Volumes Count: ${data.Count}</span>
  </div>
  <div class="Actions">
    <a href="/manga/#${data.Title.replaceAll(' ', '_')}" onclick="route()">Manga Page</a>
  </div>
</article>
  `;
  
  return div;
}

export {
  GetAllData, GetListData, GetOneData
};
