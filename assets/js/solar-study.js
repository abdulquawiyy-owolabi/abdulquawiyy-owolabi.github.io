// Mobile menu
var menuBtn = document.getElementById('menuBtn');
var navList = document.getElementById('navList');
if (menuBtn && navList) {
  menuBtn.addEventListener('click', function () {
    navList.classList.toggle('open');
  });
  document.querySelectorAll('#navList a').forEach(function (a) {
    a.addEventListener('click', function () { navList.classList.remove('open'); });
  });
}

// Tabs
var tabBtns = document.querySelectorAll('.tab-btn');
var tabPanes = document.querySelectorAll('.tab-pane');
tabBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var target = btn.getAttribute('data-tab');
    tabBtns.forEach(function (b) { b.classList.remove('active'); });
    tabPanes.forEach(function (p) { p.classList.remove('active'); });
    btn.classList.add('active');
    var pane = document.getElementById(target);
    if (pane) pane.classList.add('active');
  });
});

// Reference search
var searchInput = document.getElementById('reference-search');
var refItems = document.querySelectorAll('.reference-item');
var noRefs = document.getElementById('no-references');
if (searchInput) {
  searchInput.addEventListener('input', function () {
    var q = searchInput.value.trim().toLowerCase();
    var visibleCount = 0;
    refItems.forEach(function (item) {
      var text = item.textContent.toLowerCase();
      var match = text.indexOf(q) !== -1;
      item.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });
    if (noRefs) noRefs.classList.toggle('hidden', visibleCount !== 0);
  });
}

// Current year
var yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Charts (rendered in site palette, deferred until Chart.js loads)
window.addEventListener('load', function () {
  if (typeof Chart === 'undefined') return;

  var inkGrid = 'rgba(43,66,73,0.6)';
  var textMid = '#b9c2be';
  var mono = "'IBM Plex Mono', monospace";

  Chart.defaults.color = textMid;
  Chart.defaults.font.family = mono;
  Chart.defaults.font.size = 11;

  var suitEl = document.getElementById('suitabilityChart');
  if (suitEl) {
    new Chart(suitEl, {
      type: 'doughnut',
      data: {
        labels: ['Highly Suitable', 'Moderately Suitable', 'Marginally Suitable', 'Unsuitable'],
        datasets: [{
          data: [8.95, 40.98, 45.80, 4.27],
          backgroundColor: ['#4f8f56', '#89ab84', '#d1a256', '#b25d3c'],
          borderColor: '#101c22',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { padding: 16, boxWidth: 12 } },
          tooltip: { callbacks: { label: function (ctx) { return ctx.label + ': ' + ctx.parsed + '%'; } } }
        }
      }
    });
  }

  var factorEl = document.getElementById('factorChart');
  if (factorEl) {
    new Chart(factorEl, {
      type: 'bar',
      data: {
        labels: ['Solar Radiation', 'Grid Proximity', 'Road Proximity', 'Aspect', 'Slope', 'Elevation', 'Land Cover'],
        datasets: [{
          data: [35.8, 16.3, 15.9, 13.7, 8.3, 5.1, 4.9],
          backgroundColor: '#d1a256',
          borderRadius: 2,
          maxBarThickness: 28
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: inkGrid }, ticks: { callback: function (v) { return v + '%'; } } },
          y: { grid: { display: false } }
        }
      }
    });
  }
});
