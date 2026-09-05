import { renderHeader, initStickyNav } from '../components/header.js';
import { renderFooter, initScrollTop } from '../components/footer.js';
import { openPlotsList } from '../data/properties.js';

export function renderOpenPlotsPage() {
  const cardsHtml = openPlotsList.map(plot => `
    <a href="${plot.link}" class="plot-item-card" data-state="${plot.stateType}">
      <div class="plot-card-media">
        <img src="${plot.image}" alt="${plot.title}" loading="lazy" />
      </div>
      <div class="plot-card-footer">
        <div class="plot-brand-box">
          <img src="${plot.logo}" alt="${plot.title} logo" />
        </div>
        <div class="plot-info-box">
          <h3 class="plot-card-title">${plot.title}</h3>
          <span class="plot-card-location">&#128205; ${plot.location}</span>
        </div>
      </div>
    </a>
  `).join('');

  const html = `
    <div class="page-open-plots">
      ${renderHeader({ currentPath: '#/open-plots', isOpenPlots: true })}
      
      <!-- Banner Title -->
      <div class="page-title-banner">
        <div class="container">
          <h1 class="page-title-heading">OPEN PLOTS PROPERTIES</h1>
        </div>
      </div>

      <div class="container">
        <!-- Shadnagar Callout Card -->
        <div class="plots-callout-wrap">
          <div class="shadnagar-callout-card">
            <div class="callout-content-left">
              <h2 class="callout-title">
                <span>&#128205;</span> Looking for plots in Shadnagar?
              </h2>
              <p class="callout-desc">
                HMDA &amp; DTCP approved projects on the Bangalore Highway corridor &mdash; Eeshanya County, Shadnagar Heights, Amodha &amp; more
              </p>
            </div>
            <a href="#/open-plots?region=shadnagar" class="callout-btn" id="view-shadnagar-btn">
              View Shadnagar Plots &rarr;
            </a>
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="filter-tabs-row">
          <button class="filter-tab-btn all active" data-filter="all">ALL PROPERTIES</button>
          <button class="filter-tab-btn telangana" data-filter="telangana">TELANGANA</button>
          <button class="filter-tab-btn ap" data-filter="ap">ANDHRA PRADESH</button>
        </div>

        <!-- Plots Grid -->
        <div class="plots-grid" id="plots-container">
          ${cardsHtml}
        </div>
      </div>

      ${renderFooter()}
    </div>
  `;

  return {
    html,
    init: () => {
      initStickyNav();
      initScrollTop();

      // Filter tabs interaction
      const tabs = document.querySelectorAll('.filter-tab-btn');
      const cards = document.querySelectorAll('.plot-item-card');

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          const filter = tab.getAttribute('data-filter');
          cards.forEach(card => {
            const cardState = card.getAttribute('data-state');
            if (filter === 'all' || cardState === filter) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }
  };
}
