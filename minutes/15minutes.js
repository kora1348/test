// Définir la fonction pour compter les éléments négatifs
function countNegativeElements(array) {
  let counter = 0; // initialiser le compteur à zéro
  for (let i = 0; i < array.length; i++) { // parcourir le tableau
    if (array[i] < 0) { // vérifier si l'élément est négatif
      counter++; // augmenter le compteur
    }
  }
  return counter; // retourner le compteur
}

// Définir la fonction pour compter les éléments positifs
function countPositiveElements(array) {
  let counter = 0; // initialiser le compteur à zéro
  for (let i = 0; i < array.length; i++) { // parcourir le tableau
    if (array[i] > 0) { // vérifier si l'élément est positif
      counter++; // augmenter le compteur
    }
  }
  return counter; // retourner le compteur
}

// **** ==================================================== BITECOIN ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsBtc = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let btcStockPriceElement0 = document.getElementById('btcValue0');
let btcStockPriceElement1 = document.getElementById('btcValue1');
let btcStockPriceElement2 = document.getElementById('btcValue2');
let btcStockPriceElement3 = document.getElementById('btcValue3');
let btcStockPriceElement4 = document.getElementById('btcValue4');
let btcStockPriceElement5 = document.getElementById('btcValue5');
let btcStockPriceElement6 = document.getElementById('btcValue6');
let btcStockPriceElement7 = document.getElementById('btcValue7');
let btcStockPriceElement8 = document.getElementById('btcValue8');
let btcStockPriceElement9 = document.getElementById('btcValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let btcVarianceElement0 = document.getElementById('btcVariance0');
let btcVarianceElement1 = document.getElementById('btcVariance1');
let btcVarianceElement2 = document.getElementById('btcVariance2');
let btcVarianceElement3 = document.getElementById('btcVariance3');
let btcVarianceElement4 = document.getElementById('btcVariance4');
let btcVarianceElement5 = document.getElementById('btcVariance5');
let btcVarianceElement6 = document.getElementById('btcVariance6');
let btcVarianceElement7 = document.getElementById('btcVariance7');
let btcVarianceElement8 = document.getElementById('btcVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let btcVariancePercentSumElement = document.getElementById('btcVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let btcMessageElement = document.getElementById('btcMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let btcLastPrice = null;
let btcStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsBtc.onmessage = (event) => {
 // Convertir le message en objet JSON
 btcStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let btcCurrent1 ,btcCurrent2, btcCurrent3, btcCurrent4, btcCurrent5, btcCurrent6, btcCurrent7, btcCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let btcCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let btcVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let btcRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(btcStockObject.p).toFixed(1);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let btcStockPriceElement = document.getElementById('btcValue' + (btcCounter + 1));
 btcStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 btcStockPriceElement.style.color =
 !btcLastPrice || btcLastPrice === val
 ? 'black'
 : val > btcLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 btcLastPrice = val;
 // Réinitialiser l'objet du flux à null
 btcStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let btcCurrent = 'btcCurrent' + (btcCounter + 1);
 window[btcCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (btcCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[btcCurrent] - window['btcCurrent' + (btcCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['btcCurrent' + (btcCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[btcCurrent] < window['btcCurrent' + (btcCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[btcCurrent] > window['btcCurrent' + (btcCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let btcVarianceElement = document.getElementById('btcVariance' + (btcCounter - 1));
   btcVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     btcVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     btcVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     btcVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   btcVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 btcCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (btcCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let btcVariancePercentSum = parseFloat(btcVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let btcVariancePercentSumSymbol = "";
if (btcVariancePercentSum > 0) {
  // Somme positive : symbole plus
  btcVariancePercentSumSymbol = "+";
} else if (btcVariancePercentSum < 0) {
  // Somme négative : symbole moins
  btcVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
btcVariancePercentSumElement.innerText = btcVariancePercentSumSymbol + btcVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (btcVariancePercentSum < 0) {
 // Somme négative : rouge
 btcVariancePercentSumElement.style.color = 'red';
} else if (btcVariancePercentSum > 0) {
 // Somme positive : vert
 btcVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 btcVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(btcVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(btcVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    btcMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/BTCUSDT?_from=markets' target='_blank'>BTC</a>"; // insérer le lien sur BTC et le message
    btcMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    btcMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/BTCUSDT?_from=markets' target='_blank'>BTC</a>"; // insérer le lien sur BTC et le message
    btcMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    btcMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(btcRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== ETHERHEUM ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsEth = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let ethStockPriceElement0 = document.getElementById('ethValue0');
let ethStockPriceElement1 = document.getElementById('ethValue1');
let ethStockPriceElement2 = document.getElementById('ethValue2');
let ethStockPriceElement3 = document.getElementById('ethValue3');
let ethStockPriceElement4 = document.getElementById('ethValue4');
let ethStockPriceElement5 = document.getElementById('ethValue5');
let ethStockPriceElement6 = document.getElementById('ethValue6');
let ethStockPriceElement7 = document.getElementById('ethValue7');
let ethStockPriceElement8 = document.getElementById('ethValue8');
let ethStockPriceElement9 = document.getElementById('ethValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let ethVarianceElement0 = document.getElementById('ethVariance0');
let ethVarianceElement1 = document.getElementById('ethVariance1');
let ethVarianceElement2 = document.getElementById('ethVariance2');
let ethVarianceElement3 = document.getElementById('ethVariance3');
let ethVarianceElement4 = document.getElementById('ethVariance4');
let ethVarianceElement5 = document.getElementById('ethVariance5');
let ethVarianceElement6 = document.getElementById('ethVariance6');
let ethVarianceElement7 = document.getElementById('ethVariance7');
let ethVarianceElement8 = document.getElementById('ethVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let ethVariancePercentSumElement = document.getElementById('ethVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let ethMessageElement = document.getElementById('ethMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let ethLastPrice = null;
let ethStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsEth.onmessage = (event) => {
 // Convertir le message en objet JSON
 ethStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du etherheum à différents moments
let ethCurrent1 ,ethCurrent2, ethCurrent3, ethCurrent4, ethCurrent5, ethCurrent6, ethCurrent7, ethCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let ethCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du etherheum
let ethVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let ethRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du etherheum à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(ethStockObject.p).toFixed(2);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let ethStockPriceElement = document.getElementById('ethValue' + (ethCounter + 1));
 ethStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 ethStockPriceElement.style.color =
 !ethLastPrice || ethLastPrice === val
 ? 'black'
 : val > ethLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 ethLastPrice = val;
 // Réinitialiser l'objet du flux à null
 ethStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let ethCurrent = 'ethCurrent' + (ethCounter + 1);
 window[ethCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (ethCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[ethCurrent] - window['ethCurrent' + (ethCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['ethCurrent' + (ethCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[ethCurrent] < window['ethCurrent' + (ethCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[ethCurrent] > window['ethCurrent' + (ethCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let ethVarianceElement = document.getElementById('ethVariance' + (ethCounter - 1));
   ethVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     ethVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     ethVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     ethVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   ethVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 ethCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (ethCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let ethVariancePercentSum = parseFloat(ethVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let ethVariancePercentSumSymbol = "";
if (ethVariancePercentSum > 0) {
  // Somme positive : symbole plus
  ethVariancePercentSumSymbol = "+";
} else if (ethVariancePercentSum < 0) {
  // Somme négative : symbole moins
  ethVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
ethVariancePercentSumElement.innerText = ethVariancePercentSumSymbol + ethVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (ethVariancePercentSum < 0) {
 // Somme négative : rouge
 ethVariancePercentSumElement.style.color = 'red';
} else if (ethVariancePercentSum > 0) {
 // Somme positive : vert
 ethVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 ethVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(ethVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(ethVariancePercentArray); // stocker le résultat dans une variable

if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    ethMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/ETHUSDT?_from=markets' target='_blank'>ETH</a>"; // insérer le lien sur ETH et le message
    ethMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    ethMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/ETHUSDT?_from=markets' target='_blank'>ETH</a>"; // insérer le lien sur ETH et le message
    ethMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    ethMessageElement.innerHTML =""; 
}

  
// Arrêter l'intervalle
clearInterval(ethRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== ARPA ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsArpa = new WebSocket('wss://stream.binance.com:9443/ws/arpausdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let arpaStockPriceElement0 = document.getElementById('arpaValue0');
let arpaStockPriceElement1 = document.getElementById('arpaValue1');
let arpaStockPriceElement2 = document.getElementById('arpaValue2');
let arpaStockPriceElement3 = document.getElementById('arpaValue3');
let arpaStockPriceElement4 = document.getElementById('arpaValue4');
let arpaStockPriceElement5 = document.getElementById('arpaValue5');
let arpaStockPriceElement6 = document.getElementById('arpaValue6');
let arpaStockPriceElement7 = document.getElementById('arpaValue7');
let arpaStockPriceElement8 = document.getElementById('arpaValue8');
let arpaStockPriceElement9 = document.getElementById('arpaValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let arpaVarianceElement0 = document.getElementById('arpaVariance0');
let arpaVarianceElement1 = document.getElementById('arpaVariance1');
let arpaVarianceElement2 = document.getElementById('arpaVariance2');
let arpaVarianceElement3 = document.getElementById('arpaVariance3');
let arpaVarianceElement4 = document.getElementById('arpaVariance4');
let arpaVarianceElement5 = document.getElementById('arpaVariance5');
let arpaVarianceElement6 = document.getElementById('arpaVariance6');
let arpaVarianceElement7 = document.getElementById('arpaVariance7');
let arpaVarianceElement8 = document.getElementById('arpaVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let arpaVariancePercentSumElement = document.getElementById('arpaVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let arpaMessageElement = document.getElementById('arpaMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let arpaLastPrice = null;
let arpaStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsArpa.onmessage = (event) => {
 // Convertir le message en objet JSON
 arpaStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let arpaCurrent1 ,arpaCurrent2, arpaCurrent3, arpaCurrent4, arpaCurrent5, arpaCurrent6, arpaCurrent7, arpaCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let arpaCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let arpaVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let arpaRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(arpaStockObject.p).toFixed(5);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let arpaStockPriceElement = document.getElementById('arpaValue' + (arpaCounter + 1));
 arpaStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 arpaStockPriceElement.style.color =
 !arpaLastPrice || arpaLastPrice === val
 ? 'black'
 : val > arpaLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 arpaLastPrice = val;
 // Réinitialiser l'objet du flux à null
 arpaStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let arpaCurrent = 'arpaCurrent' + (arpaCounter + 1);
 window[arpaCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (arpaCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[arpaCurrent] - window['arpaCurrent' + (arpaCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['arpaCurrent' + (arpaCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[arpaCurrent] < window['arpaCurrent' + (arpaCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[arpaCurrent] > window['arpaCurrent' + (arpaCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let arpaVarianceElement = document.getElementById('arpaVariance' + (arpaCounter - 1));
   arpaVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     arpaVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     arpaVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     arpaVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   arpaVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 arpaCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (arpaCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let arpaVariancePercentSum = parseFloat(arpaVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let arpaVariancePercentSumSymbol = "";
if (arpaVariancePercentSum > 0) {
  // Somme positive : symbole plus
  arpaVariancePercentSumSymbol = "+";
} else if (arpaVariancePercentSum < 0) {
  // Somme négative : symbole moinsarpa
  arpaVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
arpaVariancePercentSumElement.innerText = arpaVariancePercentSumSymbol + arpaVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (arpaVariancePercentSum < 0) {
 // Somme négative : rouge
 arpaVariancePercentSumElement.style.color = 'red';
} else if (arpaVariancePercentSum > 0) {
 // Somme positive : vert
 arpaVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 arpaVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(arpaVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(arpaVariancePercentArray); // stocker le résultat dans une variable

if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    arpaMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/ARPAUSDT?_from=markets' target='_blank'>ARPA</a>"; // insérer le lien sur ARPA et le message
    arpaMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    arpaMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/ARPAUSDT?_from=markets' target='_blank'>ARPA</a>"; // insérer le lien sur ARPA et le message
    arpaMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    arpaMessageElement.innerHTML =""; 
}

  
// Arrêter l'intervalle
clearInterval(arpaRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== XRP ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsXrp = new WebSocket('wss://stream.binance.com:9443/ws/xrpusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let xrpStockPriceElement0 = document.getElementById('xrpValue0');
let xrpStockPriceElement1 = document.getElementById('xrpValue1');
let xrpStockPriceElement2 = document.getElementById('xrpValue2');
let xrpStockPriceElement3 = document.getElementById('xrpValue3');
let xrpStockPriceElement4 = document.getElementById('xrpValue4');
let xrpStockPriceElement5 = document.getElementById('xrpValue5');
let xrpStockPriceElement6 = document.getElementById('xrpValue6');
let xrpStockPriceElement7 = document.getElementById('xrpValue7');
let xrpStockPriceElement8 = document.getElementById('xrpValue8');
let xrpStockPriceElement9 = document.getElementById('xrpValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let xrpVarianceElement0 = document.getElementById('xrpVariance0');
let xrpVarianceElement1 = document.getElementById('xrpVariance1');
let xrpVarianceElement2 = document.getElementById('xrpVariance2');
let xrpVarianceElement3 = document.getElementById('xrpVariance3');
let xrpVarianceElement4 = document.getElementById('xrpVariance4');
let xrpVarianceElement5 = document.getElementById('xrpVariance5');
let xrpVarianceElement6 = document.getElementById('xrpVariance6');
let xrpVarianceElement7 = document.getElementById('xrpVariance7');
let xrpVarianceElement8 = document.getElementById('xrpVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let xrpVariancePercentSumElement = document.getElementById('xrpVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let xrpMessageElement = document.getElementById('xrpMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let xrpLastPrice = null;
let xrpStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsXrp.onmessage = (event) => {
 // Convertir le message en objet JSON
 xrpStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let xrpCurrent1 ,xrpCurrent2, xrpCurrent3, xrpCurrent4, xrpCurrent5, xrpCurrent6, xrpCurrent7, xrpCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let xrpCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let xrpVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let xrpRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(xrpStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let xrpStockPriceElement = document.getElementById('xrpValue' + (xrpCounter + 1));
 xrpStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 xrpStockPriceElement.style.color =
 !xrpLastPrice || xrpLastPrice === val
 ? 'black'
 : val > xrpLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 xrpLastPrice = val;
 // Réinitialiser l'objet du flux à null
 xrpStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let xrpCurrent = 'xrpCurrent' + (xrpCounter + 1);
 window[xrpCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (xrpCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[xrpCurrent] - window['xrpCurrent' + (xrpCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['xrpCurrent' + (xrpCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[xrpCurrent] < window['xrpCurrent' + (xrpCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[xrpCurrent] > window['xrpCurrent' + (xrpCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let xrpVarianceElement = document.getElementById('xrpVariance' + (xrpCounter - 1));
   xrpVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     xrpVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     xrpVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     xrpVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   xrpVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 xrpCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (xrpCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let xrpVariancePercentSum = parseFloat(xrpVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let xrpVariancePercentSumSymbol = "";
if (xrpVariancePercentSum > 0) {
  // Somme positive : symbole plus
  xrpVariancePercentSumSymbol = "+";
} else if (xrpVariancePercentSum < 0) {
  // Somme négative : symbole moinsxrp
  xrpVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
xrpVariancePercentSumElement.innerText = xrpVariancePercentSumSymbol + xrpVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (xrpVariancePercentSum < 0) {
 // Somme négative : rouge
 xrpVariancePercentSumElement.style.color = 'red';
} else if (xrpVariancePercentSum > 0) {
 // Somme positive : vert
 xrpVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 xrpVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(xrpVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(xrpVariancePercentArray); // stocker le résultat dans une variable

if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    xrpMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/XRPUSDT?_from=markets' target='_blank'>XRP</a>"; // insérer le lien sur XRP et le message
    xrpMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    xrpMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/XRPUSDT?_from=markets' target='_blank'>XRP</a>"; // insérer le lien sur XRP et le message
    xrpMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    xrpMessageElement.innerHTML =""; 
}

  
// Arrêter l'intervalle
clearInterval(xrpRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== LINA ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsLina = new WebSocket('wss://stream.binance.com:9443/ws/linausdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let linaStockPriceElement0 = document.getElementById('linaValue0');
let linaStockPriceElement1 = document.getElementById('linaValue1');
let linaStockPriceElement2 = document.getElementById('linaValue2');
let linaStockPriceElement3 = document.getElementById('linaValue3');
let linaStockPriceElement4 = document.getElementById('linaValue4');
let linaStockPriceElement5 = document.getElementById('linaValue5');
let linaStockPriceElement6 = document.getElementById('linaValue6');
let linaStockPriceElement7 = document.getElementById('linaValue7');
let linaStockPriceElement8 = document.getElementById('linaValue8');
let linaStockPriceElement9 = document.getElementById('linaValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let linaVarianceElement0 = document.getElementById('linaVariance0');
let linaVarianceElement1 = document.getElementById('linaVariance1');
let linaVarianceElement2 = document.getElementById('linaVariance2');
let linaVarianceElement3 = document.getElementById('linaVariance3');
let linaVarianceElement4 = document.getElementById('linaVariance4');
let linaVarianceElement5 = document.getElementById('linaVariance5');
let linaVarianceElement6 = document.getElementById('linaVariance6');
let linaVarianceElement7 = document.getElementById('linaVariance7');
let linaVarianceElement8 = document.getElementById('linaVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let linaVariancePercentSumElement = document.getElementById('linaVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let linaMessageElement = document.getElementById('linaMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let linaLastPrice = null;
let linaStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsLina.onmessage = (event) => {
 // Convertir le message en objet JSON
 linaStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let linaCurrent1 ,linaCurrent2, linaCurrent3, linaCurrent4, linaCurrent5, linaCurrent6, linaCurrent7, linaCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let linaCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let linaVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let linaRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(linaStockObject.p).toFixed(5);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let linaStockPriceElement = document.getElementById('linaValue' + (linaCounter + 1));
 linaStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 linaStockPriceElement.style.color =
 !linaLastPrice || linaLastPrice === val
 ? 'black'
 : val > linaLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 linaLastPrice = val;
 // Réinitialiser l'objet du flux à null
 linaStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let linaCurrent = 'linaCurrent' + (linaCounter + 1);
 window[linaCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (linaCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[linaCurrent] - window['linaCurrent' + (linaCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['linaCurrent' + (linaCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[linaCurrent] < window['linaCurrent' + (linaCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[linaCurrent] > window['linaCurrent' + (linaCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let linaVarianceElement = document.getElementById('linaVariance' + (linaCounter - 1));
   linaVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     linaVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     linaVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     linaVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   linaVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 linaCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (linaCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let linaVariancePercentSum = parseFloat(linaVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let linaVariancePercentSumSymbol = "";
if (linaVariancePercentSum > 0) {
  // Somme positive : symbole plus
  linaVariancePercentSumSymbol = "+";
} else if (linaVariancePercentSum < 0) {
  // Somme négative : symbole moinslina
  linaVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
linaVariancePercentSumElement.innerText = linaVariancePercentSumSymbol + linaVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (linaVariancePercentSum < 0) {
 // Somme négative : rouge
 linaVariancePercentSumElement.style.color = 'red';
} else if (linaVariancePercentSum > 0) {
 // Somme positive : vert
 linaVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 linaVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(linaVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(linaVariancePercentArray); // stocker le résultat dans une variable

if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    linaMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/LINAUSDT?_from=markets' target='_blank'>LINA</a>"; // insérer le lien sur LINA et le message
    linaMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    linaMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/LINAUSDT?_from=markets' target='_blank'>LINA</a>"; // insérer le lien sur LINA et le message
    linaMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    linaMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(linaRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== DOGE ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsDoge = new WebSocket('wss://stream.binance.com:9443/ws/dogeusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du doge
let dogeStockPriceElement0 = document.getElementById('dogeValue0');
let dogeStockPriceElement1 = document.getElementById('dogeValue1');
let dogeStockPriceElement2 = document.getElementById('dogeValue2');
let dogeStockPriceElement3 = document.getElementById('dogeValue3');
let dogeStockPriceElement4 = document.getElementById('dogeValue4');
let dogeStockPriceElement5 = document.getElementById('dogeValue5');
let dogeStockPriceElement6 = document.getElementById('dogeValue6');
let dogeStockPriceElement7 = document.getElementById('dogeValue7');
let dogeStockPriceElement8 = document.getElementById('dogeValue8');
let dogeStockPriceElement9 = document.getElementById('dogeValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du doge
let dogeVarianceElement0 = document.getElementById('dogeVariance0');
let dogeVarianceElement1 = document.getElementById('dogeVariance1');
let dogeVarianceElement2 = document.getElementById('dogeVariance2');
let dogeVarianceElement3 = document.getElementById('dogeVariance3');
let dogeVarianceElement4 = document.getElementById('dogeVariance4');
let dogeVarianceElement5 = document.getElementById('dogeVariance5');
let dogeVarianceElement6 = document.getElementById('dogeVariance6');
let dogeVarianceElement7 = document.getElementById('dogeVariance7');
let dogeVarianceElement8 = document.getElementById('dogeVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du doge
let dogeVariancePercentSumElement = document.getElementById('dogeVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let dogeMessageElement = document.getElementById('dogeMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let dogeLastPrice = null;
let dogeStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsDoge.onmessage = (event) => {
 // Convertir le message en objet JSON
 dogeStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du doge à différents moments
let dogeCurrent1 ,dogeCurrent2, dogeCurrent3, dogeCurrent4, dogeCurrent5, dogeCurrent6, dogeCurrent7, dogeCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let dogeCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du doge
let dogeVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let dogeRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du doge à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(dogeStockObject.p).toFixed(5);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let dogeStockPriceElement = document.getElementById('dogeValue' + (dogeCounter + 1));
 dogeStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 dogeStockPriceElement.style.color =
 !dogeLastPrice || dogeLastPrice === val
 ? 'black'
 : val > dogeLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 dogeLastPrice = val;
 // Réinitialiser l'objet du flux à null
 dogeStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let dogeCurrent = 'dogeCurrent' + (dogeCounter + 1);
 window[dogeCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (dogeCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[dogeCurrent] - window['dogeCurrent' + (dogeCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['dogeCurrent' + (dogeCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[dogeCurrent] < window['dogeCurrent' + (dogeCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[dogeCurrent] > window['dogeCurrent' + (dogeCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let dogeVarianceElement = document.getElementById('dogeVariance' + (dogeCounter - 1));
   dogeVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     dogeVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     dogeVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     dogeVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   dogeVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 dogeCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (dogeCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let dogeVariancePercentSum = parseFloat(dogeVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let dogeVariancePercentSumSymbol = "";
if (dogeVariancePercentSum > 0) {
  // Somme positive : symbole plus
  dogeVariancePercentSumSymbol = "+";
} else if (dogeVariancePercentSum < 0) {
  // Somme négative : symbole moinsdoge
  dogeVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
dogeVariancePercentSumElement.innerText = dogeVariancePercentSumSymbol + dogeVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (dogeVariancePercentSum < 0) {
 // Somme négative : rouge
 dogeVariancePercentSumElement.style.color = 'red';
} else if (dogeVariancePercentSum > 0) {
 // Somme positive : vert
 dogeVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 dogeVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(dogeVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(dogeVariancePercentArray); // stocker le résultat dans une variable

if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    dogeMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/DOGEUSDT?_from=markets' target='_blank'>DOGE</a>"; // insérer le lien sur DOGE et le message
    dogeMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    dogeMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/DOGEUSDT?_from=markets' target='_blank'>DOGE</a>"; // insérer le lien sur DOGE et le message
    dogeMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    dogeMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(dogeRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== AGIX ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsAgix = new WebSocket('wss://stream.binance.com:9443/ws/agixusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du agix
let agixStockPriceElement0 = document.getElementById('agixValue0');
let agixStockPriceElement1 = document.getElementById('agixValue1');
let agixStockPriceElement2 = document.getElementById('agixValue2');
let agixStockPriceElement3 = document.getElementById('agixValue3');
let agixStockPriceElement4 = document.getElementById('agixValue4');
let agixStockPriceElement5 = document.getElementById('agixValue5');
let agixStockPriceElement6 = document.getElementById('agixValue6');
let agixStockPriceElement7 = document.getElementById('agixValue7');
let agixStockPriceElement8 = document.getElementById('agixValue8');
let agixStockPriceElement9 = document.getElementById('agixValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du agix
let agixVarianceElement0 = document.getElementById('agixVariance0');
let agixVarianceElement1 = document.getElementById('agixVariance1');
let agixVarianceElement2 = document.getElementById('agixVariance2');
let agixVarianceElement3 = document.getElementById('agixVariance3');
let agixVarianceElement4 = document.getElementById('agixVariance4');
let agixVarianceElement5 = document.getElementById('agixVariance5');
let agixVarianceElement6 = document.getElementById('agixVariance6');
let agixVarianceElement7 = document.getElementById('agixVariance7');
let agixVarianceElement8 = document.getElementById('agixVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du agix
let agixVariancePercentSumElement = document.getElementById('agixVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let agixMessageElement = document.getElementById('agixMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let agixLastPrice = null;
let agixStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsAgix.onmessage = (event) => {
 // Convertir le message en objet JSON
 agixStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du agix à différents moments
let agixCurrent1 ,agixCurrent2, agixCurrent3, agixCurrent4, agixCurrent5, agixCurrent6, agixCurrent7, agixCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let agixCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du agix
let agixVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let agixRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du agix à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(agixStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let agixStockPriceElement = document.getElementById('agixValue' + (agixCounter + 1));
 agixStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 agixStockPriceElement.style.color =
 !agixLastPrice || agixLastPrice === val
 ? 'black'
 : val > agixLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 agixLastPrice = val;
 // Réinitialiser l'objet du flux à null
 agixStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let agixCurrent = 'agixCurrent' + (agixCounter + 1);
 window[agixCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (agixCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[agixCurrent] - window['agixCurrent' + (agixCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['agixCurrent' + (agixCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[agixCurrent] < window['agixCurrent' + (agixCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[agixCurrent] > window['agixCurrent' + (agixCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let agixVarianceElement = document.getElementById('agixVariance' + (agixCounter - 1));
   agixVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     agixVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     agixVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     agixVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   agixVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 agixCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (agixCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let agixVariancePercentSum = parseFloat(agixVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let agixVariancePercentSumSymbol = "";
if (agixVariancePercentSum > 0) {
  // Somme positive : symbole plus
  agixVariancePercentSumSymbol = "+";
} else if (agixVariancePercentSum < 0) {
  // Somme négative : symbole moinsagix
  agixVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
agixVariancePercentSumElement.innerText = agixVariancePercentSumSymbol + agixVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (agixVariancePercentSum < 0) {
 // Somme négative : rouge
 agixVariancePercentSumElement.style.color = 'red';
} else if (agixVariancePercentSum > 0) {
 // Somme positive : vert
 agixVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 agixVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(agixVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(agixVariancePercentArray); // stocker le résultat dans une variable

if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    agixMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/AGIXUSDT?_from=markets' target='_blank'>AGIX</a>"; // insérer le lien sur AGIX et le message
    agixMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    agixMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/AGIXUSDT?_from=markets' target='_blank'>AGIX</a>"; // insérer le lien sur AGIX et le message
    agixMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    agixMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(agixRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== HIGH ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsHigh = new WebSocket('wss://stream.binance.com:9443/ws/highusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du high
let highStockPriceElement0 = document.getElementById('highValue0');
let highStockPriceElement1 = document.getElementById('highValue1');
let highStockPriceElement2 = document.getElementById('highValue2');
let highStockPriceElement3 = document.getElementById('highValue3');
let highStockPriceElement4 = document.getElementById('highValue4');
let highStockPriceElement5 = document.getElementById('highValue5');
let highStockPriceElement6 = document.getElementById('highValue6');
let highStockPriceElement7 = document.getElementById('highValue7');
let highStockPriceElement8 = document.getElementById('highValue8');
let highStockPriceElement9 = document.getElementById('highValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du high
let highVarianceElement0 = document.getElementById('highVariance0');
let highVarianceElement1 = document.getElementById('highVariance1');
let highVarianceElement2 = document.getElementById('highVariance2');
let highVarianceElement3 = document.getElementById('highVariance3');
let highVarianceElement4 = document.getElementById('highVariance4');
let highVarianceElement5 = document.getElementById('highVariance5');
let highVarianceElement6 = document.getElementById('highVariance6');
let highVarianceElement7 = document.getElementById('highVariance7');
let highVarianceElement8 = document.getElementById('highVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du high
let highVariancePercentSumElement = document.getElementById('highVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let highMessageElement = document.getElementById('highMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let highLastPrice = null;
let highStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsHigh.onmessage = (event) => {
 // Convertir le message en objet JSON
 highStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du high à différents moments
let highCurrent1 ,highCurrent2, highCurrent3, highCurrent4, highCurrent5, highCurrent6, highCurrent7, highCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let highCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du high
let highVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let highRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du high à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(highStockObject.p).toFixed(3);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let highStockPriceElement = document.getElementById('highValue' + (highCounter + 1));
 highStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 highStockPriceElement.style.color =
 !highLastPrice || highLastPrice === val
 ? 'black'
 : val > highLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 highLastPrice = val;
 // Réinitialiser l'objet du flux à null
 highStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let highCurrent = 'highCurrent' + (highCounter + 1);
 window[highCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (highCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[highCurrent] - window['highCurrent' + (highCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['highCurrent' + (highCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[highCurrent] < window['highCurrent' + (highCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[highCurrent] > window['highCurrent' + (highCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let highVarianceElement = document.getElementById('highVariance' + (highCounter - 1));
   highVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     highVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     highVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     highVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   highVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 highCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (highCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let highVariancePercentSum = parseFloat(highVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let highVariancePercentSumSymbol = "";
if (highVariancePercentSum > 0) {
  // Somme positive : symbole plus
  highVariancePercentSumSymbol = "+";
} else if (highVariancePercentSum < 0) {
  // Somme négative : symbole moinshigh
  highVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
highVariancePercentSumElement.innerText = highVariancePercentSumSymbol + highVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (highVariancePercentSum < 0) {
 // Somme négative : rouge
 highVariancePercentSumElement.style.color = 'red';
} else if (highVariancePercentSum > 0) {
 // Somme positive : vert
 highVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 highVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(highVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(highVariancePercentArray); // stocker le résultat dans une variable

if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    highMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/HIGHUSDT?_from=markets' target='_blank'>HIGH</a>"; // insérer le lien sur HIGH et le message
    highMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    highMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/HIGHUSDT?_from=markets' target='_blank'>HIGH</a>"; // insérer le lien sur HIGH et le message
    highMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    highMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(highRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== ARB ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsArb = new WebSocket('wss://stream.binance.com:9443/ws/arbusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du arb
let arbStockPriceElement0 = document.getElementById('arbValue0');
let arbStockPriceElement1 = document.getElementById('arbValue1');
let arbStockPriceElement2 = document.getElementById('arbValue2');
let arbStockPriceElement3 = document.getElementById('arbValue3');
let arbStockPriceElement4 = document.getElementById('arbValue4');
let arbStockPriceElement5 = document.getElementById('arbValue5');
let arbStockPriceElement6 = document.getElementById('arbValue6');
let arbStockPriceElement7 = document.getElementById('arbValue7');
let arbStockPriceElement8 = document.getElementById('arbValue8');
let arbStockPriceElement9 = document.getElementById('arbValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du arb
let arbVarianceElement0 = document.getElementById('arbVariance0');
let arbVarianceElement1 = document.getElementById('arbVariance1');
let arbVarianceElement2 = document.getElementById('arbVariance2');
let arbVarianceElement3 = document.getElementById('arbVariance3');
let arbVarianceElement4 = document.getElementById('arbVariance4');
let arbVarianceElement5 = document.getElementById('arbVariance5');
let arbVarianceElement6 = document.getElementById('arbVariance6');
let arbVarianceElement7 = document.getElementById('arbVariance7');
let arbVarianceElement8 = document.getElementById('arbVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du arb
let arbVariancePercentSumElement = document.getElementById('arbVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let arbMessageElement = document.getElementById('arbMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let arbLastPrice = null;
let arbStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsArb.onmessage = (event) => {
 // Convertir le message en objet JSON
 arbStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du arb à différents moments
let arbCurrent1 ,arbCurrent2, arbCurrent3, arbCurrent4, arbCurrent5, arbCurrent6, arbCurrent7, arbCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let arbCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du arb
let arbVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let arbRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du arb à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(arbStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let arbStockPriceElement = document.getElementById('arbValue' + (arbCounter + 1));
 arbStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 arbStockPriceElement.style.color =
 !arbLastPrice || arbLastPrice === val
 ? 'black'
 : val > arbLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 arbLastPrice = val;
 // Réinitialiser l'objet du flux à null
 arbStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let arbCurrent = 'arbCurrent' + (arbCounter + 1);
 window[arbCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (arbCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[arbCurrent] - window['arbCurrent' + (arbCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['arbCurrent' + (arbCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[arbCurrent] < window['arbCurrent' + (arbCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[arbCurrent] > window['arbCurrent' + (arbCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let arbVarianceElement = document.getElementById('arbVariance' + (arbCounter - 1));
   arbVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     arbVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     arbVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     arbVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   arbVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 arbCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (arbCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let arbVariancePercentSum = parseFloat(arbVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let arbVariancePercentSumSymbol = "";
if (arbVariancePercentSum > 0) {
  // Somme positive : symbole plus
  arbVariancePercentSumSymbol = "+";
} else if (arbVariancePercentSum < 0) {
  // Somme négative : symbole moinsarb
  arbVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
arbVariancePercentSumElement.innerText = arbVariancePercentSumSymbol + arbVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (arbVariancePercentSum < 0) {
 // Somme négative : rouge
 arbVariancePercentSumElement.style.color = 'red';
} else if (arbVariancePercentSum > 0) {
 // Somme positive : vert
 arbVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 arbVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(arbVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(arbVariancePercentArray); // stocker le résultat dans une variable

if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    arbMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/ARBUSDT?_from=markets' target='_blank'>ARB</a>"; // insérer le lien sur ARB et le message
    arbMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    arbMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/ARBUSDT?_from=markets' target='_blank'>ARB</a>"; // insérer le lien sur ARB et le message
    arbMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    arbMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(arbRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== CFX ==================================================== **** // 
  
  // Créer un objet WebSocket pour se connecter au flux de données de Binance
  let wsCfx = new WebSocket('wss://stream.binance.com:9443/ws/cfxusdt@trade');
  
  // Sélectionner les éléments HTML où afficher le prix du cfx
  let cfxStockPriceElement0 = document.getElementById('cfxValue0');
  let cfxStockPriceElement1 = document.getElementById('cfxValue1');
  let cfxStockPriceElement2 = document.getElementById('cfxValue2');
  let cfxStockPriceElement3 = document.getElementById('cfxValue3');
  let cfxStockPriceElement4 = document.getElementById('cfxValue4');
  let cfxStockPriceElement5 = document.getElementById('cfxValue5');
  let cfxStockPriceElement6 = document.getElementById('cfxValue6');
  let cfxStockPriceElement7 = document.getElementById('cfxValue7');
  let cfxStockPriceElement8 = document.getElementById('cfxValue8');
  let cfxStockPriceElement9 = document.getElementById('cfxValue9');
  
  
  // Sélectionner les éléments HTML où afficher la variation absolue du cfx
  let cfxVarianceElement0 = document.getElementById('cfxVariance0');
  let cfxVarianceElement1 = document.getElementById('cfxVariance1');
  let cfxVarianceElement2 = document.getElementById('cfxVariance2');
  let cfxVarianceElement3 = document.getElementById('cfxVariance3');
  let cfxVarianceElement4 = document.getElementById('cfxVariance4');
  let cfxVarianceElement5 = document.getElementById('cfxVariance5');
  let cfxVarianceElement6 = document.getElementById('cfxVariance6');
  let cfxVarianceElement7 = document.getElementById('cfxVariance7');
  let cfxVarianceElement8 = document.getElementById('cfxVariance8');
  
  // Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du cfx
  let cfxVariancePercentSumElement = document.getElementById('cfxVariancePercentSum');
  
  // Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
  let cfxMessageElement = document.getElementById('cfxMessageCoin');
  
  // Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
  let cfxLastPrice = null;
  let cfxStockObject = null;
  
  // Définir une fonction pour gérer les messages reçus du flux
  wsCfx.onmessage = (event) => {
   // Convertir le message en objet JSON
   cfxStockObject = JSON.parse(event.data);
  };
  
  // Déclarer des variables pour stocker les valeurs du cfx à différents moments
  let cfxCurrent1 ,cfxCurrent2, cfxCurrent3, cfxCurrent4, cfxCurrent5, cfxCurrent6, cfxCurrent7, cfxCurrent8 = 0;
  
  // Déclarer une variable pour compter le nombre de fois que le code s'exécute
  let cfxCounter = 0;
  
  // Déclarer un tableau vide pour stocker les variations en pourcentage du cfx
  let cfxVariancePercentArray = [];
  
  // Définir un intervalle pour exécuter le code toutes les minutes
  let cfxRunTimers = setInterval(() => {
   // Obtenir les minutes actuelles
   let minutes = new Date().getMinutes();
   
   // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
   if (minutes % 15 === 0) {
   // Obtenir la valeur du cfx à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
   let val = parseFloat(cfxStockObject.p).toFixed(4);
   // Afficher la valeur dans l'élément HTML correspondant au compteur
   let cfxStockPriceElement = document.getElementById('cfxValue' + (cfxCounter + 1));
   cfxStockPriceElement.innerText = val;
   // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
   cfxStockPriceElement.style.color =
   !cfxLastPrice || cfxLastPrice === val
   ? 'black'
   : val > cfxLastPrice
   ? '#AAFF00'
   : 'red';
   // Mettre à jour le dernier prix avec la valeur actuelle
   cfxLastPrice = val;
   // Réinitialiser l'objet du flux à null
   cfxStockObject = null;
   // Stocker la valeur actuelle dans la variable correspondante
   let cfxCurrent = 'cfxCurrent' + (cfxCounter + 1);
   window[cfxCurrent] = val;
   
   // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
   if (cfxCounter > 0) {
     // Calculer la variation absolue entre la valeur actuelle et la précédente
     let variance = Math.abs(window[cfxCurrent] - window['cfxCurrent' + (cfxCounter)]);
     // Formater la variation à deux décimales
     variance = variance.toFixed(2);
     // Diviser la variation par la valeur initiale et multiplier par 100
     let variancePercent = (variance / window['cfxCurrent' + (cfxCounter)]) * 100;
     // Formater la variation en pourcentage à deux décimales
     variancePercent = variancePercent.toFixed(2);
     // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
     if (window[cfxCurrent] < window['cfxCurrent' + (cfxCounter)]) {
       // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
       variancePercent = "-" + variancePercent;
     } else if (window[cfxCurrent] > window['cfxCurrent' + (cfxCounter)]) {
       // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
       variancePercent = "+" + variancePercent;
     } else {
       // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
       variancePercent = "0";
     }
     // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
     let cfxVarianceElement = document.getElementById('cfxVariance' + (cfxCounter - 1));
     cfxVarianceElement.innerText = variancePercent + "%";
     // Changer la couleur du texte en fonction de la valeur de la variation
     if (variancePercent < 0) {
       // Variation négative : rouge
       cfxVarianceElement.style.color = 'red';
     } else if (variancePercent > 0) {
       // Variation positive : vert
       cfxVarianceElement.style.color = 'green';
     } else {
       // Variation nulle : bleu
       cfxVarianceElement.style.color = 'blue';
     }
     
     // Ajouter la variation au tableau des variations en pourcentage
     cfxVariancePercentArray.push (parseFloat(variancePercent));
   }
   
   // Augmenter le compteur de 1
   cfxCounter++;
   }
  
   // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
   if (cfxCounter === 9) {
   
  // Utiliser reduce pour calculer la somme des variations en pourcentage
  let cfxVariancePercentSum = parseFloat(cfxVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
   
  // Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
  let cfxVariancePercentSumSymbol = "";
  if (cfxVariancePercentSum > 0) {
    // Somme positive : symbole plus
    cfxVariancePercentSumSymbol = "+";
  } else if (cfxVariancePercentSum < 0) {
    // Somme négative : symbole moinscfx
    cfxVariancePercentSumSymbol = "-";
  }
  
  // Afficher la somme avec le symbole dans l'élément HTML correspondant 
  cfxVariancePercentSumElement.innerText = cfxVariancePercentSumSymbol + cfxVariancePercentSum + "%";
  
  // Changer la couleur du texte en fonction de la valeur de la somme
  if (cfxVariancePercentSum < 0) {
   // Somme négative : rouge
   cfxVariancePercentSumElement.style.color = 'red';
  } else if (cfxVariancePercentSum > 0) {
   // Somme positive : vert
   cfxVariancePercentSumElement.style.color = 'green';
  } else {
   // Somme nulle : bleu
   cfxVariancePercentSumElement.style.color = 'blue';
  }
  
// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(cfxVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(cfxVariancePercentArray); // stocker le résultat dans une variable


if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    cfxMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/CFXUSDT?_from=markets' target='_blank'>CFX</a>"; // insérer le lien sur CFX et le message
    cfxMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    cfxMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/CFXUSDT?_from=markets' target='_blank'>CFX</a>"; // insérer le lien sur CFX et le message
    cfxMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    cfxMessageElement.innerHTML =""; 
}
    
  // Arrêter l'intervalle
  clearInterval(cfxRunTimers);
  }
  }, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes
  
  
  // **** =================================================================================================================== **** //

  // **** ==================================================== SOL ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsSol = new WebSocket('wss://stream.binance.com:9443/ws/solusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let solStockPriceElement0 = document.getElementById('solValue0');
let solStockPriceElement1 = document.getElementById('solValue1');
let solStockPriceElement2 = document.getElementById('solValue2');
let solStockPriceElement3 = document.getElementById('solValue3');
let solStockPriceElement4 = document.getElementById('solValue4');
let solStockPriceElement5 = document.getElementById('solValue5');
let solStockPriceElement6 = document.getElementById('solValue6');
let solStockPriceElement7 = document.getElementById('solValue7');
let solStockPriceElement8 = document.getElementById('solValue8');
let solStockPriceElement9 = document.getElementById('solValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let solVarianceElement0 = document.getElementById('solVariance0');
let solVarianceElement1 = document.getElementById('solVariance1');
let solVarianceElement2 = document.getElementById('solVariance2');
let solVarianceElement3 = document.getElementById('solVariance3');
let solVarianceElement4 = document.getElementById('solVariance4');
let solVarianceElement5 = document.getElementById('solVariance5');
let solVarianceElement6 = document.getElementById('solVariance6');
let solVarianceElement7 = document.getElementById('solVariance7');
let solVarianceElement8 = document.getElementById('solVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let solVariancePercentSumElement = document.getElementById('solVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let solMessageElement = document.getElementById('solMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let solLastPrice = null;
let solStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsSol.onmessage = (event) => {
 // Convertir le message en objet JSON
 solStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let solCurrent1 ,solCurrent2, solCurrent3, solCurrent4, solCurrent5, solCurrent6, solCurrent7, solCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let solCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let solVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let solRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(solStockObject.p).toFixed(3);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let solStockPriceElement = document.getElementById('solValue' + (solCounter + 1));
 solStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 solStockPriceElement.style.color =
 !solLastPrice || solLastPrice === val
 ? 'black'
 : val > solLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 solLastPrice = val;
 // Réinitialiser l'objet du flux à null
 solStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let solCurrent = 'solCurrent' + (solCounter + 1);
 window[solCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (solCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[solCurrent] - window['solCurrent' + (solCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['solCurrent' + (solCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[solCurrent] < window['solCurrent' + (solCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[solCurrent] > window['solCurrent' + (solCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let solVarianceElement = document.getElementById('solVariance' + (solCounter - 1));
   solVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     solVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     solVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     solVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   solVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 solCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (solCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let solVariancePercentSum = parseFloat(solVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let solVariancePercentSumSymbol = "";
if (solVariancePercentSum > 0) {
  // Somme positive : symbole plus
  solVariancePercentSumSymbol = "+";
} else if (solVariancePercentSum < 0) {
  // Somme négative : symbole moinssol
  solVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
solVariancePercentSumElement.innerText = solVariancePercentSumSymbol + solVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (solVariancePercentSum < 0) {
 // Somme négative : rouge
 solVariancePercentSumElement.style.color = 'red';
} else if (solVariancePercentSum > 0) {
 // Somme positive : vert
 solVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 solVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(solVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(solVariancePercentArray); // stocker le résultat dans une variable


if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    solMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/SOLUSDT?_from=markets' target='_blank'>SOL</a>"; // insérer le lien sur SOL et le message
    solMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    solMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/SOLUSDT?_from=markets' target='_blank'>SOL</a>"; // insérer le lien sur SOL et le message
    solMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    solMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(solRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== MASK ==================================================== **** // 


// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsMask = new WebSocket('wss://stream.binance.com:9443/ws/maskusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let maskStockPriceElement0 = document.getElementById('maskValue0');
let maskStockPriceElement1 = document.getElementById('maskValue1');
let maskStockPriceElement2 = document.getElementById('maskValue2');
let maskStockPriceElement3 = document.getElementById('maskValue3');
let maskStockPriceElement4 = document.getElementById('maskValue4');
let maskStockPriceElement5 = document.getElementById('maskValue5');
let maskStockPriceElement6 = document.getElementById('maskValue6');
let maskStockPriceElement7 = document.getElementById('maskValue7');
let maskStockPriceElement8 = document.getElementById('maskValue8');
let maskStockPriceElement9 = document.getElementById('maskValue9');


// Sélectionner les éléments HTML où afficher la variation abmaskue du bitcoin
let maskVarianceElement0 = document.getElementById('maskVariance0');
let maskVarianceElement1 = document.getElementById('maskVariance1');
let maskVarianceElement2 = document.getElementById('maskVariance2');
let maskVarianceElement3 = document.getElementById('maskVariance3');
let maskVarianceElement4 = document.getElementById('maskVariance4');
let maskVarianceElement5 = document.getElementById('maskVariance5');
let maskVarianceElement6 = document.getElementById('maskVariance6');
let maskVarianceElement7 = document.getElementById('maskVariance7');
let maskVarianceElement8 = document.getElementById('maskVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let maskVariancePercentSumElement = document.getElementById('maskVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let maskMessageElement = document.getElementById('maskMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let maskLastPrice = null;
let maskStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsMask.onmessage = (event) => {
 // Convertir le message en objet JSON
 maskStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let maskCurrent1 ,maskCurrent2, maskCurrent3, maskCurrent4, maskCurrent5, maskCurrent6, maskCurrent7, maskCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let maskCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let maskVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let maskRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(maskStockObject.p).toFixed(3);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let maskStockPriceElement = document.getElementById('maskValue' + (maskCounter + 1));
 maskStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 maskStockPriceElement.style.color =
 !maskLastPrice || maskLastPrice === val
 ? 'black'
 : val > maskLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 maskLastPrice = val;
 // Réinitialiser l'objet du flux à null
 maskStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let maskCurrent = 'maskCurrent' + (maskCounter + 1);
 window[maskCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (maskCounter > 0) {
   // Calculer la variation abmaskue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[maskCurrent] - window['maskCurrent' + (maskCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['maskCurrent' + (maskCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[maskCurrent] < window['maskCurrent' + (maskCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[maskCurrent] > window['maskCurrent' + (maskCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let maskVarianceElement = document.getElementById('maskVariance' + (maskCounter - 1));
   maskVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     maskVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     maskVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     maskVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   maskVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 maskCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (maskCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let maskVariancePercentSum = parseFloat(maskVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let maskVariancePercentSumSymbol = "";
if (maskVariancePercentSum > 0) {
  // Somme positive : symbole plus
  maskVariancePercentSumSymbol = "+";
} else if (maskVariancePercentSum < 0) {
  // Somme négative : symbole moinsmask
  maskVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
maskVariancePercentSumElement.innerText = maskVariancePercentSumSymbol + maskVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (maskVariancePercentSum < 0) {
 // Somme négative : rouge
 maskVariancePercentSumElement.style.color = 'red';
} else if (maskVariancePercentSum > 0) {
 // Somme positive : vert
 maskVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 maskVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(maskVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(maskVariancePercentArray); // stocker le résultat dans une variable


if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    maskMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/MASKUSDT?_from=markets' target='_blank'>MASK</a>"; // insérer le lien sur MASK et le message
    maskMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    maskMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/MASKUSDT?_from=markets' target='_blank'>MASK</a>"; // insérer le lien sur MASK et le message
    maskMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    maskMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(maskRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //


// **** ==================================================== LTC ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsLtc = new WebSocket('wss://stream.binance.com:9443/ws/ltcusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let ltcStockPriceElement0 = document.getElementById('ltcValue0');
let ltcStockPriceElement1 = document.getElementById('ltcValue1');
let ltcStockPriceElement2 = document.getElementById('ltcValue2');
let ltcStockPriceElement3 = document.getElementById('ltcValue3');
let ltcStockPriceElement4 = document.getElementById('ltcValue4');
let ltcStockPriceElement5 = document.getElementById('ltcValue5');
let ltcStockPriceElement6 = document.getElementById('ltcValue6');
let ltcStockPriceElement7 = document.getElementById('ltcValue7');
let ltcStockPriceElement8 = document.getElementById('ltcValue8');
let ltcStockPriceElement9 = document.getElementById('ltcValue9');


// Sélectionner les éléments HTML où afficher la variation abltcue du bitcoin
let ltcVarianceElement0 = document.getElementById('ltcVariance0');
let ltcVarianceElement1 = document.getElementById('ltcVariance1');
let ltcVarianceElement2 = document.getElementById('ltcVariance2');
let ltcVarianceElement3 = document.getElementById('ltcVariance3');
let ltcVarianceElement4 = document.getElementById('ltcVariance4');
let ltcVarianceElement5 = document.getElementById('ltcVariance5');
let ltcVarianceElement6 = document.getElementById('ltcVariance6');
let ltcVarianceElement7 = document.getElementById('ltcVariance7');
let ltcVarianceElement8 = document.getElementById('ltcVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let ltcVariancePercentSumElement = document.getElementById('ltcVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let ltcMessageElement = document.getElementById('ltcMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let ltcLastPrice = null;
let ltcStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsLtc.onmessage = (event) => {
 // Convertir le message en objet JSON
 ltcStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let ltcCurrent1 ,ltcCurrent2, ltcCurrent3, ltcCurrent4, ltcCurrent5, ltcCurrent6, ltcCurrent7, ltcCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let ltcCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let ltcVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let ltcRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(ltcStockObject.p).toFixed(2);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let ltcStockPriceElement = document.getElementById('ltcValue' + (ltcCounter + 1));
 ltcStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 ltcStockPriceElement.style.color =
 !ltcLastPrice || ltcLastPrice === val
 ? 'black'
 : val > ltcLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 ltcLastPrice = val;
 // Réinitialiser l'objet du flux à null
 ltcStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let ltcCurrent = 'ltcCurrent' + (ltcCounter + 1);
 window[ltcCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (ltcCounter > 0) {
   // Calculer la variation abltcue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[ltcCurrent] - window['ltcCurrent' + (ltcCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['ltcCurrent' + (ltcCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[ltcCurrent] < window['ltcCurrent' + (ltcCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[ltcCurrent] > window['ltcCurrent' + (ltcCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let ltcVarianceElement = document.getElementById('ltcVariance' + (ltcCounter - 1));
   ltcVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     ltcVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     ltcVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     ltcVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   ltcVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 ltcCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (ltcCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let ltcVariancePercentSum = parseFloat(ltcVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let ltcVariancePercentSumSymbol = "";
if (ltcVariancePercentSum > 0) {
  // Somme positive : symbole plus
  ltcVariancePercentSumSymbol = "+";
} else if (ltcVariancePercentSum < 0) {
  // Somme négative : symbole moinsltc
  ltcVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
ltcVariancePercentSumElement.innerText = ltcVariancePercentSumSymbol + ltcVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (ltcVariancePercentSum < 0) {
 // Somme négative : rouge
 ltcVariancePercentSumElement.style.color = 'red';
} else if (ltcVariancePercentSum > 0) {
 // Somme positive : vert
 ltcVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 ltcVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(ltcVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(ltcVariancePercentArray); // stocker le résultat dans une variable


if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    ltcMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/LTCUSDT?_from=markets' target='_blank'>LTC</a>"; // insérer le lien sur LTC et le message
    ltcMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    ltcMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/LTCUSDT?_from=markets' target='_blank'>LTC</a>"; // insérer le lien sur LTC et le message
    ltcMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    ltcMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(ltcRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== NEO ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsNeo = new WebSocket('wss://stream.binance.com:9443/ws/neousdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let neoStockPriceElement0 = document.getElementById('neoValue0');
let neoStockPriceElement1 = document.getElementById('neoValue1');
let neoStockPriceElement2 = document.getElementById('neoValue2');
let neoStockPriceElement3 = document.getElementById('neoValue3');
let neoStockPriceElement4 = document.getElementById('neoValue4');
let neoStockPriceElement5 = document.getElementById('neoValue5');
let neoStockPriceElement6 = document.getElementById('neoValue6');
let neoStockPriceElement7 = document.getElementById('neoValue7');
let neoStockPriceElement8 = document.getElementById('neoValue8');
let neoStockPriceElement9 = document.getElementById('neoValue9');


// Sélectionner les éléments HTML où afficher la variation abneoue du bitcoin
let neoVarianceElement0 = document.getElementById('neoVariance0');
let neoVarianceElement1 = document.getElementById('neoVariance1');
let neoVarianceElement2 = document.getElementById('neoVariance2');
let neoVarianceElement3 = document.getElementById('neoVariance3');
let neoVarianceElement4 = document.getElementById('neoVariance4');
let neoVarianceElement5 = document.getElementById('neoVariance5');
let neoVarianceElement6 = document.getElementById('neoVariance6');
let neoVarianceElement7 = document.getElementById('neoVariance7');
let neoVarianceElement8 = document.getElementById('neoVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let neoVariancePercentSumElement = document.getElementById('neoVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let neoMessageElement = document.getElementById('neoMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let neoLastPrice = null;
let neoStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsNeo.onmessage = (event) => {
 // Convertir le message en objet JSON
 neoStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let neoCurrent1 ,neoCurrent2, neoCurrent3, neoCurrent4, neoCurrent5, neoCurrent6, neoCurrent7, neoCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let neoCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let neoVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let neoRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(neoStockObject.p).toFixed(5);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let neoStockPriceElement = document.getElementById('neoValue' + (neoCounter + 1));
 neoStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 neoStockPriceElement.style.color =
 !neoLastPrice || neoLastPrice === val
 ? 'black'
 : val > neoLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 neoLastPrice = val;
 // Réinitialiser l'objet du flux à null
 neoStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let neoCurrent = 'neoCurrent' + (neoCounter + 1);
 window[neoCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (neoCounter > 0) {
   // Calculer la variation abneoue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[neoCurrent] - window['neoCurrent' + (neoCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(3);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['neoCurrent' + (neoCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[neoCurrent] < window['neoCurrent' + (neoCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[neoCurrent] > window['neoCurrent' + (neoCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let neoVarianceElement = document.getElementById('neoVariance' + (neoCounter - 1));
   neoVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     neoVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     neoVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     neoVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   neoVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 neoCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (neoCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let neoVariancePercentSum = parseFloat(neoVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let neoVariancePercentSumSymbol = "";
if (neoVariancePercentSum > 0) {
  // Somme positive : symbole plus
  neoVariancePercentSumSymbol = "+";
} else if (neoVariancePercentSum < 0) {
  // Somme négative : symbole moinsneo
  neoVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
neoVariancePercentSumElement.innerText = neoVariancePercentSumSymbol + neoVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (neoVariancePercentSum < 0) {
 // Somme négative : rouge
 neoVariancePercentSumElement.style.color = 'red';
} else if (neoVariancePercentSum > 0) {
 // Somme positive : vert
 neoVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 neoVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(neoVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(neoVariancePercentArray); // stocker le résultat dans une variable

if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    neoMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/NEOUSDT?_from=markets' target='_blank'>NEO</a>"; // insérer le lien sur NEO et le message
    neoMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    neoMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/NEOUSDT?_from=markets' target='_blank'>NEO</a>"; // insérer le lien sur NEO et le message
    neoMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    neoMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(neoRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== RNDR ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsRndr = new WebSocket('wss://stream.binance.com:9443/ws/rndrusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let rndrStockPriceElement0 = document.getElementById('rndrValue0');
let rndrStockPriceElement1 = document.getElementById('rndrValue1');
let rndrStockPriceElement2 = document.getElementById('rndrValue2');
let rndrStockPriceElement3 = document.getElementById('rndrValue3');
let rndrStockPriceElement4 = document.getElementById('rndrValue4');
let rndrStockPriceElement5 = document.getElementById('rndrValue5');
let rndrStockPriceElement6 = document.getElementById('rndrValue6');
let rndrStockPriceElement7 = document.getElementById('rndrValue7');
let rndrStockPriceElement8 = document.getElementById('rndrValue8');
let rndrStockPriceElement9 = document.getElementById('rndrValue9');


// Sélectionner les éléments HTML où afficher la variation abrndrue du bitcoin
let rndrVarianceElement0 = document.getElementById('rndrVariance0');
let rndrVarianceElement1 = document.getElementById('rndrVariance1');
let rndrVarianceElement2 = document.getElementById('rndrVariance2');
let rndrVarianceElement3 = document.getElementById('rndrVariance3');
let rndrVarianceElement4 = document.getElementById('rndrVariance4');
let rndrVarianceElement5 = document.getElementById('rndrVariance5');
let rndrVarianceElement6 = document.getElementById('rndrVariance6');
let rndrVarianceElement7 = document.getElementById('rndrVariance7');
let rndrVarianceElement8 = document.getElementById('rndrVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let rndrVariancePercentSumElement = document.getElementById('rndrVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let rndrMessageElement = document.getElementById('rndrMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let rndrLastPrice = null;
let rndrStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsRndr.onmessage = (event) => {
 // Convertir le message en objet JSON
 rndrStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let rndrCurrent1 ,rndrCurrent2, rndrCurrent3, rndrCurrent4, rndrCurrent5, rndrCurrent6, rndrCurrent7, rndrCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let rndrCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let rndrVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let rndrRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(rndrStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let rndrStockPriceElement = document.getElementById('rndrValue' + (rndrCounter + 1));
 rndrStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 rndrStockPriceElement.style.color =
 !rndrLastPrice || rndrLastPrice === val
 ? 'black'
 : val > rndrLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 rndrLastPrice = val;
 // Réinitialiser l'objet du flux à null
 rndrStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let rndrCurrent = 'rndrCurrent' + (rndrCounter + 1);
 window[rndrCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (rndrCounter > 0) {
   // Calculer la variation abrndrue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[rndrCurrent] - window['rndrCurrent' + (rndrCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['rndrCurrent' + (rndrCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[rndrCurrent] < window['rndrCurrent' + (rndrCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[rndrCurrent] > window['rndrCurrent' + (rndrCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let rndrVarianceElement = document.getElementById('rndrVariance' + (rndrCounter - 1));
   rndrVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     rndrVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     rndrVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     rndrVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   rndrVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 rndrCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (rndrCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let rndrVariancePercentSum = parseFloat(rndrVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let rndrVariancePercentSumSymbol = "";
if (rndrVariancePercentSum > 0) {
  // Somme positive : symbole plus
  rndrVariancePercentSumSymbol = "+";
} else if (rndrVariancePercentSum < 0) {
  // Somme négative : symbole moinsrndr
  rndrVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
rndrVariancePercentSumElement.innerText = rndrVariancePercentSumSymbol + rndrVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (rndrVariancePercentSum < 0) {
 // Somme négative : rouge
 rndrVariancePercentSumElement.style.color = 'red';
} else if (rndrVariancePercentSum > 0) {
 // Somme positive : vert
 rndrVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 rndrVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(rndrVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(rndrVariancePercentArray); // stocker le résultat dans une variable


if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    rndrMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/RNDRUSDT?_from=markets' target='_blank'>RNDR</a>"; // insérer le lien sur RNDR et le message
    rndrMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    rndrMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/RNDRUSDT?_from=markets' target='_blank'>RNDR</a>"; // insérer le lien sur RNDR et le message
    rndrMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    rndrMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(rndrRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== BEL ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsBel = new WebSocket('wss://stream.binance.com:9443/ws/belusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let belStockPriceElement0 = document.getElementById('belValue0');
let belStockPriceElement1 = document.getElementById('belValue1');
let belStockPriceElement2 = document.getElementById('belValue2');
let belStockPriceElement3 = document.getElementById('belValue3');
let belStockPriceElement4 = document.getElementById('belValue4');
let belStockPriceElement5 = document.getElementById('belValue5');
let belStockPriceElement6 = document.getElementById('belValue6');
let belStockPriceElement7 = document.getElementById('belValue7');
let belStockPriceElement8 = document.getElementById('belValue8');
let belStockPriceElement9 = document.getElementById('belValue9');


// Sélectionner les éléments HTML où afficher la variation abbelue du bitcoin
let belVarianceElement0 = document.getElementById('belVariance0');
let belVarianceElement1 = document.getElementById('belVariance1');
let belVarianceElement2 = document.getElementById('belVariance2');
let belVarianceElement3 = document.getElementById('belVariance3');
let belVarianceElement4 = document.getElementById('belVariance4');
let belVarianceElement5 = document.getElementById('belVariance5');
let belVarianceElement6 = document.getElementById('belVariance6');
let belVarianceElement7 = document.getElementById('belVariance7');
let belVarianceElement8 = document.getElementById('belVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let belVariancePercentSumElement = document.getElementById('belVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let belMessageElement = document.getElementById('belMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let belLastPrice = null;
let belStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsBel.onmessage = (event) => {
 // Convertir le message en objet JSON
 belStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let belCurrent1 ,belCurrent2, belCurrent3, belCurrent4, belCurrent5, belCurrent6, belCurrent7, belCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let belCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let belVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let belRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(belStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let belStockPriceElement = document.getElementById('belValue' + (belCounter + 1));
 belStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 belStockPriceElement.style.color =
 !belLastPrice || belLastPrice === val
 ? 'black'
 : val > belLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 belLastPrice = val;
 // Réinitialiser l'objet du flux à null
 belStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let belCurrent = 'belCurrent' + (belCounter + 1);
 window[belCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (belCounter > 0) {
   // Calculer la variation abbelue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[belCurrent] - window['belCurrent' + (belCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['belCurrent' + (belCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[belCurrent] < window['belCurrent' + (belCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[belCurrent] > window['belCurrent' + (belCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let belVarianceElement = document.getElementById('belVariance' + (belCounter - 1));
   belVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     belVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     belVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     belVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   belVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 belCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (belCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let belVariancePercentSum = parseFloat(belVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let belVariancePercentSumSymbol = "";
if (belVariancePercentSum > 0) {
  // Somme positive : symbole plus
  belVariancePercentSumSymbol = "+";
} else if (belVariancePercentSum < 0) {
  // Somme négative : symbole moinsbel
  belVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
belVariancePercentSumElement.innerText = belVariancePercentSumSymbol + belVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (belVariancePercentSum < 0) {
 // Somme négative : rouge
 belVariancePercentSumElement.style.color = 'red';
} else if (belVariancePercentSum > 0) {
 // Somme positive : vert
 belVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 belVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(belVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(belVariancePercentArray); // stocker le résultat dans une variable

if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    belMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/BELUSDT?_from=markets' target='_blank'>BEL</a>"; // insérer le lien sur BEL et le message
    belMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    belMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/BELUSDT?_from=markets' target='_blank'>BEL</a>"; // insérer le lien sur BEL et le message
    belMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    belMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(belRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //


// **** ==================================================== EOS ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsEos = new WebSocket('wss://stream.binance.com:9443/ws/eosusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let eosStockPriceElement0 = document.getElementById('eosValue0');
let eosStockPriceElement1 = document.getElementById('eosValue1');
let eosStockPriceElement2 = document.getElementById('eosValue2');
let eosStockPriceElement3 = document.getElementById('eosValue3');
let eosStockPriceElement4 = document.getElementById('eosValue4');
let eosStockPriceElement5 = document.getElementById('eosValue5');
let eosStockPriceElement6 = document.getElementById('eosValue6');
let eosStockPriceElement7 = document.getElementById('eosValue7');
let eosStockPriceElement8 = document.getElementById('eosValue8');
let eosStockPriceElement9 = document.getElementById('eosValue9');


// Sélectionner les éléments HTML où afficher la variation abeosue du bitcoin
let eosVarianceElement0 = document.getElementById('eosVariance0');
let eosVarianceElement1 = document.getElementById('eosVariance1');
let eosVarianceElement2 = document.getElementById('eosVariance2');
let eosVarianceElement3 = document.getElementById('eosVariance3');
let eosVarianceElement4 = document.getElementById('eosVariance4');
let eosVarianceElement5 = document.getElementById('eosVariance5');
let eosVarianceElement6 = document.getElementById('eosVariance6');
let eosVarianceElement7 = document.getElementById('eosVariance7');
let eosVarianceElement8 = document.getElementById('eosVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let eosVariancePercentSumElement = document.getElementById('eosVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let eosMessageElement = document.getElementById('eosMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let eosLastPrice = null;
let eosStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsEos.onmessage = (event) => {
 // Convertir le message en objet JSON
 eosStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let eosCurrent1 ,eosCurrent2, eosCurrent3, eosCurrent4, eosCurrent5, eosCurrent6, eosCurrent7, eosCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let eosCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let eosVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let eosRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(eosStockObject.p).toFixed(3);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let eosStockPriceElement = document.getElementById('eosValue' + (eosCounter + 1));
 eosStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 eosStockPriceElement.style.color =
 !eosLastPrice || eosLastPrice === val
 ? 'black'
 : val > eosLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 eosLastPrice = val;
 // Réinitialiser l'objet du flux à null
 eosStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let eosCurrent = 'eosCurrent' + (eosCounter + 1);
 window[eosCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (eosCounter > 0) {
   // Calculer la variation abeosue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[eosCurrent] - window['eosCurrent' + (eosCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['eosCurrent' + (eosCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[eosCurrent] < window['eosCurrent' + (eosCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[eosCurrent] > window['eosCurrent' + (eosCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let eosVarianceElement = document.getElementById('eosVariance' + (eosCounter - 1));
   eosVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     eosVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     eosVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     eosVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   eosVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 eosCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (eosCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let eosVariancePercentSum = parseFloat(eosVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let eosVariancePercentSumSymbol = "";
if (eosVariancePercentSum > 0) {
  // Somme positive : symbole plus
  eosVariancePercentSumSymbol = "+";
} else if (eosVariancePercentSum < 0) {
  // Somme négative : symbole moinseos
  eosVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
eosVariancePercentSumElement.innerText = eosVariancePercentSumSymbol + eosVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (eosVariancePercentSum < 0) {
 // Somme négative : rouge
 eosVariancePercentSumElement.style.color = 'red';
} else if (eosVariancePercentSum > 0) {
 // Somme positive : vert
 eosVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 eosVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(eosVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(eosVariancePercentArray); // stocker le résultat dans une variable


if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    eosMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/EOSUSDT?_from=markets' target='_blank'>EOS</a>"; // insérer le lien sur EOS et le message
    eosMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    eosMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/EOSUSDT?_from=markets' target='_blank'>EOS</a>"; // insérer le lien sur EOS et le message
    eosMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    eosMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(eosRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //


// **** ==================================================== MATIC ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsMatic = new WebSocket('wss://stream.binance.com:9443/ws/maticusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let maticStockPriceElement0 = document.getElementById('maticValue0');
let maticStockPriceElement1 = document.getElementById('maticValue1');
let maticStockPriceElement2 = document.getElementById('maticValue2');
let maticStockPriceElement3 = document.getElementById('maticValue3');
let maticStockPriceElement4 = document.getElementById('maticValue4');
let maticStockPriceElement5 = document.getElementById('maticValue5');
let maticStockPriceElement6 = document.getElementById('maticValue6');
let maticStockPriceElement7 = document.getElementById('maticValue7');
let maticStockPriceElement8 = document.getElementById('maticValue8');
let maticStockPriceElement9 = document.getElementById('maticValue9');


// Sélectionner les éléments HTML où afficher la variation abmaticue du bitcoin
let maticVarianceElement0 = document.getElementById('maticVariance0');
let maticVarianceElement1 = document.getElementById('maticVariance1');
let maticVarianceElement2 = document.getElementById('maticVariance2');
let maticVarianceElement3 = document.getElementById('maticVariance3');
let maticVarianceElement4 = document.getElementById('maticVariance4');
let maticVarianceElement5 = document.getElementById('maticVariance5');
let maticVarianceElement6 = document.getElementById('maticVariance6');
let maticVarianceElement7 = document.getElementById('maticVariance7');
let maticVarianceElement8 = document.getElementById('maticVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let maticVariancePercentSumElement = document.getElementById('maticVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let maticMessageElement = document.getElementById('maticMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let maticLastPrice = null;
let maticStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsMatic.onmessage = (event) => {
 // Convertir le message en objet JSON
 maticStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let maticCurrent1 ,maticCurrent2, maticCurrent3, maticCurrent4, maticCurrent5, maticCurrent6, maticCurrent7, maticCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let maticCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let maticVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let maticRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(maticStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let maticStockPriceElement = document.getElementById('maticValue' + (maticCounter + 1));
 maticStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 maticStockPriceElement.style.color =
 !maticLastPrice || maticLastPrice === val
 ? 'black'
 : val > maticLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 maticLastPrice = val;
 // Réinitialiser l'objet du flux à null
 maticStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let maticCurrent = 'maticCurrent' + (maticCounter + 1);
 window[maticCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (maticCounter > 0) {
   // Calculer la variation abmaticue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[maticCurrent] - window['maticCurrent' + (maticCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['maticCurrent' + (maticCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[maticCurrent] < window['maticCurrent' + (maticCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[maticCurrent] > window['maticCurrent' + (maticCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let maticVarianceElement = document.getElementById('maticVariance' + (maticCounter - 1));
   maticVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     maticVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     maticVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     maticVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   maticVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 maticCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (maticCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let maticVariancePercentSum = parseFloat(maticVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let maticVariancePercentSumSymbol = "";
if (maticVariancePercentSum > 0) {
  // Somme positive : symbole plus
  maticVariancePercentSumSymbol = "+";
} else if (maticVariancePercentSum < 0) {
  // Somme négative : symbole moinsmatic
  maticVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
maticVariancePercentSumElement.innerText = maticVariancePercentSumSymbol + maticVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (maticVariancePercentSum < 0) {
 // Somme négative : rouge
 maticVariancePercentSumElement.style.color = 'red';
} else if (maticVariancePercentSum > 0) {
 // Somme positive : vert
 maticVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 maticVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(maticVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(maticVariancePercentArray); // stocker le résultat dans une variable


if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    maticMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/MATICUSDT?_from=markets' target='_blank'>MATIC</a>"; // insérer le lien sur MATIC et le message
    maticMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    maticMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/MATICUSDT?_from=markets' target='_blank'>MATIC</a>"; // insérer le lien sur MATIC et le message
    maticMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    maticMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(maticRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== BNB ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsBnb = new WebSocket('wss://stream.binance.com:9443/ws/bnbusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let bnbStockPriceElement0 = document.getElementById('bnbValue0');
let bnbStockPriceElement1 = document.getElementById('bnbValue1');
let bnbStockPriceElement2 = document.getElementById('bnbValue2');
let bnbStockPriceElement3 = document.getElementById('bnbValue3');
let bnbStockPriceElement4 = document.getElementById('bnbValue4');
let bnbStockPriceElement5 = document.getElementById('bnbValue5');
let bnbStockPriceElement6 = document.getElementById('bnbValue6');
let bnbStockPriceElement7 = document.getElementById('bnbValue7');
let bnbStockPriceElement8 = document.getElementById('bnbValue8');
let bnbStockPriceElement9 = document.getElementById('bnbValue9');


// Sélectionner les éléments HTML où afficher la variation abbnbue du bitcoin
let bnbVarianceElement0 = document.getElementById('bnbVariance0');
let bnbVarianceElement1 = document.getElementById('bnbVariance1');
let bnbVarianceElement2 = document.getElementById('bnbVariance2');
let bnbVarianceElement3 = document.getElementById('bnbVariance3');
let bnbVarianceElement4 = document.getElementById('bnbVariance4');
let bnbVarianceElement5 = document.getElementById('bnbVariance5');
let bnbVarianceElement6 = document.getElementById('bnbVariance6');
let bnbVarianceElement7 = document.getElementById('bnbVariance7');
let bnbVarianceElement8 = document.getElementById('bnbVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let bnbVariancePercentSumElement = document.getElementById('bnbVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let bnbMessageElement = document.getElementById('bnbMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let bnbLastPrice = null;
let bnbStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsBnb.onmessage = (event) => {
 // Convertir le message en objet JSON
 bnbStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let bnbCurrent1 ,bnbCurrent2, bnbCurrent3, bnbCurrent4, bnbCurrent5, bnbCurrent6, bnbCurrent7, bnbCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let bnbCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let bnbVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let bnbRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(bnbStockObject.p).toFixed(2);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let bnbStockPriceElement = document.getElementById('bnbValue' + (bnbCounter + 1));
 bnbStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 bnbStockPriceElement.style.color =
 !bnbLastPrice || bnbLastPrice === val
 ? 'black'
 : val > bnbLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 bnbLastPrice = val;
 // Réinitialiser l'objet du flux à null
 bnbStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let bnbCurrent = 'bnbCurrent' + (bnbCounter + 1);
 window[bnbCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (bnbCounter > 0) {
   // Calculer la variation abbnbue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[bnbCurrent] - window['bnbCurrent' + (bnbCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['bnbCurrent' + (bnbCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[bnbCurrent] < window['bnbCurrent' + (bnbCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[bnbCurrent] > window['bnbCurrent' + (bnbCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let bnbVarianceElement = document.getElementById('bnbVariance' + (bnbCounter - 1));
   bnbVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     bnbVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     bnbVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     bnbVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   bnbVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 bnbCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (bnbCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let bnbVariancePercentSum = parseFloat(bnbVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let bnbVariancePercentSumSymbol = "";
if (bnbVariancePercentSum > 0) {
  // Somme positive : symbole plus
  bnbVariancePercentSumSymbol = "+";
} else if (bnbVariancePercentSum < 0) {
  // Somme négative : symbole moinsbnb
  bnbVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
bnbVariancePercentSumElement.innerText = bnbVariancePercentSumSymbol + bnbVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (bnbVariancePercentSum < 0) {
 // Somme négative : rouge
 bnbVariancePercentSumElement.style.color = 'red';
} else if (bnbVariancePercentSum > 0) {
 // Somme positive : vert
 bnbVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 bnbVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(bnbVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(bnbVariancePercentArray); // stocker le résultat dans une variable


if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    bnbMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/BNBUSDT?_from=markets' target='_blank'>BNB</a>"; // insérer le lien sur BNB et le message
    bnbMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    bnbMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/BNBUSDT?_from=markets' target='_blank'>BNB</a>"; // insérer le lien sur BNB et le message
    bnbMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    bnbMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(bnbRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== ADA ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsAda = new WebSocket('wss://stream.binance.com:9443/ws/adausdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let adaStockPriceElement0 = document.getElementById('adaValue0');
let adaStockPriceElement1 = document.getElementById('adaValue1');
let adaStockPriceElement2 = document.getElementById('adaValue2');
let adaStockPriceElement3 = document.getElementById('adaValue3');
let adaStockPriceElement4 = document.getElementById('adaValue4');
let adaStockPriceElement5 = document.getElementById('adaValue5');
let adaStockPriceElement6 = document.getElementById('adaValue6');
let adaStockPriceElement7 = document.getElementById('adaValue7');
let adaStockPriceElement8 = document.getElementById('adaValue8');
let adaStockPriceElement9 = document.getElementById('adaValue9');


// Sélectionner les éléments HTML où afficher la variation abadaue du bitcoin
let adaVarianceElement0 = document.getElementById('adaVariance0');
let adaVarianceElement1 = document.getElementById('adaVariance1');
let adaVarianceElement2 = document.getElementById('adaVariance2');
let adaVarianceElement3 = document.getElementById('adaVariance3');
let adaVarianceElement4 = document.getElementById('adaVariance4');
let adaVarianceElement5 = document.getElementById('adaVariance5');
let adaVarianceElement6 = document.getElementById('adaVariance6');
let adaVarianceElement7 = document.getElementById('adaVariance7');
let adaVarianceElement8 = document.getElementById('adaVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let adaVariancePercentSumElement = document.getElementById('adaVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let adaMessageElement = document.getElementById('adaMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let adaLastPrice = null;
let adaStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsAda.onmessage = (event) => {
 // Convertir le message en objet JSON
 adaStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let adaCurrent1 ,adaCurrent2, adaCurrent3, adaCurrent4, adaCurrent5, adaCurrent6, adaCurrent7, adaCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let adaCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let adaVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let adaRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(adaStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let adaStockPriceElement = document.getElementById('adaValue' + (adaCounter + 1));
 adaStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 adaStockPriceElement.style.color =
 !adaLastPrice || adaLastPrice === val
 ? 'black'
 : val > adaLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 adaLastPrice = val;
 // Réinitialiser l'objet du flux à null
 adaStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let adaCurrent = 'adaCurrent' + (adaCounter + 1);
 window[adaCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (adaCounter > 0) {
   // Calculer la variation abadaue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[adaCurrent] - window['adaCurrent' + (adaCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['adaCurrent' + (adaCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[adaCurrent] < window['adaCurrent' + (adaCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[adaCurrent] > window['adaCurrent' + (adaCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let adaVarianceElement = document.getElementById('adaVariance' + (adaCounter - 1));
   adaVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     adaVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     adaVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     adaVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   adaVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 adaCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (adaCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let adaVariancePercentSum = parseFloat(adaVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let adaVariancePercentSumSymbol = "";
if (adaVariancePercentSum > 0) {
  // Somme positive : symbole plus
  adaVariancePercentSumSymbol = "+";
} else if (adaVariancePercentSum < 0) {
  // Somme négative : symbole moinsada
  adaVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
adaVariancePercentSumElement.innerText = adaVariancePercentSumSymbol + adaVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (adaVariancePercentSum < 0) {
 // Somme négative : rouge
 adaVariancePercentSumElement.style.color = 'red';
} else if (adaVariancePercentSum > 0) {
 // Somme positive : vert
 adaVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 adaVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(adaVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(adaVariancePercentArray); // stocker le résultat dans une variable


if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    adaMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/ADAUSDT?_from=markets' target='_blank'>ADA</a>"; // insérer le lien sur ADA et le message
    adaMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    adaMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/ADAUSDT?_from=markets' target='_blank'>ADA</a>"; // insérer le lien sur ADA et le message
    adaMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    adaMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(adaRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== SAND ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsSand = new WebSocket('wss://stream.binance.com:9443/ws/sandusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let sandStockPriceElement0 = document.getElementById('sandValue0');
let sandStockPriceElement1 = document.getElementById('sandValue1');
let sandStockPriceElement2 = document.getElementById('sandValue2');
let sandStockPriceElement3 = document.getElementById('sandValue3');
let sandStockPriceElement4 = document.getElementById('sandValue4');
let sandStockPriceElement5 = document.getElementById('sandValue5');
let sandStockPriceElement6 = document.getElementById('sandValue6');
let sandStockPriceElement7 = document.getElementById('sandValue7');
let sandStockPriceElement8 = document.getElementById('sandValue8');
let sandStockPriceElement9 = document.getElementById('sandValue9');


// Sélectionner les éléments HTML où afficher la variation absandue du bitcoin
let sandVarianceElement0 = document.getElementById('sandVariance0');
let sandVarianceElement1 = document.getElementById('sandVariance1');
let sandVarianceElement2 = document.getElementById('sandVariance2');
let sandVarianceElement3 = document.getElementById('sandVariance3');
let sandVarianceElement4 = document.getElementById('sandVariance4');
let sandVarianceElement5 = document.getElementById('sandVariance5');
let sandVarianceElement6 = document.getElementById('sandVariance6');
let sandVarianceElement7 = document.getElementById('sandVariance7');
let sandVarianceElement8 = document.getElementById('sandVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let sandVariancePercentSumElement = document.getElementById('sandVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let sandMessageElement = document.getElementById('sandMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let sandLastPrice = null;
let sandStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsSand.onmessage = (event) => {
 // Convertir le message en objet JSON
 sandStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let sandCurrent1 ,sandCurrent2, sandCurrent3, sandCurrent4, sandCurrent5, sandCurrent6, sandCurrent7, sandCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let sandCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let sandVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let sandRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(sandStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let sandStockPriceElement = document.getElementById('sandValue' + (sandCounter + 1));
 sandStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 sandStockPriceElement.style.color =
 !sandLastPrice || sandLastPrice === val
 ? 'black'
 : val > sandLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 sandLastPrice = val;
 // Réinitialiser l'objet du flux à null
 sandStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let sandCurrent = 'sandCurrent' + (sandCounter + 1);
 window[sandCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (sandCounter > 0) {
   // Calculer la variation absandue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[sandCurrent] - window['sandCurrent' + (sandCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['sandCurrent' + (sandCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[sandCurrent] < window['sandCurrent' + (sandCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[sandCurrent] > window['sandCurrent' + (sandCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let sandVarianceElement = document.getElementById('sandVariance' + (sandCounter - 1));
   sandVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     sandVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     sandVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     sandVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   sandVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 sandCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (sandCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let sandVariancePercentSum = parseFloat(sandVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let sandVariancePercentSumSymbol = "";
if (sandVariancePercentSum > 0) {
  // Somme positive : symbole plus
  sandVariancePercentSumSymbol = "+";
} else if (sandVariancePercentSum < 0) {
  // Somme négative : symbole moinssand
  sandVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
sandVariancePercentSumElement.innerText = sandVariancePercentSumSymbol + sandVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (sandVariancePercentSum < 0) {
 // Somme négative : rouge
 sandVariancePercentSumElement.style.color = 'red';
} else if (sandVariancePercentSum > 0) {
 // Somme positive : vert
 sandVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 sandVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(sandVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(sandVariancePercentArray); // stocker le résultat dans une variable


if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    sandMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/SANDUSDT?_from=markets' target='_blank'>SAND</a>"; // insérer le lien sur SAND et le message
    sandMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    sandMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/SANDUSDT?_from=markets' target='_blank'>SAND</a>"; // insérer le lien sur SAND et le message
    sandMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    sandMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(sandRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== AVAX ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsAvax = new WebSocket('wss://stream.binance.com:9443/ws/avaxusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let avaxStockPriceElement0 = document.getElementById('avaxValue0');
let avaxStockPriceElement1 = document.getElementById('avaxValue1');
let avaxStockPriceElement2 = document.getElementById('avaxValue2');
let avaxStockPriceElement3 = document.getElementById('avaxValue3');
let avaxStockPriceElement4 = document.getElementById('avaxValue4');
let avaxStockPriceElement5 = document.getElementById('avaxValue5');
let avaxStockPriceElement6 = document.getElementById('avaxValue6');
let avaxStockPriceElement7 = document.getElementById('avaxValue7');
let avaxStockPriceElement8 = document.getElementById('avaxValue8');
let avaxStockPriceElement9 = document.getElementById('avaxValue9');


// Sélectionner les éléments HTML où afficher la variation abavaxue du bitcoin
let avaxVarianceElement0 = document.getElementById('avaxVariance0');
let avaxVarianceElement1 = document.getElementById('avaxVariance1');
let avaxVarianceElement2 = document.getElementById('avaxVariance2');
let avaxVarianceElement3 = document.getElementById('avaxVariance3');
let avaxVarianceElement4 = document.getElementById('avaxVariance4');
let avaxVarianceElement5 = document.getElementById('avaxVariance5');
let avaxVarianceElement6 = document.getElementById('avaxVariance6');
let avaxVarianceElement7 = document.getElementById('avaxVariance7');
let avaxVarianceElement8 = document.getElementById('avaxVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let avaxVariancePercentSumElement = document.getElementById('avaxVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let avaxMessageElement = document.getElementById('avaxMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let avaxLastPrice = null;
let avaxStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsAvax.onmessage = (event) => {
 // Convertir le message en objet JSON
 avaxStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let avaxCurrent1 ,avaxCurrent2, avaxCurrent3, avaxCurrent4, avaxCurrent5, avaxCurrent6, avaxCurrent7, avaxCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let avaxCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let avaxVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let avaxRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(avaxStockObject.p).toFixed(3);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let avaxStockPriceElement = document.getElementById('avaxValue' + (avaxCounter + 1));
 avaxStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 avaxStockPriceElement.style.color =
 !avaxLastPrice || avaxLastPrice === val
 ? 'black'
 : val > avaxLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 avaxLastPrice = val;
 // Réinitialiser l'objet du flux à null
 avaxStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let avaxCurrent = 'avaxCurrent' + (avaxCounter + 1);
 window[avaxCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (avaxCounter > 0) {
   // Calculer la variation abavaxue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[avaxCurrent] - window['avaxCurrent' + (avaxCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['avaxCurrent' + (avaxCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[avaxCurrent] < window['avaxCurrent' + (avaxCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[avaxCurrent] > window['avaxCurrent' + (avaxCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let avaxVarianceElement = document.getElementById('avaxVariance' + (avaxCounter - 1));
   avaxVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     avaxVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     avaxVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     avaxVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   avaxVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 avaxCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (avaxCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let avaxVariancePercentSum = parseFloat(avaxVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let avaxVariancePercentSumSymbol = "";
if (avaxVariancePercentSum > 0) {
  // Somme positive : symbole plus
  avaxVariancePercentSumSymbol = "+";
} else if (avaxVariancePercentSum < 0) {
  // Somme négative : symbole moinsavax
  avaxVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
avaxVariancePercentSumElement.innerText = avaxVariancePercentSumSymbol + avaxVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (avaxVariancePercentSum < 0) {
 // Somme négative : rouge
 avaxVariancePercentSumElement.style.color = 'red';
} else if (avaxVariancePercentSum > 0) {
 // Somme positive : vert
 avaxVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 avaxVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(avaxVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(avaxVariancePercentArray); // stocker le résultat dans une variable


if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    avaxMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/AVAXUSDT?_from=markets' target='_blank'>AVAX</a>"; // insérer le lien sur AVAX et le message
    avaxMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    avaxMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/AVAXUSDT?_from=markets' target='_blank'>AVAX</a>"; // insérer le lien sur AVAX et le message
    avaxMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    avaxMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(avaxRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== INJ ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsInj = new WebSocket('wss://stream.binance.com:9443/ws/injusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let injStockPriceElement0 = document.getElementById('injValue0');
let injStockPriceElement1 = document.getElementById('injValue1');
let injStockPriceElement2 = document.getElementById('injValue2');
let injStockPriceElement3 = document.getElementById('injValue3');
let injStockPriceElement4 = document.getElementById('injValue4');
let injStockPriceElement5 = document.getElementById('injValue5');
let injStockPriceElement6 = document.getElementById('injValue6');
let injStockPriceElement7 = document.getElementById('injValue7');
let injStockPriceElement8 = document.getElementById('injValue8');
let injStockPriceElement9 = document.getElementById('injValue9');


// Sélectionner les éléments HTML où afficher la variation abinjue du bitcoin
let injVarianceElement0 = document.getElementById('injVariance0');
let injVarianceElement1 = document.getElementById('injVariance1');
let injVarianceElement2 = document.getElementById('injVariance2');
let injVarianceElement3 = document.getElementById('injVariance3');
let injVarianceElement4 = document.getElementById('injVariance4');
let injVarianceElement5 = document.getElementById('injVariance5');
let injVarianceElement6 = document.getElementById('injVariance6');
let injVarianceElement7 = document.getElementById('injVariance7');
let injVarianceElement8 = document.getElementById('injVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let injVariancePercentSumElement = document.getElementById('injVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let injMessageElement = document.getElementById('injMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let injLastPrice = null;
let injStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsInj.onmessage = (event) => {
 // Convertir le message en objet JSON
 injStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let injCurrent1 ,injCurrent2, injCurrent3, injCurrent4, injCurrent5, injCurrent6, injCurrent7, injCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let injCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let injVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let injRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(injStockObject.p).toFixed(3);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let injStockPriceElement = document.getElementById('injValue' + (injCounter + 1));
 injStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 injStockPriceElement.style.color =
 !injLastPrice || injLastPrice === val
 ? 'black'
 : val > injLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 injLastPrice = val;
 // Réinitialiser l'objet du flux à null
 injStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let injCurrent = 'injCurrent' + (injCounter + 1);
 window[injCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (injCounter > 0) {
   // Calculer la variation abinjue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[injCurrent] - window['injCurrent' + (injCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['injCurrent' + (injCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[injCurrent] < window['injCurrent' + (injCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[injCurrent] > window['injCurrent' + (injCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let injVarianceElement = document.getElementById('injVariance' + (injCounter - 1));
   injVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     injVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     injVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     injVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   injVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 injCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (injCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let injVariancePercentSum = parseFloat(injVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let injVariancePercentSumSymbol = "";
if (injVariancePercentSum > 0) {
  // Somme positive : symbole plus
  injVariancePercentSumSymbol = "+";
} else if (injVariancePercentSum < 0) {
  // Somme négative : symbole moinsinj
  injVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
injVariancePercentSumElement.innerText = injVariancePercentSumSymbol + injVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (injVariancePercentSum < 0) {
 // Somme négative : rouge
 injVariancePercentSumElement.style.color = 'red';
} else if (injVariancePercentSum > 0) {
 // Somme positive : vert
 injVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 injVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(injVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(injVariancePercentArray); // stocker le résultat dans une variable


if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    injMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/INJUSDT?_from=markets' target='_blank'>INJ</a>"; // insérer le lien sur INJ et le message
    injMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    injMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/INJUSDT?_from=markets' target='_blank'>INJ</a>"; // insérer le lien sur INJ et le message
    injMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    injMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(injRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== SUI ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsSui = new WebSocket('wss://stream.binance.com:9443/ws/suiusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let suiStockPriceElement0 = document.getElementById('suiValue0');
let suiStockPriceElement1 = document.getElementById('suiValue1');
let suiStockPriceElement2 = document.getElementById('suiValue2');
let suiStockPriceElement3 = document.getElementById('suiValue3');
let suiStockPriceElement4 = document.getElementById('suiValue4');
let suiStockPriceElement5 = document.getElementById('suiValue5');
let suiStockPriceElement6 = document.getElementById('suiValue6');
let suiStockPriceElement7 = document.getElementById('suiValue7');
let suiStockPriceElement8 = document.getElementById('suiValue8');
let suiStockPriceElement9 = document.getElementById('suiValue9');


// Sélectionner les éléments HTML où afficher la variation absuiue du bitcoin
let suiVarianceElement0 = document.getElementById('suiVariance0');
let suiVarianceElement1 = document.getElementById('suiVariance1');
let suiVarianceElement2 = document.getElementById('suiVariance2');
let suiVarianceElement3 = document.getElementById('suiVariance3');
let suiVarianceElement4 = document.getElementById('suiVariance4');
let suiVarianceElement5 = document.getElementById('suiVariance5');
let suiVarianceElement6 = document.getElementById('suiVariance6');
let suiVarianceElement7 = document.getElementById('suiVariance7');
let suiVarianceElement8 = document.getElementById('suiVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let suiVariancePercentSumElement = document.getElementById('suiVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let suiMessageElement = document.getElementById('suiMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let suiLastPrice = null;
let suiStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsSui.onmessage = (event) => {
 // Convertir le message en objet JSON
 suiStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let suiCurrent1 ,suiCurrent2, suiCurrent3, suiCurrent4, suiCurrent5, suiCurrent6, suiCurrent7, suiCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let suiCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let suiVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let suiRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(suiStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let suiStockPriceElement = document.getElementById('suiValue' + (suiCounter + 1));
 suiStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 suiStockPriceElement.style.color =
 !suiLastPrice || suiLastPrice === val
 ? 'black'
 : val > suiLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 suiLastPrice = val;
 // Réinitialiser l'objet du flux à null
 suiStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let suiCurrent = 'suiCurrent' + (suiCounter + 1);
 window[suiCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (suiCounter > 0) {
   // Calculer la variation absuiue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[suiCurrent] - window['suiCurrent' + (suiCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['suiCurrent' + (suiCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[suiCurrent] < window['suiCurrent' + (suiCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[suiCurrent] > window['suiCurrent' + (suiCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let suiVarianceElement = document.getElementById('suiVariance' + (suiCounter - 1));
   suiVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     suiVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     suiVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     suiVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   suiVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 suiCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (suiCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let suiVariancePercentSum = parseFloat(suiVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let suiVariancePercentSumSymbol = "";
if (suiVariancePercentSum > 0) {
  // Somme positive : symbole plus
  suiVariancePercentSumSymbol = "+";
} else if (suiVariancePercentSum < 0) {
  // Somme négative : symbole moinssui
  suiVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
suiVariancePercentSumElement.innerText = suiVariancePercentSumSymbol + suiVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (suiVariancePercentSum < 0) {
 // Somme négative : rouge
 suiVariancePercentSumElement.style.color = 'red';
} else if (suiVariancePercentSum > 0) {
 // Somme positive : vert
 suiVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 suiVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(suiVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(suiVariancePercentArray); // stocker le résultat dans une variable

if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    suiMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/SUIUSDT?_from=markets' target='_blank'>SUI</a>"; // insérer le lien sur SUI et le message
    suiMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    suiMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/SUIUSDT?_from=markets' target='_blank'>SUI</a>"; // insérer le lien sur SUI et le message
    suiMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    suiMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(suiRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== EDU ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsEdu = new WebSocket('wss://stream.binance.com:9443/ws/eduusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let eduStockPriceElement0 = document.getElementById('eduValue0');
let eduStockPriceElement1 = document.getElementById('eduValue1');
let eduStockPriceElement2 = document.getElementById('eduValue2');
let eduStockPriceElement3 = document.getElementById('eduValue3');
let eduStockPriceElement4 = document.getElementById('eduValue4');
let eduStockPriceElement5 = document.getElementById('eduValue5');
let eduStockPriceElement6 = document.getElementById('eduValue6');
let eduStockPriceElement7 = document.getElementById('eduValue7');
let eduStockPriceElement8 = document.getElementById('eduValue8');
let eduStockPriceElement9 = document.getElementById('eduValue9');


// Sélectionner les éléments HTML où afficher la variation abeduue du bitcoin
let eduVarianceElement0 = document.getElementById('eduVariance0');
let eduVarianceElement1 = document.getElementById('eduVariance1');
let eduVarianceElement2 = document.getElementById('eduVariance2');
let eduVarianceElement3 = document.getElementById('eduVariance3');
let eduVarianceElement4 = document.getElementById('eduVariance4');
let eduVarianceElement5 = document.getElementById('eduVariance5');
let eduVarianceElement6 = document.getElementById('eduVariance6');
let eduVarianceElement7 = document.getElementById('eduVariance7');
let eduVarianceElement8 = document.getElementById('eduVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let eduVariancePercentSumElement = document.getElementById('eduVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let eduMessageElement = document.getElementById('eduMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let eduLastPrice = null;
let eduStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsEdu.onmessage = (event) => {
 // Convertir le message en objet JSON
 eduStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let eduCurrent1 ,eduCurrent2, eduCurrent3, eduCurrent4, eduCurrent5, eduCurrent6, eduCurrent7, eduCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let eduCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let eduVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let eduRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(eduStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let eduStockPriceElement = document.getElementById('eduValue' + (eduCounter + 1));
 eduStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 eduStockPriceElement.style.color =
 !eduLastPrice || eduLastPrice === val
 ? 'black'
 : val > eduLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 eduLastPrice = val;
 // Réinitialiser l'objet du flux à null
 eduStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let eduCurrent = 'eduCurrent' + (eduCounter + 1);
 window[eduCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (eduCounter > 0) {
   // Calculer la variation abeduue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[eduCurrent] - window['eduCurrent' + (eduCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['eduCurrent' + (eduCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[eduCurrent] < window['eduCurrent' + (eduCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[eduCurrent] > window['eduCurrent' + (eduCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let eduVarianceElement = document.getElementById('eduVariance' + (eduCounter - 1));
   eduVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     eduVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     eduVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     eduVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   eduVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 eduCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (eduCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let eduVariancePercentSum = parseFloat(eduVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let eduVariancePercentSumSymbol = "";
if (eduVariancePercentSum > 0) {
  // Somme positive : symbole plus
  eduVariancePercentSumSymbol = "+";
} else if (eduVariancePercentSum < 0) {
  // Somme négative : symbole moinsedu
  eduVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
eduVariancePercentSumElement.innerText = eduVariancePercentSumSymbol + eduVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (eduVariancePercentSum < 0) {
 // Somme négative : rouge
 eduVariancePercentSumElement.style.color = 'red';
} else if (eduVariancePercentSum > 0) {
 // Somme positive : vert
 eduVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 eduVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(eduVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(eduVariancePercentArray); // stocker le résultat dans une variable

if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    eduMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/EDUUSDT?_from=markets' target='_blank'>EDU</a>"; // insérer le lien sur EDU et le message
    eduMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    eduMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/EDUUSDT?_from=markets' target='_blank'>EDU</a>"; // insérer le lien sur EDU et le message
    eduMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    eduMessageElement.innerHTML ="";

}
  
// Arrêter l'intervalle
clearInterval(eduRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== AMB ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsAmb = new WebSocket('wss://stream.binance.com:9443/ws/ambusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let ambStockPriceElement0 = document.getElementById('ambValue0');
let ambStockPriceElement1 = document.getElementById('ambValue1');
let ambStockPriceElement2 = document.getElementById('ambValue2');
let ambStockPriceElement3 = document.getElementById('ambValue3');
let ambStockPriceElement4 = document.getElementById('ambValue4');
let ambStockPriceElement5 = document.getElementById('ambValue5');
let ambStockPriceElement6 = document.getElementById('ambValue6');
let ambStockPriceElement7 = document.getElementById('ambValue7');
let ambStockPriceElement8 = document.getElementById('ambValue8');
let ambStockPriceElement9 = document.getElementById('ambValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let ambVarianceElement0 = document.getElementById('ambVariance0');
let ambVarianceElement1 = document.getElementById('ambVariance1');
let ambVarianceElement2 = document.getElementById('ambVariance2');
let ambVarianceElement3 = document.getElementById('ambVariance3');
let ambVarianceElement4 = document.getElementById('ambVariance4');
let ambVarianceElement5 = document.getElementById('ambVariance5');
let ambVarianceElement6 = document.getElementById('ambVariance6');
let ambVarianceElement7 = document.getElementById('ambVariance7');
let ambVarianceElement8 = document.getElementById('ambVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let ambVariancePercentSumElement = document.getElementById('ambVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let ambMessageElement = document.getElementById('ambMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let ambLastPrice = null;
let ambStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsAmb.onmessage = (event) => {
 // Convertir le message en objet JSON
 ambStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let ambCurrent1 ,ambCurrent2, ambCurrent3, ambCurrent4, ambCurrent5, ambCurrent6, ambCurrent7, ambCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let ambCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let ambVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let ambRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(ambStockObject.p).toFixed(5);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let ambStockPriceElement = document.getElementById('ambValue' + (ambCounter + 1));
 ambStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 ambStockPriceElement.style.color =
 !ambLastPrice || ambLastPrice === val
 ? 'black'
 : val > ambLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 ambLastPrice = val;
 // Réinitialiser l'objet du flux à null
 ambStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let ambCurrent = 'ambCurrent' + (ambCounter + 1);
 window[ambCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (ambCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[ambCurrent] - window['ambCurrent' + (ambCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['ambCurrent' + (ambCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[ambCurrent] < window['ambCurrent' + (ambCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[ambCurrent] > window['ambCurrent' + (ambCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let ambVarianceElement = document.getElementById('ambVariance' + (ambCounter - 1));
   ambVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     ambVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     ambVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     ambVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   ambVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 ambCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (ambCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let ambVariancePercentSum = parseFloat(ambVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let ambVariancePercentSumSymbol = "";
if (ambVariancePercentSum > 0) {
  // Somme positive : symbole plus
  ambVariancePercentSumSymbol = "+";
} else if (ambVariancePercentSum < 0) {
  // Somme négative : symbole moins
  ambVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
ambVariancePercentSumElement.innerText = ambVariancePercentSumSymbol + ambVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (ambVariancePercentSum < 0) {
 // Somme négative : rouge
 ambVariancePercentSumElement.style.color = 'red';
} else if (ambVariancePercentSum > 0) {
 // Somme positive : vert
 ambVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 ambVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau ambVariancePercentArray
let negativeCount = countNegativeElements(ambVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau ambVariancePercentArray
let positiveCount = countPositiveElements(ambVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau ambVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    ambMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/AMBUSDT?_from=markets' target='_blank'>AMB</a>"; // insérer le lien sur AMB et le message
    ambMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    ambMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/AMBUSDT?_from=markets' target='_blank'>AMB</a>"; // insérer le lien sur AMB et le message
    ambMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    ambMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(ambRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== TRX ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsTrx = new WebSocket('wss://stream.binance.com:9443/ws/trxusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let trxStockPriceElement0 = document.getElementById('trxValue0');
let trxStockPriceElement1 = document.getElementById('trxValue1');
let trxStockPriceElement2 = document.getElementById('trxValue2');
let trxStockPriceElement3 = document.getElementById('trxValue3');
let trxStockPriceElement4 = document.getElementById('trxValue4');
let trxStockPriceElement5 = document.getElementById('trxValue5');
let trxStockPriceElement6 = document.getElementById('trxValue6');
let trxStockPriceElement7 = document.getElementById('trxValue7');
let trxStockPriceElement8 = document.getElementById('trxValue8');
let trxStockPriceElement9 = document.getElementById('trxValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let trxVarianceElement0 = document.getElementById('trxVariance0');
let trxVarianceElement1 = document.getElementById('trxVariance1');
let trxVarianceElement2 = document.getElementById('trxVariance2');
let trxVarianceElement3 = document.getElementById('trxVariance3');
let trxVarianceElement4 = document.getElementById('trxVariance4');
let trxVarianceElement5 = document.getElementById('trxVariance5');
let trxVarianceElement6 = document.getElementById('trxVariance6');
let trxVarianceElement7 = document.getElementById('trxVariance7');
let trxVarianceElement8 = document.getElementById('trxVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let trxVariancePercentSumElement = document.getElementById('trxVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let trxMessageElement = document.getElementById('trxMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let trxLastPrice = null;
let trxStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsTrx.onmessage = (event) => {
 // Convertir le message en objet JSON
 trxStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let trxCurrent1 ,trxCurrent2, trxCurrent3, trxCurrent4, trxCurrent5, trxCurrent6, trxCurrent7, trxCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let trxCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let trxVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let trxRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(trxStockObject.p).toFixed(5);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let trxStockPriceElement = document.getElementById('trxValue' + (trxCounter + 1));
 trxStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 trxStockPriceElement.style.color =
 !trxLastPrice || trxLastPrice === val
 ? 'black'
 : val > trxLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 trxLastPrice = val;
 // Réinitialiser l'objet du flux à null
 trxStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let trxCurrent = 'trxCurrent' + (trxCounter + 1);
 window[trxCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (trxCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[trxCurrent] - window['trxCurrent' + (trxCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['trxCurrent' + (trxCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[trxCurrent] < window['trxCurrent' + (trxCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[trxCurrent] > window['trxCurrent' + (trxCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let trxVarianceElement = document.getElementById('trxVariance' + (trxCounter - 1));
   trxVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     trxVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     trxVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     trxVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   trxVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 trxCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (trxCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let trxVariancePercentSum = parseFloat(trxVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let trxVariancePercentSumSymbol = "";
if (trxVariancePercentSum > 0) {
  // Somme positive : symbole plus
  trxVariancePercentSumSymbol = "+";
} else if (trxVariancePercentSum < 0) {
  // Somme négative : symbole moins
  trxVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
trxVariancePercentSumElement.innerText = trxVariancePercentSumSymbol + trxVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (trxVariancePercentSum < 0) {
 // Somme négative : rouge
 trxVariancePercentSumElement.style.color = 'red';
} else if (trxVariancePercentSum > 0) {
 // Somme positive : vert
 trxVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 trxVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau trxVariancePercentArray
let negativeCount = countNegativeElements(trxVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau trxVariancePercentArray
let positiveCount = countPositiveElements(trxVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau trxVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    trxMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/TRXUSDT?_from=markets' target='_blank'>TRX</a>"; // insérer le lien sur TRX et le message
    trxMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    trxMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/TRXUSDT?_from=markets' target='_blank'>TRX</a>"; // insérer le lien sur TRX et le message
    trxMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    trxMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(trxRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== PEPE ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsPepe = new WebSocket('wss://stream.binance.com:9443/ws/pepeusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let pepeStockPriceElement0 = document.getElementById('pepeValue0');
let pepeStockPriceElement1 = document.getElementById('pepeValue1');
let pepeStockPriceElement2 = document.getElementById('pepeValue2');
let pepeStockPriceElement3 = document.getElementById('pepeValue3');
let pepeStockPriceElement4 = document.getElementById('pepeValue4');
let pepeStockPriceElement5 = document.getElementById('pepeValue5');
let pepeStockPriceElement6 = document.getElementById('pepeValue6');
let pepeStockPriceElement7 = document.getElementById('pepeValue7');
let pepeStockPriceElement8 = document.getElementById('pepeValue8');
let pepeStockPriceElement9 = document.getElementById('pepeValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let pepeVarianceElement0 = document.getElementById('pepeVariance0');
let pepeVarianceElement1 = document.getElementById('pepeVariance1');
let pepeVarianceElement2 = document.getElementById('pepeVariance2');
let pepeVarianceElement3 = document.getElementById('pepeVariance3');
let pepeVarianceElement4 = document.getElementById('pepeVariance4');
let pepeVarianceElement5 = document.getElementById('pepeVariance5');
let pepeVarianceElement6 = document.getElementById('pepeVariance6');
let pepeVarianceElement7 = document.getElementById('pepeVariance7');
let pepeVarianceElement8 = document.getElementById('pepeVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let pepeVariancePercentSumElement = document.getElementById('pepeVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let pepeMessageElement = document.getElementById('pepeMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let pepeLastPrice = null;
let pepeStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsPepe.onmessage = (event) => {
 // Convertir le message en objet JSON
 pepeStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let pepeCurrent1 ,pepeCurrent2, pepeCurrent3, pepeCurrent4, pepeCurrent5, pepeCurrent6, pepeCurrent7, pepeCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let pepeCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let pepeVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let pepeRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(pepeStockObject.p).toFixed(7);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let pepeStockPriceElement = document.getElementById('pepeValue' + (pepeCounter + 1));
 pepeStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 pepeStockPriceElement.style.color =
 !pepeLastPrice || pepeLastPrice === val
 ? 'black'
 : val > pepeLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 pepeLastPrice = val;
 // Réinitialiser l'objet du flux à null
 pepeStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let pepeCurrent = 'pepeCurrent' + (pepeCounter + 1);
 window[pepeCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (pepeCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[pepeCurrent] - window['pepeCurrent' + (pepeCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['pepeCurrent' + (pepeCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[pepeCurrent] < window['pepeCurrent' + (pepeCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[pepeCurrent] > window['pepeCurrent' + (pepeCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let pepeVarianceElement = document.getElementById('pepeVariance' + (pepeCounter - 1));
   pepeVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     pepeVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     pepeVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     pepeVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   pepeVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 pepeCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (pepeCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let pepeVariancePercentSum = parseFloat(pepeVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let pepeVariancePercentSumSymbol = "";
if (pepeVariancePercentSum > 0) {
  // Somme positive : symbole plus
  pepeVariancePercentSumSymbol = "+";
} else if (pepeVariancePercentSum < 0) {
  // Somme négative : symbole moins
  pepeVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
pepeVariancePercentSumElement.innerText = pepeVariancePercentSumSymbol + pepeVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (pepeVariancePercentSum < 0) {
 // Somme négative : rouge
 pepeVariancePercentSumElement.style.color = 'red';
} else if (pepeVariancePercentSum > 0) {
 // Somme positive : vert
 pepeVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 pepeVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau pepeVariancePercentArray
let negativeCount = countNegativeElements(pepeVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau pepeVariancePercentArray
let positiveCount = countPositiveElements(pepeVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau pepeVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    pepeMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/PEPEUSDT?_from=markets' target='_blank'>PEPE</a>"; // insérer le lien sur PEPE et le message
    pepeMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    pepeMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/PEPEUSDT?_from=markets' target='_blank'>PEPE</a>"; // insérer le lien sur PEPE et le message
    pepeMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    pepeMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(pepeRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== OP ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsOp = new WebSocket('wss://stream.binance.com:9443/ws/opusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let opStockPriceElement0 = document.getElementById('opValue0');
let opStockPriceElement1 = document.getElementById('opValue1');
let opStockPriceElement2 = document.getElementById('opValue2');
let opStockPriceElement3 = document.getElementById('opValue3');
let opStockPriceElement4 = document.getElementById('opValue4');
let opStockPriceElement5 = document.getElementById('opValue5');
let opStockPriceElement6 = document.getElementById('opValue6');
let opStockPriceElement7 = document.getElementById('opValue7');
let opStockPriceElement8 = document.getElementById('opValue8');
let opStockPriceElement9 = document.getElementById('opValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let opVarianceElement0 = document.getElementById('opVariance0');
let opVarianceElement1 = document.getElementById('opVariance1');
let opVarianceElement2 = document.getElementById('opVariance2');
let opVarianceElement3 = document.getElementById('opVariance3');
let opVarianceElement4 = document.getElementById('opVariance4');
let opVarianceElement5 = document.getElementById('opVariance5');
let opVarianceElement6 = document.getElementById('opVariance6');
let opVarianceElement7 = document.getElementById('opVariance7');
let opVarianceElement8 = document.getElementById('opVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let opVariancePercentSumElement = document.getElementById('opVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let opMessageElement = document.getElementById('opMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let opLastPrice = null;
let opStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsOp.onmessage = (event) => {
 // Convertir le message en objet JSON
 opStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let opCurrent1 ,opCurrent2, opCurrent3, opCurrent4, opCurrent5, opCurrent6, opCurrent7, opCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let opCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let opVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let opRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(opStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let opStockPriceElement = document.getElementById('opValue' + (opCounter + 1));
 opStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 opStockPriceElement.style.color =
 !opLastPrice || opLastPrice === val
 ? 'black'
 : val > opLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 opLastPrice = val;
 // Réinitialiser l'objet du flux à null
 opStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let opCurrent = 'opCurrent' + (opCounter + 1);
 window[opCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (opCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[opCurrent] - window['opCurrent' + (opCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['opCurrent' + (opCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[opCurrent] < window['opCurrent' + (opCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[opCurrent] > window['opCurrent' + (opCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let opVarianceElement = document.getElementById('opVariance' + (opCounter - 1));
   opVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     opVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     opVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     opVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   opVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 opCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (opCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let opVariancePercentSum = parseFloat(opVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let opVariancePercentSumSymbol = "";
if (opVariancePercentSum > 0) {
  // Somme positive : symbole plus
  opVariancePercentSumSymbol = "+";
} else if (opVariancePercentSum < 0) {
  // Somme négative : symbole moins
  opVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
opVariancePercentSumElement.innerText = opVariancePercentSumSymbol + opVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (opVariancePercentSum < 0) {
 // Somme négative : rouge
 opVariancePercentSumElement.style.color = 'red';
} else if (opVariancePercentSum > 0) {
 // Somme positive : vert
 opVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 opVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau opVariancePercentArray
let negativeCount = countNegativeElements(opVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau opVariancePercentArray
let positiveCount = countPositiveElements(opVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau opVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    opMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/OPUSDT?_from=markets' target='_blank'>OP</a>"; // insérer le lien sur OP et le message
    opMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    opMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/OPUSDT?_from=markets' target='_blank'>OP</a>"; // insérer le lien sur OP et le message
    opMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    opMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(opRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== COMBO ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsCombo = new WebSocket('wss://stream.binance.com:9443/ws/combousdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let comboStockPriceElement0 = document.getElementById('comboValue0');
let comboStockPriceElement1 = document.getElementById('comboValue1');
let comboStockPriceElement2 = document.getElementById('comboValue2');
let comboStockPriceElement3 = document.getElementById('comboValue3');
let comboStockPriceElement4 = document.getElementById('comboValue4');
let comboStockPriceElement5 = document.getElementById('comboValue5');
let comboStockPriceElement6 = document.getElementById('comboValue6');
let comboStockPriceElement7 = document.getElementById('comboValue7');
let comboStockPriceElement8 = document.getElementById('comboValue8');
let comboStockPriceElement9 = document.getElementById('comboValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let comboVarianceElement0 = document.getElementById('comboVariance0');
let comboVarianceElement1 = document.getElementById('comboVariance1');
let comboVarianceElement2 = document.getElementById('comboVariance2');
let comboVarianceElement3 = document.getElementById('comboVariance3');
let comboVarianceElement4 = document.getElementById('comboVariance4');
let comboVarianceElement5 = document.getElementById('comboVariance5');
let comboVarianceElement6 = document.getElementById('comboVariance6');
let comboVarianceElement7 = document.getElementById('comboVariance7');
let comboVarianceElement8 = document.getElementById('comboVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let comboVariancePercentSumElement = document.getElementById('comboVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let comboMessageElement = document.getElementById('comboMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let comboLastPrice = null;
let comboStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsCombo.onmessage = (event) => {
 // Convertir le message en objet JSON
 comboStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let comboCurrent1 ,comboCurrent2, comboCurrent3, comboCurrent4, comboCurrent5, comboCurrent6, comboCurrent7, comboCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let comboCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let comboVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let comboRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(comboStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let comboStockPriceElement = document.getElementById('comboValue' + (comboCounter + 1));
 comboStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 comboStockPriceElement.style.color =
 !comboLastPrice || comboLastPrice === val
 ? 'black'
 : val > comboLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 comboLastPrice = val;
 // Réinitialiser l'objet du flux à null
 comboStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let comboCurrent = 'comboCurrent' + (comboCounter + 1);
 window[comboCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (comboCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[comboCurrent] - window['comboCurrent' + (comboCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['comboCurrent' + (comboCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[comboCurrent] < window['comboCurrent' + (comboCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[comboCurrent] > window['comboCurrent' + (comboCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let comboVarianceElement = document.getElementById('comboVariance' + (comboCounter - 1));
   comboVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     comboVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     comboVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     comboVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   comboVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 comboCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (comboCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let comboVariancePercentSum = parseFloat(comboVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let comboVariancePercentSumSymbol = "";
if (comboVariancePercentSum > 0) {
  // Somme positive : symbole plus
  comboVariancePercentSumSymbol = "+";
} else if (comboVariancePercentSum < 0) {
  // Somme négative : symbole moins
  comboVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
comboVariancePercentSumElement.innerText = comboVariancePercentSumSymbol + comboVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (comboVariancePercentSum < 0) {
 // Somme négative : rouge
 comboVariancePercentSumElement.style.color = 'red';
} else if (comboVariancePercentSum > 0) {
 // Somme positive : vert
 comboVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 comboVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau comboVariancePercentArray
let negativeCount = countNegativeElements(comboVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau comboVariancePercentArray
let positiveCount = countPositiveElements(comboVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau comboVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    comboMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/COMBOUSDT?_from=markets' target='_blank'>COMBO</a>"; // insérer le lien sur COMBO et le message
    comboMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    comboMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/COMBOUSDT?_from=markets' target='_blank'>COMBO</a>"; // insérer le lien sur COMBO et le message
    comboMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    comboMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(comboRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== LEVER ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsLever = new WebSocket('wss://stream.binance.com:9443/ws/leverusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let leverStockPriceElement0 = document.getElementById('leverValue0');
let leverStockPriceElement1 = document.getElementById('leverValue1');
let leverStockPriceElement2 = document.getElementById('leverValue2');
let leverStockPriceElement3 = document.getElementById('leverValue3');
let leverStockPriceElement4 = document.getElementById('leverValue4');
let leverStockPriceElement5 = document.getElementById('leverValue5');
let leverStockPriceElement6 = document.getElementById('leverValue6');
let leverStockPriceElement7 = document.getElementById('leverValue7');
let leverStockPriceElement8 = document.getElementById('leverValue8');
let leverStockPriceElement9 = document.getElementById('leverValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let leverVarianceElement0 = document.getElementById('leverVariance0');
let leverVarianceElement1 = document.getElementById('leverVariance1');
let leverVarianceElement2 = document.getElementById('leverVariance2');
let leverVarianceElement3 = document.getElementById('leverVariance3');
let leverVarianceElement4 = document.getElementById('leverVariance4');
let leverVarianceElement5 = document.getElementById('leverVariance5');
let leverVarianceElement6 = document.getElementById('leverVariance6');
let leverVarianceElement7 = document.getElementById('leverVariance7');
let leverVarianceElement8 = document.getElementById('leverVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let leverVariancePercentSumElement = document.getElementById('leverVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let leverMessageElement = document.getElementById('leverMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let leverLastPrice = null;
let leverStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsLever.onmessage = (event) => {
 // Convertir le message en objet JSON
 leverStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let leverCurrent1 ,leverCurrent2, leverCurrent3, leverCurrent4, leverCurrent5, leverCurrent6, leverCurrent7, leverCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let leverCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let leverVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let leverRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(leverStockObject.p).toFixed(6);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let leverStockPriceElement = document.getElementById('leverValue' + (leverCounter + 1));
 leverStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 leverStockPriceElement.style.color =
 !leverLastPrice || leverLastPrice === val
 ? 'black'
 : val > leverLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 leverLastPrice = val;
 // Réinitialiser l'objet du flux à null
 leverStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let leverCurrent = 'leverCurrent' + (leverCounter + 1);
 window[leverCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (leverCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[leverCurrent] - window['leverCurrent' + (leverCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['leverCurrent' + (leverCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[leverCurrent] < window['leverCurrent' + (leverCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[leverCurrent] > window['leverCurrent' + (leverCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let leverVarianceElement = document.getElementById('leverVariance' + (leverCounter - 1));
   leverVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     leverVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     leverVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     leverVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   leverVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 leverCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (leverCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let leverVariancePercentSum = parseFloat(leverVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let leverVariancePercentSumSymbol = "";
if (leverVariancePercentSum > 0) {
  // Somme positive : symbole plus
  leverVariancePercentSumSymbol = "+";
} else if (leverVariancePercentSum < 0) {
  // Somme négative : symbole moins
  leverVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
leverVariancePercentSumElement.innerText = leverVariancePercentSumSymbol + leverVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (leverVariancePercentSum < 0) {
 // Somme négative : rouge
 leverVariancePercentSumElement.style.color = 'red';
} else if (leverVariancePercentSum > 0) {
 // Somme positive : vert
 leverVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 leverVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau leverVariancePercentArray
let negativeCount = countNegativeElements(leverVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau leverVariancePercentArray
let positiveCount = countPositiveElements(leverVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau leverVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    leverMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/LEVERUSDT?_from=markets' target='_blank'>LEVER</a>"; // insérer le lien sur LEVER et le message
    leverMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    leverMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/LEVERUSDT?_from=markets' target='_blank'>LEVER</a>"; // insérer le lien sur LEVER et le message
    leverMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    leverMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(leverRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== LDO ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsLdo = new WebSocket('wss://stream.binance.com:9443/ws/ldousdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let ldoStockPriceElement0 = document.getElementById('ldoValue0');
let ldoStockPriceElement1 = document.getElementById('ldoValue1');
let ldoStockPriceElement2 = document.getElementById('ldoValue2');
let ldoStockPriceElement3 = document.getElementById('ldoValue3');
let ldoStockPriceElement4 = document.getElementById('ldoValue4');
let ldoStockPriceElement5 = document.getElementById('ldoValue5');
let ldoStockPriceElement6 = document.getElementById('ldoValue6');
let ldoStockPriceElement7 = document.getElementById('ldoValue7');
let ldoStockPriceElement8 = document.getElementById('ldoValue8');
let ldoStockPriceElement9 = document.getElementById('ldoValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let ldoVarianceElement0 = document.getElementById('ldoVariance0');
let ldoVarianceElement1 = document.getElementById('ldoVariance1');
let ldoVarianceElement2 = document.getElementById('ldoVariance2');
let ldoVarianceElement3 = document.getElementById('ldoVariance3');
let ldoVarianceElement4 = document.getElementById('ldoVariance4');
let ldoVarianceElement5 = document.getElementById('ldoVariance5');
let ldoVarianceElement6 = document.getElementById('ldoVariance6');
let ldoVarianceElement7 = document.getElementById('ldoVariance7');
let ldoVarianceElement8 = document.getElementById('ldoVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let ldoVariancePercentSumElement = document.getElementById('ldoVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let ldoMessageElement = document.getElementById('ldoMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let ldoLastPrice = null;
let ldoStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsLdo.onmessage = (event) => {
 // Convertir le message en objet JSON
 ldoStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let ldoCurrent1 ,ldoCurrent2, ldoCurrent3, ldoCurrent4, ldoCurrent5, ldoCurrent6, ldoCurrent7, ldoCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let ldoCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let ldoVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let ldoRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(ldoStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let ldoStockPriceElement = document.getElementById('ldoValue' + (ldoCounter + 1));
 ldoStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 ldoStockPriceElement.style.color =
 !ldoLastPrice || ldoLastPrice === val
 ? 'black'
 : val > ldoLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 ldoLastPrice = val;
 // Réinitialiser l'objet du flux à null
 ldoStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let ldoCurrent = 'ldoCurrent' + (ldoCounter + 1);
 window[ldoCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (ldoCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[ldoCurrent] - window['ldoCurrent' + (ldoCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['ldoCurrent' + (ldoCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[ldoCurrent] < window['ldoCurrent' + (ldoCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[ldoCurrent] > window['ldoCurrent' + (ldoCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let ldoVarianceElement = document.getElementById('ldoVariance' + (ldoCounter - 1));
   ldoVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     ldoVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     ldoVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     ldoVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   ldoVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 ldoCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (ldoCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let ldoVariancePercentSum = parseFloat(ldoVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let ldoVariancePercentSumSymbol = "";
if (ldoVariancePercentSum > 0) {
  // Somme positive : symbole plus
  ldoVariancePercentSumSymbol = "+";
} else if (ldoVariancePercentSum < 0) {
  // Somme négative : symbole moins
  ldoVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
ldoVariancePercentSumElement.innerText = ldoVariancePercentSumSymbol + ldoVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (ldoVariancePercentSum < 0) {
 // Somme négative : rouge
 ldoVariancePercentSumElement.style.color = 'red';
} else if (ldoVariancePercentSum > 0) {
 // Somme positive : vert
 ldoVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 ldoVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau ldoVariancePercentArray
let negativeCount = countNegativeElements(ldoVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau ldoVariancePercentArray
let positiveCount = countPositiveElements(ldoVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau ldoVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    ldoMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/LDOUSDT?_from=markets' target='_blank'>LDO</a>"; // insérer le lien sur LDO et le message
    ldoMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    ldoMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/LDOUSDT?_from=markets' target='_blank'>LDO</a>"; // insérer le lien sur LDO et le message
    ldoMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    ldoMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(ldoRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== KEY ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsKey = new WebSocket('wss://stream.binance.com:9443/ws/keyusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let keyStockPriceElement0 = document.getElementById('keyValue0');
let keyStockPriceElement1 = document.getElementById('keyValue1');
let keyStockPriceElement2 = document.getElementById('keyValue2');
let keyStockPriceElement3 = document.getElementById('keyValue3');
let keyStockPriceElement4 = document.getElementById('keyValue4');
let keyStockPriceElement5 = document.getElementById('keyValue5');
let keyStockPriceElement6 = document.getElementById('keyValue6');
let keyStockPriceElement7 = document.getElementById('keyValue7');
let keyStockPriceElement8 = document.getElementById('keyValue8');
let keyStockPriceElement9 = document.getElementById('keyValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let keyVarianceElement0 = document.getElementById('keyVariance0');
let keyVarianceElement1 = document.getElementById('keyVariance1');
let keyVarianceElement2 = document.getElementById('keyVariance2');
let keyVarianceElement3 = document.getElementById('keyVariance3');
let keyVarianceElement4 = document.getElementById('keyVariance4');
let keyVarianceElement5 = document.getElementById('keyVariance5');
let keyVarianceElement6 = document.getElementById('keyVariance6');
let keyVarianceElement7 = document.getElementById('keyVariance7');
let keyVarianceElement8 = document.getElementById('keyVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let keyVariancePercentSumElement = document.getElementById('keyVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let keyMessageElement = document.getElementById('keyMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let keyLastPrice = null;
let keyStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsKey.onmessage = (event) => {
 // Convertir le message en objet JSON
 keyStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let keyCurrent1 ,keyCurrent2, keyCurrent3, keyCurrent4, keyCurrent5, keyCurrent6, keyCurrent7, keyCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let keyCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let keyVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let keyRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(keyStockObject.p).toFixed(6);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let keyStockPriceElement = document.getElementById('keyValue' + (keyCounter + 1));
 keyStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 keyStockPriceElement.style.color =
 !keyLastPrice || keyLastPrice === val
 ? 'black'
 : val > keyLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 keyLastPrice = val;
 // Réinitialiser l'objet du flux à null
 keyStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let keyCurrent = 'keyCurrent' + (keyCounter + 1);
 window[keyCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (keyCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[keyCurrent] - window['keyCurrent' + (keyCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['keyCurrent' + (keyCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[keyCurrent] < window['keyCurrent' + (keyCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[keyCurrent] > window['keyCurrent' + (keyCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let keyVarianceElement = document.getElementById('keyVariance' + (keyCounter - 1));
   keyVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     keyVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     keyVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     keyVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   keyVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 keyCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (keyCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let keyVariancePercentSum = parseFloat(keyVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let keyVariancePercentSumSymbol = "";
if (keyVariancePercentSum > 0) {
  // Somme positive : symbole plus
  keyVariancePercentSumSymbol = "+";
} else if (keyVariancePercentSum < 0) {
  // Somme négative : symbole moins
  keyVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
keyVariancePercentSumElement.innerText = keyVariancePercentSumSymbol + keyVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (keyVariancePercentSum < 0) {
 // Somme négative : rouge
 keyVariancePercentSumElement.style.color = 'red';
} else if (keyVariancePercentSum > 0) {
 // Somme positive : vert
 keyVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 keyVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau keyVariancePercentArray
let negativeCount = countNegativeElements(keyVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau keyVariancePercentArray
let positiveCount = countPositiveElements(keyVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau keyVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    keyMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/KEYUSDT?_from=markets' target='_blank'>KEY</a>"; // insérer le lien sur KEY et le message
    keyMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    keyMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/KEYUSDT?_from=markets' target='_blank'>KEY</a>"; // insérer le lien sur KEY et le message
    keyMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    keyMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(keyRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== SXP ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsSxp = new WebSocket('wss://stream.binance.com:9443/ws/sxpusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let sxpStockPriceElement0 = document.getElementById('sxpValue0');
let sxpStockPriceElement1 = document.getElementById('sxpValue1');
let sxpStockPriceElement2 = document.getElementById('sxpValue2');
let sxpStockPriceElement3 = document.getElementById('sxpValue3');
let sxpStockPriceElement4 = document.getElementById('sxpValue4');
let sxpStockPriceElement5 = document.getElementById('sxpValue5');
let sxpStockPriceElement6 = document.getElementById('sxpValue6');
let sxpStockPriceElement7 = document.getElementById('sxpValue7');
let sxpStockPriceElement8 = document.getElementById('sxpValue8');
let sxpStockPriceElement9 = document.getElementById('sxpValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let sxpVarianceElement0 = document.getElementById('sxpVariance0');
let sxpVarianceElement1 = document.getElementById('sxpVariance1');
let sxpVarianceElement2 = document.getElementById('sxpVariance2');
let sxpVarianceElement3 = document.getElementById('sxpVariance3');
let sxpVarianceElement4 = document.getElementById('sxpVariance4');
let sxpVarianceElement5 = document.getElementById('sxpVariance5');
let sxpVarianceElement6 = document.getElementById('sxpVariance6');
let sxpVarianceElement7 = document.getElementById('sxpVariance7');
let sxpVarianceElement8 = document.getElementById('sxpVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let sxpVariancePercentSumElement = document.getElementById('sxpVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let sxpMessageElement = document.getElementById('sxpMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let sxpLastPrice = null;
let sxpStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsSxp.onmessage = (event) => {
 // Convertir le message en objet JSON
 sxpStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let sxpCurrent1 ,sxpCurrent2, sxpCurrent3, sxpCurrent4, sxpCurrent5, sxpCurrent6, sxpCurrent7, sxpCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let sxpCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let sxpVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let sxpRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(sxpStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let sxpStockPriceElement = document.getElementById('sxpValue' + (sxpCounter + 1));
 sxpStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 sxpStockPriceElement.style.color =
 !sxpLastPrice || sxpLastPrice === val
 ? 'black'
 : val > sxpLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 sxpLastPrice = val;
 // Réinitialiser l'objet du flux à null
 sxpStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let sxpCurrent = 'sxpCurrent' + (sxpCounter + 1);
 window[sxpCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (sxpCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[sxpCurrent] - window['sxpCurrent' + (sxpCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['sxpCurrent' + (sxpCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[sxpCurrent] < window['sxpCurrent' + (sxpCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[sxpCurrent] > window['sxpCurrent' + (sxpCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let sxpVarianceElement = document.getElementById('sxpVariance' + (sxpCounter - 1));
   sxpVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     sxpVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     sxpVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     sxpVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   sxpVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 sxpCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (sxpCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let sxpVariancePercentSum = parseFloat(sxpVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let sxpVariancePercentSumSymbol = "";
if (sxpVariancePercentSum > 0) {
  // Somme positive : symbole plus
  sxpVariancePercentSumSymbol = "+";
} else if (sxpVariancePercentSum < 0) {
  // Somme négative : symbole moins
  sxpVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
sxpVariancePercentSumElement.innerText = sxpVariancePercentSumSymbol + sxpVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (sxpVariancePercentSum < 0) {
 // Somme négative : rouge
 sxpVariancePercentSumElement.style.color = 'red';
} else if (sxpVariancePercentSum > 0) {
 // Somme positive : vert
 sxpVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 sxpVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau sxpVariancePercentArray
let negativeCount = countNegativeElements(sxpVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau sxpVariancePercentArray
let positiveCount = countPositiveElements(sxpVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau sxpVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    sxpMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/SXPUSDT?_from=markets' target='_blank'>SXP</a>"; // insérer le lien sur SXP et le message
    sxpMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    sxpMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/SXPUSDT?_from=markets' target='_blank'>SXP</a>"; // insérer le lien sur SXP et le message
    sxpMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    sxpMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(sxpRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== NKN ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsNkn = new WebSocket('wss://stream.binance.com:9443/ws/nknusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let nknStockPriceElement0 = document.getElementById('nknValue0');
let nknStockPriceElement1 = document.getElementById('nknValue1');
let nknStockPriceElement2 = document.getElementById('nknValue2');
let nknStockPriceElement3 = document.getElementById('nknValue3');
let nknStockPriceElement4 = document.getElementById('nknValue4');
let nknStockPriceElement5 = document.getElementById('nknValue5');
let nknStockPriceElement6 = document.getElementById('nknValue6');
let nknStockPriceElement7 = document.getElementById('nknValue7');
let nknStockPriceElement8 = document.getElementById('nknValue8');
let nknStockPriceElement9 = document.getElementById('nknValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let nknVarianceElement0 = document.getElementById('nknVariance0');
let nknVarianceElement1 = document.getElementById('nknVariance1');
let nknVarianceElement2 = document.getElementById('nknVariance2');
let nknVarianceElement3 = document.getElementById('nknVariance3');
let nknVarianceElement4 = document.getElementById('nknVariance4');
let nknVarianceElement5 = document.getElementById('nknVariance5');
let nknVarianceElement6 = document.getElementById('nknVariance6');
let nknVarianceElement7 = document.getElementById('nknVariance7');
let nknVarianceElement8 = document.getElementById('nknVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let nknVariancePercentSumElement = document.getElementById('nknVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let nknMessageElement = document.getElementById('nknMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let nknLastPrice = null;
let nknStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsNkn.onmessage = (event) => {
 // Convertir le message en objet JSON
 nknStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let nknCurrent1 ,nknCurrent2, nknCurrent3, nknCurrent4, nknCurrent5, nknCurrent6, nknCurrent7, nknCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let nknCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let nknVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let nknRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(nknStockObject.p).toFixed(5);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let nknStockPriceElement = document.getElementById('nknValue' + (nknCounter + 1));
 nknStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 nknStockPriceElement.style.color =
 !nknLastPrice || nknLastPrice === val
 ? 'black'
 : val > nknLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 nknLastPrice = val;
 // Réinitialiser l'objet du flux à null
 nknStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let nknCurrent = 'nknCurrent' + (nknCounter + 1);
 window[nknCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (nknCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[nknCurrent] - window['nknCurrent' + (nknCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['nknCurrent' + (nknCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[nknCurrent] < window['nknCurrent' + (nknCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[nknCurrent] > window['nknCurrent' + (nknCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let nknVarianceElement = document.getElementById('nknVariance' + (nknCounter - 1));
   nknVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     nknVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     nknVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     nknVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   nknVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 nknCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (nknCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let nknVariancePercentSum = parseFloat(nknVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let nknVariancePercentSumSymbol = "";
if (nknVariancePercentSum > 0) {
  // Somme positive : symbole plus
  nknVariancePercentSumSymbol = "+";
} else if (nknVariancePercentSum < 0) {
  // Somme négative : symbole moins
  nknVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
nknVariancePercentSumElement.innerText = nknVariancePercentSumSymbol + nknVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (nknVariancePercentSum < 0) {
 // Somme négative : rouge
 nknVariancePercentSumElement.style.color = 'red';
} else if (nknVariancePercentSum > 0) {
 // Somme positive : vert
 nknVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 nknVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau nknVariancePercentArray
let negativeCount = countNegativeElements(nknVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau nknVariancePercentArray
let positiveCount = countPositiveElements(nknVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau nknVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    nknMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/NKNUSDT?_from=markets' target='_blank'>NKN</a>"; // insérer le lien sur NKN et le message
    nknMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    nknMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/NKNUSDT?_from=markets' target='_blank'>NKN</a>"; // insérer le lien sur NKN et le message
    nknMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    nknMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(nknRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== APT ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsApt = new WebSocket('wss://stream.binance.com:9443/ws/aptusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let aptStockPriceElement0 = document.getElementById('aptValue0');
let aptStockPriceElement1 = document.getElementById('aptValue1');
let aptStockPriceElement2 = document.getElementById('aptValue2');
let aptStockPriceElement3 = document.getElementById('aptValue3');
let aptStockPriceElement4 = document.getElementById('aptValue4');
let aptStockPriceElement5 = document.getElementById('aptValue5');
let aptStockPriceElement6 = document.getElementById('aptValue6');
let aptStockPriceElement7 = document.getElementById('aptValue7');
let aptStockPriceElement8 = document.getElementById('aptValue8');
let aptStockPriceElement9 = document.getElementById('aptValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let aptVarianceElement0 = document.getElementById('aptVariance0');
let aptVarianceElement1 = document.getElementById('aptVariance1');
let aptVarianceElement2 = document.getElementById('aptVariance2');
let aptVarianceElement3 = document.getElementById('aptVariance3');
let aptVarianceElement4 = document.getElementById('aptVariance4');
let aptVarianceElement5 = document.getElementById('aptVariance5');
let aptVarianceElement6 = document.getElementById('aptVariance6');
let aptVarianceElement7 = document.getElementById('aptVariance7');
let aptVarianceElement8 = document.getElementById('aptVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let aptVariancePercentSumElement = document.getElementById('aptVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let aptMessageElement = document.getElementById('aptMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let aptLastPrice = null;
let aptStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsApt.onmessage = (event) => {
 // Convertir le message en objet JSON
 aptStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let aptCurrent1 ,aptCurrent2, aptCurrent3, aptCurrent4, aptCurrent5, aptCurrent6, aptCurrent7, aptCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let aptCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let aptVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let aptRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(aptStockObject.p).toFixed(3);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let aptStockPriceElement = document.getElementById('aptValue' + (aptCounter + 1));
 aptStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 aptStockPriceElement.style.color =
 !aptLastPrice || aptLastPrice === val
 ? 'black'
 : val > aptLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 aptLastPrice = val;
 // Réinitialiser l'objet du flux à null
 aptStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let aptCurrent = 'aptCurrent' + (aptCounter + 1);
 window[aptCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (aptCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[aptCurrent] - window['aptCurrent' + (aptCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['aptCurrent' + (aptCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[aptCurrent] < window['aptCurrent' + (aptCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[aptCurrent] > window['aptCurrent' + (aptCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let aptVarianceElement = document.getElementById('aptVariance' + (aptCounter - 1));
   aptVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     aptVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     aptVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     aptVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   aptVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 aptCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (aptCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let aptVariancePercentSum = parseFloat(aptVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let aptVariancePercentSumSymbol = "";
if (aptVariancePercentSum > 0) {
  // Somme positive : symbole plus
  aptVariancePercentSumSymbol = "+";
} else if (aptVariancePercentSum < 0) {
  // Somme négative : symbole moins
  aptVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
aptVariancePercentSumElement.innerText = aptVariancePercentSumSymbol + aptVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (aptVariancePercentSum < 0) {
 // Somme négative : rouge
 aptVariancePercentSumElement.style.color = 'red';
} else if (aptVariancePercentSum > 0) {
 // Somme positive : vert
 aptVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 aptVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau aptVariancePercentArray
let negativeCount = countNegativeElements(aptVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau aptVariancePercentArray
let positiveCount = countPositiveElements(aptVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau aptVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    aptMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/APTUSDT?_from=markets' target='_blank'>APT</a>"; // insérer le lien sur APT et le message
    aptMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    aptMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/APTUSDT?_from=markets' target='_blank'>APT</a>"; // insérer le lien sur APT et le message
    aptMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    aptMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(aptRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== MTL ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsMtl = new WebSocket('wss://stream.binance.com:9443/ws/mtlusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let mtlStockPriceElement0 = document.getElementById('mtlValue0');
let mtlStockPriceElement1 = document.getElementById('mtlValue1');
let mtlStockPriceElement2 = document.getElementById('mtlValue2');
let mtlStockPriceElement3 = document.getElementById('mtlValue3');
let mtlStockPriceElement4 = document.getElementById('mtlValue4');
let mtlStockPriceElement5 = document.getElementById('mtlValue5');
let mtlStockPriceElement6 = document.getElementById('mtlValue6');
let mtlStockPriceElement7 = document.getElementById('mtlValue7');
let mtlStockPriceElement8 = document.getElementById('mtlValue8');
let mtlStockPriceElement9 = document.getElementById('mtlValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let mtlVarianceElement0 = document.getElementById('mtlVariance0');
let mtlVarianceElement1 = document.getElementById('mtlVariance1');
let mtlVarianceElement2 = document.getElementById('mtlVariance2');
let mtlVarianceElement3 = document.getElementById('mtlVariance3');
let mtlVarianceElement4 = document.getElementById('mtlVariance4');
let mtlVarianceElement5 = document.getElementById('mtlVariance5');
let mtlVarianceElement6 = document.getElementById('mtlVariance6');
let mtlVarianceElement7 = document.getElementById('mtlVariance7');
let mtlVarianceElement8 = document.getElementById('mtlVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let mtlVariancePercentSumElement = document.getElementById('mtlVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let mtlMessageElement = document.getElementById('mtlMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let mtlLastPrice = null;
let mtlStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsMtl.onmessage = (event) => {
 // Convertir le message en objet JSON
 mtlStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let mtlCurrent1 ,mtlCurrent2, mtlCurrent3, mtlCurrent4, mtlCurrent5, mtlCurrent6, mtlCurrent7, mtlCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let mtlCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let mtlVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let mtlRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(mtlStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let mtlStockPriceElement = document.getElementById('mtlValue' + (mtlCounter + 1));
 mtlStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 mtlStockPriceElement.style.color =
 !mtlLastPrice || mtlLastPrice === val
 ? 'black'
 : val > mtlLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 mtlLastPrice = val;
 // Réinitialiser l'objet du flux à null
 mtlStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let mtlCurrent = 'mtlCurrent' + (mtlCounter + 1);
 window[mtlCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (mtlCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[mtlCurrent] - window['mtlCurrent' + (mtlCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['mtlCurrent' + (mtlCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[mtlCurrent] < window['mtlCurrent' + (mtlCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[mtlCurrent] > window['mtlCurrent' + (mtlCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let mtlVarianceElement = document.getElementById('mtlVariance' + (mtlCounter - 1));
   mtlVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     mtlVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     mtlVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     mtlVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   mtlVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 mtlCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (mtlCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let mtlVariancePercentSum = parseFloat(mtlVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let mtlVariancePercentSumSymbol = "";
if (mtlVariancePercentSum > 0) {
  // Somme positive : symbole plus
  mtlVariancePercentSumSymbol = "+";
} else if (mtlVariancePercentSum < 0) {
  // Somme négative : symbole moins
  mtlVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
mtlVariancePercentSumElement.innerText = mtlVariancePercentSumSymbol + mtlVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (mtlVariancePercentSum < 0) {
 // Somme négative : rouge
 mtlVariancePercentSumElement.style.color = 'red';
} else if (mtlVariancePercentSum > 0) {
 // Somme positive : vert
 mtlVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 mtlVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau mtlVariancePercentArray
let negativeCount = countNegativeElements(mtlVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau mtlVariancePercentArray
let positiveCount = countPositiveElements(mtlVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau mtlVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    mtlMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/MTLUSDT?_from=markets' target='_blank'>MTL</a>"; // insérer le lien sur MTL et le message
    mtlMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    mtlMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/MTLUSDT?_from=markets' target='_blank'>MTL</a>"; // insérer le lien sur MTL et le message
    mtlMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    mtlMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(mtlRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== FIL ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsFil = new WebSocket('wss://stream.binance.com:9443/ws/filusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let filStockPriceElement0 = document.getElementById('filValue0');
let filStockPriceElement1 = document.getElementById('filValue1');
let filStockPriceElement2 = document.getElementById('filValue2');
let filStockPriceElement3 = document.getElementById('filValue3');
let filStockPriceElement4 = document.getElementById('filValue4');
let filStockPriceElement5 = document.getElementById('filValue5');
let filStockPriceElement6 = document.getElementById('filValue6');
let filStockPriceElement7 = document.getElementById('filValue7');
let filStockPriceElement8 = document.getElementById('filValue8');
let filStockPriceElement9 = document.getElementById('filValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let filVarianceElement0 = document.getElementById('filVariance0');
let filVarianceElement1 = document.getElementById('filVariance1');
let filVarianceElement2 = document.getElementById('filVariance2');
let filVarianceElement3 = document.getElementById('filVariance3');
let filVarianceElement4 = document.getElementById('filVariance4');
let filVarianceElement5 = document.getElementById('filVariance5');
let filVarianceElement6 = document.getElementById('filVariance6');
let filVarianceElement7 = document.getElementById('filVariance7');
let filVarianceElement8 = document.getElementById('filVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let filVariancePercentSumElement = document.getElementById('filVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let filMessageElement = document.getElementById('filMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let filLastPrice = null;
let filStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsFil.onmessage = (event) => {
 // Convertir le message en objet JSON
 filStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let filCurrent1 ,filCurrent2, filCurrent3, filCurrent4, filCurrent5, filCurrent6, filCurrent7, filCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let filCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let filVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let filRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(filStockObject.p).toFixed(3);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let filStockPriceElement = document.getElementById('filValue' + (filCounter + 1));
 filStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 filStockPriceElement.style.color =
 !filLastPrice || filLastPrice === val
 ? 'black'
 : val > filLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 filLastPrice = val;
 // Réinitialiser l'objet du flux à null
 filStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let filCurrent = 'filCurrent' + (filCounter + 1);
 window[filCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (filCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[filCurrent] - window['filCurrent' + (filCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['filCurrent' + (filCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[filCurrent] < window['filCurrent' + (filCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[filCurrent] > window['filCurrent' + (filCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let filVarianceElement = document.getElementById('filVariance' + (filCounter - 1));
   filVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     filVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     filVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     filVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   filVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 filCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (filCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let filVariancePercentSum = parseFloat(filVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let filVariancePercentSumSymbol = "";
if (filVariancePercentSum > 0) {
  // Somme positive : symbole plus
  filVariancePercentSumSymbol = "+";
} else if (filVariancePercentSum < 0) {
  // Somme négative : symbole moins
  filVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
filVariancePercentSumElement.innerText = filVariancePercentSumSymbol + filVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (filVariancePercentSum < 0) {
 // Somme négative : rouge
 filVariancePercentSumElement.style.color = 'red';
} else if (filVariancePercentSum > 0) {
 // Somme positive : vert
 filVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 filVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau filVariancePercentArray
let negativeCount = countNegativeElements(filVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau filVariancePercentArray
let positiveCount = countPositiveElements(filVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau filVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    filMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/FILUSDT?_from=markets' target='_blank'>FIL</a>"; // insérer le lien sur FIL et le message
    filMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    filMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/FILUSDT?_from=markets' target='_blank'>FIL</a>"; // insérer le lien sur FIL et le message
    filMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    filMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(filRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== TRU ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsTru = new WebSocket('wss://stream.binance.com:9443/ws/truusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let truStockPriceElement0 = document.getElementById('truValue0');
let truStockPriceElement1 = document.getElementById('truValue1');
let truStockPriceElement2 = document.getElementById('truValue2');
let truStockPriceElement3 = document.getElementById('truValue3');
let truStockPriceElement4 = document.getElementById('truValue4');
let truStockPriceElement5 = document.getElementById('truValue5');
let truStockPriceElement6 = document.getElementById('truValue6');
let truStockPriceElement7 = document.getElementById('truValue7');
let truStockPriceElement8 = document.getElementById('truValue8');
let truStockPriceElement9 = document.getElementById('truValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let truVarianceElement0 = document.getElementById('truVariance0');
let truVarianceElement1 = document.getElementById('truVariance1');
let truVarianceElement2 = document.getElementById('truVariance2');
let truVarianceElement3 = document.getElementById('truVariance3');
let truVarianceElement4 = document.getElementById('truVariance4');
let truVarianceElement5 = document.getElementById('truVariance5');
let truVarianceElement6 = document.getElementById('truVariance6');
let truVarianceElement7 = document.getElementById('truVariance7');
let truVarianceElement8 = document.getElementById('truVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let truVariancePercentSumElement = document.getElementById('truVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let truMessageElement = document.getElementById('truMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let truLastPrice = null;
let truStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsTru.onmessage = (event) => {
 // Convertir le message en objet JSON
 truStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let truCurrent1 ,truCurrent2, truCurrent3, truCurrent4, truCurrent5, truCurrent6, truCurrent7, truCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let truCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let truVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let truRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(truStockObject.p).toFixed(5);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let truStockPriceElement = document.getElementById('truValue' + (truCounter + 1));
 truStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 truStockPriceElement.style.color =
 !truLastPrice || truLastPrice === val
 ? 'black'
 : val > truLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 truLastPrice = val;
 // Réinitialiser l'objet du flux à null
 truStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let truCurrent = 'truCurrent' + (truCounter + 1);
 window[truCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (truCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[truCurrent] - window['truCurrent' + (truCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['truCurrent' + (truCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[truCurrent] < window['truCurrent' + (truCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[truCurrent] > window['truCurrent' + (truCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let truVarianceElement = document.getElementById('truVariance' + (truCounter - 1));
   truVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     truVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     truVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     truVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   truVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 truCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (truCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let truVariancePercentSum = parseFloat(truVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let truVariancePercentSumSymbol = "";
if (truVariancePercentSum > 0) {
  // Somme positive : symbole plus
  truVariancePercentSumSymbol = "+";
} else if (truVariancePercentSum < 0) {
  // Somme négative : symbole moins
  truVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
truVariancePercentSumElement.innerText = truVariancePercentSumSymbol + truVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (truVariancePercentSum < 0) {
 // Somme négative : rouge
 truVariancePercentSumElement.style.color = 'red';
} else if (truVariancePercentSum > 0) {
 // Somme positive : vert
 truVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 truVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau truVariancePercentArray
let negativeCount = countNegativeElements(truVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau truVariancePercentArray
let positiveCount = countPositiveElements(truVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau truVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    truMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/TRUUSDT?_from=markets' target='_blank'>TRU</a>"; // insérer le lien sur TRU et le message
    truMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    truMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/TRUUSDT?_from=markets' target='_blank'>TRU</a>"; // insérer le lien sur TRU et le message
    truMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    truMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(truRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== TOMO ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsTomo = new WebSocket('wss://stream.binance.com:9443/ws/tomousdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let tomoStockPriceElement0 = document.getElementById('tomoValue0');
let tomoStockPriceElement1 = document.getElementById('tomoValue1');
let tomoStockPriceElement2 = document.getElementById('tomoValue2');
let tomoStockPriceElement3 = document.getElementById('tomoValue3');
let tomoStockPriceElement4 = document.getElementById('tomoValue4');
let tomoStockPriceElement5 = document.getElementById('tomoValue5');
let tomoStockPriceElement6 = document.getElementById('tomoValue6');
let tomoStockPriceElement7 = document.getElementById('tomoValue7');
let tomoStockPriceElement8 = document.getElementById('tomoValue8');
let tomoStockPriceElement9 = document.getElementById('tomoValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let tomoVarianceElement0 = document.getElementById('tomoVariance0');
let tomoVarianceElement1 = document.getElementById('tomoVariance1');
let tomoVarianceElement2 = document.getElementById('tomoVariance2');
let tomoVarianceElement3 = document.getElementById('tomoVariance3');
let tomoVarianceElement4 = document.getElementById('tomoVariance4');
let tomoVarianceElement5 = document.getElementById('tomoVariance5');
let tomoVarianceElement6 = document.getElementById('tomoVariance6');
let tomoVarianceElement7 = document.getElementById('tomoVariance7');
let tomoVarianceElement8 = document.getElementById('tomoVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let tomoVariancePercentSumElement = document.getElementById('tomoVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let tomoMessageElement = document.getElementById('tomoMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let tomoLastPrice = null;
let tomoStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsTomo.onmessage = (event) => {
 // Convertir le message en objet JSON
 tomoStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let tomoCurrent1 ,tomoCurrent2, tomoCurrent3, tomoCurrent4, tomoCurrent5, tomoCurrent6, tomoCurrent7, tomoCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let tomoCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let tomoVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let tomoRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(tomoStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let tomoStockPriceElement = document.getElementById('tomoValue' + (tomoCounter + 1));
 tomoStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 tomoStockPriceElement.style.color =
 !tomoLastPrice || tomoLastPrice === val
 ? 'black'
 : val > tomoLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 tomoLastPrice = val;
 // Réinitialiser l'objet du flux à null
 tomoStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let tomoCurrent = 'tomoCurrent' + (tomoCounter + 1);
 window[tomoCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (tomoCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[tomoCurrent] - window['tomoCurrent' + (tomoCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['tomoCurrent' + (tomoCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[tomoCurrent] < window['tomoCurrent' + (tomoCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[tomoCurrent] > window['tomoCurrent' + (tomoCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let tomoVarianceElement = document.getElementById('tomoVariance' + (tomoCounter - 1));
   tomoVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     tomoVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     tomoVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     tomoVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   tomoVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 tomoCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (tomoCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let tomoVariancePercentSum = parseFloat(tomoVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let tomoVariancePercentSumSymbol = "";
if (tomoVariancePercentSum > 0) {
  // Somme positive : symbole plus
  tomoVariancePercentSumSymbol = "+";
} else if (tomoVariancePercentSum < 0) {
  // Somme négative : symbole moins
  tomoVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
tomoVariancePercentSumElement.innerText = tomoVariancePercentSumSymbol + tomoVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (tomoVariancePercentSum < 0) {
 // Somme négative : rouge
 tomoVariancePercentSumElement.style.color = 'red';
} else if (tomoVariancePercentSum > 0) {
 // Somme positive : vert
 tomoVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 tomoVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau tomoVariancePercentArray
let negativeCount = countNegativeElements(tomoVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau tomoVariancePercentArray
let positiveCount = countPositiveElements(tomoVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau tomoVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    tomoMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/TOMOUSDT?_from=markets' target='_blank'>TOMO</a>"; // insérer le lien sur TOMO et le message
    tomoMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    tomoMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/TOMOUSDT?_from=markets' target='_blank'>TOMO</a>"; // insérer le lien sur TOMO et le message
    tomoMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    tomoMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(tomoRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== OCEAN ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsOcean = new WebSocket('wss://stream.binance.com:9443/ws/oceanusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let oceanStockPriceElement0 = document.getElementById('oceanValue0');
let oceanStockPriceElement1 = document.getElementById('oceanValue1');
let oceanStockPriceElement2 = document.getElementById('oceanValue2');
let oceanStockPriceElement3 = document.getElementById('oceanValue3');
let oceanStockPriceElement4 = document.getElementById('oceanValue4');
let oceanStockPriceElement5 = document.getElementById('oceanValue5');
let oceanStockPriceElement6 = document.getElementById('oceanValue6');
let oceanStockPriceElement7 = document.getElementById('oceanValue7');
let oceanStockPriceElement8 = document.getElementById('oceanValue8');
let oceanStockPriceElement9 = document.getElementById('oceanValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let oceanVarianceElement0 = document.getElementById('oceanVariance0');
let oceanVarianceElement1 = document.getElementById('oceanVariance1');
let oceanVarianceElement2 = document.getElementById('oceanVariance2');
let oceanVarianceElement3 = document.getElementById('oceanVariance3');
let oceanVarianceElement4 = document.getElementById('oceanVariance4');
let oceanVarianceElement5 = document.getElementById('oceanVariance5');
let oceanVarianceElement6 = document.getElementById('oceanVariance6');
let oceanVarianceElement7 = document.getElementById('oceanVariance7');
let oceanVarianceElement8 = document.getElementById('oceanVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let oceanVariancePercentSumElement = document.getElementById('oceanVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let oceanMessageElement = document.getElementById('oceanMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let oceanLastPrice = null;
let oceanStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsOcean.onmessage = (event) => {
 // Convertir le message en objet JSON
 oceanStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let oceanCurrent1 ,oceanCurrent2, oceanCurrent3, oceanCurrent4, oceanCurrent5, oceanCurrent6, oceanCurrent7, oceanCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let oceanCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let oceanVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let oceanRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 15 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(oceanStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let oceanStockPriceElement = document.getElementById('oceanValue' + (oceanCounter + 1));
 oceanStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 oceanStockPriceElement.style.color =
 !oceanLastPrice || oceanLastPrice === val
 ? 'black'
 : val > oceanLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 oceanLastPrice = val;
 // Réinitialiser l'objet du flux à null
 oceanStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let oceanCurrent = 'oceanCurrent' + (oceanCounter + 1);
 window[oceanCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (oceanCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[oceanCurrent] - window['oceanCurrent' + (oceanCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['oceanCurrent' + (oceanCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[oceanCurrent] < window['oceanCurrent' + (oceanCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[oceanCurrent] > window['oceanCurrent' + (oceanCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let oceanVarianceElement = document.getElementById('oceanVariance' + (oceanCounter - 1));
   oceanVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     oceanVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     oceanVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     oceanVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   oceanVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 oceanCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (oceanCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let oceanVariancePercentSum = parseFloat(oceanVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let oceanVariancePercentSumSymbol = "";
if (oceanVariancePercentSum > 0) {
  // Somme positive : symbole plus
  oceanVariancePercentSumSymbol = "+";
} else if (oceanVariancePercentSum < 0) {
  // Somme négative : symbole moins
  oceanVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
oceanVariancePercentSumElement.innerText = oceanVariancePercentSumSymbol + oceanVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (oceanVariancePercentSum < 0) {
 // Somme négative : rouge
 oceanVariancePercentSumElement.style.color = 'red';
} else if (oceanVariancePercentSum > 0) {
 // Somme positive : vert
 oceanVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 oceanVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau oceanVariancePercentArray
let negativeCount = countNegativeElements(oceanVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau oceanVariancePercentArray
let positiveCount = countPositiveElements(oceanVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau oceanVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    oceanMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/OCEANUSDT?_from=markets' target='_blank'>OCEAN</a>"; // insérer le lien sur OCEAN et le message
    oceanMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    oceanMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/OCEANUSDT?_from=markets' target='_blank'>OCEAN</a>"; // insérer le lien sur OCEAN et le message
    oceanMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    oceanMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(oceanRunTimers);
}
}, 900000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

