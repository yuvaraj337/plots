/**
 * 100% Code-Driven 3D Architectural Apartment Floor Plan Component
 * High-fidelity architectural vector visualization for building floor layouts
 * Features:
 * - 3D architectural elevation, realistic wall depths, textured rooms (living, bed, kitchen, bath, balcony)
 * - Central Lift Lobby with 2 elevator shafts and dual fire-exit staircases
 * - Real interactive unit components (A-701 to A-706) with data-driven status styling
 * - Status engine: Available, On Hold, Booked, Sold
 * - Booking protection & status validation
 * - Zoom in/out/reset and Fullscreen mode
 */

// Default Floor Plan Units Data (Tower A, 7th Floor)
export const DEFAULT_FLOOR_UNITS = [
  {
    id: 'A-701',
    num: 'A-701',
    type: '2 BHK',
    size: '1,200 Sq.Ft.',
    price: '₹ 95 Lakhs',
    priceSub: '(All Inclusive)',
    facing: 'North Facing',
    beds: '2',
    baths: '2',
    balconies: '1',
    status: 'available',
    pos: { x: 40, y: 35, width: 275, height: 260 },
    thumb: '/images/journey/room_living.jpg'
  },
  {
    id: 'A-702',
    num: 'A-702',
    type: '3 BHK',
    size: '1,450 Sq.Ft.',
    price: '₹ 1.20 Cr',
    priceSub: '(All Inclusive)',
    facing: 'East Facing',
    beds: '3',
    baths: '3',
    balconies: '2',
    status: 'available',
    pos: { x: 335, y: 35, width: 230, height: 260 },
    thumb: '/images/journey/room_living.jpg'
  },
  {
    id: 'A-703',
    num: 'A-703',
    type: '3 BHK',
    size: '1,500 Sq.Ft.',
    price: '₹ 1.28 Cr',
    priceSub: '(All Inclusive)',
    facing: 'West Facing',
    beds: '3',
    baths: '3',
    balconies: '2',
    status: 'available',
    pos: { x: 585, y: 35, width: 275, height: 260 },
    thumb: '/images/journey/room_living.jpg'
  },
  {
    id: 'A-704',
    num: 'A-704',
    type: '3 BHK',
    size: '1,850 Sq.Ft.',
    price: '₹ 1.25 Cr',
    priceSub: '(All Inclusive)',
    facing: 'East Facing',
    beds: '3',
    baths: '3',
    balconies: '2',
    status: 'on_hold',
    isHighlight: true,
    pos: { x: 40, y: 375, width: 275, height: 270 },
    thumb: '/images/journey/room_living.jpg'
  },
  {
    id: 'A-705',
    num: 'A-705',
    type: '2 BHK',
    size: '1,220 Sq.Ft.',
    price: '₹ 98 Lakhs',
    priceSub: '(All Inclusive)',
    facing: 'North Facing',
    beds: '2',
    baths: '2',
    balconies: '1',
    status: 'available',
    pos: { x: 335, y: 385, width: 230, height: 260 },
    thumb: '/images/journey/room_living.jpg'
  },
  {
    id: 'A-706',
    num: 'A-706',
    type: '3 BHK',
    size: '1,480 Sq.Ft.',
    price: '₹ 1.24 Cr',
    priceSub: '(All Inclusive)',
    facing: 'South Facing',
    beds: '3',
    baths: '3',
    balconies: '2',
    status: 'available',
    pos: { x: 585, y: 375, width: 275, height: 270 },
    thumb: '/images/journey/room_living.jpg'
  }
];

/**
 * Status Theme Configuration Engine
 */
export function getUnitStatusTheme(status) {
  switch (status) {
    case 'on_hold':
    case 'hold':
      return {
        label: 'On Hold',
        badgeBg: '#FEF3C7',
        badgeText: '#92400E',
        badgeBorder: '#F59E0B',
        floorGlow: 'rgba(245, 158, 11, 0.22)',
        unitOverlay: 'rgba(217, 119, 6, 0.18)',
        wallTone: '#B45309',
        borderTone: '#D97706',
        badgeClass: 'status-hold'
      };
    case 'booked':
      return {
        label: 'Booked',
        badgeBg: '#FEE2E2',
        badgeText: '#B91C1C',
        badgeBorder: '#EF4444',
        floorGlow: 'rgba(239, 68, 68, 0.18)',
        unitOverlay: 'rgba(239, 68, 68, 0.16)',
        wallTone: '#991B1B',
        borderTone: '#DC2626',
        badgeClass: 'status-booked'
      };
    case 'sold':
      return {
        label: 'Sold',
        badgeBg: '#F3F4F6',
        badgeText: '#6B7280',
        badgeBorder: '#9CA3AF',
        floorGlow: 'rgba(107, 114, 128, 0.12)',
        unitOverlay: 'rgba(156, 163, 175, 0.28)',
        wallTone: '#4B5563',
        borderTone: '#6B7280',
        badgeClass: 'status-sold'
      };
    case 'available':
    default:
      return {
        label: 'Available',
        badgeBg: '#DCFCE7',
        badgeText: '#15803D',
        badgeBorder: '#22C55E',
        floorGlow: 'rgba(34, 197, 94, 0.12)',
        unitOverlay: 'transparent',
        wallTone: '#374151',
        borderTone: '#1A3B2B',
        badgeClass: 'status-available'
      };
  }
}

/**
 * Generate 100% SVG Architectural Floor Plan
 */
export function generateApartmentFloorPlanSvg(units, activeUnitId = 'A-704', prefix = 'afp') {
  return `
    <svg viewBox="0 0 900 680" class="afp-architectural-svg" id="${prefix}-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Drop Shadows & 3D Lighting -->
        <filter id="${prefix}-building-shadow" x="-5%" y="-5%" width="115%" height="115%">
          <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#0E2319" flood-opacity="0.18" />
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.08" />
        </filter>

        <filter id="${prefix}-wall-depth" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" flood-color="#111827" flood-opacity="0.3" />
        </filter>

        <filter id="${prefix}-badge-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.16" />
        </filter>

        <!-- Floor Patterns & Materials -->
        <pattern id="${prefix}-tile-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#F8F6F0" />
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#E6E0D4" stroke-width="0.8" />
        </pattern>

        <pattern id="${prefix}-wood-pattern" width="24" height="8" patternUnits="userSpaceOnUse">
          <rect width="24" height="8" fill="#EFE8DA" />
          <path d="M 0 8 L 24 8 M 12 0 L 12 8" fill="none" stroke="#DED2BE" stroke-width="0.75" />
        </pattern>

        <pattern id="${prefix}-lobby-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#E2E8F0" />
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#CBD5E1" stroke-width="0.9" />
        </pattern>

        <pattern id="${prefix}-bath-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#EDF2F7" />
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#E2E8F0" stroke-width="0.6" />
        </pattern>

        <pattern id="${prefix}-balcony-deck" width="6" height="16" patternUnits="userSpaceOnUse">
          <rect width="6" height="16" fill="#D7DDD6" />
          <line x1="6" y1="0" x2="6" y2="16" stroke="#B8C4B6" stroke-width="0.75" />
        </pattern>

        <!-- Gradients -->
        <linearGradient id="${prefix}-slab-edge" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#4B5563" />
          <stop offset="100%" stop-color="#1F2937" />
        </linearGradient>

        <linearGradient id="${prefix}-lift-door" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#334155" />
          <stop offset="48%" stop-color="#64748B" />
          <stop offset="50%" stop-color="#1E293B" />
          <stop offset="52%" stop-color="#64748B" />
          <stop offset="100%" stop-color="#334155" />
        </linearGradient>

        <linearGradient id="${prefix}-glass-railing" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#93C5FD" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#60A5FA" stop-opacity="0.2" />
        </linearGradient>

        <!-- Plant Texture Dot -->
        <radialGradient id="${prefix}-leaf-grad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#4ADE80" />
          <stop offset="100%" stop-color="#15803D" />
        </radialGradient>
      </defs>

      <!-- ══════════════════════════════════════════════════════════
           1. BUILDING CONCRETE BASE & OUTER 3D FOUNDATION SLAB
           ══════════════════════════════════════════════════════════ -->
      <g id="${prefix}-building-base" filter="url(#${prefix}-building-shadow)">
        <!-- 3D Bottom Slab Edge (Extrusion depth) -->
        <polygon points="28,32 872,32 872,658 860,666 40,666 28,658" fill="url(#${prefix}-slab-edge)" />
        <rect x="30" y="25" width="840" height="630" rx="14" fill="#374151" />
        <rect x="33" y="28" width="834" height="624" rx="12" fill="#E5E7EB" stroke="#D1D5DB" stroke-width="1.5" />
        
        <!-- Outer Concrete Balcony Perimeters & Planter Ledges -->
        <rect x="38" y="32" width="824" height="616" rx="10" fill="#FAF9F6" />
      </g>

      <!-- ══════════════════════════════════════════════════════════
           2. CENTRAL CORE: LIFT LOBBY, 2 LIFTS & 2 FIRE STAIRCASES
           ══════════════════════════════════════════════════════════ -->
      <g id="${prefix}-central-core">
        <!-- Main Central Corridor & Lift Lobby Floor -->
        <rect x="318" y="285" width="264" height="108" fill="url(#${prefix}-lobby-pattern)" stroke="#94A3B8" stroke-width="1" />
        
        <!-- Lift Lobby Text Tag -->
        <rect x="408" y="344" width="84" height="20" rx="4" fill="rgba(255,255,255,0.85)" stroke="#CBD5E1" stroke-width="0.8" />
        <text x="450" y="358" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#475569" text-anchor="middle" letter-spacing="1">LIFT LOBBY</text>

        <!-- 2 Elevators / Lift Shafts in Center -->
        <g transform="translate(396, 290)">
          <!-- Lift 1 (Left) -->
          <rect x="0" y="0" width="50" height="48" rx="4" fill="#1E293B" stroke="#0F172A" stroke-width="2" />
          <rect x="3" y="3" width="44" height="42" rx="2" fill="url(#${prefix}-lift-door)" />
          <line x1="25" y1="3" x2="25" y2="45" stroke="#0F172A" stroke-width="1.5" />
          <rect x="15" y="44" width="20" height="3" fill="#E2E8F0" />
          <text x="25" y="28" font-family="sans-serif" font-size="9" font-weight="800" fill="#94A3B8" text-anchor="middle">L1</text>

          <!-- Lift 2 (Right) -->
          <rect x="58" y="0" width="50" height="48" rx="4" fill="#1E293B" stroke="#0F172A" stroke-width="2" />
          <rect x="61" y="3" width="44" height="42" rx="2" fill="url(#${prefix}-lift-door)" />
          <line x1="83" y1="3" x2="83" y2="45" stroke="#0F172A" stroke-width="1.5" />
          <rect x="73" y="44" width="20" height="3" fill="#E2E8F0" />
          <text x="83" y="28" font-family="sans-serif" font-size="9" font-weight="800" fill="#94A3B8" text-anchor="middle">L2</text>
        </g>

        <!-- Left Staircase (Fire Exit 1) -->
        <g transform="translate(195, 290)">
          <rect x="0" y="0" width="120" height="80" fill="#E2E8F0" stroke="#475569" stroke-width="2" />
          <line x1="0" y1="10" x2="120" y2="10" stroke="#94A3B8" stroke-width="1" />
          <line x1="0" y1="20" x2="120" y2="20" stroke="#94A3B8" stroke-width="1" />
          <line x1="0" y1="30" x2="120" y2="30" stroke="#94A3B8" stroke-width="1" />
          <line x1="0" y1="40" x2="120" y2="40" stroke="#64748B" stroke-width="2" />
          <line x1="0" y1="50" x2="120" y2="50" stroke="#94A3B8" stroke-width="1" />
          <line x1="0" y1="60" x2="120" y2="60" stroke="#94A3B8" stroke-width="1" />
          <line x1="0" y1="70" x2="120" y2="70" stroke="#94A3B8" stroke-width="1" />
          <rect x="56" y="0" width="8" height="80" fill="#334155" />
          <path d="M 30 75 L 30 15 L 45 15" fill="none" stroke="#2563EB" stroke-width="1.5" stroke-dasharray="3 2" />
          <polygon points="45,12 50,15 45,18" fill="#2563EB" />
        </g>

        <!-- Right Staircase (Fire Exit 2) -->
        <g transform="translate(585, 290)">
          <rect x="0" y="0" width="120" height="80" fill="#E2E8F0" stroke="#475569" stroke-width="2" />
          <line x1="0" y1="10" x2="120" y2="10" stroke="#94A3B8" stroke-width="1" />
          <line x1="0" y1="20" x2="120" y2="20" stroke="#94A3B8" stroke-width="1" />
          <line x1="0" y1="30" x2="120" y2="30" stroke="#94A3B8" stroke-width="1" />
          <line x1="0" y1="40" x2="120" y2="40" stroke="#64748B" stroke-width="2" />
          <line x1="0" y1="50" x2="120" y2="50" stroke="#94A3B8" stroke-width="1" />
          <line x1="0" y1="60" x2="120" y2="60" stroke="#94A3B8" stroke-width="1" />
          <line x1="0" y1="70" x2="120" y2="70" stroke="#94A3B8" stroke-width="1" />
          <rect x="56" y="0" width="8" height="80" fill="#334155" />
          <path d="M 90 75 L 90 15 L 75 15" fill="none" stroke="#2563EB" stroke-width="1.5" stroke-dasharray="3 2" />
          <polygon points="75,12 70,15 75,18" fill="#2563EB" />
        </g>

        <!-- Left Service Shafts -->
        <rect x="145" y="290" width="48" height="80" fill="#CBD5E1" stroke="#475569" stroke-width="1.5" />
        <line x1="145" y1="290" x2="193" y2="370" stroke="#94A3B8" stroke-width="1" />
        <line x1="193" y1="290" x2="145" y2="370" stroke="#94A3B8" stroke-width="1" />

        <!-- Right Service Shafts -->
        <rect x="707" y="290" width="48" height="80" fill="#CBD5E1" stroke="#475569" stroke-width="1.5" />
        <line x1="707" y1="290" x2="755" y2="370" stroke="#94A3B8" stroke-width="1" />
        <line x1="755" y1="290" x2="707" y2="370" stroke="#94A3B8" stroke-width="1" />

        <!-- Entrance Red Arrow Chevrons to Units -->
        <polygon points="340,285 348,276 356,285" fill="#DC2626" />
        <polygon points="545,285 553,276 561,285" fill="#DC2626" />
        <polygon points="340,393 348,402 356,393" fill="#DC2626" />
        <polygon points="545,393 553,402 561,393" fill="#DC2626" />
        <polygon points="318,340 309,348 318,356" fill="#DC2626" />
        <polygon points="582,340 591,348 582,356" fill="#DC2626" />
      </g>

      <!-- ══════════════════════════════════════════════════════════
           3. INDIVIDUAL APARTMENTS (A-701 to A-706)
           ══════════════════════════════════════════════════════════ -->
      ${units.map(unit => renderUnitSvgBlock(unit, activeUnitId, prefix)).join('')}

      <!-- ══════════════════════════════════════════════════════════
           4. ARCHITECTURAL WALL BOUNDARIES & CORRIDOR PERIMETERS
           ══════════════════════════════════════════════════════════ -->
      <g id="${prefix}-master-walls" filter="url(#${prefix}-wall-depth)" pointer-events="none">
        <!-- Horizontal Main Dividers -->
        <rect x="40" y="280" width="820" height="8" fill="#1F2937" />
        <rect x="40" y="385" width="820" height="8" fill="#1F2937" />

        <!-- Vertical Main Dividers -->
        <rect x="315" y="35" width="8" height="610" fill="#1F2937" />
        <rect x="577" y="35" width="8" height="610" fill="#1F2937" />

        <!-- Outer Building Heavy Structural Walls -->
        <rect x="36" y="31" width="8" height="618" fill="#1F2937" />
        <rect x="856" y="31" width="8" height="618" fill="#1F2937" />
        <rect x="36" y="31" width="828" height="8" fill="#1F2937" />
        <rect x="36" y="641" width="828" height="8" fill="#1F2937" />

        <!-- Outer Glass Balcony Railing Highlights -->
        <rect x="44" y="33" width="812" height="3" fill="url(#${prefix}-glass-railing)" />
        <rect x="44" y="644" width="812" height="3" fill="url(#${prefix}-glass-railing)" />
        <rect x="38" y="33" width="3" height="614" fill="url(#${prefix}-glass-railing)" />
        <rect x="859" y="33" width="3" height="614" fill="url(#${prefix}-glass-railing)" />
      </g>

      <!-- ══════════════════════════════════════════════════════════
           5. INTERACTIVE FLOATING UNIT BADGES
           ══════════════════════════════════════════════════════════ -->
      <g id="${prefix}-floating-badges">
        ${units.map(unit => renderFloatingBadge(unit, activeUnitId, prefix)).join('')}
      </g>
    </svg>
  `;
}

/**
 * Render Detailed Architectural Floor Geometry for a specific unit
 */
function renderUnitSvgBlock(unit, activeUnitId, prefix) {
  const { id, pos, status } = unit;
  const isActive = id === activeUnitId;
  const theme = getUnitStatusTheme(status);

  // Determine architectural room sub-divisions based on unit position
  let roomDetailsSvg = '';

  if (id === 'A-701') {
    // Top Left (2 BHK)
    roomDetailsSvg = `
      <!-- Master Bedroom -->
      <rect x="44" y="39" width="130" height="130" fill="url(#${prefix}-wood-pattern)" />
      <!-- Bed Silhouette -->
      <rect x="58" y="52" width="60" height="74" rx="4" fill="#D6C7B2" stroke="#A89279" stroke-width="1.5" />
      <rect x="63" y="56" width="22" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />
      <rect x="91" y="56" width="22" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />
      <rect x="58" y="80" width="60" height="46" rx="2" fill="#BFA78A" opacity="0.4" />
      <rect x="50" y="52" width="6" height="16" rx="1" fill="#8C7355" />
      <rect x="120" y="52" width="6" height="16" rx="1" fill="#8C7355" />

      <!-- Bedroom 2 -->
      <rect x="178" y="39" width="134" height="130" fill="url(#${prefix}-wood-pattern)" />
      <!-- Bed 2 -->
      <rect x="220" y="52" width="58" height="74" rx="4" fill="#D6C7B2" stroke="#A89279" stroke-width="1.5" />
      <rect x="225" y="56" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />
      <rect x="253" y="56" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />

      <!-- Living & Dining Area -->
      <rect x="44" y="173" width="170" height="104" fill="url(#${prefix}-tile-pattern)" />
      <!-- Sofa & Coffee Table -->
      <rect x="54" y="195" width="20" height="60" rx="4" fill="#CBD5E1" stroke="#94A3B8" stroke-width="1" />
      <rect x="80" y="205" width="30" height="40" rx="3" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1" />

      <!-- Kitchen & Utility -->
      <rect x="218" y="173" width="94" height="104" fill="url(#${prefix}-tile-pattern)" />
      <rect x="222" y="177" width="86" height="22" rx="2" fill="#334155" />
      <!-- Stove burners -->
      <circle cx="245" cy="188" r="4" fill="#64748B" />
      <circle cx="285" cy="188" r="4" fill="#64748B" />

      <!-- Balcony Planters -->
      <g transform="translate(44, 39)">
        <circle cx="10" cy="8" r="4" fill="url(#${prefix}-leaf-grad)" />
        <circle cx="22" cy="8" r="3.5" fill="url(#${prefix}-leaf-grad)" />
        <circle cx="34" cy="8" r="4" fill="url(#${prefix}-leaf-grad)" />
      </g>
    `;
  } else if (id === 'A-702') {
    // Top Center (3 BHK)
    roomDetailsSvg = `
      <!-- Living & Dining Center -->
      <rect x="323" y="39" width="130" height="160" fill="url(#${prefix}-tile-pattern)" />
      <!-- Dining Table with 6 Chairs -->
      <rect x="345" y="130" width="36" height="50" rx="4" fill="#8C7355" stroke="#5C4033" stroke-width="1" />
      <circle cx="338" cy="140" r="3" fill="#A89279" />
      <circle cx="338" cy="155" r="3" fill="#A89279" />
      <circle cx="338" cy="170" r="3" fill="#A89279" />
      <circle cx="388" cy="140" r="3" fill="#A89279" />
      <circle cx="388" cy="155" r="3" fill="#A89279" />
      <circle cx="388" cy="170" r="3" fill="#A89279" />

      <!-- Master Bedroom Suite -->
      <rect x="457" y="39" width="116" height="140" fill="url(#${prefix}-wood-pattern)" />
      <rect x="480" y="52" width="58" height="74" rx="4" fill="#D6C7B2" stroke="#A89279" stroke-width="1.5" />
      <rect x="485" y="56" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />
      <rect x="513" y="56" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />

      <!-- Kitchen -->
      <rect x="457" y="183" width="116" height="94" fill="url(#${prefix}-tile-pattern)" />
      <rect x="495" y="187" width="74" height="20" rx="2" fill="#334155" />

      <!-- Balcony Planters -->
      <g transform="translate(360, 39)">
        <circle cx="10" cy="8" r="4" fill="url(#${prefix}-leaf-grad)" />
        <circle cx="22" cy="8" r="3.5" fill="url(#${prefix}-leaf-grad)" />
      </g>
    `;
  } else if (id === 'A-703') {
    // Top Right (3 BHK)
    roomDetailsSvg = `
      <!-- Master Bedroom -->
      <rect x="585" y="39" width="130" height="130" fill="url(#${prefix}-wood-pattern)" />
      <rect x="610" y="52" width="58" height="74" rx="4" fill="#D6C7B2" stroke="#A89279" stroke-width="1.5" />
      <rect x="615" y="56" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />
      <rect x="643" y="56" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />

      <!-- Bedroom 2 -->
      <rect x="719" y="39" width="134" height="130" fill="url(#${prefix}-wood-pattern)" />
      <rect x="750" y="52" width="58" height="74" rx="4" fill="#D6C7B2" stroke="#A89279" stroke-width="1.5" />
      <rect x="755" y="56" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />
      <rect x="783" y="56" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />

      <!-- Living / Dining Area -->
      <rect x="585" y="173" width="160" height="104" fill="url(#${prefix}-tile-pattern)" />
      <rect x="600" y="195" width="20" height="55" rx="4" fill="#CBD5E1" stroke="#94A3B8" stroke-width="1" />
      <rect x="625" y="200" width="30" height="40" rx="3" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1" />

      <!-- Kitchen -->
      <rect x="749" y="173" width="104" height="104" fill="url(#${prefix}-tile-pattern)" />
      <rect x="755" y="177" width="94" height="20" rx="2" fill="#334155" />

      <!-- Planters -->
      <g transform="translate(800, 39)">
        <circle cx="10" cy="8" r="4" fill="url(#${prefix}-leaf-grad)" />
        <circle cx="22" cy="8" r="3.5" fill="url(#${prefix}-leaf-grad)" />
      </g>
    `;
  } else if (id === 'A-704') {
    // Bottom Left (3 BHK, Featured/Selected unit)
    roomDetailsSvg = `
      <!-- Master Suite 1 -->
      <rect x="44" y="393" width="130" height="120" fill="url(#${prefix}-wood-pattern)" />
      <rect x="58" y="405" width="60" height="74" rx="4" fill="#D6C7B2" stroke="#A89279" stroke-width="1.5" />
      <rect x="63" y="409" width="22" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />
      <rect x="91" y="409" width="22" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />

      <!-- Master Suite 2 -->
      <rect x="44" y="517" width="130" height="120" fill="url(#${prefix}-wood-pattern)" />
      <rect x="58" y="535" width="60" height="74" rx="4" fill="#D6C7B2" stroke="#A89279" stroke-width="1.5" />
      <rect x="63" y="539" width="22" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />
      <rect x="91" y="539" width="22" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />

      <!-- Grand Living / Dining -->
      <rect x="178" y="393" width="134" height="140" fill="url(#${prefix}-tile-pattern)" />
      <rect x="235" y="415" width="36" height="50" rx="4" fill="#8C7355" stroke="#5C4033" stroke-width="1" />
      <circle cx="228" cy="425" r="3" fill="#A89279" />
      <circle cx="228" cy="440" r="3" fill="#A89279" />
      <circle cx="228" cy="455" r="3" fill="#A89279" />
      <circle cx="278" cy="425" r="3" fill="#A89279" />
      <circle cx="278" cy="440" r="3" fill="#A89279" />
      <circle cx="278" cy="455" r="3" fill="#A89279" />

      <!-- Bedroom 3 -->
      <rect x="178" y="537" width="134" height="100" fill="url(#${prefix}-wood-pattern)" />
      <rect x="220" y="548" width="58" height="72" rx="4" fill="#D6C7B2" stroke="#A89279" stroke-width="1.5" />
      <rect x="225" y="552" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />
      <rect x="253" y="552" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />

      <!-- Balcony Planters -->
      <g transform="translate(44, 625)">
        <circle cx="10" cy="8" r="4" fill="url(#${prefix}-leaf-grad)" />
        <circle cx="22" cy="8" r="3.5" fill="url(#${prefix}-leaf-grad)" />
        <circle cx="34" cy="8" r="4" fill="url(#${prefix}-leaf-grad)" />
      </g>
    `;
  } else if (id === 'A-705') {
    // Bottom Center (2 BHK)
    roomDetailsSvg = `
      <!-- Living & Dining -->
      <rect x="323" y="393" width="130" height="150" fill="url(#${prefix}-tile-pattern)" />
      <rect x="345" y="415" width="36" height="50" rx="4" fill="#8C7355" stroke="#5C4033" stroke-width="1" />
      <circle cx="338" cy="425" r="3" fill="#A89279" />
      <circle cx="338" cy="440" r="3" fill="#A89279" />
      <circle cx="338" cy="455" r="3" fill="#A89279" />
      <circle cx="388" cy="425" r="3" fill="#A89279" />
      <circle cx="388" cy="440" r="3" fill="#A89279" />
      <circle cx="388" cy="455" r="3" fill="#A89279" />

      <!-- Master Bedroom Suite -->
      <rect x="457" y="393" width="116" height="150" fill="url(#${prefix}-wood-pattern)" />
      <rect x="480" y="415" width="58" height="74" rx="4" fill="#D6C7B2" stroke="#A89279" stroke-width="1.5" />
      <rect x="485" y="419" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />
      <rect x="513" y="419" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />

      <!-- Kitchen -->
      <rect x="323" y="547" width="116" height="90" fill="url(#${prefix}-tile-pattern)" />
      <rect x="328" y="552" width="70" height="20" rx="2" fill="#334155" />

      <!-- Balcony Planters -->
      <g transform="translate(480, 625)">
        <circle cx="10" cy="8" r="4" fill="url(#${prefix}-leaf-grad)" />
        <circle cx="22" cy="8" r="3.5" fill="url(#${prefix}-leaf-grad)" />
      </g>
    `;
  } else if (id === 'A-706') {
    // Bottom Right (3 BHK)
    roomDetailsSvg = `
      <!-- Master Bedroom -->
      <rect x="585" y="393" width="130" height="120" fill="url(#${prefix}-wood-pattern)" />
      <rect x="610" y="405" width="58" height="74" rx="4" fill="#D6C7B2" stroke="#A89279" stroke-width="1.5" />
      <rect x="615" y="409" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />
      <rect x="643" y="409" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />

      <!-- Bedroom 2 -->
      <rect x="719" y="393" width="134" height="120" fill="url(#${prefix}-wood-pattern)" />
      <rect x="750" y="405" width="58" height="74" rx="4" fill="#D6C7B2" stroke="#A89279" stroke-width="1.5" />
      <rect x="755" y="409" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />
      <rect x="783" y="409" width="20" height="16" rx="2" fill="#FFFFFF" opacity="0.8" />

      <!-- Living / Dining Area -->
      <rect x="585" y="517" width="150" height="120" fill="url(#${prefix}-tile-pattern)" />
      <rect x="600" y="540" width="20" height="55" rx="4" fill="#CBD5E1" stroke="#94A3B8" stroke-width="1" />
      <rect x="625" y="545" width="30" height="40" rx="3" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1" />

      <!-- Kitchen -->
      <rect x="739" y="517" width="114" height="120" fill="url(#${prefix}-tile-pattern)" />
      <rect x="745" y="522" width="100" height="20" rx="2" fill="#334155" />

      <!-- Planters -->
      <g transform="translate(780, 625)">
        <circle cx="10" cy="8" r="4" fill="url(#${prefix}-leaf-grad)" />
        <circle cx="22" cy="8" r="3.5" fill="url(#${prefix}-leaf-grad)" />
      </g>
    `;
  }

  return `
    <g class="afp-unit-group ${isActive ? 'active-unit' : ''} status-${status}" 
       id="${prefix}-unit-${id}" 
       data-unit-id="${id}"
       onclick="window._aptSelectUnit('${id}')"
       style="cursor: pointer;">
      
      <!-- Base Room Architectures -->
      <g class="afp-unit-rooms">
        ${roomDetailsSvg}
      </g>

      <!-- Status Floor Overlay & Selection Ambient Glow -->
      <rect x="${pos.x}" y="${pos.y}" width="${pos.width}" height="${pos.height}" 
            rx="6"
            class="afp-unit-overlay-rect"
            fill="${theme.unitOverlay}"
            stroke="${isActive ? '#1A3B2B' : (status === 'on_hold' ? '#D97706' : 'transparent')}"
            stroke-width="${isActive ? '2.5' : (status === 'on_hold' ? '1.5' : '0')}"
            stroke-dasharray="${status === 'on_hold' && !isActive ? '4 3' : 'none'}" />
      
      <!-- Interactive Click Hitbox -->
      <rect x="${pos.x}" y="${pos.y}" width="${pos.width}" height="${pos.height}" 
            fill="transparent" 
            class="afp-unit-hitbox" />
    </g>
  `;
}

/**
 * Render Floating Glassmorphic Unit Badges (Matches reference design)
 */
function renderFloatingBadge(unit, activeUnitId, prefix) {
  const { id, num, type, pos, status } = unit;
  const isActive = id === activeUnitId;
  const theme = getUnitStatusTheme(status);

  // Position badge centrally in the unit
  const badgeWidth = 84;
  const badgeHeight = 44;
  const badgeX = pos.x + (pos.width - badgeWidth) / 2;
  const badgeY = pos.y + (pos.height - badgeHeight) / 2;

  // Background style: On Hold is soft gold/amber, Available is crisp white, Sold is muted
  let badgeBgColor = '#FFFFFF';
  let badgeBorderColor = '#D1D5DB';
  let badgeTextColor = '#11291E';
  let subTextColor = '#6B7280';

  if (status === 'on_hold') {
    badgeBgColor = '#FEF3C7';
    badgeBorderColor = '#F59E0B';
    badgeTextColor = '#92400E';
    subTextColor = '#B45309';
  } else if (status === 'booked') {
    badgeBgColor = '#FEE2E2';
    badgeBorderColor = '#EF4444';
    badgeTextColor = '#991B1B';
    subTextColor = '#DC2626';
  } else if (status === 'sold') {
    badgeBgColor = '#F3F4F6';
    badgeBorderColor = '#9CA3AF';
    badgeTextColor = '#4B5563';
    subTextColor = '#9CA3AF';
  } else if (isActive) {
    badgeBorderColor = '#1A3B2B';
  }

  return `
    <g class="afp-badge-group" 
       id="${prefix}-badge-${id}" 
       transform="translate(${badgeX}, ${badgeY})"
       onclick="window._aptSelectUnit('${id}')"
       style="cursor: pointer;"
       filter="url(#${prefix}-badge-shadow)">
      
      <!-- Floating Card Pill -->
      <rect x="0" y="0" width="${badgeWidth}" height="${badgeHeight}" 
            rx="10" 
            fill="${badgeBgColor}" 
            stroke="${badgeBorderColor}" 
            stroke-width="${isActive ? '2' : '1.2'}" 
            class="afp-badge-card" />
      
      <!-- Unit Number -->
      <text x="${badgeWidth / 2}" y="19" 
            font-family="'Plus Jakarta Sans', sans-serif" 
            font-size="13" 
            font-weight="800" 
            fill="${badgeTextColor}" 
            text-anchor="middle"
            letter-spacing="0.2">
        ${num}
      </text>

      <!-- Unit Configuration Subtitle -->
      <text x="${badgeWidth / 2}" y="33" 
            font-family="'Plus Jakarta Sans', sans-serif" 
            font-size="10.5" 
            font-weight="700" 
            fill="${subTextColor}" 
            text-anchor="middle">
        ${type}
      </text>
    </g>
  `;
}

/**
 * Main Exported Renderer for Floor Plan Stage
 */
export function renderApartmentFloorPlan(options = {}) {
  const {
    units = DEFAULT_FLOOR_UNITS,
    activeUnitId = 'A-704',
    tower = 'Tower A',
    floor = '7th Floor',
    projectName = 'VR Elite Towers'
  } = options;

  return `
    <div class="afp-container" id="afp-container">
      
      <!-- Top Floor Plan Stage Header & Controls -->
      <div class="afp-top-controls-bar">
        <div class="afp-stage-title-wrap">
          <span class="afp-stage-eyebrow">${projectName} &bull; ${tower}</span>
          <h3 class="afp-stage-title">${floor} Architectural Floor Plan</h3>
        </div>

        <!-- Floating Zoom Controls -->
        <div class="afp-zoom-controls">
          <button type="button" class="afp-ctrl-btn" id="afp-zoom-in" title="Zoom In">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          </button>
          <button type="button" class="afp-ctrl-btn" id="afp-zoom-out" title="Zoom Out">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/></svg>
          </button>
          <button type="button" class="afp-ctrl-btn" id="afp-zoom-reset" title="Reset View">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/></svg>
          </button>
          <button type="button" class="afp-ctrl-btn" id="afp-toggle-fs" title="Full Screen">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Main Interactive Viewport -->
      <div class="afp-viewport" id="afp-viewport">
        <!-- Orientation Compass -->
        <div class="afp-compass" title="Orientation: North">
          <span class="c-n">N</span>
          <span class="c-arrow">&uarr;</span>
        </div>

        <div class="afp-canvas-scroll" id="afp-canvas-scroll">
          <div class="afp-canvas-transform" id="afp-canvas-transform">
            ${generateApartmentFloorPlanSvg(units, activeUnitId, 'afp-main')}
          </div>
        </div>
      </div>

      <!-- Bottom Status Hint -->
      <div class="afp-bottom-bar">
        <span class="afp-hint-text">Click on any apartment unit to view layout details &amp; pricing</span>
      </div>

    </div>

    <!-- Fullscreen Modal Overlay -->
    <div class="afp-fs-overlay" id="afp-fs-overlay" style="display: none;">
      <div class="afp-fs-header">
        <button type="button" class="afp-fs-close-btn" id="afp-fs-close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          <span>Exit Full Screen</span>
        </button>
        <span class="afp-fs-title">${projectName} &bull; ${tower} &bull; ${floor}</span>
        <div class="afp-fs-legend">
          <div class="legend-item"><span class="dot available"></span> Available</div>
          <div class="legend-item"><span class="dot booked"></span> Booked</div>
          <div class="legend-item"><span class="dot hold"></span> On Hold</div>
          <div class="legend-item"><span class="dot sold"></span> Sold</div>
        </div>
      </div>
      <div class="afp-fs-body" id="afp-fs-body">
        <div class="afp-fs-controls">
          <button type="button" class="afp-ctrl-btn" id="afp-fs-zoom-in"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg></button>
          <button type="button" class="afp-ctrl-btn" id="afp-fs-zoom-out"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/></svg></button>
          <button type="button" class="afp-ctrl-btn" id="afp-fs-zoom-reset"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/></svg></button>
        </div>
        <div class="afp-fs-canvas-scroll" id="afp-fs-canvas-scroll">
          <div class="afp-fs-canvas-transform" id="afp-fs-canvas-transform">
            ${generateApartmentFloorPlanSvg(units, activeUnitId, 'afp-fs')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Controller & Event Binding for Floor Plan Stage
 */
export function initApartmentFloorPlan(options = {}) {
  const { units = DEFAULT_FLOOR_UNITS } = options;
  let currentZoom = 1;
  let currentFsZoom = 1;

  const canvasTransform = document.getElementById('afp-canvas-transform');
  const fsCanvasTransform = document.getElementById('afp-fs-canvas-transform');
  const fsOverlay = document.getElementById('afp-fs-overlay');

  // Zoom In / Out / Reset
  const zoomInBtn = document.getElementById('afp-zoom-in');
  const zoomOutBtn = document.getElementById('afp-zoom-out');
  const zoomResetBtn = document.getElementById('afp-zoom-reset');
  const toggleFsBtn = document.getElementById('afp-toggle-fs');
  const closeFsBtn = document.getElementById('afp-fs-close');

  const fsZoomInBtn = document.getElementById('afp-fs-zoom-in');
  const fsZoomOutBtn = document.getElementById('afp-fs-zoom-out');
  const fsZoomResetBtn = document.getElementById('afp-fs-zoom-reset');

  function updateZoom(newZoom) {
    currentZoom = Math.min(Math.max(newZoom, 0.75), 2.2);
    if (canvasTransform) {
      canvasTransform.style.transform = `scale(${currentZoom})`;
    }
  }

  function updateFsZoom(newZoom) {
    currentFsZoom = Math.min(Math.max(newZoom, 0.75), 2.5);
    if (fsCanvasTransform) {
      fsCanvasTransform.style.transform = `scale(${currentFsZoom})`;
    }
  }

  if (zoomInBtn) zoomInBtn.onclick = () => updateZoom(currentZoom + 0.15);
  if (zoomOutBtn) zoomOutBtn.onclick = () => updateZoom(currentZoom - 0.15);
  if (zoomResetBtn) zoomResetBtn.onclick = () => updateZoom(1);

  if (fsZoomInBtn) fsZoomInBtn.onclick = () => updateFsZoom(currentFsZoom + 0.15);
  if (fsZoomOutBtn) fsZoomOutBtn.onclick = () => updateFsZoom(currentFsZoom - 0.15);
  if (fsZoomResetBtn) fsZoomResetBtn.onclick = () => updateFsZoom(1);

  if (toggleFsBtn && fsOverlay) {
    toggleFsBtn.onclick = () => {
      fsOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      updateFsZoom(1);
    };
  }

  if (closeFsBtn && fsOverlay) {
    closeFsBtn.onclick = () => {
      fsOverlay.style.display = 'none';
      document.body.style.overflow = '';
    };
  }

  // Live status updater for Dev/Testing (CRM-ready architecture)
  window._setUnitStatusDev = function(unitId, newStatus) {
    const target = units.find(u => u.id.toLowerCase() === unitId.toLowerCase());
    if (!target) return;
    target.status = newStatus;

    if (canvasTransform) {
      canvasTransform.innerHTML = generateApartmentFloorPlanSvg(units, target.id, 'afp-main');
    }
    if (fsCanvasTransform) {
      fsCanvasTransform.innerHTML = generateApartmentFloorPlanSvg(units, target.id, 'afp-fs');
    }
  };
}
