const cards = document.querySelectorAll('.memory-card');

var name;
var referenz;
var referenzCounter;
var sekunden = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var tryCounter = 0;
var foundCounter = 0;

function getName() {
  name = prompt('Enter your name ', '');
  document.getElementById("playerName").innerHTML = name;
  referenz = setInterval(countTime, 1000);
  referenzCounter = setInterval(countTry, 1);
}

function countTime() {
  sekunden++;
  document.getElementById("sekunden").innerHTML = sekunden;
}
function countTry() {
  document.getElementById("try").innerHTML = tryCounter;
}


function flipCard() {
  if (lockBoard) return; //wenn lockBoard true ist, kann keine Karte angeklickt werden
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  tryCounter++;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards(); //Paar gefunden -> Karten werden gesperrt, kein Match karten werden umgedreht
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard); //Entfernen des click events, damit die Karten nicht mehr angeklickt werden können.
  secondCard.removeEventListener('click', flipCard);
  foundCounter++;

  if (foundCounter == 8) {
    clearInterval(referenz);
  }

  resetBoard();
}


function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500); //Verzögerung, bis sich die Karten wieder umdrehen und man weiter spielen kann
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]; //Karten werden zurückgesetzt (Sie können wieder geklickt werden)
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos; //jede karte bekommt eine Zufällige zahle, damit sie durcheinander sind
  });
})(); //funktion wird direkt nach definition aufgerufen

cards.forEach(card => card.addEventListener('click', flipCard)); //jede Karte bekommt die Möglichkeit umgedreht zu werden