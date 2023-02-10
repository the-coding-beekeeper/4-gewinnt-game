let felder = {};
let besetzteSpaltenfelder = [];
let spielerfarbe = ["yellow", "red"];
let player = 0;
let gewinner;

// Aufbau Einwurf, divs, event-listener, Felder
einwurfSystem();
function einwurfSystem() {
  for (let i=0; i<7; i++) {
    let planquadrat = document.createElement ("div");
    document.getElementById("einwurf").appendChild(planquadrat);
    planquadrat.setAttribute("class", "planquadrat-Einwurf");
    planquadrat.setAttribute("id", "einwurf" + i);
    planquadrat.addEventListener("mouseover", positionPrüfen);
    planquadrat.addEventListener("mouseout", positionPrüfenEnde);
    planquadrat.addEventListener("click", chipEinwerfen);
  }
  koordinatenSystem();
}
// Aufbau Koordinatensystem, divs, Felder-Objekte
function koordinatenSystem() {
  for (let i=0; i<42; i++) {
    let planquadrat = document.createElement ("div");
    document.getElementById("koordinatensystem").appendChild(planquadrat);
    planquadrat.setAttribute("class", "planquadrat");
    planquadrat.setAttribute("id", i);

    felder[i] = {
    spalte: 0,
    zeile: 0,
    gesetzterChip: false,
    ChipFarbe: "rgb(2, 2, 118)"
    }
  }
  xyKoordinatenFelder();
}

//x- und y- Koordinaten für Felder
function xyKoordinatenFelder() {
  for (let ze = 0; ze < 6; ze++) {
    for (let sp = 0; sp < 7; sp++) {
      zeilensprung = ze * 7;
      felder[zeilensprung + sp].zeile = ze;
      felder[zeilensprung + sp].spalte = sp;
    }
    zeilensprung + 7;
  }
}

// Chips einwerfen
function positionPrüfen() {
  this.style.backgroundColor = spielerfarbe[player];
}
function positionPrüfenEnde() {
  this.style.backgroundColor = "transparent";
}
function chipEinwerfen() {
  let einwurfFeld = this.getAttribute ("id");
  let reg = /\d/;
  let einwurfSpalte = parseInt(einwurfFeld.match(reg));
  
  for (i=0; i<42; i++) {
    if (felder[i].spalte == einwurfSpalte && felder[i].gesetzterChip == true) {
      besetzteSpaltenfelder.push(i);
    }
  }
  if (besetzteSpaltenfelder.length>5) {
    let volleSpalte = document.getElementById("einwurf" + einwurfSpalte);
    volleSpalte.removeEventListener("click", chipEinwerfen);
    besetzteSpaltenfelder = [];
    return;
  }
  if (player == 0) {
  let planquadrat = document.getElementById("einwurf" + einwurfSpalte);
  planquadrat.style.backgroundColor = spielerfarbe[1];
  }
  else {
    let planquadrat = document.getElementById("einwurf" + einwurfSpalte);
    planquadrat.style.backgroundColor = spielerfarbe[0];
  }
  felder[(einwurfSpalte + 35) - besetzteSpaltenfelder.length * 7].gesetzterChip = true;
  felder[(einwurfSpalte + 35) - besetzteSpaltenfelder.length * 7].ChipFarbe = spielerfarbe[player];
  
  display();
}
  // Darstellung der bereits eingeworfenen Chips
  function display() {
    for (let i=0; i<42; i++) {
      let planquadrat = document.getElementById(i);
      planquadrat.style.backgroundColor = felder[i].ChipFarbe;
    }
    siegPrüfungHorizontal();
  }

  // Siegprüfung

// Siegprüfung horizontal

function siegPrüfungHorizontal() {
  for (ze=0; ze<6; ze++) {
    for (sp=3; sp<7; sp++) {
      if (felder[ze*7 + sp].ChipFarbe == spielerfarbe[player] && felder[ze*7 + sp - 1].ChipFarbe == spielerfarbe[player] && felder[ze*7 + sp - 2].ChipFarbe == spielerfarbe[player] && felder[ze*7 + sp - 3].ChipFarbe == spielerfarbe[player]) {
        gewinnerAnsage();
      }
    }
  }
  siegPrüfungVertikal() 
}

// Siegprüfung vertikal
function siegPrüfungVertikal() {
  for (ze=0; ze<3; ze++) {
    for (sp=0; sp<7; sp++) {
      if (felder[sp + ze*7].ChipFarbe == spielerfarbe[player] && felder[sp + (ze+1)*7].ChipFarbe == spielerfarbe[player] && felder[sp + (ze+2)*7].ChipFarbe == spielerfarbe[player] && felder[sp + (ze+3)*7].ChipFarbe == spielerfarbe[player]) {
        gewinnerAnsage();
      }
    }
  }
siegPrüfungDiagonal1();
}

// Siegprüfung diagonal
function siegPrüfungDiagonal1() {
  for (ze=3; ze<6; ze++) {
    for (sp=0; sp<4; sp++) {
      if (felder[sp + ze*7].ChipFarbe == spielerfarbe[player] && felder[sp+1 + (ze-1)*7].ChipFarbe == spielerfarbe[player] && felder[sp+2 + (ze-2)*7].ChipFarbe == spielerfarbe[player] && felder[sp+3 + (ze-3)*7].ChipFarbe == spielerfarbe[player]) {
        gewinnerAnsage();
      }
    }
  }
  siegPrüfungDiagonal2();
}
function siegPrüfungDiagonal2(){
  for (ze=3; ze<6; ze++) {
    for (sp=3; sp<7; sp++) {
      if (felder[sp + ze*7].ChipFarbe == spielerfarbe[player] && felder[sp-1 + (ze-1)*7].ChipFarbe == spielerfarbe[player] && felder[sp-2 + (ze-2)*7].ChipFarbe == spielerfarbe[player] && felder[sp-3 + (ze-3)*7].ChipFarbe == spielerfarbe[player]) {
        gewinnerAnsage();
      }
    }
  }
  siegPrüfungDiagonal3();
}
function siegPrüfungDiagonal3() {
  for (ze=0; ze<3; ze++) {
    for (sp=0; sp<4; sp++) {
      if (felder[sp + ze*7].ChipFarbe == spielerfarbe[player] && felder[sp+1 + (ze+1)*7].ChipFarbe == spielerfarbe[player] && felder[sp+2 + (ze+2)*7].ChipFarbe == spielerfarbe[player] && felder[sp+3 + (ze+3)*7].ChipFarbe == spielerfarbe[player]) {
        gewinnerAnsage();
      }
    }
  }
  siegPrüfungDiagonal4();
}
function siegPrüfungDiagonal4(){
  for (ze=0; ze<3; ze++) {
    for (sp=3; sp<7; sp++) {
      if (felder[sp + ze*7].ChipFarbe == spielerfarbe[player] && felder[sp-1 + (ze+1)*7].ChipFarbe == spielerfarbe[player] && felder[sp-2 + (ze+2)*7].ChipFarbe == spielerfarbe[player] && felder[sp-3 + (ze+3)*7].ChipFarbe == spielerfarbe[player]) {
        gewinnerAnsage();
      }
    }
  }
  playerWechsel();
}

function playerWechsel() {
  besetzteSpaltenfelder = [];
  if (player == 0) {player = 1}
  else {player = 0};
}


// Gewinner-Ansage
function gewinnerAnsage() {
  let ansage = document.getElementById("mitteilung");
  if (player == 0) {
    ansage.innerText = ("Gewinner ist: gelb");
  } else {
    ansage.innerText = ("Gewinner ist: rot");
   }
  
  let btn = document.createElement ("button");
  document.getElementById("rahmen").appendChild(btn);
  btn.setAttribute("id", "button");
  btn.innerText="new game";
  btn.addEventListener("click", newGame);

  for (let i=0; i<7; i++) {
    let planquadrat = document.getElementById("einwurf" + i);
    planquadrat.style.backgroundColor="transparent";
    planquadrat.removeEventListener("mouseover", positionPrüfen);
    planquadrat.removeEventListener("mouseout", positionPrüfenEnde);
    planquadrat.removeEventListener("click", chipEinwerfen);
  }
  wait ();
}

function wait() {
    wait();
}

function newGame() {
  let ansage = document.getElementById("mitteilung");
  ansage.innerText = ("Let`ze Go, Vier gewinnt !");
  felder = {};
  besetzteSpaltenfelder = [];
  player = 0;
  for (let i=0; i<7; i++) {
    let planquadrat = document.getElementById("einwurf" + i);
    document.getElementById("einwurf").removeChild(planquadrat);
  }
  for (let i=0; i<42; i++) {
    let planquadrat = document.getElementById(i);
    document.getElementById("koordinatensystem").removeChild(planquadrat);
  }
  let button = document.getElementById("button");
  document.getElementById("rahmen").removeChild(button);

  einwurfSystem();
}
