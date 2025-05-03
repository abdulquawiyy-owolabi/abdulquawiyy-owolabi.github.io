document.getElementById("current-year").textContent = new Date().getFullYear();

// Handle mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mainNav = document.querySelector(".main-nav");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("active");
    mobileMenuBtn.querySelector("i").classList.toggle("fa-bars");
    mobileMenuBtn.querySelector("i").classList.toggle("fa-times");
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    if (mainNav.classList.contains("active")) {
      mainNav.classList.remove("active");
      mobileMenuBtn.querySelector("i").classList.add("fa-bars");
      mobileMenuBtn.querySelector("i").classList.remove("fa-times");
    }

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Tabs functionality
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tab = button.getAttribute("data-tab");

    // Remove active class from all buttons and panes
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabPanes.forEach((pane) => pane.classList.remove("active"));

    // Add active class to clicked button and corresponding pane
    button.classList.add("active");
    document.getElementById(tab).classList.add("active");
  });
});

// Reference search functionality
const searchInput = document.getElementById("reference-search");
const referenceItems = document.querySelectorAll(".reference-item");
const noReferencesMsg = document.getElementById("no-references");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    let matchFound = false;

    referenceItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        item.style.display = "block";
        matchFound = true;
      } else {
        item.style.display = "none";
      }
    });

    if (noReferencesMsg) {
      noReferencesMsg.classList.toggle("hidden", matchFound);
    }
  });
}

// Tags click functionality
document.querySelectorAll(".tag").forEach((tag) => {
  tag.addEventListener("click", () => {
    if (searchInput) {
      searchInput.value = tag.textContent;
      searchInput.dispatchEvent(new Event("input"));
    }
  });
});

// Charts
window.addEventListener("load", function () {
  // Land Suitability Distribution Chart
  const suitabilityCtx = document.getElementById("suitabilityChart");
  if (suitabilityCtx) {
    new Chart(suitabilityCtx, {
      type: "bar",
      data: {
        labels: [
          "Highly Suitable",
          "Moderately Suitable",
          "Marginally Suitable",
          "Unsuitable",
        ],
        datasets: [
          {
            label: "Area (Hectares)",
            data: [167908.7925, 769160.1525, 859601.8525, 80077.8125],
            backgroundColor: ["#2e7d32", "#f9a825", "#e65100", "#b71c1c"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  // Factor Influence Chart
  const factorCtx = document.getElementById("factorChart");
  if (factorCtx) {
    new Chart(factorCtx, {
      type: "bar",
      data: {
        labels: [
          "Solar Radiation",
          "Grid Proximity",
          "Road Proximity",
          "Aspect",
          "Slope",
          "Elevation",
          "Land Use",
        ],
        datasets: [
          {
            label: "Weight (%)",
            data: [35.8, 16.3, 15.9, 13.7, 8.3, 5.1, 4.9],
            backgroundColor: [
              "#f9a825",
              "#2979ff",
              "#8d6e63",
              "#7cb342",
              "#5d4037",
              "#6a1b9a",
              "#00acc1",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Weight (%)",
            },
          },
        },
      },
    });
  }
});
