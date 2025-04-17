// toggle menu a sinistra in alto
const buttonMenuLines = document.querySelector('#button-menu');
const layout = document.querySelector('.central-layout');
const buttonMenuMobile = document.querySelector('#button-menu-mobile');

function toggleMenuSidebar(){
    let sidebarContent = document.querySelector('.left-sidebar');
    
    if (sidebarContent.classList.contains('hidden')) {
        sidebarContent.classList.remove('hidden');
        layout.classList.remove('expand');
        console.log('A'); //debug
    } else {
        console.log('B'); //motivi di debug
        sidebarContent.classList.add('hidden');
        layout.classList.add('expand');
    }
}

buttonMenuLines.addEventListener('click', toggleMenuSidebar);
buttonMenuMobile.addEventListener('click', toggleMenuSidebar);

// toggle menu profilo
const buttonProfile = document.querySelector('#button-profile');
const personalMenu = document.querySelector('.personal-menu');

function toggleProfMenu(){
    

    if (personalMenu.classList.contains('hidden')) {
        if(!notifyMenu.classList.contains('hidden')){
            notifyMenu.classList.add('hidden');
        }
        personalMenu.classList.remove('hidden');
        console.log('Setto display show');
    } else {
        personalMenu.classList.add('hidden');
        console.log("Setto display hidden")
    }
}


buttonProfile.addEventListener('click', toggleProfMenu);

const mediaQuery = window.matchMedia('(max-width: 750px)');

function MediaChange(parametro) {
let sidebarContent = document.querySelector('.left-sidebar');
  if (parametro.matches) {  
    console.log('media query');
        
        // Se la sidebar è visibile, fa il toggle e nasconde
        if (!sidebarContent.classList.contains('hidden')) {
            console.log('Faccio il toggle');
            toggleMenuSidebar();
        } 
    }
}

MediaChange(mediaQuery);
mediaQuery.addEventListener('change', MediaChange);



// funzione per cambiare immagine profilo

let changeButton = document.querySelector('[data-action="change-picture"]');
let pic = document.querySelector('#profpic');
let menuPic = document.querySelector('#profpic-menu');
let imageList = ['pf1.jpg', 'pf2.jpg', 'pf3.jpg']; 

let lastImage = null;

function randomImgChange (){
    let randomImage;
    do {
        randomImage = imageList[Math.floor(Math.random() * imageList.length)];
    } while (randomImage === lastImage);

    pic.src = randomImage;
    menuPic.src = randomImage;
    lastImage = randomImage;
}

changeButton.addEventListener('click', randomImgChange);




const notifyButton = document.querySelector('#notify-button');
const notifyMenu = document.querySelector('.notify-menu');

function toggleNotifyMenu () {

    if (notifyMenu.classList.contains('hidden')) {
        if(!personalMenu.classList.contains('hidden')){
            personalMenu.classList.add('hidden');
        }
        if (notifyMenu.querySelectorAll('p').length === 0) {
            let noNotification = document.createElement('p');
            noNotification.textContent = 'Nessuna notifica';
            // noNotification.classList.add('sdbar-ins-txt');
            notifyMenu.appendChild(noNotification);
        }
        notifyMenu.classList.remove('hidden');
        console.log('Setto display show');
    } else {
        notifyMenu.classList.add('hidden');
        console.log("Setto display hidden")
    }
};

notifyButton.addEventListener('click', toggleNotifyMenu);



function nascontiContenuti(dataType) {
    document.querySelectorAll(`h1[data-type="${dataType}"] img`).forEach(img => {
        img.addEventListener('click', () => {
            document.querySelectorAll(`.sidebar-h[data-type="${dataType}"]`).forEach(sidebar => {

                if (sidebar.classList.contains('hidden')) {
                    sidebar.classList.remove('hidden');
                    img.dataset.type = 'up';
                    console.log('A');
                } else {
                    sidebar.classList.add('hidden');
                    img.dataset.type = 'down';
                    console.log('B');
                }
            });
        });
    });
}

// Example usage:
nascontiContenuti('Tu');
nascontiContenuti('channel');


//API N1



const API_KEY = 'secret'; 
const maxResults = 30;


function onJson(json){
    console.log('JSON ricevuto');
    // Svuotiamo la libreria
    const contentVIDEOLAYOUT = document.querySelector('.video-layout');
    const categorie = document.querySelector('.nav-central');
    categorie.classList.add('hidden');
    contentVIDEOLAYOUT.innerHTML = '';
    if(json.items.length === 0) {
        let noResult = document.createElement('h1');
        noResult.textContent = 'Nessun risultato trovato';
        contentVIDEOLAYOUT.appendChild(noResult);
    }
    for (let i = 0; i < json.items.length; i++) {
        
        let item = json.items[i];



        //creo l'immagine e setto la sorgente
        let imgSource = item.snippet.thumbnails.medium.url;
        let imgElement = document.createElement('img');
        imgElement.src = imgSource;


        let divVideoContent = document.createElement('div');
        divVideoContent.classList.add('video-content');

        let divThumbnail = document.createElement('div');
        divThumbnail.classList.add('video-thumbnail');
        
        let divText = document.createElement('div');
        divText.classList.add('video-info');


        let divVideoInfoChannel = document.createElement('div');
        divVideoInfoChannel.classList.add('video-info-channel');

        
        let h1 = document.createElement('h1');
        h1.textContent =item.snippet.title; 

        let p = document.createElement('p');
        p.textContent = item.snippet.channelTitle;
        

        divVideoInfoChannel.appendChild(h1);
        divVideoInfoChannel.appendChild(p);

        divText.appendChild(divVideoInfoChannel);
        divThumbnail.appendChild(imgElement);
        divVideoContent.appendChild(divThumbnail);
        divVideoContent.appendChild(divText);

        contentVIDEOLAYOUT.appendChild(divVideoContent);
    }
}



function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}



function search (event){
    event.preventDefault();
    const searchInput = document.querySelector('#search-bar').value;
    console.log('Hai cercato: '+ searchInput);
    const encode = encodeURIComponent(searchInput);
    console.log('Encoding:' + encode);
    restUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + encode + '&type=video&maxResults=' + maxResults+ '&key=' + API_KEY;
    console.log('URL:' + restUrl);
    fetch(restUrl).then(onResponse).then(onJson);
    
}
const form = document.querySelector('#search-form');
form.addEventListener('submit', search);

////API SPOTIFY N.2 oauth 2.0


function onJsonSpotify(json){
    console.log('JSON ricevuto');
    let namePlaylist;
    let sidebarContent = document.querySelector('.left-sidebar');
    let videoLayout = document.querySelector('.video-layout');
    let h1 = document.createElement('h1');
    h1.textContent = "Le tue playlist sono: "; 
    let item = document.createElement('h2');
    for (let i = 0; i < json.items.length; i++) {
        console.log('Nome playlist: ' + namePlaylist);
        namePlaylist = json.items[i].name;
        const contentVIDEOLAYOUT = document.querySelector('.video-layout');
        const categorie = document.querySelector('.nav-central');
        categorie.classList.add('hidden');
        contentVIDEOLAYOUT.innerHTML = '';
        videoLayout.appendChild(h1);
        item.textContent = namePlaylist;
        videoLayout.appendChild(item); 
        videoLayout.classList.add('column')
        let imgSource = json.items[i].images.url;
            let imgElement = document.createElement('img');
            imgElement.src = imgSource;
            videoLayout.appendChild(imgElement);
    }
}



function playlistSpotify(event)
{
  // Impedisci il submit del form
  event.preventDefault();
  console.log('Ho ricevuto il click sul bottone playlist');
  // Esegui la richiesta
  fetch("https://api.spotify.com/v1/users/" + myUserId + "/playlists?limit=" + maxResults,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJsonSpotify);
}


function onTokenJson(json)
{
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}


const client_id = 'secret';
const client_secret = 'secret';
const myUserId = 'secret';
let token;

fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);


const playlistButton = document.querySelector('#buttonPlaylist');
playlistButton.addEventListener('click', playlistSpotify);