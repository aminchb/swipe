let characters = [];
let pairs = [];
let scores = {};

// Charger les personnages
fetch("characters.json")
  .then(response => response.json())
  .then(data => {
    characters = data;
    init();
  });

// Initialiser l'application
function init() {
  generatePairs();
  characters.forEach(c => (scores[c.name] = 0));
  showNextPair();
}

// Générer toutes les paires possibles
function generatePairs() {
  for (let i = 0; i < characters.length; i++) {
    for (let j = i + 1; j < characters.length; j++) {
      pairs.push([characters[i], characters[j]]);
    }
  }
}

// Afficher la prochaine paire
function showNextPair() {
  if (pairs.length === 0) {
    showRanking();
    return;
  }

  const [char1, char2] = pairs.pop();
  const card1 = document.getElementById("card1");
  const card2 = document.getElementById("card2");

  card1.textContent = char1.name;
  card1.style.backgroundImage = `url(${char1.image})`;
  card1.onclick = () => handleChoice(char1.name);

  card2.textContent = char2.name;
  card2.style.backgroundImage = `url(${char2.image})`;
  card2.onclick = () => handleChoice(char2.name);
}

// Gérer le choix de l'utilisateur
function handleChoice(winner) {
  scores[winner]++;
  showNextPair();
}

// Afficher le classement
function showRanking() {
  const ranking = document.getElementById("ranking");
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  sorted.forEach(([name, score]) => {
    const li = document.createElement("li");
    li.textContent = `${name} : ${score} points`;
    ranking.appendChild(li);
  });
}