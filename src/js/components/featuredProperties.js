export const featuredProjectsData = [
  {
    id: 'feat-villas',
    category: 'villas',
    badge: '★ Featured',
    badgeClass: 'badge-gold',
    name: 'VR Green Villas',
    location: 'Kompally, Hyderabad',
    type: 'Villas',
    typeIcon: '🏠',
    spec2: 'Gated Community',
    spec2Icon: '👥',
    spec3: 'Green Living',
    spec3Icon: '🍃',
    price: '₹1.25 Cr*',
    image: '/images/ref/feat-villa-clean.jpg',
    link: '#/vr-green-villas'
  },
  {
    id: 'feat-plots',
    category: 'openplots',
    badge: '🔥 High Demand',
    badgeClass: 'badge-orange',
    name: 'VR Prime Meadows',
    location: 'Shadnagar, Hyderabad',
    type: 'Open Plots',
    typeIcon: '🗺️',
    spec2: 'HMDA Approved',
    spec2Icon: '🏛️',
    spec3: 'High Growth',
    spec3Icon: '📊',
    price: '₹29.9 Lakhs*',
    image: '/images/ref/feat-plots-clean.jpg',
    link: '#/vr-prime-meadows'
  },
  {
    id: 'feat-apts',
    category: 'apartments',
    badge: '🚀 New Launch',
    badgeClass: 'badge-teal',
    name: 'VR Heights',
    location: 'Nallagandla, Hyderabad',
    type: 'Apartments',
    typeIcon: '🏢',
    spec2: '2 & 3 BHK',
    spec2Icon: '🏠',
    spec3: 'Modern Amenities',
    spec3Icon: '🏊',
    price: '₹65 Lakhs*',
    image: '/images/ref/feat-apts-clean.jpg',
    link: '#/vr-heights'
  },
  {
    id: 'feat-farms',
    category: 'farmlands',
    badge: '🌱 Invest Wise',
    badgeClass: 'badge-green',
    name: 'VR Agro Lands',
    location: 'Shankarpally, Hyderabad',
    type: 'Farm Lands',
    typeIcon: '🌾',
    spec2: 'Managed Farmlands',
    spec2Icon: '🌲',
    spec3: 'Long-Term Value',
    spec3Icon: '📈',
    price: '₹18 Lakhs*',
    image: '/images/ref/feat-farm-clean.jpg',
    link: '#/vr-agro-lands'
  }
];

export function renderFeaturedProperties() {
  const cardsHtml = featuredProjectsData.map((project, idx) => `
    <div class="ref-project-card" data-category="${project.category}" data-index="${idx}">
      <div class="ref-project-img-wrap">
        <img src="${project.image}" alt="${project.name}" class="ref-project-img" loading="lazy" />
        <span class="ref-project-badge ${project.badgeClass}">${project.badge}</span>
      </div>

      <div class="ref-project-body">
        <h3 class="ref-project-title">${project.name}</h3>
        
        <div class="ref-project-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>${project.location}</span>
        </div>

        <div class="ref-project-specs">
          <span class="spec-tag">${project.typeIcon} ${project.type}</span>
          <span class="spec-tag">${project.spec2Icon} ${project.spec2}</span>
          <span class="spec-tag">${project.spec3Icon} ${project.spec3}</span>
        </div>

        <div class="ref-project-footer">
          <div class="ref-project-price">
            <span class="price-caption">Starting from</span>
            <span class="price-val">${project.price}</span>
          </div>

          <a href="${project.link}" class="ref-project-btn">
            <span>Explore Project</span>
            <span class="btn-arrow">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <section class="ref-projects-section" id="featured-projects">
      <div class="ref-container">
        <!-- Section Header -->
        <div class="ref-section-header text-center">
          <div class="ref-eyebrow-line">
            <span class="eyebrow-rule"></span>
            <span class="eyebrow-text">FEATURED PROJECTS</span>
            <span class="eyebrow-rule"></span>
          </div>

          <h2 class="ref-section-title">
            <span class="headline-green">Properties That Build</span><br/>
            <span class="headline-gold">A Brighter Tomorrow</span>
          </h2>

          <p class="ref-section-subtitle">
            Discover our handpicked projects in prime locations, designed for modern living and long-term value.
          </p>
        </div>

        <!-- Filter Buttons Bar -->
        <div class="ref-projects-filter-bar">
          <button class="ref-filter-btn active" data-filter="all">All Projects</button>
          <button class="ref-filter-btn" data-filter="villas">Villas</button>
          <button class="ref-filter-btn" data-filter="openplots">Open Plots</button>
          <button class="ref-filter-btn" data-filter="apartments">Apartments</button>
          <button class="ref-filter-btn" data-filter="farmlands">Farm Lands</button>
        </div>

        <!-- Project Cards Grid with Floating Nav Arrows -->
        <div class="ref-projects-carousel-wrap">
          <button class="ref-carousel-arrow prev" id="feat-prev-btn" aria-label="Previous Projects">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>

          <div class="ref-projects-grid" id="ref-projects-grid">
            ${cardsHtml}
          </div>

          <button class="ref-carousel-arrow next" id="feat-next-btn" aria-label="Next Projects">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>


        <!-- View All Projects CTA -->
        <div class="ref-projects-cta-row">
          <a href="#/open-plots" class="ref-view-all-btn">
            <span>View All Projects</span>
            <span class="btn-arrow">&rarr;</span>
          </a>
        </div>

        <!-- Bottom Architectural Skyline Flourish -->
        <div class="ref-projects-bottom-flourish">
          <div class="flourish-left">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="1.8">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
            </svg>
            <span class="flourish-txt">INVEST IN SPACES THAT MATTER</span>
            <span class="sub-rule"></span>
          </div>

          <div class="flourish-right">
            <img src="/images/ref/skyline-gold.png" alt="City Skyline" class="flourish-skyline" onerror="this.style.display='none'" />
            <span class="flourish-txt">BETTER PLACES &bull; BRIGHTER TOMORROWS</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initFeaturedProjects() {
  const filterBtns = document.querySelectorAll('.ref-filter-btn');
  const cards = document.querySelectorAll('.ref-project-card');
  const prevBtn = document.getElementById('feat-prev-btn');
  const nextBtn = document.getElementById('feat-next-btn');
  const grid = document.getElementById('ref-projects-grid');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  if (prevBtn && nextBtn && grid) {
    prevBtn.addEventListener('click', () => {
      grid.scrollBy({ left: -320, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      grid.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }
}
