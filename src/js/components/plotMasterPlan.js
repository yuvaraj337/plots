import { openSiteVisitFlow } from './sharedBookSiteVisit.js';

// Interactive Plot Master Plan Component for VR Green Meadows / Open Plots

export function renderPlotMasterPlan(project) {
  const plots = project.plots || [];
  const defaultPlot = plots.find(p => p.isDefaultSelected) || plots[0];

  return `
    <section class="master-plan-section" id="master-plan-section">
      <div class="mp-container">
        
        <!-- Desktop 3-Column Grid -->
        <div class="mp-layout-grid">
          
          <!-- Column 1: Find Your Plot Filters -->
          <div class="mp-filter-card">
            <div class="filter-card-header">
              <h3 class="filter-title">Find Your Plot</h3>
              <button type="button" class="filter-reset-btn" id="mp-filter-reset">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
                <span>Reset</span>
              </button>
            </div>

            <form id="mp-filter-form" class="filter-form">
              <div class="filter-group">
                <label class="filter-label">Plot Size (Sq.Yds)</label>
                <div class="select-wrap">
                  <select id="filter-size" class="filter-select">
                    <option value="all">Any Size</option>
                    <option value="180">180 Sq.Yds</option>
                    <option value="200">200 Sq.Yds</option>
                    <option value="220">220 Sq.Yds</option>
                    <option value="250">250 Sq.Yds</option>
                  </select>
                </div>
              </div>

              <div class="filter-group">
                <label class="filter-label">Budget</label>
                <div class="select-wrap">
                  <select id="filter-budget" class="filter-select">
                    <option value="all">Any Budget</option>
                    <option value="30">Under ₹30 Lakhs</option>
                    <option value="35">₹30L - ₹35 Lakhs</option>
                    <option value="40">Above ₹35 Lakhs</option>
                  </select>
                </div>
              </div>

              <div class="filter-group">
                <label class="filter-label">Facing</label>
                <div class="select-wrap">
                  <select id="filter-facing" class="filter-select">
                    <option value="all">Any Facing</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                  </select>
                </div>
              </div>

              <div class="filter-group">
                <label class="filter-label">Road Width</label>
                <div class="select-wrap">
                  <select id="filter-road" class="filter-select">
                    <option value="all">Any Width</option>
                    <option value="30 ft">30 ft Road</option>
                    <option value="40 ft">40 ft Road</option>
                  </select>
                </div>
              </div>

              <div class="filter-group">
                <label class="filter-label">Availability</label>
                <div class="checkbox-options">
                  <label class="custom-checkbox">
                    <input type="checkbox" id="avail-available" value="available" checked>
                    <span class="chk-box"></span>
                    <span class="chk-lbl">Available</span>
                  </label>
                  <label class="custom-checkbox">
                    <input type="checkbox" id="avail-reserved" value="reserved">
                    <span class="chk-box"></span>
                    <span class="chk-lbl">Reserved</span>
                  </label>
                  <label class="custom-checkbox">
                    <input type="checkbox" id="avail-sold" value="sold">
                    <span class="chk-box"></span>
                    <span class="chk-lbl">Sold</span>
                  </label>
                </div>
              </div>

              <button type="button" id="mp-apply-btn" class="mp-apply-btn">Apply Filters</button>
            </form>
          </div>

          <!-- Column 2: Interactive Master Plan Center -->
          <div class="mp-viewport-card" id="mp-viewport-container">
            <!-- Legend Bar -->
            <div class="mp-legend-bar">
              <div class="legend-item"><span class="legend-dot available"></span> Available</div>
              <div class="legend-item"><span class="legend-dot reserved"></span> Reserved</div>
              <div class="legend-item"><span class="legend-dot sold"></span> Sold</div>
            </div>

            <!-- Map Stage -->
            <div class="mp-stage-wrap" id="mp-stage-wrap">
              <!-- Compass Rose -->
              <div class="mp-compass" title="Layout Orientation">
                <div class="compass-n">N</div>
                <div class="compass-arrow">✦</div>
                <div class="compass-ring"></div>
              </div>

              <!-- Floating Controls -->
              <div class="mp-zoom-controls">
                <button type="button" class="zoom-btn" id="mp-zoom-in" title="Zoom In">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
                </button>
                <button type="button" class="zoom-btn" id="mp-zoom-out" title="Zoom Out">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/></svg>
                </button>
                <button type="button" class="zoom-btn" id="mp-zoom-reset" title="Reset View">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/></svg>
                </button>
                <button type="button" class="zoom-btn" id="mp-toggle-fullscreen" title="Full Screen Master Plan">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                  </svg>
                </button>
              </div>

              <!-- SVG Interactive Layout Canvas -->
              <div class="mp-canvas-scroll" id="mp-canvas-scroll">
                <div class="mp-canvas-transform" id="mp-canvas-transform">
                  ${renderMasterPlanSvg(plots, defaultPlot.id)}
                </div>
              </div>
            </div>

            <!-- Mobile Quick Actions Strip -->
            <div class="mp-mobile-quick-actions">
              <button class="mp-mob-btn primary" onclick="window.openSiteVisitModal('${project.name}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>Book a Site Visit</span>
              </button>
              <a href="https://maps.google.com" target="_blank" rel="noopener" class="mp-mob-btn secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>View on Google Maps</span>
              </a>
            </div>
          </div>

          <!-- Column 3: Selected Plot Details Panel -->
          <div class="mp-details-card" id="mp-details-card">
            ${renderPlotDetailsContent(defaultPlot, project.name)}
          </div>

        </div>

      </div>
    </section>

    <!-- Mobile Full Screen Modal Overlay -->
    <div class="mp-fullscreen-modal" id="mp-fullscreen-modal" style="display: none;">
      <div class="fs-header">
        <button type="button" class="fs-exit-btn" id="fs-exit-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          <span>Exit Full Screen</span>
        </button>
        <span class="fs-title">${project.name} &bull; Master Plan</span>
        <div class="fs-legend">
          <span class="legend-dot available"></span> Available
          <span class="legend-dot reserved"></span> Reserved
          <span class="legend-dot sold"></span> Sold
        </div>
      </div>

      <div class="fs-body">
        <div class="fs-stage" id="fs-stage">
          <div class="mp-zoom-controls fs-controls">
            <button type="button" class="zoom-btn" id="fs-zoom-in" title="Zoom In"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg></button>
            <button type="button" class="zoom-btn" id="fs-zoom-out" title="Zoom Out"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/></svg></button>
            <button type="button" class="zoom-btn" id="fs-zoom-reset" title="Reset View"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/></svg></button>
          </div>
          
          <div class="fs-canvas-scroll" id="fs-canvas-scroll">
            <div class="fs-canvas-transform" id="fs-canvas-transform">
              ${renderMasterPlanSvg(plots, defaultPlot.id, 'fs')}
            </div>
          </div>
        </div>

        <!-- Floating Selected Plot Card in Fullscreen -->
        <div class="fs-plot-panel" id="fs-plot-panel">
          ${renderPlotDetailsContent(defaultPlot, project.name, true)}
        </div>
      </div>

      <div class="fs-footer">
        <span>Pan, zoom and explore the master plan freely</span>
      </div>
    </div>
  `;
}

// Render Master Plan SVG with authentic reference master plan artwork and interactive plots
function renderMasterPlanSvg(plots, selectedPlotId, prefix = 'mp') {
  return `
    <svg class="master-plan-svg" viewBox="0 0 704 600" xmlns="http://www.w3.org/2000/svg" id="${prefix}-svg">
      <defs>
        <filter id="${prefix}-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#00C2FF" flood-opacity="0.9"/>
        </filter>
      </defs>

      <!-- Exact Master Plan Reference Artwork -->
      <image href="/images/journey/master_plan_base.jpg" x="0" y="0" width="704" height="600" preserveAspectRatio="none" />

      <!-- INTERACTIVE PLOTS GRID -->
      <g class="plots-layer" id="${prefix}-plots-group">
        ${plots.map(p => {
          const isSelected = p.id === selectedPlotId;
          let fillAttr = `url(#${prefix}-plot-avail)`;
          let strokeColor = '#15803D';
          let textColor = '#14532D';

          if (p.status === 'reserved') {
            fillAttr = `url(#${prefix}-plot-res)`;
            strokeColor = '#B45309';
            textColor = '#78350F';
          } else if (p.status === 'sold') {
            fillAttr = `url(#${prefix}-plot-sold)`;
            strokeColor = '#B91C1C';
            textColor = '#7F1D1D';
          }

          let extraClass = '';
          let filterAttr = '';
          let strokeWidth = '1.2';

          if (isSelected) {
            extraClass = 'plot-selected';
            strokeColor = '#0284C7';
            strokeWidth = '3';
            filterAttr = `filter="url(#${prefix}-glow)"`;
            fillAttr = '#38BDF8';
            textColor = '#082F49';
          }

          return `
            <g class="plot-item ${extraClass}" 
               data-plot-id="${p.id}" 
               data-status="${p.status}"
               data-size="${p.size}"
               data-facing="${p.facing}"
               data-road="${p.road}"
               data-price="${p.price}"
               cursor="pointer"
               role="button"
               tabindex="0"
               aria-label="Plot ${p.num}, ${p.status}, ${p.size} Sq.Yds">
              
              <rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" 
                    rx="3" 
                    fill="${fillAttr}" 
                    stroke="${strokeColor}" 
                    stroke-width="${strokeWidth}"
                    ${filterAttr}
                    class="plot-rect" />

              <text x="${p.x + p.w / 2}" y="${p.y + p.h / 2 + 3.5}" 
                    fill="${textColor}" 
                    font-size="8" 
                    font-weight="${isSelected ? '800' : '700'}" 
                    text-anchor="middle"
                    pointer-events="none"
                    class="plot-num-text">
                ${p.num}
              </text>
            </g>
          `;
        }).join('')}
      </g>
    </svg>
  `;
}

// Generate the Right / Mobile Drawer Plot Details card content
export function renderPlotDetailsContent(plot, projectName, isFullscreen = false) {
  if (!plot) return '<div class="no-plot-selected">Select a plot from the master plan to view details.</div>';

  const statusLabel = plot.status.charAt(0).toUpperCase() + plot.status.slice(1);
  const statusBadgeClass = `status-badge ${plot.status}`;

  return `
    <div class="plot-details-wrapper" data-active-plot="${plot.id}">
      
      <!-- Card Header -->
      <div class="pd-header">
        <h3 class="pd-title">Plot Details</h3>
        <button type="button" class="pd-close-btn" id="${isFullscreen ? 'fs' : 'mp'}-details-close" title="Close Plot Details">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Status Pill -->
      <div class="pd-status-row">
        <span class="${statusBadgeClass}">
          <span class="status-icon">✓</span>
          <span>${statusLabel}</span>
        </span>
      </div>

      <!-- Plot Main ID & Dimensions -->
      <div class="pd-main-id">
        <div class="pd-plot-number">${plot.num}</div>
        <div class="pd-plot-sub">${plot.size} Sq.Yds (${plot.dim})</div>
      </div>

      <!-- Price Box -->
      <div class="pd-price-box">
        <div class="pd-price-val">${plot.price}</div>
        <div class="pd-price-rate">(${plot.rate})</div>
      </div>

      <!-- Specifications Grid (2 columns) -->
      <div class="pd-specs-grid">
        <div class="pd-spec-item">
          <div class="spec-icon-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          </div>
          <div class="spec-info">
            <span class="spec-label">Facing</span>
            <span class="spec-value">${plot.facing}</span>
          </div>
        </div>

        <div class="pd-spec-item">
          <div class="spec-icon-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><path d="M4 19L8 5m8 14l4-14M10 9h4m-5 6h6"/></svg>
          </div>
          <div class="spec-info">
            <span class="spec-label">Road Width</span>
            <span class="spec-value">${plot.road}</span>
          </div>
        </div>

        <div class="pd-spec-item">
          <div class="spec-icon-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          </div>
          <div class="spec-info">
            <span class="spec-label">Dimensions</span>
            <span class="spec-value">${plot.dim}</span>
          </div>
        </div>

        <div class="pd-spec-item">
          <div class="spec-icon-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
          </div>
          <div class="spec-info">
            <span class="spec-label">Plot Area</span>
            <span class="spec-value">${plot.size} Sq.Yds</span>
          </div>
        </div>

        <div class="pd-spec-item">
          <div class="spec-icon-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div class="spec-info">
            <span class="spec-label">Approval</span>
            <span class="spec-value">${plot.approval}</span>
          </div>
        </div>

        <div class="pd-spec-item">
          <div class="spec-icon-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div class="spec-info">
            <span class="spec-label">Location</span>
            <span class="spec-value">${plot.location}</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="pd-actions">
        <button type="button" class="pd-btn primary-choose" onclick="window.openPlotSiteVisit('${plot.id}')">
          <span>Choose This Plot</span>
          <span class="btn-arrow">&rarr;</span>
        </button>

        <button type="button" class="pd-btn secondary-visit" onclick="window.openPlotSiteVisit('${plot.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>Book a Site Visit</span>
        </button>

        <a href="https://maps.google.com/?q=Shadnagar+Hyderabad" target="_blank" rel="noopener" class="pd-btn flat-maps">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>View on Google Maps</span>
        </a>
      </div>

    </div>
  `;
}

// Master Plan Controller Logic: Zoom, Pan, Plot Selection, Filter, and Fullscreen
export function initPlotMasterPlan(project) {
  const plots = project.plots || [];
  let currentZoom = 1;
  let currentFsZoom = 1;

  window.openPlotSiteVisit = function(plotId) {
    const plot = (plots || []).find(p => p.id === plotId) || plots[0];
    if (!plot) return;
    openSiteVisitFlow({
      id: plot.id,
      projectName: project.name || 'VR Green Meadows',
      unitName: `Plot ${plot.num} (${plot.size} Sq.Yds)`,
      location: project.location || 'Shadnagar, Hyderabad',
      price: plot.price,
      priceSub: `(${plot.rate})`,
      size: `${plot.size} Sq.Yds`,
      facing: `${plot.facing} Facing`,
      beds: `${plot.road} Road`,
      baths: plot.approval,
      balconies: plot.location,
      status: plot.status.charAt(0).toUpperCase() + plot.status.slice(1),
      image: '/images/journey/gallery_entrance.jpg',
      thumb: '/images/journey/gallery_entrance.jpg'
    }, 'form');
  };

  const canvasTransform = document.getElementById('mp-canvas-transform');
  const fsCanvasTransform = document.getElementById('fs-canvas-transform');
  const detailsCard = document.getElementById('mp-details-card');
  const fsPlotPanel = document.getElementById('fs-plot-panel');
  const fsModal = document.getElementById('mp-fullscreen-modal');

  // Zoom handlers for normal view
  const zoomInBtn = document.getElementById('mp-zoom-in');
  const zoomOutBtn = document.getElementById('mp-zoom-out');
  const zoomResetBtn = document.getElementById('mp-zoom-reset');
  const fsToggleBtn = document.getElementById('mp-toggle-fullscreen');
  const fsExitBtn = document.getElementById('fs-exit-btn');

  // Fullscreen zoom buttons
  const fsZoomInBtn = document.getElementById('fs-zoom-in');
  const fsZoomOutBtn = document.getElementById('fs-zoom-out');
  const fsZoomResetBtn = document.getElementById('fs-zoom-reset');

  function updateZoom(newZoom) {
    currentZoom = Math.min(Math.max(newZoom, 0.7), 2.2);
    if (canvasTransform) {
      canvasTransform.style.transform = `scale(${currentZoom})`;
      canvasTransform.style.transformOrigin = 'center center';
    }
  }

  function updateFsZoom(newZoom) {
    currentFsZoom = Math.min(Math.max(newZoom, 0.8), 2.8);
    if (fsCanvasTransform) {
      fsCanvasTransform.style.transform = `scale(${currentFsZoom})`;
      fsCanvasTransform.style.transformOrigin = 'center center';
    }
  }

  if (zoomInBtn) zoomInBtn.addEventListener('click', () => updateZoom(currentZoom + 0.2));
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => updateZoom(currentZoom - 0.2));
  if (zoomResetBtn) zoomResetBtn.addEventListener('click', () => updateZoom(1));

  if (fsZoomInBtn) fsZoomInBtn.addEventListener('click', () => updateFsZoom(currentFsZoom + 0.25));
  if (fsZoomOutBtn) fsZoomOutBtn.addEventListener('click', () => updateFsZoom(currentFsZoom - 0.25));
  if (fsZoomResetBtn) fsZoomResetBtn.addEventListener('click', () => updateFsZoom(1));

  // Fullscreen toggle
  if (fsToggleBtn && fsModal) {
    fsToggleBtn.addEventListener('click', () => {
      fsModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      updateFsZoom(1);
    });
  }

  if (fsExitBtn && fsModal) {
    fsExitBtn.addEventListener('click', () => {
      fsModal.style.display = 'none';
      document.body.style.overflow = '';
    });
  }

  // Plot Selection function
  function selectPlot(plotId) {
    const plot = plots.find(p => p.id === plotId);
    if (!plot) return;

    // Update normal view details card
    if (detailsCard) {
      detailsCard.innerHTML = renderPlotDetailsContent(plot, project.name, false);
      detailsCard.classList.add('mobile-open');
      attachCloseListeners();
    }

    // Update fullscreen details card
    if (fsPlotPanel) {
      fsPlotPanel.innerHTML = renderPlotDetailsContent(plot, project.name, true);
      fsPlotPanel.style.display = 'block';
      attachCloseListeners();
    }

    // Update SVG selection highlights in both normal and fullscreen SVG
    document.querySelectorAll('.plot-item').forEach(el => {
      const isThisPlot = el.getAttribute('data-plot-id') === plotId;
      const rect = el.querySelector('.plot-rect');
      const text = el.querySelector('.plot-num-text');
      const status = el.getAttribute('data-status');

      if (isThisPlot) {
        el.classList.add('plot-selected');
        if (rect) {
          rect.setAttribute('fill', '#38BDF8');
          rect.setAttribute('stroke', '#0284C7');
          rect.setAttribute('stroke-width', '3');
          rect.setAttribute('filter', 'url(#mp-glow)');
        }
        if (text) {
          text.setAttribute('fill', '#082F49');
          text.setAttribute('font-weight', '800');
        }
      } else {
        el.classList.remove('plot-selected');
        let normalFill = 'url(#mp-plot-avail)';
        let normalStroke = '#15803D';
        let normalText = '#14532D';
        if (status === 'reserved') {
          normalFill = 'url(#mp-plot-res)';
          normalStroke = '#B45309';
          normalText = '#78350F';
        } else if (status === 'sold') {
          normalFill = 'url(#mp-plot-sold)';
          normalStroke = '#B91C1C';
          normalText = '#7F1D1D';
        }
        if (rect) {
          rect.setAttribute('fill', normalFill);
          rect.setAttribute('stroke', normalStroke);
          rect.setAttribute('stroke-width', '1.2');
          rect.removeAttribute('filter');
        }
        if (text) {
          text.setAttribute('fill', normalText);
          text.setAttribute('font-weight', '700');
        }
      }
    });
  }

  // Attach plot click listeners
  document.querySelectorAll('.plot-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const plotId = item.getAttribute('data-plot-id');
      selectPlot(plotId);
    });
  });

  // Attach Close Button Listeners
  function attachCloseListeners() {
    const normalClose = document.getElementById('mp-details-close');
    const fsClose = document.getElementById('fs-details-close');

    if (normalClose) {
      normalClose.addEventListener('click', () => {
        if (detailsCard) {
          detailsCard.classList.remove('mobile-open');
        }
      });
    }

    if (fsClose) {
      fsClose.addEventListener('click', () => {
        if (fsPlotPanel) {
          fsPlotPanel.style.display = 'none';
        }
      });
    }
  }

  attachCloseListeners();

  // Filters Logic
  const sizeSelect = document.getElementById('filter-size');
  const budgetSelect = document.getElementById('filter-budget');
  const facingSelect = document.getElementById('filter-facing');
  const roadSelect = document.getElementById('filter-road');
  const availAvail = document.getElementById('avail-available');
  const availRes = document.getElementById('avail-reserved');
  const availSold = document.getElementById('avail-sold');
  const applyBtn = document.getElementById('mp-apply-btn');
  const resetBtn = document.getElementById('mp-filter-reset');

  function applyFilters() {
    const selectedSize = sizeSelect ? sizeSelect.value : 'all';
    const selectedBudget = budgetSelect ? budgetSelect.value : 'all';
    const selectedFacing = facingSelect ? facingSelect.value : 'all';
    const selectedRoad = roadSelect ? roadSelect.value : 'all';

    const allowedStatuses = [];
    if (availAvail && availAvail.checked) allowedStatuses.push('available');
    if (availRes && availRes.checked) allowedStatuses.push('reserved');
    if (availSold && availSold.checked) allowedStatuses.push('sold');

    document.querySelectorAll('.plot-item').forEach(item => {
      const size = parseInt(item.getAttribute('data-size'), 10);
      const facing = item.getAttribute('data-facing');
      const road = item.getAttribute('data-road');
      const status = item.getAttribute('data-status');

      let match = true;

      if (selectedSize !== 'all' && size !== parseInt(selectedSize, 10)) match = false;
      if (selectedFacing !== 'all' && facing !== selectedFacing) match = false;
      if (selectedRoad !== 'all' && road !== selectedRoad) match = false;
      if (allowedStatuses.length > 0 && !allowedStatuses.includes(status)) match = false;

      if (selectedBudget === '30' && size > 180) match = false;
      if (selectedBudget === '35' && (size < 200 || size > 220)) match = false;
      if (selectedBudget === '40' && size < 250) match = false;

      if (match) {
        item.style.opacity = '1';
        item.style.pointerEvents = 'auto';
      } else {
        item.style.opacity = '0.15';
        item.style.pointerEvents = 'none';
      }
    });
  }

  if (applyBtn) applyBtn.addEventListener('click', applyFilters);

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (sizeSelect) sizeSelect.value = 'all';
      if (budgetSelect) budgetSelect.value = 'all';
      if (facingSelect) facingSelect.value = 'all';
      if (roadSelect) roadSelect.value = 'all';
      if (availAvail) availAvail.checked = true;
      if (availRes) availRes.checked = false;
      if (availSold) availSold.checked = false;
      applyFilters();
    });
  }
}
