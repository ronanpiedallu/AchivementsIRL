// 📦 Succès (FACILE À AJOUTER)
const achievements = [
  {
    id: "plant",
    title: "Créer la vie 🌱",
    description: "Planter une graine",
    category: "Nature",
    unlocked: false
  },
  {
    id: "sport",
    title: "Premier effort 💪",
    description: "Faire 10 pompes",
    category: "Sport",
    unlocked: false
  },
  {
    id: "lecture",
    title: "Lecteur 📚",
    description: "Lire 10 pages",
    category: "Mental",
    unlocked: false
  },
  //social
{
  id: "mariage",
  title: "Joyeux mariage! 💑",
  description: "Se marier.",
  category: "Social",
  unlocked: false
},
{
  id: "travail",
  title: "Get a job! 🕴️",
  description: "Trouver un travail",
  category: "Social",
  unlocked: false
},
{
  id: "Aborder un inconnu dans la rue",
  title: "Nouvelle rencontre 🙋‍♂️",
  description: "Aborder un inconnu dans la rue",
  category: "Social",
  unlocked: false
},
{
  id: "blague",
  title: "P'tit comique 😜",
  description: "Faire une blague à un inconnu dans la rue",
  category: "Social",
  unlocked: false
},

//Manger
{
  id: "piment",
  title: "Spicy life 🌶️",
  description: "Manger épicé.",
  category: "Manger",
  unlocked: false
},
{
  id: "végétarien",
  title: "Végétarien? 🍃",
  description: " Manger une feuille",
  category: "Manger",
  unlocked: false
},
{
  id: "faire à manger",
  title: "Novice en cuisine 🧑‍🍳",
  description: "Se faire à manger soi-même",
  category: "Manger",
  unlocked: false
},

//Sport
{
  id: "bras de fer",
  title: "Vrai bonhomme! 🦾",
  description: " Battre son père au bras de fer",
  category: "Sport",
  unlocked: false
},
{
  id: "SL3jours",
  title: "Sung Jin-woo? 🏋️",
  description: "Avoir une streak de 3 jours sur Sport-Leveling",
  category: "Sport",
  unlocked: false
},
{
  id: "SLlvl1",
  title: "Un système? 🥇",
  description: "Atteindre le niveau 1 sur Sport-Leveling",
  category: "Sport",
  unlocked: false
},

//musique
{
  id: "phonk",
  title: "Edit life 🔥",
  description: "Ecouter de la Phonk",
  category: "Musique",
  unlocked: false
},
{
  id: "opanime",
  title: "Vrai Otaku 🍙",
  description: "Ecouter un opening/ending d'animé",
  category: "Musique",
  unlocked: false
},
{
  id: "pompman",
  title: "Troll rap 🤖",
  description: "Ecouter 2 musiques de Pompman",
  category: "Musique",
  unlocked: false
},
{
  id: "chanter",
  title: "T'es pas Beyoncé 🎤",
  description: "Chanter une musique en langue étrangère",
  category: "Musique",
  unlocked: false
},

//Nature
{
  id: "monterarbre",
  title: "Instinct primaire 🐒",
  description: "Monter à un arbre",
  category: "Nature",
  unlocked: false
},
{
  id: "cailloux",
  title: "Pierre précieuse 🪨",
  description: "Trouver un cailloux plus gros que la paume de sa main",
  category: "Nature",
  unlocked: false
}
];

let currentCategory = "All";

// 🔄 Charger sauvegarde
function load() {
  const saved = JSON.parse(localStorage.getItem("achievements"));

  if (saved) {
    achievements.forEach(a => {
      const found = saved.find(s => s.id === a.id);
      if (found) a.unlocked = found.unlocked;
    });
  }
}

// 💾 Sauvegarder
function save() {
  localStorage.setItem("achievements", JSON.stringify(achievements));
}

// 📊 Progression
function updateProgress() {
  const total = achievements.length;
  const unlocked = achievements.filter(a => a.unlocked).length;
  const percent = Math.round((unlocked / total) * 100);

  document.getElementById("progress-fill").style.width = percent + "%";
  document.getElementById("progress-text").innerText = percent + "% complété";
}

// 📂 Catégories
function renderCategories() {
  const container = document.getElementById("categories");
  container.innerHTML = "";

  const cats = ["All", ...new Set(achievements.map(a => a.category))];

  cats.forEach(cat => {
    const div = document.createElement("div");
    div.className = "category " + (cat === currentCategory ? "active" : "");
    div.innerText = cat;

    div.onclick = () => {
      currentCategory = cat;
      render();
    };

    container.appendChild(div);
  });
}

// 🎨 Render
function render() {
  renderCategories();

  const container = document.getElementById("achievements");
  container.innerHTML = "";

  achievements
    .filter(a => currentCategory === "All" || a.category === currentCategory)
    .forEach(a => {
      const card = document.createElement("div");
      card.className = "card " + (a.unlocked ? "unlocked" : "locked");

      card.innerHTML = `
        <h3>${a.title}</h3>
        <p>${a.description}</p>
        <button onclick="unlock('${a.id}')">
          ${a.unlocked ? "✔ Débloqué" : "Débloquer"}
        </button>
      `;

      container.appendChild(card);
    });

  updateProgress();
}

// 🔓 Débloquer
function unlock(id) {
  const a = achievements.find(x => x.id === id);
  if (!a.unlocked) {
    a.unlocked = true;

    // 🎉 effet visuel simple
    alert("🎉 Succès débloqué : " + a.title);

    save();
    render();
  }
}

// 🤖 Conditions automatiques (simulation simple)
function autoCheck() {
  // 🔒 Désactivé pour éviter les déblocages automatiques
}


// 🚀 Init
load();
render();
