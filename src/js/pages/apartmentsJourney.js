// Apartments Customer Journey (Matching Reference Image #1)
// 6 Screens / States:
// 1: Listing, 2: Project Overview, 3: Floor Plan, 4: Apartment Details (Rooms View), 5: Send Enquiry, 6: Enquiry Success

import { renderHeader, initStickyNav } from '../components/header.js';
import { renderFooter, initScrollTop } from '../components/footer.js';
import { openSiteVisitFlow } from '../components/sharedBookSiteVisit.js';

// State store for Apartments Journey
let currentScreen = 'listing'; // 'listing' | 'overview' | 'floorplan' | 'details' | 'enquiry' | 'success'
let selectedFilter = 'all'; // 'all' | '2bhk' | '3bhk'
let selectedTower = 'Tower A';
let selectedFloor = '7th Floor';
let selectedUnit = {
  id: 'A-704',
  unitName: 'A-704 · 3 BHK',
  projectName: 'VR Elite Towers',
  location: 'Kokapet, Hyderabad',
  price: '₹ 1.25 Cr',
  priceSub: '(All inclusive)',
  size: '1,450 Sq.Ft.',
  superBuiltUp: '1,450 Sq.Ft.',
  floor: '7th Floor',
  facing: 'East Facing',
  bedrooms: '3 Bedrooms',
  bathrooms: '3 Bathrooms',
  balconies: '2 Balconies',
  status: 'Available',
  heroImage: '/images/journey/apt_overview_hero.jpg',
  thumb: '/images/journey/apt_elite_towers.jpg',
  activeRoom: 'Living Room'
};

const apartmentProjects = [
  {
    id: 'vr-elite-towers',
    name: 'VR Elite Towers',
    location: 'Kokapet, Hyderabad',
    price: '₹ 75 Lakhs*',
    bhk: '2 & 3 BHK',
    image: '/images/journey/apt_elite_towers.jpg',
    rera: 'RERA Approved',
    area: '5 Acres',
    towers: '3 Towers',
    floors: 'G+20 Floors',
    amenities: 'World Class Amenities'
  },
  {
    id: 'vr-urban-heights',
    name: 'VR Urban Heights',
    location: 'Nallagandla, Hyderabad',
    price: '₹ 68 Lakhs*',
    bhk: '2 & 3 BHK',
    image: '/images/journey/apt_urban_heights.jpg',
    rera: 'RERA Approved',
    area: '4 Acres',
    towers: '2 Towers',
    floors: 'G+18 Floors',
    amenities: 'World Class Amenities'
  },
  {
    id: 'vr-lake-view',
    name: 'VR Lake View Residency',
    location: 'Patancheru, Hyderabad',
    price: '₹ 62 Lakhs*',
    bhk: '2 & 3 BHK',
    image: '/images/journey/apt_lake_view.jpg',
    rera: 'RERA Approved',
    area: '3.5 Acres',
    towers: '2 Towers',
    floors: 'G+15 Floors',
    amenities: 'World Class Amenities'
  }
];

const floorUnits = [
  { id: 'A-701', name: 'A-701', type: '2 BHK', size: '1,200 Sq.Ft.', price: '₹ 95 Lakhs', status: 'available', facing: 'North Facing', beds: '2 Bedrooms', baths: '2 Bathrooms', balconies: '1 Balcony' },
  { id: 'A-702', name: 'A-702', type: '3 BHK', size: '1,450 Sq.Ft.', price: '₹ 1.20 Cr', status: 'available', facing: 'East Facing', beds: '3 Bedrooms', baths: '3 Bathrooms', balconies: '2 Balconies' },
  { id: 'A-703', name: 'A-703', type: '3 BHK', size: '1,500 Sq.Ft.', price: '₹ 1.28 Cr', status: 'available', facing: 'West Facing', beds: '3 Bedrooms', baths: '3 Bathrooms', balconies: '2 Balconies' },
  { id: 'A-704', name: 'A-704', type: '3 BHK', size: '1,450 Sq.Ft.', price: '₹ 1.25 Cr', status: 'available', facing: 'East Facing', beds: '3 Bedrooms', baths: '3 Bathrooms', balconies: '2 Balconies', selected: true },
  { id: 'A-705', name: 'A-705', type: '2 BHK', size: '1,220 Sq.Ft.', price: '₹ 98 Lakhs', status: 'available', facing: 'North Facing', beds: '2 Bedrooms', baths: '2 Bathrooms', balconies: '1 Balcony' },
  { id: 'A-706', name: 'A-706', type: '3 BHK', size: '1,480 Sq.Ft.', price: '₹ 1.24 Cr', status: 'available', facing: 'South Facing', beds: '3 Bedrooms', baths: '3 Bathrooms', balconies: '2 Balconies' }
];

const roomPhotos = {
  'Living Room': {
    image: '/images/journey/room_living.jpg',
    desc: 'Spacious living area with large windows and natural light.'
  },
  'Kitchen': {
    image: '/images/journey/room_thumb_1.jpg',
    desc: 'Modern modular kitchen with granite platform and premium fittings.'
  },
  'Master Bedroom': {
    image: '/images/journey/room_thumb_2.jpg',
    desc: 'Lavish master bedroom with attached bathroom and wooden flooring.'
  },
  'Bedroom 2': {
    image: '/images/journey/room_thumb_3.jpg',
    desc: 'Comfortable guest/family bedroom with ample ventilation and wardrobe space.'
  },
  'Bathroom': {
    image: '/images/journey/room_thumb_4.jpg',
    desc: 'Contemporary branded sanitary ware with anti-skid ceramic tiling.'
  },
  'Balcony': {
    image: '/images/journey/room_thumb_5.jpg',
    desc: 'Scenic open balcony overlooking landscaped gardens and city skyline.'
  }
};

export function renderApartmentsPage(initialScreen = 'listing') {
  currentScreen = initialScreen;

  const html = `
    <div class="apartments-journey-wrapper" id="apartments-journey-root">
      ${renderHeader({ currentPath: '#/apartments' })}
      <main class="apt-main-content" id="apt-screen-host">
        ${renderCurrentScreen()}
      </main>
      ${renderFooter()}
    </div>
  `;

  return {
    html,
    init: () => {
      initStickyNav();
      initScrollTop();
      attachScreenEvents();
    }
  };
}

function renderCurrentScreen() {
  switch (currentScreen) {
    case 'overview':
      return renderScreen2Overview();
    case 'floorplan':
      return renderScreen3FloorPlan();
    case 'details':
      return renderScreen4Details();
    case 'enquiry':
      return renderScreen5Enquiry();
    case 'success':
      return renderScreen6Success();
    case 'listing':
    default:
      return renderScreen1Listing();
  }
}

// ==========================================================================
// SCREEN 1: APARTMENTS LISTING (Matching Reference Screen 1)
// ==========================================================================
function renderScreen1Listing() {
  const filtered = apartmentProjects.filter(p => {
    if (selectedFilter === '2bhk') return p.bhk.includes('2');
    if (selectedFilter === '3bhk') return p.bhk.includes('3');
    return true;
  });

  const cardsHtml = filtered.map(item => `
    <div class="apt-project-card" data-project="${item.id}">
      <div class="apt-card-img-wrap">
        <img src="${item.image}" alt="${item.name}" class="apt-card-img" />
      </div>
      <div class="apt-card-info">
        <div class="apt-card-loc">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${item.location}
        </div>
        <h3 class="apt-card-title">${item.name}</h3>
        <div class="apt-card-price-row">
          <div class="apt-card-price">${item.price}</div>
          <div class="apt-card-bhk">${item.bhk}</div>
        </div>
        <button type="button" class="apt-view-details-btn" onclick="window.navApartmentScreen('overview', '${item.id}')">
          <span>View Details</span>
          <span class="btn-arrow">&rarr;</span>
        </button>
      </div>
    </div>
  `).join('');

  return `
    <section class="apt-listing-section">
      <div class="apt-container">
        <!-- Main Heading matching Reference Screen 1 -->
        <div class="apt-listing-header">
          <span class="apt-eyebrow">Apartments</span>
          <h1 class="apt-main-heading">Modern Homes for a Better Lifestyle</h1>
          <p class="apt-subtext">2 & 3 BHK apartments with world-class amenities in prime locations.</p>
          
          <!-- Filter Tabs -->
          <div class="apt-filter-tabs">
            <button class="apt-tab-btn ${selectedFilter === 'all' ? 'active' : ''}" onclick="window.filterApartments('all')">
              All Projects
            </button>
            <button class="apt-tab-btn ${selectedFilter === '2bhk' ? 'active' : ''}" onclick="window.filterApartments('2bhk')">
              2 BHK
            </button>
            <button class="apt-tab-btn ${selectedFilter === '3bhk' ? 'active' : ''}" onclick="window.filterApartments('3bhk')">
              3 BHK
            </button>
          </div>
        </div>

        <!-- Project Cards Grid -->
        <div class="apt-cards-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}

// ==========================================================================
// SCREEN 2: PROJECT OVERVIEW (VR Elite Towers, Matching Reference Screen 2)
// ==========================================================================
function renderScreen2Overview() {
  const p = apartmentProjects[0]; // VR Elite Towers

  return `
    <section class="apt-overview-section">
      <div class="apt-container">
        <!-- Breadcrumb & Back -->
        <div class="apt-nav-trail">
          <button type="button" class="apt-trail-back" onclick="window.navApartmentScreen('listing')">
            &larr; Back
          </button>
          <div class="apt-breadcrumb">
            <span>Home</span> &gt; <span>Projects</span> &gt; <strong>${p.name}</strong>
          </div>
        </div>

        <!-- Project Header Title & RERA -->
        <div class="apt-overview-title-block">
          <div>
            <h1 class="apt-overview-title">${p.name}</h1>
            <div class="apt-overview-loc">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${p.location}
            </div>
          </div>
          <div class="apt-rera-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>RERA Approved</span>
          </div>
        </div>

        <!-- Hero Showcase with Carousel Arrows -->
        <div class="apt-hero-showcase">
          <div class="apt-hero-main-img-wrap">
            <img src="${p.image}" alt="${p.name}" class="apt-hero-main-img" id="apt-overview-main-img" />
            <button type="button" class="apt-carousel-nav prev" aria-label="Previous image">&lsaquo;</button>
            <button type="button" class="apt-carousel-nav next" aria-label="Next image">&rsaquo;</button>
          </div>
          
          <!-- Image Thumbnails below -->
          <div class="apt-overview-thumbs">
            <img src="/images/journey/overview_thumb_1.jpg" class="apt-ov-thumb active" onclick="document.getElementById('apt-overview-main-img').src=this.src" />
            <img src="/images/journey/overview_thumb_2.jpg" class="apt-ov-thumb" onclick="document.getElementById('apt-overview-main-img').src=this.src" />
            <img src="/images/journey/overview_thumb_3.jpg" class="apt-ov-thumb" onclick="document.getElementById('apt-overview-main-img').src=this.src" />
            <img src="/images/journey/overview_thumb_4.jpg" class="apt-ov-thumb" onclick="document.getElementById('apt-overview-main-img').src=this.src" />
          </div>
        </div>

        <!-- Stats Grid (Configurations, Project Area, Towers, Amenities) -->
        <div class="apt-stats-strip">
          <div class="apt-stat-box">
            <div class="stat-value">2 &amp; 3 BHK</div>
            <div class="stat-label">Configurations</div>
          </div>
          <div class="apt-stat-box">
            <div class="stat-value">5 Acres</div>
            <div class="stat-label">Project Area</div>
          </div>
          <div class="apt-stat-box">
            <div class="stat-value">3 Towers</div>
            <div class="stat-label">G+20 Floors</div>
          </div>
          <div class="apt-stat-box">
            <div class="stat-value">World Class</div>
            <div class="stat-label">Amenities</div>
          </div>
        </div>

        <!-- Sub Tabs -->
        <div class="apt-sub-tabs">
          <button class="apt-sub-tab active">Overview</button>
          <button class="apt-sub-tab">Amenities</button>
          <button class="apt-sub-tab">Location</button>
          <button class="apt-sub-tab">Gallery</button>
          <button class="apt-sub-tab" onclick="window.navApartmentScreen('floorplan')">Floor Plan</button>
        </div>

        <!-- About Project Section -->
        <div class="apt-about-block">
          <h2 class="apt-about-title">About the Project</h2>
          <p class="apt-about-text">
            VR Elite Towers is a premium residential community in the heart of Kokapet, offering spacious 2 &amp; 3 BHK apartments with modern amenities, excellent connectivity, and a lifestyle designed for the future.
          </p>

          <div class="apt-overview-actions">
            <button type="button" class="apt-btn-primary" onclick="window.navApartmentScreen('floorplan')">
              <span>View Floor Plan</span>
              <span class="btn-arrow">&rarr;</span>
            </button>
            <button type="button" class="apt-btn-outline" onclick="alert('Downloading VR Elite Towers Brochure...')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              <span>Download Brochure</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  `;
}

// ==========================================================================
// SCREEN 3: SELECT TOWER & FLOOR (Floor Plan, Matching Reference Screen 3)
// ==========================================================================
function renderScreen3FloorPlan() {
  return `
    <section class="apt-floorplan-section">
      <div class="apt-container">
        <!-- Breadcrumb -->
        <div class="apt-nav-trail">
          <button type="button" class="apt-trail-back" onclick="window.navApartmentScreen('overview')">
            &larr; Back
          </button>
          <div class="apt-breadcrumb">
            <span>Home</span> &gt; <span>VR Elite Towers</span> &gt; <strong>Floor Plan</strong>
          </div>
        </div>

        <h1 class="apt-screen-title">Floor Plan</h1>

        <!-- Selectors Row -->
        <div class="apt-fp-selectors">
          <div class="apt-select-box">
            <label class="apt-sel-label">Select Tower</label>
            <div class="apt-sel-wrap">
              <select id="fp-select-tower" onchange="window.changeTower(this.value)">
                <option value="Tower A" ${selectedTower === 'Tower A' ? 'selected' : ''}>Tower A</option>
                <option value="Tower B">Tower B</option>
                <option value="Tower C">Tower C</option>
              </select>
            </div>
          </div>

          <div class="apt-select-box">
            <label class="apt-sel-label">Select Floor</label>
            <div class="apt-sel-wrap">
              <select id="fp-select-floor" onchange="window.changeFloor(this.value)">
                <option value="7th Floor" ${selectedFloor === '7th Floor' ? 'selected' : ''}>7th Floor</option>
                <option value="6th Floor">6th Floor</option>
                <option value="5th Floor">5th Floor</option>
                <option value="4th Floor">4th Floor</option>
                <option value="3rd Floor">3rd Floor</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Legend Bar -->
        <div class="apt-fp-legend">
          <div class="leg-item"><span class="leg-dot avail"></span> Available</div>
          <div class="leg-item"><span class="leg-dot booked"></span> Booked</div>
          <div class="leg-item"><span class="leg-dot hold"></span> On Hold</div>
        </div>

        <!-- Interactive Apartment Floor Plan Stage -->
        <div class="apt-fp-stage-card">
          <!-- Compass Arrow North -->
          <div class="apt-fp-compass">
            <div class="compass-n">N</div>
            <div class="compass-arr">&uarr;</div>
          </div>

          <!-- Floor Plan Layout with Exact Units (A-701 to A-706) -->
          <div class="apt-fp-blueprint-wrap">
            <div class="apt-blueprint-grid">
              
              <!-- Top Row: A-701, A-702, A-703 -->
              <div class="bp-row top-row">
                <button type="button" class="bp-unit-btn ${selectedUnit.id === 'A-701' ? 'selected' : ''}" onclick="window.selectFloorUnit('A-701')">
                  <div class="bp-u-code">A-701</div>
                  <div class="bp-u-type">2 BHK</div>
                </button>
                <button type="button" class="bp-unit-btn ${selectedUnit.id === 'A-702' ? 'selected' : ''}" onclick="window.selectFloorUnit('A-702')">
                  <div class="bp-u-code">A-702</div>
                  <div class="bp-u-type">3 BHK</div>
                </button>
                <button type="button" class="bp-unit-btn ${selectedUnit.id === 'A-703' ? 'selected' : ''}" onclick="window.selectFloorUnit('A-703')">
                  <div class="bp-u-code">A-703</div>
                  <div class="bp-u-type">3 BHK</div>
                </button>
              </div>

              <!-- Central Core (Lifts, Lobby & Corridor) -->
              <div class="bp-core-row">
                <div class="bp-core-shaft">
                  <span class="core-icon">&#9632;&#9632;</span>
                  <span class="core-lbl">LIFTS &amp; LOBBY</span>
                </div>
              </div>

              <!-- Bottom Row: A-704 (Selected/Active Highlight), A-705, A-706 -->
              <div class="bp-row bottom-row">
                <button type="button" class="bp-unit-btn highlight-gold ${selectedUnit.id === 'A-704' ? 'selected' : ''}" onclick="window.selectFloorUnit('A-704')">
                  <div class="bp-u-code">A-704</div>
                  <div class="bp-u-type">3 BHK</div>
                </button>
                <button type="button" class="bp-unit-btn ${selectedUnit.id === 'A-705' ? 'selected' : ''}" onclick="window.selectFloorUnit('A-705')">
                  <div class="bp-u-code">A-705</div>
                  <div class="bp-u-type">2 BHK</div>
                </button>
                <button type="button" class="bp-unit-btn ${selectedUnit.id === 'A-706' ? 'selected' : ''}" onclick="window.selectFloorUnit('A-706')">
                  <div class="bp-u-code">A-706</div>
                  <div class="bp-u-type">3 BHK</div>
                </button>
              </div>

            </div>
          </div>

          <div class="apt-fp-hint">
            Click on a unit to view details
          </div>
        </div>

      </div>
    </section>
  `;
}

// ==========================================================================
// SCREEN 4: APARTMENT DETAILS / ROOMS VIEW (Matching Reference Screen 4)
// ==========================================================================
function renderScreen4Details() {
  const currentRoom = selectedUnit.activeRoom || 'Living Room';
  const roomData = roomPhotos[currentRoom] || roomPhotos['Living Room'];

  return `
    <section class="apt-details-section">
      <div class="apt-container">
        <!-- Breadcrumb -->
        <div class="apt-nav-trail">
          <button type="button" class="apt-trail-back" onclick="window.navApartmentScreen('floorplan')">
            &larr; Back
          </button>
          <div class="apt-breadcrumb">
            <span>Home</span> &gt; <span>VR Elite Towers</span> &gt; <span>Tower A</span> &gt; <strong>${selectedUnit.id}</strong>
          </div>
        </div>

        <!-- Main Showcase Area with Left Vertical Room Selector -->
        <div class="apt-rooms-studio">
          <!-- Room Navigation Sidebar -->
          <div class="apt-room-nav">
            <button type="button" class="room-nav-item ${currentRoom === 'Living Room' ? 'active' : ''}" onclick="window.switchRoom('Living Room')">
              <span class="room-nav-icon">&#9634;</span>
              <span class="room-nav-text">Living Room</span>
            </button>
            <button type="button" class="room-nav-item ${currentRoom === 'Kitchen' ? 'active' : ''}" onclick="window.switchRoom('Kitchen')">
              <span class="room-nav-icon">&#9635;</span>
              <span class="room-nav-text">Kitchen</span>
            </button>
            <button type="button" class="room-nav-item ${currentRoom === 'Master Bedroom' ? 'active' : ''}" onclick="window.switchRoom('Master Bedroom')">
              <span class="room-nav-icon">&#9636;</span>
              <span class="room-nav-text">Master Bedroom</span>
            </button>
            <button type="button" class="room-nav-item ${currentRoom === 'Bedroom 2' ? 'active' : ''}" onclick="window.switchRoom('Bedroom 2')">
              <span class="room-nav-icon">&#9637;</span>
              <span class="room-nav-text">Bedroom 2</span>
            </button>
            <button type="button" class="room-nav-item ${currentRoom === 'Bathroom' ? 'active' : ''}" onclick="window.switchRoom('Bathroom')">
              <span class="room-nav-icon">&#9638;</span>
              <span class="room-nav-text">Bathroom</span>
            </button>
            <button type="button" class="room-nav-item ${currentRoom === 'Balcony' ? 'active' : ''}" onclick="window.switchRoom('Balcony')">
              <span class="room-nav-icon">&#9639;</span>
              <span class="room-nav-text">Balcony</span>
            </button>
          </div>

          <!-- Room Visual Display -->
          <div class="apt-room-viewport">
            <div class="apt-room-img-wrap">
              <img src="${roomData.image}" alt="${currentRoom}" class="apt-room-display-img" id="apt-room-display-img" />
            </div>
            
            <div class="apt-room-info-meta">
              <h3 class="apt-room-title">${currentRoom}</h3>
              <p class="apt-room-desc">${roomData.desc}</p>
            </div>

            <!-- Room Thumbnails row -->
            <div class="apt-room-thumbs-row">
              <img src="/images/journey/room_living.jpg" class="r-thumb ${currentRoom === 'Living Room' ? 'active' : ''}" onclick="window.switchRoom('Living Room')" />
              <img src="/images/journey/room_thumb_1.jpg" class="r-thumb ${currentRoom === 'Kitchen' ? 'active' : ''}" onclick="window.switchRoom('Kitchen')" />
              <img src="/images/journey/room_thumb_2.jpg" class="r-thumb ${currentRoom === 'Master Bedroom' ? 'active' : ''}" onclick="window.switchRoom('Master Bedroom')" />
              <img src="/images/journey/room_thumb_3.jpg" class="r-thumb ${currentRoom === 'Bedroom 2' ? 'active' : ''}" onclick="window.switchRoom('Bedroom 2')" />
              <img src="/images/journey/room_thumb_4.jpg" class="r-thumb ${currentRoom === 'Bathroom' ? 'active' : ''}" onclick="window.switchRoom('Bathroom')" />
              <img src="/images/journey/room_thumb_5.jpg" class="r-thumb ${currentRoom === 'Balcony' ? 'active' : ''}" onclick="window.switchRoom('Balcony')" />
            </div>
          </div>
        </div>

        <!-- Property Information Card -->
        <div class="apt-details-card">
          <div class="apt-detail-top-row">
            <div>
              <h2 class="apt-detail-unit-title">${selectedUnit.unitName}</h2>
              <div class="apt-detail-price">${selectedUnit.price} <span class="sub">${selectedUnit.priceSub}</span></div>
            </div>
            <span class="apt-detail-avail-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              Available
            </span>
          </div>

          <!-- Specs List -->
          <div class="apt-detail-specs-grid">
            <div class="d-spec"><span class="icon">&#9633;</span> <strong>${selectedUnit.superBuiltUp}</strong> Super Built-up</div>
            <div class="d-spec"><span class="icon">&#9671;</span> <strong>${selectedUnit.floor}</strong> Floor No.</div>
            <div class="d-spec"><span class="icon">&#9684;</span> <strong>${selectedUnit.facing}</strong> Facing</div>
            <div class="d-spec"><span class="icon">&#9646;</span> <strong>${selectedUnit.bedrooms}</strong></div>
            <div class="d-spec"><span class="icon">&#9647;</span> <strong>${selectedUnit.bathrooms}</strong></div>
            <div class="d-spec"><span class="icon">&#9648;</span> <strong>${selectedUnit.balconies}</strong></div>
          </div>

          <!-- Action Buttons (Send Enquiry, Book Site Visit, Google Maps) -->
          <div class="apt-detail-actions">
            <button type="button" class="apt-action-btn primary" onclick="window.navApartmentScreen('enquiry')">
              <span>Send Enquiry</span>
              <span class="arr">&rarr;</span>
            </button>

            <button type="button" class="apt-action-btn secondary" onclick="window.bookApartmentSiteVisit()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>Book Site Visit</span>
            </button>

            <a href="https://maps.google.com/?q=Kokapet+Hyderabad" target="_blank" rel="noopener" class="apt-action-btn outline">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>View on Google Maps</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  `;
}

// ==========================================================================
// SCREEN 5: SEND ENQUIRY FORM (Matching Reference Screen 5)
// ==========================================================================
function renderScreen5Enquiry() {
  return `
    <section class="apt-enquiry-section">
      <div class="apt-container-narrow">
        <!-- Top Nav -->
        <div class="apt-nav-trail">
          <button type="button" class="apt-trail-back" onclick="window.navApartmentScreen('details')">
            &larr; Back
          </button>
        </div>

        <div class="apt-enquiry-card">
          <div class="apt-enquiry-header">
            <h1 class="apt-enquiry-title">Send Enquiry</h1>
            <p class="apt-enquiry-subtitle">Get in touch with our team. We will call you shortly.</p>
          </div>

          <!-- Form Body -->
          <form id="apt-enquiry-form" class="apt-enquiry-form" onsubmit="window.handleApartmentEnquirySubmit(event)">
            <div class="apt-field-group">
              <label class="apt-label" for="apt-name">Full Name *</label>
              <input type="text" id="apt-name" class="apt-input" placeholder="Enter your name" required />
            </div>

            <div class="apt-field-group">
              <label class="apt-label" for="apt-mobile">Mobile Number *</label>
              <input type="tel" id="apt-mobile" class="apt-input" placeholder="Enter mobile number" maxlength="10" required />
            </div>

            <div class="apt-field-group">
              <label class="apt-label" for="apt-email">Email</label>
              <input type="email" id="apt-email" class="apt-input" placeholder="Enter your email" />
            </div>

            <div class="apt-field-group">
              <label class="apt-label" for="apt-message">Message (Optional)</label>
              <textarea id="apt-message" class="apt-textarea" rows="3">I am interested in ${selectedUnit.id} (${selectedUnit.type || '3 BHK'}) at ${selectedUnit.projectName}. Please share more details.</textarea>
            </div>

            <!-- Selected Property Details Card (Carried automatically) -->
            <div class="apt-selected-prop-card">
              <div class="sel-prop-label">Selected Property Details</div>
              <div class="sel-prop-row">
                <img src="${selectedUnit.thumb || '/images/journey/apt_elite_towers.jpg'}" alt="${selectedUnit.projectName}" class="sel-prop-thumb" />
                <div class="sel-prop-meta">
                  <div class="sel-prop-title">${selectedUnit.unitName}</div>
                  <div class="sel-prop-project">${selectedUnit.projectName}</div>
                  <div class="sel-prop-loc">${selectedUnit.location}</div>
                  <div class="sel-prop-price">${selectedUnit.price}</div>
                </div>
              </div>
            </div>

            <button type="submit" class="apt-submit-enquiry-btn">
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  `;
}

// ==========================================================================
// SCREEN 6: ENQUIRY SUCCESS CONFIRMATION (Matching Reference Screen 6)
// ==========================================================================
function renderScreen6Success() {
  return `
    <section class="apt-success-section">
      <div class="apt-container-narrow">
        <div class="apt-success-card">
          <!-- Green Success Check Circle -->
          <div class="apt-success-check-wrap">
            <div class="apt-success-circle">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>

          <h1 class="apt-success-heading">Enquiry Submitted!</h1>
          <p class="apt-success-sub">Thank you for your interest.<br/>Our team will contact you shortly.</p>

          <!-- What Happens Next? 3 Steps -->
          <div class="apt-what-next-box">
            <h3 class="what-next-title">What happens next?</h3>

            <div class="what-next-step">
              <div class="step-num">1</div>
              <div class="step-desc">Our team will review your details.</div>
            </div>

            <div class="what-next-step">
              <div class="step-num">2</div>
              <div class="step-desc">You will receive a call from our sales team.</div>
            </div>

            <div class="what-next-step">
              <div class="step-num">3</div>
              <div class="step-desc">Get ready to explore your dream home!</div>
            </div>
          </div>

          <button type="button" class="apt-back-project-btn" onclick="window.navApartmentScreen('overview')">
            Back to Project
          </button>

          <!-- Bottom Foliage Artwork Pattern (from reference screenshot) -->
          <div class="apt-success-foliage-wrap">
            <img src="/images/journey/success_leaves_bg.png" alt="VR Real Estates" class="apt-success-leaves" />
          </div>
        </div>
      </div>
    </section>
  `;
}

// Global Handlers
function attachScreenEvents() {
  window.navApartmentScreen = (screen, extraId = null) => {
    currentScreen = screen;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const host = document.getElementById('apt-screen-host');
    if (host) {
      host.innerHTML = renderCurrentScreen();
    }
  };

  window.filterApartments = (filter) => {
    selectedFilter = filter;
    window.navApartmentScreen('listing');
  };

  window.changeTower = (t) => {
    selectedTower = t;
  };

  window.changeFloor = (f) => {
    selectedFloor = f;
  };

  window.selectFloorUnit = (unitId) => {
    const u = floorUnits.find(x => x.id === unitId);
    if (u) {
      selectedUnit = {
        ...selectedUnit,
        id: u.id,
        unitName: `${u.id} · ${u.type}`,
        price: u.price,
        size: u.size,
        superBuiltUp: u.size,
        facing: u.facing,
        bedrooms: u.beds,
        bathrooms: u.baths,
        balconies: u.balconies,
        status: 'Available'
      };
      // Immediately open Apartment Details (Screen 4) matching customer journey
      window.navApartmentScreen('details');
    }
  };

  window.switchRoom = (roomName) => {
    selectedUnit.activeRoom = roomName;
    const host = document.getElementById('apt-screen-host');
    if (host) {
      host.innerHTML = renderCurrentScreen();
    }
  };

  window.handleApartmentEnquirySubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('apt-name').value;
    const mobile = document.getElementById('apt-mobile').value;
    if (!name || mobile.length < 10) {
      alert('Please provide your full name and valid 10-digit mobile number.');
      return;
    }
    window.navApartmentScreen('success');
  };

  window.bookApartmentSiteVisit = () => {
    openSiteVisitFlow({
      id: selectedUnit.id,
      projectName: selectedUnit.projectName,
      unitName: selectedUnit.unitName,
      location: selectedUnit.location,
      price: selectedUnit.price,
      priceSub: selectedUnit.priceSub,
      size: selectedUnit.size,
      facing: selectedUnit.facing,
      beds: selectedUnit.bedrooms,
      baths: selectedUnit.bathrooms,
      balconies: selectedUnit.balconies,
      status: 'Available',
      image: '/images/journey/visit_screen1_living.jpg',
      thumb: selectedUnit.thumb || '/images/journey/apt_elite_towers.jpg'
    }, 'form');
  };
}

// Window globals
window.openApartmentEnquiry = () => {
  window.navApartmentScreen('enquiry');
};
