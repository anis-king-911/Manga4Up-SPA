import {
  database, ref, onValue, query,
  orderByChild, limitToLast
} from '/dist/src/firebase.js';

let path = 'Manga4Up/',pathList = 'List/';
let order = 'Volume Data/CreatedAt', orderList = 'Title';

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



const routes = {
  '/index.html': '/dist/pages/Home.html',
  404: '/dist/pages/404.html',
  '/': '/dist/pages/Home.html',
  '/List': '/dist/pages/List.html',
  '/Recent': '/dist/pages/Recent.html',
  '/manga/': '/dist/pages/Manga.html',
};

function route(event) {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, '', event.target.href);
  handleLocation();
};

async function handleLocation() {
  const path = window.location.pathname;
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  
  document.querySelector('.Container').innerHTML = html;
  
  if(path === '/List') {
    const ListContainer = document.querySelector('.ListContainer');
    
    GetListData(ListContainer);
    document.title = 'Manga4Up | Available Manga List';
  } else if(path === '/Recent') {
    let size = 10, n = 5;
    const RecentContainer = document.querySelector('.RecentContainer');
    const LoadMoreBtn = document.querySelector('.LoadMore');
    
    GetAllData(RecentContainer, size);
    
    LoadMoreBtn.addEventListener('click', ()=> {
      size = size+n;
      
      GetAllData(RecentContainer, size);
    })
    document.title = 'Manga4Up | Recent Volumes Uploaded';
  } else if(path === '/manga/') {
    const MangaContainer = document.querySelector('.MangaContainer');
    const MangaTitle = window.location.href.split('#').pop().replaceAll('_', ' ');
    
    GetOneData(MangaTitle, MangaContainer);
    document.title = `Manga4Up | ${MangaTitle}`;
  }
};

window.onpopstate = handleLocation;
window.route = route;

window.onload = ()=> {
  handleLocation()  
}
