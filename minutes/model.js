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
 if (minutes % 2 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(tomoStockObject.p).toFixed(1);
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
}, 120000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

