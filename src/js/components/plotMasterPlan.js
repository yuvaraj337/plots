import { openSiteVisitFlow } from './sharedBookSiteVisit.js';

// ============================================================================
// 100% CODE-DRIVEN 3D ARCHITECTURAL MASTER PLAN & OPEN PLOTS ENGINE
// Visual and functional match to design reference mockup
// ============================================================================

/**
 * Generates dimensional 3D spherical trees with layered canopy depth and soft shadows
 */
function renderTreeSvg(cx, cy, r, id = '') {
  return `
    <g class="mp-tree" data-tree="${id}">
      <ellipse cx="${cx + r * 0.18}" cy="${cy + r * 0.22}" rx="${r * 1.05}" ry="${r * 0.85}" fill="rgba(14, 38, 18, 0.35)" />
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#mp-tree-base)" />
      <circle cx="${cx - r * 0.08}" cy="${cy - r * 0.08}" r="${r * 0.82}" fill="url(#mp-tree-mid)" />
      <circle cx="${cx - r * 0.18}" cy="${cy - r * 0.2}" r="${r * 0.48}" fill="url(#mp-tree-top)" />
      <circle cx="${cx + r * 0.12}" cy="${cy - r * 0.1}" r="${r * 0.35}" fill="url(#mp-tree-top)" opacity="0.8" />
    </g>
  `;
}

/**
 * Generates perimeter tree line around the boundary
 */
function renderPerimeterTreeLine() {
  let trees = '';
  const topY = 24;
  const bottomY = 660;
  const leftX = 30;
  const rightX = 848;
  const radius = 15;

  // Top row
  for (let x = 38; x <= 840; x += 32) {
    trees += renderTreeSvg(x, topY, radius, `top-${x}`);
  }
  // Bottom row (leaving entrance gap at 370-510)
  for (let x = 38; x <= 840; x += 32) {
    if (x >= 370 && x <= 510) continue;
    trees += renderTreeSvg(x, bottomY, radius, `bot-${x}`);
  }
  // Left column
  for (let y = 48; y <= 636; y += 32) {
    trees += renderTreeSvg(leftX, y, radius, `left-${y}`);
  }
  // Right column
  for (let y = 48; y <= 636; y += 32) {
    trees += renderTreeSvg(rightX, y, radius, `right-${y}`);
  }

  return trees;
}

/**
 * Main 3D Architectural Master Plan SVG (Vector Geometry)
 */
export function renderMasterPlanSvg(plots = [], selectedPlotId = 'P18', prefix = 'mp') {
  // 8 Columns X offsets: 288, 352, 416, 480, 544, 608, 672, 736 (width: 56)
  const colX = [288, 352, 416, 480, 544, 608, 672, 736];
  const plotW = 56;
  const plotH = 104;

  // 3 Row Y offsets:
  const rowY = [104, 280, 456];

  // Render 24 Interactive Plots
  const plotsSvgHtml = plots.map((p, idx) => {
    let row = 0;
    let col = 0;
    if (idx < 8) {
      row = 0;
      col = idx;
    } else if (idx < 16) {
      row = 1;
      col = idx - 8;
    } else {
      row = 2;
      col = idx - 16;
    }

    const x = colX[col] || (288 + (idx % 8) * 64);
    const y = rowY[row] || 104;
    const isSelected = p.id.toUpperCase() === selectedPlotId.toUpperCase();
    const isAvailable = p.status === 'available';
    const isReserved = p.status === 'reserved' || p.status === 'booked';
    const isSold = p.status === 'sold';

    let fillAttr = `url(#${prefix}-plot-avail)`;
    let strokeColor = '#22C55E';
    let strokeWidth = '1.5';
    let textColor = '#0F1E2C';
    let subColor = '#4B5563';
    let filterAttr = `filter="url(#${prefix}-soft-shadow)"`;

    if (isSelected) {
      fillAttr = `url(#${prefix}-plot-selected)`;
      strokeColor = '#0284C7';
      strokeWidth = '2.8';
      textColor = '#0369A1';
      filterAttr = `filter="url(#${prefix}-glow-blue)"`;
    } else if (isReserved) {
      fillAttr = `url(#${prefix}-plot-booked)`;
      strokeColor = '#F59E0B';
      strokeWidth = '2';
      textColor = '#78350F';
      subColor = '#92400E';
      filterAttr = `filter="url(#${prefix}-glow-amber)"`;
    } else if (isSold) {
      fillAttr = `url(#${prefix}-plot-sold)`;
      strokeColor = '#F43F5E';
      strokeWidth = '2';
      textColor = '#881337';
      subColor = '#9F1239';
      filterAttr = `filter="url(#${prefix}-glow-rose)"`;
    }

    return `
      <g class="plot-item ${isSelected ? 'plot-selected' : ''}" 
         data-plot-id="${p.id}" 
         data-status="${p.status}"
         data-size="${p.size}"
         data-facing="${p.facing}"
         data-road="${p.road}"
         data-price="${p.price}"
         role="button"
         tabindex="0"
         aria-label="Plot ${p.num}, ${p.size} Sq.Yds, ${p.status}">
        
        <!-- Paved Lot Demarcation Base -->
        <rect x="${x - 3}" y="${y - 3}" width="${plotW + 6}" height="${plotH + 6}" rx="5" fill="#E3E8E0" stroke="#CAD2C5" stroke-width="1" />
        
        <!-- Front / Rear Garden Edging -->
        <rect x="${x - 1}" y="${y - 1}" width="${plotW + 2}" height="6" rx="2" fill="#6DAF2B" opacity="0.9" />
        <rect x="${x - 1}" y="${y + plotH - 5}" width="${plotW + 2}" height="6" rx="2" fill="#6DAF2B" opacity="0.9" />

        <!-- 3D Elevated Plot Rooftop Massing -->
        <rect x="${x}" y="${y + 3}" width="${plotW}" height="${plotH}" rx="7" fill="rgba(15, 30, 20, 0.22)" ${filterAttr} />
        <rect x="${x}" y="${y}" width="${plotW}" height="${plotH}" rx="7" 
              fill="${fillAttr}" 
              stroke="${strokeColor}" 
              stroke-width="${strokeWidth}" 
              class="plot-rect" />

        <!-- Top Highlight Bevel -->
        <line x1="${x + 8}" y1="${y + 1}" x2="${x + plotW - 8}" y2="${y + 1}" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" opacity="0.8" />

        <!-- Plot ID -->
        <text x="${x + plotW / 2}" y="${y + plotH * 0.42}" 
              fill="${textColor}" 
              font-family="'Plus Jakarta Sans', sans-serif" 
              font-size="13" 
              font-weight="800" 
              text-anchor="middle"
              class="plot-num-text">
          ${p.num}
        </text>

        <!-- Plot Size Subtitle -->
        <text x="${x + plotW / 2}" y="${y + plotH * 0.64}" 
              fill="${subColor}" 
              font-family="'Plus Jakarta Sans', sans-serif" 
              font-size="8.5" 
              font-weight="600" 
              text-anchor="middle">
          ${p.size} Sq.Yds
        </text>
      </g>
    `;
  }).join('');

  return `
    <svg class="master-plan-svg" viewBox="0 0 880 700" xmlns="http://www.w3.org/2000/svg" id="${prefix}-svg">
      <defs>
        <!-- Foliage Gradients -->
        <radialGradient id="mp-tree-base" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#439A26" />
          <stop offset="70%" stop-color="#2D721A" />
          <stop offset="100%" stop-color="#19480F" />
        </radialGradient>
        <radialGradient id="mp-tree-mid" cx="30%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#6DC83A" />
          <stop offset="65%" stop-color="#3FA422" />
          <stop offset="100%" stop-color="#246A14" />
        </radialGradient>
        <radialGradient id="mp-tree-top" cx="25%" cy="25%" r="50%">
          <stop offset="0%" stop-color="#A2EA60" />
          <stop offset="60%" stop-color="#73D035" />
          <stop offset="100%" stop-color="#4CA722" />
        </radialGradient>

        <!-- Swimming pool gradient -->
        <linearGradient id="${prefix}-pool-water" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" />
          <stop offset="50%" stop-color="#0EA5E9" />
          <stop offset="100%" stop-color="#0284C7" />
        </linearGradient>

        <!-- Plot rooftop gradients -->
        <linearGradient id="${prefix}-plot-avail" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#F2F5ED" />
        </linearGradient>

        <linearGradient id="${prefix}-plot-selected" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E0F2FE" />
          <stop offset="100%" stop-color="#BAE6FD" />
        </linearGradient>

        <linearGradient id="${prefix}-plot-booked" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FEF3C7" />
          <stop offset="100%" stop-color="#FDE68A" />
        </linearGradient>

        <linearGradient id="${prefix}-plot-sold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFE4E6" />
          <stop offset="100%" stop-color="#FECDD3" />
        </linearGradient>

        <!-- Asphalt gradient -->
        <linearGradient id="${prefix}-asphalt" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#383D43" />
          <stop offset="50%" stop-color="#42474E" />
          <stop offset="100%" stop-color="#383D43" />
        </linearGradient>

        <!-- Filters -->
        <filter id="${prefix}-soft-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#142818" flood-opacity="0.2" />
        </filter>
        <filter id="${prefix}-glow-blue" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0284C7" flood-opacity="0.5" />
        </filter>
        <filter id="${prefix}-glow-amber" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#F59E0B" flood-opacity="0.5" />
        </filter>
        <filter id="${prefix}-glow-rose" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#F43F5E" flood-opacity="0.5" />
        </filter>
      </defs>

      <!-- ═════════════════ 1. MASTER BOUNDARY & HEDGE ═════════════════ -->
      <g class="mp-master-boundary">
        <rect x="20" y="14" width="840" height="664" rx="26" fill="#589B27" stroke="#3D7417" stroke-width="3.5" filter="url(#${prefix}-soft-shadow)" />
        <rect x="28" y="22" width="824" height="648" rx="20" fill="#75BA31" />
      </g>

      <!-- ═════════════════ 2. ASPHALT ROAD NETWORK ═════════════════ -->
      <g class="mp-road-network">
        <!-- Road 1 (Above Row 1) -->
        <rect x="268" y="44" width="540" height="48" fill="#CAD2C5" />
        <rect x="268" y="46" width="540" height="44" fill="url(#${prefix}-asphalt)" />
        <line x1="276" y1="68" x2="800" y2="68" stroke="#FFFFFF" stroke-width="1.8" stroke-dasharray="12,12" opacity="0.9" />
        <text x="538" y="72" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="800" letter-spacing="2" text-anchor="middle">30 FT WIDE ROAD</text>

        <!-- Road 2 (Between Row 1 & Row 2) -->
        <rect x="268" y="220" width="540" height="48" fill="#CAD2C5" />
        <rect x="268" y="222" width="540" height="44" fill="url(#${prefix}-asphalt)" />
        <line x1="276" y1="244" x2="800" y2="244" stroke="#FFFFFF" stroke-width="1.8" stroke-dasharray="12,12" opacity="0.9" />
        <text x="538" y="248" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="800" letter-spacing="2" text-anchor="middle">30 FT WIDE ROAD</text>

        <!-- Road 3 (Between Row 2 & Row 3) -->
        <rect x="268" y="396" width="540" height="48" fill="#CAD2C5" />
        <rect x="268" y="398" width="540" height="44" fill="url(#${prefix}-asphalt)" />
        <line x1="276" y1="420" x2="800" y2="420" stroke="#FFFFFF" stroke-width="1.8" stroke-dasharray="12,12" opacity="0.9" />
        <text x="538" y="424" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="800" letter-spacing="2" text-anchor="middle">30 FT WIDE ROAD</text>

        <!-- Road 4 (Below Row 3) -->
        <rect x="268" y="572" width="540" height="48" fill="#CAD2C5" />
        <rect x="268" y="574" width="540" height="44" fill="url(#${prefix}-asphalt)" />
        <line x1="276" y1="596" x2="800" y2="596" stroke="#FFFFFF" stroke-width="1.8" stroke-dasharray="12,12" opacity="0.9" />
        <text x="538" y="600" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="800" letter-spacing="2" text-anchor="middle">30 FT WIDE ROAD</text>

        <!-- Connecting Vertical Road Between Amenities and Plots -->
        <rect x="238" y="44" width="34" height="576" fill="#CAD2C5" />
        <rect x="240" y="44" width="30" height="576" fill="url(#${prefix}-asphalt)" />

        <!-- Perimeter Right Connecting Road -->
        <rect x="804" y="44" width="28" height="576" fill="#CAD2C5" />
        <rect x="806" y="44" width="24" height="576" fill="url(#${prefix}-asphalt)" />

        <!-- Bottom Entrance Road -->
        <rect x="388" y="600" width="104" height="74" fill="#CAD2C5" />
        <rect x="390" y="600" width="100" height="74" fill="url(#${prefix}-asphalt)" />
        <line x1="440" y1="604" x2="440" y2="668" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="8,8" opacity="0.9" />
      </g>

      <!-- ═════════════════ 3. LEFT AMENITIES COLUMN ═════════════════ -->
      <g class="mp-amenities-group">
        <!-- 3A. PARK (Top Left) -->
        <g class="mp-park-zone">
          <path d="M 52 46 L 226 46 L 226 216 Q 140 216 52 140 Z" fill="#8AC743" stroke="#CAD6C3" stroke-width="1.8" />
          <path d="M 68 62 L 210 62 L 210 196 Q 140 196 68 130 Z" fill="#9EDB4E" stroke="#DCE8C8" stroke-width="1" />
          
          <!-- Gazebo Pavilion in Park -->
          <g transform="translate(120, 100)">
            <circle cx="16" cy="16" r="16" fill="#F8FAF7" stroke="#CAD2C5" stroke-width="1.2" />
            <polygon points="16,2 28,26 4,26" fill="#C59B3F" opacity="0.85" />
          </g>

          <!-- Park Trees -->
          ${renderTreeSvg(76, 70, 12, 'p1')}
          ${renderTreeSvg(192, 70, 12, 'p2')}
          ${renderTreeSvg(180, 166, 13, 'p3')}
          ${renderTreeSvg(86, 150, 11, 'p4')}

          <!-- Label -->
          <text x="140" y="174" fill="#265C30" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" letter-spacing="1.5" text-anchor="middle">PARK</text>
        </g>

        <!-- 3B. CLUBHOUSE & SWIMMING POOL (Middle Left) -->
        <g class="mp-clubhouse-zone">
          <rect x="52" y="246" width="174" height="180" rx="10" fill="#E2E7DD" stroke="#CAD6C3" stroke-width="1.8" />
          
          <!-- Modern Building Rooftop -->
          <rect x="142" y="260" width="72" height="106" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2" filter="url(#${prefix}-soft-shadow)" />
          <rect x="150" y="268" width="56" height="42" rx="3" fill="#F1F5F9" />

          <!-- Azure Swimming Pool -->
          <g transform="translate(68, 260)">
            <rect x="0" y="0" width="62" height="106" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2" />
            <rect x="3" y="3" width="56" height="100" rx="4" fill="url(#${prefix}-pool-water)" />
            <line x1="22" y1="8" x2="22" y2="98" stroke="#FFFFFF" stroke-width="0.8" stroke-dasharray="4,4" opacity="0.45" />
            <line x1="40" y1="8" x2="40" y2="98" stroke="#FFFFFF" stroke-width="0.8" stroke-dasharray="4,4" opacity="0.45" />
            <!-- Pool ladders -->
            <rect x="6" y="5" width="8" height="5" rx="1.5" fill="#E2E8F0" stroke="#64748B" stroke-width="0.6" />
            <rect x="48" y="5" width="8" height="5" rx="1.5" fill="#E2E8F0" stroke="#64748B" stroke-width="0.6" />
          </g>

          <!-- Clubhouse Trees -->
          ${renderTreeSvg(64, 404, 10, 'c1')}
          ${renderTreeSvg(212, 404, 10, 'c2')}

          <!-- Label -->
          <text x="139" y="408" fill="#0F1E2C" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" letter-spacing="1.5" text-anchor="middle">CLUBHOUSE</text>
        </g>

        <!-- 3C. KIDS PLAY AREA / AMENITIES (Bottom Left) -->
        <g class="mp-kidsplay-zone">
          <rect x="52" y="456" width="174" height="154" rx="10" fill="#EFE0CD" stroke="#DDC8AF" stroke-width="1.8" />
          
          <!-- Play equipment (Swings & Slide) -->
          <g transform="translate(74, 474)">
            <!-- Swing set A-frame -->
            <polygon points="6,24 16,4 26,24" fill="none" stroke="#EF4444" stroke-width="2.2" />
            <line x1="16" y1="4" x2="38" y2="4" stroke="#EF4444" stroke-width="2.2" />
            <polygon points="28,24 38,4 48,24" fill="none" stroke="#EF4444" stroke-width="2.2" />
            <rect x="20" y="16" width="7" height="3" rx="1" fill="#F59E0B" />
            <rect x="30" y="16" width="7" height="3" rx="1" fill="#F59E0B" />
            
            <!-- Slide -->
            <g transform="translate(62, 2)">
              <rect x="0" y="4" width="5" height="18" fill="#0284C7" />
              <path d="M 4 6 Q 12 10 20 22" fill="none" stroke="#EF4444" stroke-width="3" stroke-linecap="round" />
            </g>

            <!-- Park bench -->
            <g transform="translate(24, 30)">
              <rect x="0" y="0" width="30" height="5" rx="1.5" fill="#B45309" />
              <line x1="4" y1="5" x2="4" y2="8" stroke="#4B5563" stroke-width="1.5" />
              <line x1="26" y1="5" x2="26" y2="8" stroke="#4B5563" stroke-width="1.5" />
            </g>
          </g>

          <!-- Label -->
          <text x="139" y="586" fill="#1F2937" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" letter-spacing="1.2" text-anchor="middle">KIDS PLAY AREA</text>
        </g>
      </g>

      <!-- ═════════════════ 4. 24 PLOTS LAYER (P01 to P24) ═════════════════ -->
      <g class="mp-plots-layer" id="${prefix}-plots-group">
        ${plotsSvgHtml}
      </g>

      <!-- ═════════════════ 5. PERIMETER TREE LINE ═════════════════ -->
      <g class="mp-perimeter-trees">
        ${renderPerimeterTreeLine()}
      </g>

      <!-- ═════════════════ 6. MAIN ENTRANCE GATE ═════════════════ -->
      <g class="mp-entrance-gate">
        <!-- Left Pillar -->
        <rect x="382" y="630" width="14" height="30" rx="3" fill="#D97706" stroke="#B45309" stroke-width="1.2" />
        <rect x="380" y="628" width="18" height="5" rx="1.5" fill="#FDE68A" />
        <circle cx="389" cy="626" r="3" fill="#F59E0B" />

        <!-- Right Pillar -->
        <rect x="484" y="630" width="14" height="30" rx="3" fill="#D97706" stroke="#B45309" stroke-width="1.2" />
        <rect x="482" y="628" width="18" height="5" rx="1.5" fill="#FDE68A" />
        <circle cx="491" cy="626" r="3" fill="#F59E0B" />

        <!-- Gate Label & Arrows -->
        <text x="440" y="642" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="900" text-anchor="middle">&#8593; &#8593;</text>
        <text x="440" y="658" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" letter-spacing="1.5" text-anchor="middle">MAIN ENTRANCE</text>
      </g>
    </svg>
  `;
}

/**
 * Generates the complete 3-column Open Plots UI
 */
export function renderPlotMasterPlan(project) {
  const plots = project.plots || [];
  const defaultPlot = plots.find(p => p.isDefaultSelected) || plots.find(p => p.id === 'P18') || plots[0];

  return `
    <section class="master-plan-section" id="master-plan-section">
      <div class="mp-container">
        
        <!-- Page Title & Header -->
        <div class="mp-section-title-wrap">
          <h2 class="mp-main-page-title">Open Plots</h2>
          <p class="mp-main-page-sub">Find and choose your perfect plot</p>
        </div>

        <!-- 3-Column Grid Dashboard -->
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
                <label class="filter-label">Plot Size (Sq. Yds)</label>
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
                    <span class="chk-box avail"></span>
                    <span class="chk-lbl">Available</span>
                  </label>
                  <label class="custom-checkbox">
                    <input type="checkbox" id="avail-reserved" value="reserved">
                    <span class="chk-box booked"></span>
                    <span class="chk-lbl">Booked</span>
                  </label>
                  <label class="custom-checkbox">
                    <input type="checkbox" id="avail-sold" value="sold">
                    <span class="chk-box sold"></span>
                    <span class="chk-lbl">Sold</span>
                  </label>
                </div>
              </div>

              <button type="button" id="mp-apply-btn" class="mp-apply-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                <span>Apply Filters</span>
              </button>
            </form>
          </div>

          <!-- Column 2: Interactive 3D Master Plan Center -->
          <div class="mp-viewport-card" id="mp-viewport-container">
            <!-- Stage Header: Legend Bar -->
            <div class="mp-stage-header">
              <div class="mp-legend-bar">
                <div class="legend-item"><span class="legend-dot available"></span> Available</div>
                <div class="legend-item"><span class="legend-dot reserved"></span> Booked</div>
                <div class="legend-item"><span class="legend-dot sold"></span> Sold</div>
              </div>
            </div>

            <!-- Map Stage Wrapper -->
            <div class="mp-stage-wrap" id="mp-stage-wrap">
              <!-- Compass Rose Top Left -->
              <div class="mp-compass-badge" title="Orientation: North">
                <div class="compass-n-circle">
                  <span class="compass-n-text">N</span>
                  <div class="compass-marker">▲</div>
                </div>
              </div>

              <!-- Floating Controls Top Right -->
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

              <!-- 100% Vector Interactive Layout Canvas -->
              <div class="mp-canvas-scroll" id="mp-canvas-scroll">
                <div class="mp-canvas-transform" id="mp-canvas-transform">
                  ${renderMasterPlanSvg(plots, defaultPlot.id)}
                </div>
              </div>
            </div>

            <!-- Mobile Quick Actions -->
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

        <!-- Bottom Feature Values Bar -->
        <div class="mp-bottom-feature-bar">
          <div class="mp-feature-pills-list">
            <div class="mp-feat-pill">
              <span class="mp-feat-icon">🌿</span>
              <span>Premium Plots</span>
            </div>
            <div class="mp-feat-pill">
              <span class="mp-feat-icon">🏡</span>
              <span>Modern Amenities</span>
            </div>
            <div class="mp-feat-pill">
              <span class="mp-feat-icon">🛡️</span>
              <span>HMDA Approved</span>
            </div>
            <div class="mp-feat-pill">
              <span class="mp-feat-icon">🌲</span>
              <span>Green Surroundings</span>
            </div>
            <div class="mp-feat-pill">
              <span class="mp-feat-icon">💚</span>
              <span>A Better Tomorrow</span>
            </div>
          </div>
          <div class="mp-bottom-tagline">
            <em>Your Space. A Brighter Future.</em>
          </div>
        </div>

      </div>
    </section>

    <!-- Fullscreen Modal Overlay -->
    <div class="mp-fullscreen-modal" id="mp-fullscreen-modal" style="display: none;">
      <div class="fs-header">
        <button type="button" class="fs-exit-btn" id="fs-exit-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          <span>Exit Full Screen</span>
        </button>
        <span class="fs-title">${project.name} &bull; 3D Master Plan</span>
        <div class="fs-legend">
          <span class="legend-dot available"></span> Available
          <span class="legend-dot reserved"></span> Booked
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

        <div class="fs-plot-panel" id="fs-plot-panel">
          ${renderPlotDetailsContent(defaultPlot, project.name, true)}
        </div>
      </div>
    </div>
  `;
}

/**
 * Right Plot Details Card with Data-Driven Protection
 */
export function renderPlotDetailsContent(plot, projectName, isFullscreen = false) {
  if (!plot) return '<div class="no-plot-selected">Select a plot from the master plan to view details.</div>';

  const isAvailable = plot.status === 'available';
  const isReserved = plot.status === 'reserved' || plot.status === 'booked';
  const isSold = plot.status === 'sold';

  let statusLabel = 'Available';
  let statusBadgeClass = 'status-badge available';
  let statusIcon = '✓';
  let actionButtonsHtml = '';

  if (isAvailable) {
    statusLabel = 'Available';
    statusBadgeClass = 'status-badge available';
    statusIcon = '✓';
    actionButtonsHtml = `
      <button type="button" class="pd-btn primary-choose" onclick="window.openPlotEnquiry('${plot.id}')">
        <span>Send Enquiry</span>
        <span class="btn-arrow">&rarr;</span>
      </button>

      <button type="button" class="pd-btn secondary-visit" onclick="window.openPlotSiteVisit('${plot.id}')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <span>Book a Site Visit</span>
      </button>
    `;
  } else if (isReserved) {
    statusLabel = 'Booked';
    statusBadgeClass = 'status-badge reserved';
    statusIcon = '⏳';
    actionButtonsHtml = `
      <div class="pd-protection-alert warning">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span>This plot is currently booked. You may inquire for cancellation waitlist.</span>
      </div>
      <button type="button" class="pd-btn secondary-visit" onclick="window.openPlotEnquiry('${plot.id}')">
        <span>Inquire for Waitlist</span>
      </button>
    `;
  } else if (isSold) {
    statusLabel = 'Sold Out';
    statusBadgeClass = 'status-badge sold';
    statusIcon = '✕';
    actionButtonsHtml = `
      <div class="pd-protection-alert danger">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        <span>This plot has been sold and is no longer available for booking.</span>
      </div>
      <button type="button" class="pd-btn disabled-btn" disabled>
        <span>Unit Unavailable</span>
      </button>
    `;
  }

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
          <span class="status-icon">${statusIcon}</span>
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
        ${actionButtonsHtml}

        <a href="https://maps.google.com/?q=Shadnagar+Hyderabad" target="_blank" rel="noopener" class="pd-btn flat-maps">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>View on Google Maps</span>
        </a>
      </div>

    </div>
  `;
}

/**
 * Controller & Event Binding for Interactive Open Plots Master Plan
 */
export function initPlotMasterPlan(project) {
  const plots = project.plots || [];
  let currentZoom = 1;
  let currentFsZoom = 1;

  // Send Enquiry Handler matching Villas Send Enquiry screen & flow
  window.openPlotEnquiry = function(plotId) {
    const plot = (plots || []).find(p => p.id === plotId) || plots[0];
    if (!plot) return;

    if (plot.status === 'sold') {
      alert('This plot has been sold and is no longer available for enquiry.');
      return;
    }

    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    const today = new Date();
    const defaultDateStr = today.toISOString().split('T')[0];

    modalContainer.innerHTML = `
      <div class="plot-enquiry-overlay" id="plot-enquiry-overlay">
        <div class="villas-form-card" style="margin: 0; max-height: 90vh; overflow-y: auto; width: 100%; max-width: 520px; animation: plotScaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);">
          <div class="villas-form-header">
            <h1 class="villas-form-title">Send Enquiry</h1>
            <button type="button" class="villas-btn-close" onclick="window.closePlotEnquiry()" aria-label="Close form">
              &times;
            </button>
          </div>
          <p class="villas-form-subtitle">Get in touch with our team. We will call you shortly.</p>

          <form id="plot-enquiry-form" onsubmit="window.submitPlotEnquiry(event, '${plot.id}')">
            <div class="villas-form-group">
              <label class="villas-form-label">Full Name <span class="req">*</span></label>
              <input type="text" class="villas-input" id="plot-enquiry-name" placeholder="Enter your name" required />
            </div>

            <div class="villas-form-group">
              <label class="villas-form-label">Mobile Number <span class="req">*</span></label>
              <input type="tel" class="villas-input" id="plot-enquiry-phone" placeholder="Enter mobile number" required />
            </div>

            <div class="villas-form-group">
              <label class="villas-form-label">Email</label>
              <input type="email" class="villas-input" id="plot-enquiry-email" placeholder="Enter your email" />
            </div>

            <div class="villas-form-group">
              <label class="villas-form-label">Preferred Date</label>
              <input type="date" class="villas-input" id="plot-enquiry-date" value="${defaultDateStr}" />
            </div>

            <div class="villas-form-group">
              <label class="villas-form-label">Message (Optional)</label>
              <textarea class="villas-textarea" id="plot-enquiry-message" rows="3" placeholder="I am interested in Plot ${plot.num}..."></textarea>
            </div>

            <!-- Selected Property Card (Corresponds directly to selected plot) -->
            <div class="villas-selected-prop-card">
              <img src="/images/journey/gallery_entrance.jpg" alt="Plot ${plot.num}" class="villas-selected-prop-thumb" />
              <div class="villas-selected-prop-meta">
                <div class="villas-selected-prop-eyebrow">Selected Property</div>
                <div class="villas-selected-prop-name">Plot ${plot.num} &bull; ${plot.size} Sq.Yds</div>
                <div class="villas-selected-prop-loc">${project.name || 'VR Green Meadows'}, Shadnagar</div>
                <div class="villas-selected-prop-price">${plot.price} <span style="font-size:0.8rem; font-weight:normal; color:#6B7280;">(${plot.rate})</span></div>
              </div>
            </div>

            <!-- Consent Checkboxes -->
            <div class="villas-consent-group">
              <label class="villas-checkbox-label">
                <input type="checkbox" id="plot-enquiry-whatsapp" checked />
                <span>I agree to be contacted via call/WhatsApp</span>
              </label>
              <label class="villas-checkbox-label">
                <input type="checkbox" id="plot-enquiry-terms" checked required />
                <span>I accept the Terms &amp; Privacy Policy</span>
              </label>
            </div>

            <button type="submit" class="villas-btn-primary" style="width: 100%;">
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    `;

    const overlay = document.getElementById('plot-enquiry-overlay');
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        window.closePlotEnquiry();
      }
    });
  };

  window.closePlotEnquiry = function() {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) modalContainer.innerHTML = '';
  };

  window.submitPlotEnquiry = function(event, plotId) {
    if (event) event.preventDefault();
    const plot = (plots || []).find(p => p.id === plotId) || plots[0];
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="plot-enquiry-overlay" id="plot-enquiry-overlay">
        <div class="villas-success-card" style="margin: 0; max-height: 90vh; overflow-y: auto; width: 100%; max-width: 480px; animation: plotScaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);">
          <!-- Big Mint Checkmark Icon -->
          <div class="villas-success-checkmark-wrap">
            <div class="villas-success-check-inner">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          <h1 class="villas-success-title">Enquiry Submitted!</h1>
          <p class="villas-success-sub">
            Thank you for your interest in <strong>Plot ${plot ? plot.num : ''}</strong>.<br />
            Our team will contact you shortly.
          </p>

          <!-- What Happens Next 3 Steps Box -->
          <div class="villas-next-steps-box">
            <div class="villas-next-steps-title">What happens next?</div>
            
            <div class="villas-step-row">
              <div class="villas-step-icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
              </div>
              <div class="villas-step-content">
                <span class="villas-step-num">1</span> Our team will review your details.
              </div>
            </div>

            <div class="villas-step-row">
              <div class="villas-step-icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div class="villas-step-content">
                <span class="villas-step-num">2</span> You will receive a call from our sales team.
              </div>
            </div>

            <div class="villas-step-row">
              <div class="villas-step-icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              </div>
              <div class="villas-step-content">
                <span class="villas-step-num">3</span> Get ready to explore your dream plot!
              </div>
            </div>
          </div>

          <!-- Back to Master Plan Button -->
          <button type="button" class="villas-btn-back-project" onclick="window.closePlotEnquiry()" style="margin-top: 18px; width: 100%;">
            Back to Master Plan
          </button>

          <!-- Bottom Artwork -->
          <div class="villas-success-artwork-wrap">
            <img src="/images/villas/success-illustration.png" alt="Your Dream Property is Just a Step Away!" class="villas-success-art-img" />
          </div>
        </div>
      </div>
    `;

    const overlay = document.getElementById('plot-enquiry-overlay');
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        window.closePlotEnquiry();
      }
    });
  };

  // Strict Booking Protection
  window.openPlotSiteVisit = function(plotId) {
    const plot = (plots || []).find(p => p.id === plotId) || plots[0];
    if (!plot) return;

    if (plot.status === 'sold' || plot.status === 'reserved' || plot.status === 'booked') {
      alert('This plot is not currently available for booking.');
      return;
    }

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

    if (detailsCard) {
      detailsCard.innerHTML = renderPlotDetailsContent(plot, project.name, false);
      detailsCard.classList.add('mobile-open');
      attachCloseListeners();
    }

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
          rect.setAttribute('fill', 'url(#mp-plot-selected)');
          rect.setAttribute('stroke', '#0284C7');
          rect.setAttribute('stroke-width', '2.8');
          rect.setAttribute('filter', 'url(#mp-glow-blue)');
        }
        if (text) {
          text.setAttribute('fill', '#0369A1');
          text.setAttribute('font-weight', '800');
        }
      } else {
        el.classList.remove('plot-selected');
        let normalFill = 'url(#mp-plot-avail)';
        let normalStroke = '#22C55E';
        let normalText = '#0F1E2C';
        let filterA = 'url(#mp-soft-shadow)';

        if (status === 'reserved' || status === 'booked') {
          normalFill = 'url(#mp-plot-booked)';
          normalStroke = '#F59E0B';
          normalText = '#78350F';
          filterA = 'url(#mp-glow-amber)';
        } else if (status === 'sold') {
          normalFill = 'url(#mp-plot-sold)';
          normalStroke = '#F43F5E';
          normalText = '#881337';
          filterA = 'url(#mp-glow-rose)';
        }

        if (rect) {
          rect.setAttribute('fill', normalFill);
          rect.setAttribute('stroke', normalStroke);
          rect.setAttribute('stroke-width', '1.5');
          rect.setAttribute('filter', filterA);
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
    item.addEventListener('click', () => {
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
        if (detailsCard) detailsCard.classList.remove('mobile-open');
      });
    }

    if (fsClose) {
      fsClose.addEventListener('click', () => {
        if (fsPlotPanel) fsPlotPanel.style.display = 'none';
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
    if (availRes && availRes.checked) {
      allowedStatuses.push('reserved');
      allowedStatuses.push('booked');
    }
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
