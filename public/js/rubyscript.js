/*************************************************************
// * Ruby game.*
// * Description: Trouver l'os caché dans une maison et *
// * éviter les amis de Ruby que sont *
// * Max, Miky et Belch'a et Chichon. *
// * Author: LeBonUnivers *
// * visit: https://lebonunivers.fr *
/*************************************************************/

//*************************************************************
// ! DECLARATION VARIABLES.
//*************************************************************/

// * les tablbeaux
let tabHouse = ["", "", "", ""];
let tabToutou = ["", "", ""];
let tabSelectorHouse = ["#m1", "#m2", "#m3", "#m4"];

// * les images des toutous
let rubyImg = "<img src='/public/img/ruby.png' class='featImg'> ";
let maxImg = "<img src='/public/img/max.png' class='featImg'> ";
let mikyImg = "<img src='/public/img/miky.png' class='featImg'> ";
let chichbelImg = "<img src='/public/chichbel.png' class='featImg'> ";
//let os = "<img src='/public/img/osj.png'> ";
let os = "<img src='/public/img/osj.png' class='score__lives--ico'> ";

// * les compteurs
let cptOs = 4;
let cptTotOs = 0;
let cptTour = 10;

//* l'activation du jeu
let jeuActif = true;

//* la cache de ruby
let rubyDoor = 0;

let numH;

//*************************************************************
// ! AUTO RUN.
//*************************************************************/
// todo 0 auto run INIT MASQUAGE DES pages2 et page3 ----- //
init();

//*************************************************************
// ! ECOUTE PLAY + FUNCTION
//*************************************************************/
// * BOUTON PLAY pour ouverture page2 ----- //
$("#play").click(function () {
  play();
});

function play() {
  $("#page1").hide();
  $("#page2").show();
  hideRuby();
  // * on lance la boucle qui affiche les 4 maisons dans la grille
  displayHouses();
  displayScore();
}

//*************************************************************
// ! ECOUTE TOUR SUIVANT + FUNCTION.
//*************************************************************/
$("#tourSuivant").click(function () {
  touSuivant();
});

// todo  ----- //
function tourSuivant() {
  hideRuby();
  //displayHouses();
  // jeuActif = true;
  reinitGrid();
  //displayHouses();
  console.log("allo");
}

// todo ON JOUE ! ----- //
// !! on écoute les clics sur les maisons
$(".jeu-grid__case").click(function () {
  if (jeuActif) {
    const thisHouse = "#" + this.id;
    console.log("la maison choisie est :", thisHouse);

    // !! 1 si la maison correspond à la cache de Ruby
    if (thisHouse == rubyDoor) {
      // * on lance le flashRuby !
      flashRuby();
      // * on vide la maison et on affiche Ruby
      $(thisHouse).empty();
      $(thisHouse).append(rubyImg);
      $(thisHouse).attr("class", "jeu-grid__case--changed");
      // * on gère les compteurs et la continuation/sortie du jeu
      // * on incrémente le compteur os
      // * si cptTour > 0 alors
      // * _____alors on décrémente le compteur tour
      // * _____sinon on sort du jeu sortieJeu()
      gestCpt();
    }

    // !! 2 sinon si pas Ruby on vide la maison et on affiche l'un des autres toutous
    else {
      // * on décrémente les os
      cptOs--;
      // * on rend le jeu inactif
      // * on écoute le bouton suivant
      // * si suivant on lance hideRuby et displayHouses
      // * dans la section nombre essai 10 (z-cptTour)
      afficheCpt();

      // !_____2a on vide la maison
      $(thisHouse).empty();

      // !_____2b on affiche un toutou au hasard
      for (i = 1; i < 2; i++) {
        // * on tire un numéro au hasard entre 0 et 2
        const numT = Math.floor(Math.random() * 3);
        // * on lit tabToutou à l'index et si c'est vide à cet index
        let etatTabToutou = tabToutou[numT];
        // ! si ok tabToutou vide
        if (etatTabToutou === "") {
          // * on affiche le toutou avec le numéro (ex toutou1 etc.)
          let toutouImg = "dog" + numT;
          // * et on rempli une place dans tabToutou
          tabToutou[numT] = "occupé";
          // * bien sûr on crée l'image pour le DOM
          const imageT = document.createElement("img");
          // * on concatene + les feat de l'image (path pour la src, la class)
          let toutou = "/public/img/" + toutouImg + ".png";
          imageT.src = toutou;
          imageT.setAttribute("class", "featImg");
          // * puis on affiche dans le DOM
          $(thisHouse).append(imageT);
          $(thisHouse).attr("class", "jeu-grid__case--changed");
          console.log("attention thisHouse est " + thisHouse);
        }
        // ! sinon si tabToutou est occupé on retire 1 à i qui ne progresse pas
        else {
          i = i - 1;
          continue;
        }
      }
    }
  }
});

// todo GESTION DES COMPTEURS ET DE LA CONTINUATION/SORTIE DU JEU ----- //
function gestCpt() {
  jeuActif = false;
  if (cptTour < 2) {
    console.log("fine de partie");
  } else {
    cptTour--;
    cptTotOs = cptTotOs + cptOs;
    cptOs = 4;
    afficheCpt();
  }
}

function reinitGrid() {
  for (i = 1; i < 5; i++) {
    const urr = "#m" + i;
    $(urr).empty();
    $(urr).attr("class", "jeu-grid__case--changed");
    jeuActif = true;
    console.log(urr);
  }
}

function afficheCpt() {
  $("#z-cptTour__num").empty();
  $("#z-cptTour__num").append(cptTour);

  $("#cptOs").empty();
  $("#cptOs").append(cptOs);

  $("#cptTotOs").empty();
  $("#cptTotOs").append(cptTotOs);
}

function displayScore() {
  $("#os1").append(os);
  $("#os2").append(os);
}

// ! LES FONCTIONS  // ************************************************************

// todo lancé en auto run INIT MASQUAGE DES ZONES JEU ET SCORE ----- //
function init() {
  $("#page2").hide();
  $("#page3").hide();
}

// todo AFFICHAGE DES MAISON AU HASARD ----- //
function displayHouses() {
  for (i = 1; i < 5; i++) {
    // * on tire un numéro au hasard entre 0 et 3

    numH = Math.floor(Math.random() * 4);

    // * si c'est vide à cet index dans tabHouse
    let etatTabHouse = tabHouse[numH];
    if (etatTabHouse === "") {
      // * on bricole une maison avec le numéro (ex house1 etc.)
      let laMaisonImg = "house" + numH;

      // * et on rempli une place dans tabHouse
      tabHouse[numH] = "occupé";

      // * bien sûr on crée l'image pour le DOM
      const image = document.createElement("img");
      // * les feat de l'image : le path pour la src, la class
      let maison = "/public/img/" + laMaisonImg + ".png";
      image.src = maison;
      image.setAttribute("class", "featImg");
      // * on concatene et on affiche dans le DOM
      let m = "#m";
      m = m + i;
      $(m).append(image);
    }
    // * sinon si tabHouse est occupé on retire 1 à i qui ne progresse pas
    else {
      i = i - 1;
      continue;
    }
  }
}

// todo ON CACHE RUBY !----- //
function hideRuby() {
  // * on cache Ruby au hasard derrière un numéro de porte entre 1 et 4
  rubyDoor = tabSelectorHouse[Math.floor(Math.random() * 4)];
  console.log("Ruby est cachée en : ", rubyDoor);
}

// todo Function AFFICHAGE DU MESSAGE FLASH RUBY AVEC DELAY !!! ----- //
function flashRuby() {
  $("#z-jeuGrid").hide();
  $("#z-tourSuivant").hide();
  $("#z-scoreOs").hide();
  $("#z-tab").hide();
  $("#z-cptTour").hide();
  $("#z-flash").append("RUBY !");
  setTimeout(delay, 650);
}

function delay() {
  $("#z-jeuGrid").show();
  $("#z-scoreOs").show();
  $("#z-tab").show();
  $("#z-cptTour").show();
  $("#z-tourSuivant").show();
  $("#z-flash").hide();
}
