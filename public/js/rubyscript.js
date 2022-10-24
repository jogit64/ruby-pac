/*************************************************************
 * Plugin:      LoginPress - Customizing the WordPress Login.*
 * Description: LoginPress is the best Login Page Customizer *
 *              in WordPress which allows you to completely  *
 *              change the layout of login, register and     *
 *              forgot password forms.                       *
 * Author:      WPBrigade                                    *
 * visit:       https://wordpress.org/plugins/loginpress/    *
 *************************************************************/

// todo DECLARATION VARIABLES
// * les tablbeaux
let tabHouse = ["", "", "", ""];
let tabToutou = ["", "", ""];
let tabSelectorHouse = ["#m1", "#m2", "#m3", "#m4"];
// * les images des toutous
let rubyImg = "<img src='/public/img/ruby.png' class='featImg'> ";
let maxImg = "<img src='/public/img/max.png' class='featImg'> ";
let mikyImg = "<img src='/public/img/miky.png' class='featImg'> ";
let chichbelImg = "<img src='/public/chichbel.png' class='featImg'> ";
//let os = "<img src='/public/img/os.png' class='featImg'> ";

// * les compteurs
let cptOs = 4;
let cptTotOs = 0;
let cptTour = 10;

//* l'activation du jeu
let jeuActif = true;

//* la cache de ruby
let rubyDoor = 0;

let numH;

// todo 0 auto run INIT MASQUAGE DES ZONES JEU ET SCORE ----- //
init();

// todo ZONE D'ECOUTE DU BOUTON COMMENCER --> CHGT AFFICHAGE DES ZONES DE JEU ET SCORE ----- //
$("#commencer").click(function () {
  commencer();
});

// todo ZONE D'ECOUTE DU BOUTON TOUR SUIVANT --> CHGT AFFICHAGE DES ZONES DE JEU ET SCORE ----- //
$("#tourSuivant").click(function () {
  touSuivant();
});

// todo  ----- //
function tourSuivant() {
  cacheRuby();
  //afficheJeuGrid();
  // jeuActif = true;
  reinitGrid();
  //afficheJeuGrid();
  console.log("allo");
}

function commencer() {
  $("#z-jeuIntro").hide();
  $("#z-jeuBegin").hide();
  $("#z-jeuGrid").show();
  $("#z-tab").show();
  $("#z-cptTour").show();
  //$("#z-tourSuivant").hide();

  // * on cache Ruby
  cacheRuby();
  // * on lance la boucle qui affiche les 4 maisons dans la grille
  afficheJeuGrid();
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
      // * si suivant on lance cacheRuby et afficheJeuGrid
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
          let toutouImg = "toutou" + numT;
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

// ! LES FONCTIONS  // ************************************************************

// todo lancé en auto run INIT MASQUAGE DES ZONES JEU ET SCORE ----- //
function init() {
  $("#z-jeuGrid").hide();
  $("#z-tourSuivant").hide();
  $("#z-scoreOs").hide();
  $("#z-tab").hide();
  $("#z-cptTour").hide();
}

// todo AFFICHAGE DES MAISON AU HASARD ----- //
function afficheJeuGrid() {
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
function cacheRuby() {
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
