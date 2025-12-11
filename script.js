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

    // Polished horizontal scroll via vertical wheel
    let scrollTimeout;
    let targetScroll = 0;
    let currentScroll = 0;

    // Smooth animation frame for scroll
    const animateScroll = () => {
      const diff = targetScroll - currentScroll;
      if (Math.abs(diff) > 0.5) {
        currentScroll += diff * 0.15; // Smooth easing
        container.scrollLeft = currentScroll;
        requestAnimationFrame(animateScroll);
      } else {
        currentScroll = targetScroll;
        container.scrollLeft = targetScroll;
      }
    };

    const handleWheel = (e) => {
      // Only act on vertical scrolling
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        e.stopPropagation();

        // Increase scroll speed by 2.5x for easier navigation
        const scrollAmount = e.deltaY * 2.5;
        targetScroll = Math.max(
          0,
          Math.min(
            container.scrollWidth - container.clientWidth,
            targetScroll + scrollAmount
          )
        );

        // Trigger smooth animation
        animateScroll();

        // Clear previous snap timeout
        clearTimeout(scrollTimeout);

        // Snap to nearest project after scrolling stops (debounced)
        scrollTimeout = setTimeout(() => {
          const cards = document.querySelectorAll(".project-section-wrapper");
          const containerWidth = container.clientWidth;
          const currentScrollPos = container.scrollLeft;

          // Find nearest card
          let nearestCard = cards[0];
          let minDistance = Math.abs(currentScrollPos - 0);

          cards.forEach((card, index) => {
            const cardPosition = index * containerWidth;
            const distance = Math.abs(currentScrollPos - cardPosition);

            if (distance < minDistance) {
              minDistance = distance;
              nearestCard = card;
            }
          });

          // Smooth scroll to nearest card
          nearestCard.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
          });

          // Update targets after snap
          setTimeout(() => {
            targetScroll = container.scrollLeft;
            currentScroll = container.scrollLeft;
          }, 100);
        }, 200); // Snap after 200ms of no scrolling

        return false;
      }
    };

    // Initialize scroll positions
    currentScroll = container.scrollLeft;
    targetScroll = container.scrollLeft;

    // Attach listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("wheel", handleWheel, { passive: false });

    // Add subtle cursor tilt effect to phone mockups
    const setupPhoneTilt = () => {
      const projectCards = document.querySelectorAll(".project-card");

      projectCards.forEach((card) => {
        const mockup = card.querySelector(".mockup-container");
        if (!mockup) return;

        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left; // X position within the card
          const y = e.clientY - rect.top; // Y position within the card

          // Calculate rotation based on cursor position (normalized to -1 to 1)
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateY = ((x - centerX) / centerX) * 8; // Max 8deg rotation
          const rotateX = ((centerY - y) / centerY) * 8; // Max 8deg rotation

          mockup.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
          // Return to default position
          mockup.style.transform = "perspective(1000px) rotateY(-10deg)";
        });
      });
    };

    // Setup tilt effect after projects are rendered
    setupPhoneTilt();
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

// Horizontal Scroll Logic - will be set up in init()

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
