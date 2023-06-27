const APIKEY ='3f5d54d63e6e9cde1071f29c79337a08';
let city = "";

// Récupère la localité et appelle la fonction apicall()
getLoc();
setInterval(function() {
  getLoc();
}, 3600000);

// Fonction pour obtenir la localité
function getLoc() {
  obtenirLocalite()
    .then(localite => {
      city = localite;
      apicall(city);
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de l\'obtention de la localité :', error);
    });
}

// Fonction pour obtenir la localité à partir d'un fichier json
function obtenirLocalite() {
  return fetch("config2.json")
    .then(response => response.json())
    .then(data => data.localite)
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la récupération du fichier JSON :', error);
      throw error;
    });
}

// Appel l'API pour obtenir les données météorologiques
function apicall(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=fr`;

  fetch(url).then((response) => 
  response.json().then((data) => {
   console.log(data);
   document.querySelector('#city').innerHTML = data.name;
   document.querySelector('#temp').innerHTML = data.main.temp + '°';
   document.querySelector('#humidity').innerHTML = data.main.humidity + '%';
   document.querySelector('#wind').innerHTML = data.wind.speed + 'km/h';
   })
   );
}
