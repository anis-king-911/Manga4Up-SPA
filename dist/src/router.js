import { GetAllData, GetListData, GetOneData } from '/dist/src/firebase.js';

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
    const MangaTitle = window.location.href.split('#').pop().split('/').pop().replaceAll('_', ' ');
    
    GetOneData(MangaTitle, MangaContainer);
    document.title = `Manga4Up | ${MangaTitle}`;
  }
};

window.onpopstate = handleLocation;
window.route = route;

window.onload = ()=> {
  handleLocation()  
}
