function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

/* AOS */
AOS.init({
  duration: 1000,
  once: true
});

/* Typing Effect */
const text = [
  "Full Stack Developer",
  "React Enthusiast",
  "Python Developer",
  "UI Designer"
];

let i = 0;
let j = 0;
let isDeleting = false;

function type() {
  const el = document.getElementById("typing");
  if (!el) return;

  const current = text[i];

  if (!isDeleting) {
    el.innerHTML = current.substring(0, j++);
  } else {
    el.innerHTML = current.substring(0, j--);
  }

  if (j === current.length + 1) {
    isDeleting = true;
    setTimeout(type, 1000);
    return;
  }

  if (j === 0) {
    isDeleting = false;
    i = (i + 1) % text.length;
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

type();

/* Particles */
particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    color: { value: "#38bdf8" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    move: { speed: 2 }
  }
});
async function loadGitHubRepos() {
  const username = "chandru-gr"; // 🔴 CHANGE THIS

  const container = document.getElementById("repo-container");
  const loader = document.getElementById("loader");

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
    const repos = await res.json();

    loader.style.display = "none";

    repos.slice(0, 9).forEach(repo => {
      const card = document.createElement("div");
      card.className = "repo-card";
      card.setAttribute("data-aos", "zoom-in");

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description available"}</p>

        <div class="badge">⭐ ${repo.stargazers_count} Stars</div>
        <div class="badge">🍴 ${repo.forks_count} Forks</div>
        <div class="badge">💻 ${repo.language || "Unknown"}</div>

        <br/>

        <a href="${repo.html_url}" target="_blank">View Repo →</a>
      `;

      container.appendChild(card);
    });

    AOS.refresh();

  } catch (err) {
    loader.innerHTML = "Failed to load GitHub projects.";
    console.log(err);
  }
}

loadGitHubRepos();