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
let os = "<img src='/public/img/osj.png' class='score__lives--ico'> ";
let bigOs = "<img src='/public/img/flashOs.png' class='flash__img'> ";

// * les compteurs
let scoreNum = 0;
let cptOs = 4;
let cptTour = 10;

//* l'activation du jeu
let jeuActif = true;
let nextActif = false;

//* la cache de ruby
let rubyDoor = 0;

// * la variable pour "construire" (afficher les images) les maisons dans tabHouse
let numH;

//*************************************************************
// ! AUTO RUN.
//*************************************************************/
// * auto run affiche page1 et masque pages2 et page3 et page4 ----- //
displayPage1();

//*************************************************************
// ! ECOUTE DU BOUTON PLAY.
//*************************************************************/
// * BOUTON "PLAY"
$("#play").click(function () {
  play();
});

function play() {
  displayPage2();
  hideRuby();
  displayHouses();
  displayCpt();
  $("#next").attr("class", "next, next--dark");
}

//*************************************************************
// ! ON JOUE.
//*************************************************************/

// !! on écoute les clics sur les maisons = thisHouse
$(".jeu-grid__case").click(function () {
  if (jeuActif) {
    const thisHouse = "#" + this.id;

    // !! 1 si la maison correspond à la cache de Ruby
    if (thisHouse == rubyDoor) {
      // * on désactive la grille
      //jeuActif = false;

      // * on lance le flash
      flashOs();

      // * on vide la maison et on affiche Ruby
      $(thisHouse).empty();
      $(thisHouse).append(rubyImg);
      //$(thisHouse).attr("class", "jeu-grid__case--changed");

      // * on regarde le nombre de tour (continuation ou sortie)
      // * et on inscrémente les compteurs
      toursEtCpt();

      // TODO tout ce qui n'est pas ruby devient opacity
    }

    // !! 2 sinon si pas Ruby on vide la maison et on affiche l'un des autres toutous
    else {
      // * on décrémente les os
      cptOs--;

      displayCpt();

      // !_____2a on vide la maison
      $(thisHouse).empty();
      //  $(thisHouse).attr("class", "jeu-grid__case--changed");

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
          // $(thisHouse).attr("class", "jeu-grid__case--changed");
          //console.log("attention thisHouse est " + thisHouse);
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

//*************************************************************
// ! GESTION ET AFFICHAGE DES COMPTEURS.
//*************************************************************/

// ! si compteur fin GAMEOVER sinon NEXT
function toursEtCpt() {
  if (cptTour < 2) {
    jeuActif = false;
    nextActif = false;
    gameOver();
    console.log("gameover");
  } else {
    jeuActif = false;
    nextActif = true;

    cptTour--;
    scoreNum = scoreNum + cptOs;

    displayCpt();
    console.log("coucou");

    // * on active le bouton next
    $("#next").attr("class", "next, next--light");

    if (nextActif) {
      $("#next").click(function () {
        //jeuActif = false;
        console.log("coucou2");
        cptOs = 4;
        tabHouse = ["", "", "", ""];
        tabToutou = ["", "", ""];

        $("#m1").empty();
        $("#m1").attr("class", "jeu-grid__case jeu-grid__case--hg");
        $("#m2").empty();
        $("#m2").attr("class", "jeu-grid__case  jeu-grid__case--hd");
        $("#m3").empty();
        $("#m3").attr("class", "jeu-grid__case jeu-grid__case--bg");
        $("#m4").empty();
        $("#m4").attr("class", "jeu-grid__case jeu-grid__case--bd");
        //$("#z-jeuGrid").attr("class", "jeu-grid");

        hideRuby();
        displayHouses();
        displayCpt();
        jeuActif = true;
        nextActif = false;
      });
    }
  }
}

//*************************************************************
// ! ECOUTE DU BOUTON NEXT.
//*************************************************************/
// * BOUTON "NEXT"
// if (nextActif) {
//   $("#next").click(function () {
//     //jeuActif = false;
//     console.log("coucou2");
//     cptOs = 4;
//     tabHouse = ["", "", "", ""];
//     tabToutou = ["", "", ""];

//     $("#m1").empty();
//     $("#m2").empty();
//     $("#m3").empty();
//     $("#m4").empty();
//     $("#z-jeuGrid").attr("class", "jeu-grid");

//     hideRuby();
//     displayHouses();
//     displayCpt();
//     jeuActif = true;
//     nextActif = false;
//   });
// }

// else {
//   $("#next").attr("class", "next next--inactif");
// }

// function reinitGrid() {
//   for (i = 1; i < 5; i++) {
//     const urr = "#m" + i;
//     $(urr).empty();
//     $(urr).attr("class", "jeu-grid__case--changed");
//     jeuActif = true;
//     console.log(urr);
//   }
// }

// function displayCptTour() {
//   $("#cptTour").append(cptTour);
// }

//*************************************************************
// ! GAMEOVER.
//*************************************************************/
function gameOver() {
  displayPage4();
}

//*************************************************************
// ! LES FONCTIONS.
//*************************************************************/

// * AFFICHER DES MAISON AU HASARD
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
      tabHouse[numH] = "déjà construit";

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

// * CACHER RUBY
function hideRuby() {
  // * on cache Ruby au hasard derrière un numéro de porte entre 1 et 4
  rubyDoor = tabSelectorHouse[Math.floor(Math.random() * 4)];
  console.log("Ruby est cachée en : ", rubyDoor);
}

// * AFFICHER LE FLASH PTS
function flashOs() {
  $("#z-jeuGrid").hide();
  $("#z-score").hide();

  $("#page3").show();
  $("#z-flash__img").append(bigOs);
  $("#z-flash__pts").append("+", cptOs, "  PTS !");

  setTimeout(delay, 450);
}

function delay() {
  $("#z-jeuGrid").show();
  $("#page3").show();
  $("#z-score").show();
  $("#z-flash").hide();
}

//*************************************************************
// ! FUNCTION DES DISPLAY SIMPLES DE PAGES ET COMPTEURS.
//*************************************************************/

function displayPage1() {
  $("#page1").show();
  $("#page2").hide();
  $("#page3").hide();
  $("#page3").hide();
  $("#page4").hide();
}

function displayPage2() {
  $("#page2").show();
  $("#page1").hide();
  $("#page3").hide();
  $("#page4").hide();
}

function displayPage3() {
  $("#page2").hide();
  $("#page1").hide();
  $("#page3").show();
  $("#page4").hide();
}

function displayPage4() {
  $("#page1").hide();
  $("#page2").hide();
  $("#page3").hide();
  $("#page4").show();
}

function displayCpt() {
  $("#scoreNum").empty();
  $("#scoreNum").append(scoreNum);

  $("#cptOs").empty();
  $("#cptOs").append(cptOs);

  $("#cptTour").empty();
  $("#cptTour").append(cptTour);
}

//*************************************************************
// TODO BROUILLON.
//*************************************************************/
// function displayOs() {
//   $("#os1").append(os);
//   $("#os2").append(os);
//   $("#os3").append(os);
//   $("#os4").append(os);
// }
