let projectsData = [];
const projectsSection = document.getElementById("projects");
const container = document.getElementById("projects-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const loader = document.getElementById("loader");

// Fetch Data
async function init() {
  try {
    // 5-second loader duration as requested
    await new Promise((r) => setTimeout(r, 5000));

    const response = await fetch("projects.json");
    if (!response.ok) throw new Error("Network response was not ok");
    projectsData = await response.json();

    renderProjects();

    const cards = document.querySelectorAll(".project-section-wrapper");
    cards.forEach((el) => observer.observe(el));

    loader.classList.add("hidden");
  } catch (error) {
    console.error("Failed to load projects:", error);
    loader.innerHTML =
      "<p style='color:white; z-index:10000; text-align:center'>Please run with a local server to load JSON data.<br>e.g., Live Server or 'npx serve'</p>";
  }
}

// Render Projects
function renderProjects() {
  container.innerHTML = projectsData
    .map(
      (project) => `
    <div class="project-section-wrapper" id="project-${
      project.id
    }" data-colors='${JSON.stringify(project.colors || [])}'>
      <div class="bg-icon" style="color: ${getAccentColor(project.id)}">
          ${project.projectIcon}
      </div>
      
      <div class="project-card">
          <div class="project-mockup">
              <div class="mockup-container">
                  <img src="assets/bezel.svg" class="bezel-img" alt="Bezel">
                  <img src="${project.mobileScreenshot}" alt="${
        project.title
      } Screenshot" class="screen-img">
              </div>
          </div>
          
          <div class="project-details">
              <h2 class="project-title" style="--accent: ${getAccentColor(
                project.id
              )}">${project.title}</h2>
              <p class="project-desc">${project.description}</p>
              
              <div class="tech-stack">
                  ${(project.techStack || [])
                    .map(
                      (tech) => `
                      <div class="tech-icon" data-tooltip="${
                        tech.tooltip
                      }" style="color: ${getAccentColor(project.id)}">
                          ${tech.name.substring(0, 2).toUpperCase()}
                      </div>
                  `
                    )
                    .join("")}
              </div>
              
              <div class="stats-container">
                  ${Object.entries(project.stats || {})
                    .map(
                      ([key, value]) => `
                      <div class="stat-item">
                          <span style="opacity: 0.7">${key}:</span>
                          <span style="font-weight: 600; color: ${getAccentColor(
                            project.id
                          )}">${value}</span>
                      </div>
                  `
                    )
                    .join("")}
              </div>
              
              <a href="#" class="view-btn" style="border-color: ${getAccentColor(
                project.id
              )}; color: ${getAccentColor(project.id)}">View Details</a>
          </div>
      </div>
    </div>
  `
    )
    .join("");
}

function getAccentColor(id) {
  const colors = ["#00f2ff", "#a855f7", "#ff00ff", "#ff6b00"];
  return colors[(id - 1) % colors.length];
}

// Horizontal Scroll Logic
projectsSection.addEventListener(
  "wheel",
  (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      container.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  },
  { passive: false }
);

// Intersection Observer for Animations & Colors
const observerOptions = {
  root: container,
  threshold: 0.6, // Higher threshold implies more reliable "center" detection
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      updateNavigationState(entry.target);

      // Dynamic Color Logic - Update only if significantly visible
      if (entry.intersectionRatio > 0.5) {
        const colors = JSON.parse(entry.target.dataset.colors || "[]");
        if (colors.length >= 2) {
          const docStyle = document.documentElement.style;
          docStyle.setProperty("--orb-c1", colors[0]);
          docStyle.setProperty("--orb-c2", colors[1]);
          docStyle.setProperty("--orb-c3", colors[2] || colors[0]);
        }
      }
    } else {
      entry.target.classList.remove("active");
    }
  });
}, observerOptions);

// Initialize
init();

// Navigation Logic
function updateNavigationState(target) {
  const isFirst = target === container.firstElementChild;
  const isLast = target === container.lastElementChild;

  prevBtn.hidden = isFirst;
  nextBtn.hidden = isLast;
}

prevBtn.addEventListener("click", () => {
  container.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
});

nextBtn.addEventListener("click", () => {
  container.scrollBy({ left: window.innerWidth, behavior: "smooth" });
});
