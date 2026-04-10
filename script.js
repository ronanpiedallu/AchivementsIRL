// 📦 Succès (FACILE À AJOUTER)
const achievements = [
  {
    id: "plant",
    title: "Créer la vie 🌱",
    description: "Planter une graine",
    category: "Vie",
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
  achievements.forEach(a => {
    if (!a.unlocked) {
      if (a.id === "sport" && Math.random() > 0.98) {
        unlock(a.id);
      }
    }
  });
}

setInterval(autoCheck, 4000);

// 🚀 Init
load();
render();