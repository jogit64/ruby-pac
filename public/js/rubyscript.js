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
let os = "<img src='/public/img/osj.png' class='featOs__img'> ";
let bigOs = "<img src='/public/img/flashOs.png' class='flash__img'> ";

// * les compteurs
let scoreNum;
let cptOs;
let osToNum;
let tourNum;

//* l'activation du jeu
let jeuActif;
let nextActif;

//* la cache de ruby
let rubyDoor;

// * la variable pour "construire" (afficher les images) les maisons dans tabHouse
let numH;

//*************************************************************
// ! AUTO RUN.
//*************************************************************/
// * auto run affiche page1 et masque pages2 et page3 et page4 ----- //
//$("#gov").hide();
displayPage1();

//*************************************************************
// ! ECOUTE DU BOUTON PLAY.
//*************************************************************/
// * BOUTON "PLAY"
$("#play").click(function () {
  initData();
  emptyDom();
  play();
});

function initData() {
  scoreNum = 0;
  cptOs = 4;
  osToNum = 0;
  tourNum = 2;
  rubyDoor = 0;

  tabHouse = ["", "", "", ""];
  tabToutou = ["", "", ""];
}

function emptyDom() {
  const m = "#m";
  for (i = 1; i < 5; i++) {
    const em = m + i;
    $(em).empty();
  }
}

function play() {
  jeuActif = true;
  nextActif = false;

  displayPage2();
  hideRuby();
  displayHouses();
  displayCpt();

  $("#next").hide();
  $("#tour").show();
  $("#tourNum").show();
  $("#cptOs").show();
  $("#os").show();

  osToNum = 0;
  stockOs(cptOs);
}

function stockOs() {
  const osPref = "os";
  for (i = 1; i <= 4; i++) {
    const osSuf = "#" + osPref + i;
    $(osSuf).empty();
  }

  for (i = 1; i <= cptOs; i++) {
    const osSuf = "#" + osPref + i;
    $(osSuf).append(os);
  }
}

/*************************************************************
// ! ECOUTE DU BOUTON GOBACK.
//*************************************************************/
// * BOUTON "GOBACK"
$("#goback").click(function () {
  displayPage1();
});

//*************************************************************
// ! ON JOUE.
//*************************************************************/

// !! on écoute les clics sur les maisons = thisHouse
$(".jeu-grid__case").click(function () {
  let libre = tabToutou[this.id];
  if (libre != "toutou") {
    if (jeuActif) {
      const thisHouse = "#" + this.id;

      // !! 1 si la maison correspond à la cache de Ruby
      if (thisHouse == rubyDoor) {
        // * on lance le flash
        flashOs();
        console.log("et là alors");
        // * on vide la maison et on affiche Ruby
        $(thisHouse).empty();
        $(thisHouse).append(rubyImg);

        // fadeCase(thisHouse);

        //$(thisHouse).attr("class", "jeu-grid__case jeu-grid__case--opacit");

        //for (i = 1; i < 4; i++) {}

        // * on regarde le nombre de tour (continuation ou sortie)
        // * on gère le compteur de tour, de points que l'on affiche avec  displayCpt()
        // * on affiche l'écran NEXT qu'on écoute pour PLAY again
        toursEtCpt();
        // TODO tout ce qui n'est pas ruby devient opacity
      }

      // !! 2 sinon si pas Ruby on vide la maison et on affiche l'un des autres toutous
      else {
        tabToutou[this.id] = "toutou";
        //console.log("else tabToutou :", tabToutou);
        // * on décrémente les os
        cptOs--;
        stockOs(cptOs);

        displayCpt();

        // !_____2a on vide la maison
        $(thisHouse).empty();
        //  $(thisHouse).attr("class", "jeu-grid__case--changed");

        // * AFFICHER UN TOUTOU AU HASARD
        displayToutou(thisHouse);
      }
    }
  }
});

// function fadeCase(param) {
//   for (i = 0; i < 4; i++) {
//     if (param != tabSelectorHouse[i]) {
//       $(tabSelectorHouse[i]).attr(
//         "class",
//         "jeu-grid__case jeu-grid__case--opacit"
//       );
//     } else {
//       continue;
//     }
//   }
// }

//*************************************************************
// ! GESTION ET AFFICHAGE DES COMPTEURS.
//*************************************************************/

// ! si compteur fin GAMEOVER sinon NEXT
function toursEtCpt() {
  if (tourNum < 2) {
    jeuActif = false;
    nextActif = false;
    gameOver();
  } else {
    jeuActif = false;
    nextActif = true;

    tourNum--;
    osToNum = cptOs * 100;
    scoreNum = scoreNum + osToNum;
    displayCpt();

    $("#next").show();
    $("#tour").hide();
    $("#tourNum").hide();
    $("#cptOs").hide();
    $("#os").hide();

    if (nextActif) {
      $("#next").click(function () {
        cptOs = 4;
        tabHouse = ["", "", "", ""];
        tabToutou = ["", "", ""];

        // $("#m1").empty();
        // //  $("#m1").attr("class", "jeu-grid__case jeu-grid__case--hg");
        // $("#m2").empty();
        // //$("#m2").attr("class", "jeu-grid__case  jeu-grid__case--hd");
        // $("#m3").empty();
        // //$("#m3").attr("class", "jeu-grid__case jeu-grid__case--bg");
        // $("#m4").empty();
        // //$("#m4").attr("class", "jeu-grid__case jeu-grid__case--bd");
        // //$("#z-jeuGrid").attr("class", "jeu-grid");

        emptyDom();
        play();
      });
    }
  }
}

//*************************************************************
// ! GAMEOVER.
//*************************************************************/
function gameOver() {
  console.log("gameover ok");

  //displayPage4();
  // displayGameover();
  $("#gov").show();
  // $("#gameoverNum").empty();
  // $("#gameoverNum").append(scoreNum);
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
  $("#z-score1").hide();
  $("#z-score2").hide();
  console.log("ha tiens");
  $("#page3").show();

  $("#z-flash").show();
  $("#z-flash__img").append(bigOs);
  $("#z-flash__pts").append("+", cptOs * 100, "  PTS !");

  setTimeout(delay, 850);
}

function delay() {
  $("#z-jeuGrid").show();
  //$("#page3").show();
  $("#z-score1").show();
  $("#z-score2").show();
  $("#z-flash").hide();
  $("#z-flash__img").empty();
  $("#z-flash__pts").empty();
  //console.log("#z-flash__img : ", $("#z-flash__img"));
  //console.log("#z-flash__pts : ", z-flash__pts);
}

// * AFFICHER LES TOUTOUS AU HASARD
function displayToutou(param) {
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
      tabToutou[numT] = "toutou";
      // * bien sûr on crée l'image pour le DOM
      const imageT = document.createElement("img");
      // * on concatene + les feat de l'image (path pour la src, la class)
      let toutou = "/public/img/" + toutouImg + ".png";
      imageT.src = toutou;
      imageT.setAttribute("class", "featImg");
      // * puis on affiche dans le DOM
      $(param).append(imageT);
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

//*************************************************************
// ! FUNCTION DES DISPLAY SIMPLES DE PAGES ET COMPTEURS.
//*************************************************************/

function displayPage1() {
  $("#page1").show();
  $("#page2").hide();
  $("#page3").hide();
  $("#page4").hide();
}

function displayPage2() {
  $("#page1").hide();
  $("#page2").show();
  $("#page3").hide();
  $("#page4").hide();
}

function displayPage3() {
  $("#page1").hide();
  $("#page2").hide();
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

  $("#tourNum").empty();
  $("#tourNum").append(tourNum);
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
