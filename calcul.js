calculShortPartiel();
calculShortComplet();
calculLongPartiel();
calculLongComplet();

function calculShortPartiel() {

    let coursDepart = document.getElementById("departShort").value;
    let coursFin = (coursDepart * 0.80) / 100; 
    let coursTotal = coursDepart - coursFin ;

    document.getElementById("coursResultatShortPartiel").innerHTML = coursTotal;
}

function calculShortComplet() {

    let coursDepart = document.getElementById("departShortComplet").value;
    let tauxCurrent = document.getElementById("tauxShort").value;
    let tmp = 0; 
    let coursTotal = 0;

    tmp = ( (coursDepart * tauxCurrent) / 100); 

    coursTotal = coursDepart - tmp; 

    document.getElementById("coursResultatShortComplet").innerHTML = coursTotal ;
}

function calculLongPartiel() {

    let coursDepart = document.getElementById("departLong").value;
    let coursFin = (coursDepart * 0.80) / 100; 
    let coursTotal = +coursDepart + +coursFin ;

    document.getElementById("coursResultatLongPartiel").innerHTML = coursTotal;
}

function calculLongComplet() {

    let coursDepart = document.getElementById("departLongComplet").value;
    let tauxCurrent = document.getElementById("tauxLong").value;
    let tmp = 0; 
    let coursTotal = 0;

    tmp = ( (coursDepart * tauxCurrent) / 100); 

    coursTotal = +coursDepart + +tmp; 

    document.getElementById("coursResultatLongComplet").innerHTML = coursTotal ;
}

function ajouterCinqMinutes() {
  // Récupère la valeur saisie par l'utilisateur
  var heureSaisie = document.getElementById("heure5").value;
  
  // Divise l'heure saisie en heures et minutes
  var heureDivisee = heureSaisie.split(":");
  var heures = parseInt(heureDivisee[0]);
  var minutes = parseInt(heureDivisee[1]);

  // Ajoute 2 heures et 45 minutes à l'heure saisie
  heures += 2;
  minutes += 45;

  // Vérifie si l'ajout des minutes dépasse 60
  if (minutes >= 60) {
    minutes -= 60;
    heures += 1;
  }

  // Vérifie si l'ajout des heures dépasse 24
  if (heures >= 24) {
    heures -= 24;
  }

  // Affiche l'heure 2h45 plus tard
  var heurePlusTard = ("0" + heures).slice(-2) + ":" + ("0" + minutes).slice(-2);
  document.getElementById("resultat5min").innerHTML = "L'heure 2h45 plus tard est : " + "<strong>" + heurePlusTard + "</strong>";
}


function ajouterQuinzeMinutes() {
    // Récupère la valeur saisie par l'utilisateur
    var heureSaisie = document.getElementById("heure15").value;
    
    // Divise l'heure saisie en heures et minutes
    var heureDivisee = heureSaisie.split(":");
    var heures = parseInt(heureDivisee[0]);
    var minutes = parseInt(heureDivisee[1]);

    // Ajoute 8 heures et 30 minutes à l'heure saisie
    heures += 8;
    minutes += 30;

    // Vérifie si l'ajout des minutes dépasse 60
    if (minutes >= 60) {
      minutes -= 60;
      heures += 1;
    }

    // Vérifie si l'ajout des heures dépasse 24
    if (heures >= 24) {
      heures -= 24;
    }

    // Affiche l'heure 8h30 plus tard
    var heurePlusTard = ("0" + heures).slice(-2) + ":" + ("0" + minutes).slice(-2);
    document.getElementById("resultat15min").innerHTML = "L'heure 8h30 plus tard est : " + "<strong>" + heurePlusTard + "</strong>";
  }