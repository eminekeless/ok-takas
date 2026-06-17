/**
 * OKÜ Takas - Core Application Logic
 * Implements client-side state, CRUD on listings, authentication, search/filtering, and theme switching.
 */

// --- PRESET MOCK DATA ---
const PRESET_IMAGES = [
  { id: 'img-calculator', url: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=500&auto=format&fit=crop&q=60', label: 'Bilimsel Hesap Makinesi' },
  { id: 'img-recorder', url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=60', label: 'Ses Kayıt Cihazı' },
  { id: 'img-headphone', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60', label: 'Bluetooth Kulaklık' },
  { id: 'img-lamp', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60', label: 'Akıllı Masa Lambası' },
  { id: 'img-bed', url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format&fit=crop&q=60', label: 'Katlanabilir Yatak' },
  { id: 'img-wardrobe', url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&auto=format&fit=crop&q=60', label: 'Bez Gardırop' },
  { id: 'img-marketing', url: 'https://images.unsplash.com/photo-1553484771-047a44eee27f?w=500&auto=format&fit=crop&q=60', label: 'Pazarlama Kitabı' },
  { id: 'img-racket', url: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=500&auto=format&fit=crop&q=60', label: 'Tenis Raketi' }
];

const INITIAL_LISTINGS = [
  {
    id: 'OKU-55291',
    name: 'Casio fx-991ES Plus Bilimsel Hesap Makinesi',
    category: 'Elektronik',
    description: 'Mühendislik fakültesi derslerinde kullandığım bilimsel hesap makinesi. 417 fonksiyonludur ve sınav yönetmeliklerine uygundur. Güneş enerjisi ve pil ile çalışır. Temiz durumdadır.',
    price: '300 TL',
    sold: false,
    date: '18.06.2026',
    imageUrl: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=500&auto=format&fit=crop&q=60',
    seller: {
      name: 'Mehmet Yılmaz',
      email: 'mehmet.yilmaz@ogrenci.oku.edu.tr',
      studentId: '2022100203011',
      phone: '05551234567'
    }
  },
  {
    id: 'OKU-66182',
    name: 'Sony Dijital Ses Kayıt Cihazı (4GB)',
    category: 'Elektronik',
    description: 'Ders ve seminer notlarını kaydetmek için birebirdir. Gürültü engelleme özelliği sayesinde ses net alınır. Doğrudan bilgisayara USB bağlantısı mevcuttur. Çok az kullanıldı.',
    price: '400 TL',
    sold: false,
    date: '18.06.2026',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=60',
    seller: {
      name: 'Merve Kaya',
      email: 'merve.kaya@ogrenci.oku.edu.tr',
      studentId: '2023100405022',
      phone: '05339876543'
    }
  },
  {
    id: 'OKU-77210',
    name: 'JBL Tune 510BT Bluetooth Kulaklık (Siyah)',
    category: 'Elektronik',
    description: 'Kablosuz kulak üstü kulaklık. Şarj ömrü mükemmel düzeydedir (yaklaşık 40 saat kullanım). Kafa bandı ve pedlerinde yıpranma yoktur. Orijinal şarj kablosu ile birlikte verilecektir.',
    price: '650 TL',
    sold: false,
    date: '17.06.2026',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    seller: {
      name: 'Can Demir',
      email: 'can.demir@ogrenci.oku.edu.tr',
      studentId: '2021100101005',
      phone: '05441112233'
    }
  },
  {
    id: 'OKU-88234',
    name: 'Xiaomi Mi Akıllı LED Masa Lambası',
    category: 'Elektronik',
    description: 'Ders çalışırken gözleri yormayan, ayarlanabilir parlaklık ve 4 farklı aydınlatma modlu masa lambası. Mi Home uygulaması veya üzerindeki buton ile kolayca kontrol edilebilir.',
    price: '350 TL',
    sold: false,
    date: '18.06.2026',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60',
    seller: {
      name: 'Can Demir',
      email: 'can.demir@ogrenci.oku.edu.tr',
      studentId: '2021100101005',
      phone: '05441112233'
    }
  },
  {
    id: 'OKU-33291',
    name: 'Tek Kişilik Katlanabilir Yatak',
    category: 'Ev & Yurt Eşyası',
    description: 'Yurt odamda misafirler için kullandığım, katlandığında çok az yer kaplayan pratik sünger yatak. Kılıfı yıkanabilir ve fermuarlıdır, herhangi bir lekesi yoktur.',
    price: '450 TL',
    sold: false,
    date: '17.06.2026',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format&fit=crop&q=60',
    seller: {
      name: 'Mehmet Yılmaz',
      email: 'mehmet.yilmaz@ogrenci.oku.edu.tr',
      studentId: '2022100203011',
      phone: '05551234567'
    }
  },
  {
    id: 'OKU-44182',
    name: 'Çift Kapaklı Bez Gardırop (Metal İskeletli)',
    category: 'Ev & Yurt Eşyası',
    description: 'Yurt dolabım yetmediği için ekstra depolama amaçlı aldım. Kurulumu son derece basittir. Yırtık veya kırık bir parçası bulunmamaktadır. Elden teslim edilir.',
    price: '220 TL',
    sold: false,
    date: '18.06.2026',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&auto=format&fit=crop&q=60',
    seller: {
      name: 'Merve Kaya',
      email: 'merve.kaya@ogrenci.oku.edu.tr',
      studentId: '2023100405022',
      phone: '05339876543'
    }
  },
  {
    id: 'OKU-88210',
    name: 'Pazarlama İlkeleri - Philip Kotler (17. Basım)',
    category: 'Kitap & Kırtasiye',
    description: 'İşletme bölümü pazarlama dersi ana kaynağıdır. Kitap temiz durumdadır, sayfalarında fosforlu kalemle çizilmiş yerler yoktur. Sadece kurşun kalemle küçük notlar alınmıştır.',
    price: '150 TL',
    sold: false,
    date: '16.06.2026',
    imageUrl: 'https://images.unsplash.com/photo-1553484771-047a44eee27f?w=500&auto=format&fit=crop&q=60',
    seller: {
      name: 'Can Demir',
      email: 'can.demir@ogrenci.oku.edu.tr',
      studentId: '2021100101005',
      phone: '05441112233'
    }
  },
  {
    id: 'OKU-99234',
    name: 'E-Ticaret ve E-İş Sistemleri Yönetimi',
    category: 'Kitap & Kırtasiye',
    description: 'Yönetim Bilişim Sistemleri ders kitabı olarak okutulan, dijital iş modelleri ve e-ticaret stratejilerini barındıran güncel akademik kitaptır.',
    price: '120 TL',
    sold: false,
    date: '18.06.2026',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60',
    seller: {
      name: 'Can Demir',
      email: 'can.demir@ogrenci.oku.edu.tr',
      studentId: '2021100101005',
      phone: '05441112233'
    }
  },
  {
    id: 'OKU-98421',
    name: 'Wilson Blade Tenis Raketi',
    category: 'Spor',
    description: 'Çok az kullanılmıştır. Wilson Blade 98 modelidir. Karacaoğlan yerleşkesinde elden teslim edebilirim. Kılıfı ile birlikte verilecektir.',
    price: '750 TL',
    sold: false,
    date: '17.06.2026',
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=500&auto=format&fit=crop&q=60',
    seller: {
      name: 'Mehmet Yılmaz',
      email: 'mehmet.yilmaz@ogrenci.oku.edu.tr',
      studentId: '2022100203011',
      phone: '05551234567'
    }
  }
];

// --- STATE MANAGEMENT ---
class AppState {
  constructor() {
    let savedListings = this.load('oku_listings');
    // Force reset listing database if they do not contain the newly requested items like 'Hesap Makinesi'
    if (savedListings && !savedListings.some(item => item.name.includes('Hesap Makinesi'))) {
      savedListings = null;
    }

    this.listings = savedListings || [...INITIAL_LISTINGS];
    this.activeUser = this.load('oku_active_user') || null;
    this.favorites = this.load('oku_favorites') || {}; // Keyed by User StudentID -> Array of listing IDs
    
    // Save to local storage on init
    this.save('oku_listings', this.listings);
  }

  load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // User Actions
  register(name, email, studentId, phone) {
    this.activeUser = { name, email, studentId, phone };
    this.save('oku_active_user', this.activeUser);
    if (!this.favorites[studentId]) {
      this.favorites[studentId] = [];
      this.save('oku_favorites', this.favorites);
    }
    return this.activeUser;
  }

  logout() {
    this.activeUser = null;
    localStorage.removeItem('oku_active_user');
  }

  // Listing Actions
  addListing(name, category, description, price, imageUrl) {
    if (!this.activeUser) return null;
    
    const randomIdNum = Math.floor(10000 + Math.random() * 90000);
    const listingId = `OKU-${randomIdNum}`;
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`;
    
    const newListing = {
      id: listingId,
      name,
      category,
      description,
      price,
      sold: false,
      date: formattedDate,
      imageUrl,
      seller: { ...this.activeUser }
    };
    
    this.listings.unshift(newListing);
    this.save('oku_listings', this.listings);
    return newListing;
  }

  toggleListingSold(id) {
    const listing = this.listings.find(item => item.id === id);
    if (listing && this.activeUser && listing.seller.studentId === this.activeUser.studentId) {
      listing.sold = !listing.sold;
      this.save('oku_listings', this.listings);
      return listing;
    }
    return null;
  }

  deleteListing(id) {
    const index = this.listings.findIndex(item => item.id === id);
    if (index !== -1 && this.activeUser && this.listings[index].seller.studentId === this.activeUser.studentId) {
      this.listings.splice(index, 1);
      this.save('oku_listings', this.listings);
      
      // Clean up favorites
      for (const uId in this.favorites) {
        this.favorites[uId] = this.favorites[uId].filter(favId => favId !== id);
      }
      this.save('oku_favorites', this.favorites);
      return true;
    }
    return false;
  }

  // Favorites Actions
  isFavorite(id) {
    if (!this.activeUser) return false;
    const userFavs = this.favorites[this.activeUser.studentId] || [];
    return userFavs.includes(id);
  }

  toggleFavorite(id) {
    if (!this.activeUser) return false;
    const uId = this.activeUser.studentId;
    if (!this.favorites[uId]) this.favorites[uId] = [];
    
    const index = this.favorites[uId].indexOf(id);
    let added = false;
    if (index === -1) {
      this.favorites[uId].push(id);
      added = true;
    } else {
      this.favorites[uId].splice(index, 1);
    }
    this.save('oku_favorites', this.favorites);
    return added;
  }

  getUserFavorites() {
    if (!this.activeUser) return [];
    const userFavs = this.favorites[this.activeUser.studentId] || [];
    return this.listings.filter(item => userFavs.includes(item.id));
  }

  getUserListings() {
    if (!this.activeUser) return [];
    return this.listings.filter(item => item.seller.studentId === this.activeUser.studentId);
  }
}

const state = new AppState();

// --- DOM ELEMENTS & CONTROLLERS ---
document.addEventListener('DOMContentLoaded', () => {
  // Navigation elements
  const navLinks = document.querySelectorAll('nav .nav-link, .mobile-nav .mobile-nav-link');
  const sections = document.querySelectorAll('.app-section');
  const logoBtn = document.getElementById('logo-btn');
  
  // Theme toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const moonIcon = document.getElementById('theme-icon-moon');
  const sunIcon = document.getElementById('theme-icon-sun');
  
  // User Badge / Profile Auth
  const userBadgeBtn = document.getElementById('user-badge-btn');
  const headerAvatar = document.getElementById('header-avatar');
  const headerUsername = document.getElementById('header-username');
  
  // Auth Modal
  const authModal = document.getElementById('auth-modal');
  const authForm = document.getElementById('auth-form');
  const btnCloseAuthModal = document.getElementById('btn-close-auth-modal');
  const btnShowAuth = document.getElementById('btn-show-auth');
  
  // Profile Dashboard Elements
  const authorizedProfile = document.getElementById('authenticated-profile');
  const unauthorizedProfile = document.getElementById('unauthorized-profile');
  const profileNameDisplay = document.getElementById('profile-name-display');
  const profileEmailDisplay = document.getElementById('profile-email-display');
  const profileIdDisplay = document.getElementById('profile-id-display');
  const profilePhoneDisplay = document.getElementById('profile-phone-display');
  const btnLogout = document.getElementById('btn-logout');
  const myListingsTbody = document.getElementById('my-listings-tbody');
  const myListingsEmpty = document.getElementById('my-listings-empty');
  
  // Listings Elements
  const listingsContainer = document.getElementById('listings-container');
  const listingsEmpty = document.getElementById('listings-empty');
  const searchInput = document.getElementById('search-input');
  const categoryFilters = document.getElementById('category-filters');
  
  // Add Listing Elements
  const addListingForm = document.getElementById('add-listing-form');
  const btnCancelListing = document.getElementById('btn-cancel-listing');
  const imagePresetsContainer = document.getElementById('image-presets-container');
  const newProductImageVal = document.getElementById('new-product-image-val');
  
  // Favorites Elements
  const favoritesContainer = document.getElementById('favorites-container');
  const favoritesEmpty = document.getElementById('favorites-empty');
  
  // Details Modal Elements
  const productDetailModal = document.getElementById('product-detail-modal');
  const btnCloseDetailModal = document.getElementById('btn-close-detail-modal');
  const modalProductTitle = document.getElementById('modal-product-title');
  const modalProductImg = document.getElementById('modal-product-img');
  const modalProductName = document.getElementById('modal-product-name');
  const modalProductCat = document.getElementById('modal-product-cat');
  const modalProductPrice = document.getElementById('modal-product-price');
  const modalProductDesc = document.getElementById('modal-product-desc');
  const modalProductId = document.getElementById('modal-product-id');
  const modalProductDate = document.getElementById('modal-product-date');
  const modalProductStatusBadge = document.getElementById('modal-product-status-badge');
  const modalSellerName = document.getElementById('modal-seller-name');
  const modalSellerNo = document.getElementById('modal-seller-no');
  const modalSellerPhone = document.getElementById('modal-seller-phone');
  const modalSellerEmail = document.getElementById('modal-seller-email');
  const btnActionWhatsapp = document.getElementById('btn-action-whatsapp');
  const btnActionCall = document.getElementById('btn-action-call');
  const modalBtnFavorite = document.getElementById('modal-btn-favorite');
  
  // State variables for routing/filtering
  let currentCategoryFilter = 'all';
  let activeDetailedItem = null;

  // --- CORE INITIALIZATION ---
  initTheme();
  renderImagePresets();
  updateUserUI();
  renderListings();
  lucide.createIcons();

  // --- ROUTING / TAB NAVIGATION ---
  function switchTab(tabId) {
    // Check if route requires auth
    if ((tabId === 'add-listing-section' || tabId === 'profile-section') && !state.activeUser) {
      showToast('İlan eklemek veya profilinizi yönetmek için giriş yapmalısınız.', 'error');
      openModal(authModal);
      return;
    }
    
    // Update tabs styling
    navLinks.forEach(link => {
      if (link.getAttribute('data-tab') === tabId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update section visibility
    sections.forEach(sec => {
      if (sec.id === tabId) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    // Handle section-specific rendering
    if (tabId === 'listings-section') {
      renderListings();
    } else if (tabId === 'favorites-section') {
      renderFavorites();
    } else if (tabId === 'profile-section') {
      renderProfileDashboard();
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Setup tab click event listeners
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = link.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  logoBtn.addEventListener('click', () => switchTab('listings-section'));
  userBadgeBtn.addEventListener('click', () => {
    if (state.activeUser) {
      switchTab('profile-section');
    } else {
      openModal(authModal);
    }
  });

  // --- THEME MANAGEMENT ---
  function initTheme() {
    const savedTheme = localStorage.getItem('oku_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('oku_theme', newTheme);
    updateThemeIcons(newTheme);
  });

  function updateThemeIcons(theme) {
    if (theme === 'dark') {
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
    } else {
      moonIcon.style.display = 'block';
      sunIcon.style.display = 'none';
    }
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconName = type === 'success' ? 'check-circle' : 'alert-circle';
    toast.innerHTML = `
      <i data-lucide="${iconName}" style="width: 18px; height: 18px;"></i>
      <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    lucide.createIcons();
    
    setTimeout(() => {
      toast.style.animation = 'fadeIn 0.3s ease-out reverse forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // --- MODAL OPERATIONS ---
  function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  btnCloseAuthModal.addEventListener('click', () => closeModal(authModal));
  btnCloseDetailModal.addEventListener('click', () => closeModal(productDetailModal));
  
  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === authModal) closeModal(authModal);
    if (e.target === productDetailModal) closeModal(productDetailModal);
  });

  // Show auth modal from profile page empty state
  btnShowAuth.addEventListener('click', () => openModal(authModal));

  // --- AUTHENTICATION CONTROLLER ---
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('auth-name').value.trim();
    const email = document.getElementById('auth-email').value.trim();
    const studentId = document.getElementById('auth-student-id').value.trim();
    const phone = document.getElementById('auth-phone').value.trim();

    // Student email domain verification (e.g., student domain check)
    if (!email.toLowerCase().endsWith('.edu.tr')) {
      showToast('Lütfen geçerli bir üniversite öğrenci e-postası (.edu.tr) giriniz.', 'error');
      return;
    }

    // Student ID check
    if (studentId.length < 10) {
      showToast('Geçerli bir öğrenci numarası giriniz.', 'error');
      return;
    }

    // Perform register/login
    state.register(name, email, studentId, phone);
    updateUserUI();
    closeModal(authModal);
    showToast(`Hoş geldiniz, ${name}!`);
    
    // Switch to profile tab
    switchTab('profile-section');
  });

  btnLogout.addEventListener('click', () => {
    const userName = state.activeUser.name;
    state.logout();
    updateUserUI();
    switchTab('listings-section');
    showToast(`Çıkış yapıldı. Tekrar görüşmek üzere, ${userName}!`);
  });

  function updateUserUI() {
    if (state.activeUser) {
      headerUsername.textContent = state.activeUser.name.split(' ')[0];
      headerAvatar.textContent = state.activeUser.name.charAt(0).toUpperCase();
      headerAvatar.style.background = 'var(--accent)';
      
      authorizedProfile.style.display = 'grid';
      unauthorizedProfile.style.display = 'none';
    } else {
      headerUsername.textContent = 'Giriş Yap';
      headerAvatar.textContent = '?';
      headerAvatar.style.background = 'var(--text-muted)';
      
      authorizedProfile.style.display = 'none';
      unauthorizedProfile.style.display = 'flex';
    }
  }

  // --- PROFILE DASHBOARD & LISTING MANAGEMENT ---
  function renderProfileDashboard() {
    if (!state.activeUser) return;

    // Set text displays
    profileNameDisplay.textContent = state.activeUser.name;
    profileEmailDisplay.textContent = state.activeUser.email;
    profileIdDisplay.textContent = state.activeUser.studentId;
    profilePhoneDisplay.textContent = state.activeUser.phone;
    document.getElementById('profile-avatar').textContent = state.activeUser.name.charAt(0).toUpperCase();

    // Render my listings table
    const myListings = state.getUserListings();
    myListingsTbody.innerHTML = '';

    if (myListings.length === 0) {
      myListingsEmpty.style.display = 'flex';
      document.querySelector('.listings-table').style.display = 'none';
    } else {
      myListingsEmpty.style.display = 'none';
      document.querySelector('.listings-table').style.display = 'table';

      myListings.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="${item.imageUrl}" style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover;">
              <div>
                <div class="listings-table-title">${item.name}</div>
                <div class="listings-table-id">${item.id}</div>
              </div>
            </div>
          </td>
          <td>${item.category}</td>
          <td style="font-weight: 700;">${item.price}</td>
          <td>${item.date}</td>
          <td>
            <button class="status-badge-toggle ${item.sold ? 'sold' : 'unsold'}" data-id="${item.id}">
              ${item.sold ? 'Satıldı' : 'Satılık'}
            </button>
          </td>
          <td>
            <div class="table-actions">
              <button class="btn-icon btn-delete-item" data-id="${item.id}" title="İlanı Sil">
                <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
              </button>
            </div>
          </td>
        `;
        myListingsTbody.appendChild(tr);
      });

      // Bind toggle status events
      myListingsTbody.querySelectorAll('.status-badge-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = btn.getAttribute('data-id');
          const updated = state.toggleListingSold(id);
          if (updated) {
            showToast(`İlan durumu "${updated.sold ? 'Satıldı' : 'Satılık'}" olarak güncellendi.`);
            renderProfileDashboard();
          }
        });
      });

      // Bind delete events
      myListingsTbody.querySelectorAll('.btn-delete-item').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (confirm('Bu ilanı kalıcı olarak silmek istediğinize emin misiniz?')) {
            state.deleteListing(id);
            showToast('İlan başarıyla silindi.');
            renderProfileDashboard();
          }
        });
      });

      lucide.createIcons();
    }
  }

  // --- IMAGE PRESET CAROUSEL/GRID IN CREATION FORM ---
  function renderImagePresets() {
    imagePresetsContainer.innerHTML = '';
    PRESET_IMAGES.forEach((img, index) => {
      const opt = document.createElement('div');
      opt.className = `image-preset-opt ${index === 0 ? 'selected' : ''}`;
      opt.setAttribute('data-url', img.url);
      opt.innerHTML = `
        <img src="${img.url}" alt="${img.label}">
        <div class="image-preset-label">${img.label}</div>
      `;
      
      opt.addEventListener('click', () => {
        imagePresetsContainer.querySelectorAll('.image-preset-opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        newProductImageVal.value = img.url;
      });

      imagePresetsContainer.appendChild(opt);
    });

    // Set default selection
    newProductImageVal.value = PRESET_IMAGES[0].url;
  }

  // --- ADD LISTING CONTROLLER ---
  addListingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!state.activeUser) {
      showToast('Lütfen ilan vermek için önce giriş yapınız.', 'error');
      openModal(authModal);
      return;
    }

    const name = document.getElementById('new-product-name').value.trim();
    const category = document.getElementById('new-product-category').value;
    const price = document.getElementById('new-product-price').value.trim();
    const description = document.getElementById('new-product-desc').value.trim();
    const imageUrl = newProductImageVal.value;

    const added = state.addListing(name, category, description, price, imageUrl);
    if (added) {
      showToast('İlanınız başarıyla yayına alındı!');
      addListingForm.reset();
      renderImagePresets(); // Reset select
      switchTab('listings-section');
    }
  });

  btnCancelListing.addEventListener('click', () => {
    addListingForm.reset();
    renderImagePresets();
    switchTab('listings-section');
  });

  // --- LISTING CARD RENDERER ---
  function buildListingCard(item) {
    const card = document.createElement('div');
    card.className = 'listing-card';
    card.setAttribute('data-id', item.id);
    
    const isFav = state.isFavorite(item.id);
    const soldBadge = item.sold 
      ? '<span class="badge badge-sold">Satıldı</span>' 
      : '<span class="badge badge-unsold">Satılık / Takaslık</span>';
      
    card.innerHTML = `
      <div class="listing-image-wrapper">
        <img src="${item.imageUrl}" alt="${item.name}" class="listing-image" loading="lazy">
        <div class="listing-badges">
          ${soldBadge}
          <span class="badge badge-category">${item.category}</span>
        </div>
        <button class="btn-favorite-toggle ${isFav ? 'is-favorite' : ''}" data-id="${item.id}" title="Favorilere Ekle">
          <i data-lucide="heart" style="width: 18px; height: 18px; fill: ${isFav ? 'currentColor' : 'none'};"></i>
        </button>
      </div>
      <div class="listing-info">
        <div class="listing-header">
          <h3 class="listing-title">${item.name}</h3>
          <span class="listing-price">${item.price}</span>
        </div>
        <p class="listing-desc">${item.description}</p>
        <div class="listing-meta">
          <span class="listing-id">${item.id}</span>
          <span>${item.date}</span>
        </div>
      </div>
    `;

    // Click event to show details (except when clicking favorite button)
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-favorite-toggle')) return;
      showProductDetails(item);
    });

    // Favorite toggle button listener
    const favBtn = card.querySelector('.btn-favorite-toggle');
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!state.activeUser) {
        showToast('Favorilere eklemek için önce giriş yapmalısınız.', 'error');
        openModal(authModal);
        return;
      }
      const added = state.toggleFavorite(item.id);
      if (added) {
        favBtn.classList.add('is-favorite');
        favBtn.querySelector('i').style.fill = 'currentColor';
        showToast('Ürün favorilerinize eklendi.');
      } else {
        favBtn.classList.remove('is-favorite');
        favBtn.querySelector('i').style.fill = 'none';
        showToast('Ürün favorilerinizden çıkarıldı.');
      }
      
      // If we are currently in favorites tab, refresh the view
      if (document.getElementById('favorites-section').classList.contains('active')) {
        renderFavorites();
      }
    });

    return card;
  }

  // --- RENDER LISTINGS (HOME PAGE) ---
  function renderListings() {
    listingsContainer.innerHTML = '';
    const query = searchInput.value.toLowerCase().trim();
    
    const filtered = state.listings.filter(item => {
      // Category filter
      if (currentCategoryFilter !== 'all' && item.category !== currentCategoryFilter) {
        return false;
      }
      // Text Search
      if (query !== '') {
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesId = item.id.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesId;
      }
      return true;
    });

    if (filtered.length === 0) {
      listingsEmpty.style.display = 'flex';
    } else {
      listingsEmpty.style.display = 'none';
      filtered.forEach(item => {
        listingsContainer.appendChild(buildListingCard(item));
      });
      lucide.createIcons();
    }
  }

  // Search Input Event
  searchInput.addEventListener('input', renderListings);

  // Category Filter Events
  categoryFilters.querySelectorAll('.category-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      categoryFilters.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategoryFilter = chip.getAttribute('data-category');
      renderListings();
    });
  });

  // --- RENDER FAVORITES PAGE ---
  function renderFavorites() {
    favoritesContainer.innerHTML = '';
    
    if (!state.activeUser) {
      favoritesEmpty.style.display = 'flex';
      return;
    }

    const favListings = state.getUserFavorites();

    if (favListings.length === 0) {
      favoritesEmpty.style.display = 'flex';
    } else {
      favoritesEmpty.style.display = 'none';
      favListings.forEach(item => {
        favoritesContainer.appendChild(buildListingCard(item));
      });
      lucide.createIcons();
    }
  }

  // --- SHOW PRODUCT DETAILS MODAL ---
  function showProductDetails(item) {
    activeDetailedItem = item;
    modalProductTitle.textContent = 'İlan Bilgisi';
    modalProductImg.src = item.imageUrl;
    modalProductImg.alt = item.name;
    modalProductName.textContent = item.name;
    modalProductCat.textContent = item.category;
    modalProductPrice.textContent = item.price;
    modalProductDesc.textContent = item.description;
    modalProductId.textContent = item.id;
    modalProductDate.textContent = item.date;

    const statusBadge = modalProductStatusBadge;
    statusBadge.textContent = item.sold ? 'Satıldı' : 'Satılık / Takaslık';
    statusBadge.className = `badge ${item.sold ? 'badge-sold' : 'badge-unsold'}`;

    // Update favorite button in modal
    const isFav = state.isFavorite(item.id);
    if (isFav) {
      modalBtnFavorite.classList.add('is-favorite');
      const icon = modalBtnFavorite.querySelector('svg') || modalBtnFavorite.querySelector('i');
      if (icon) icon.style.fill = 'currentColor';
    } else {
      modalBtnFavorite.classList.remove('is-favorite');
      const icon = modalBtnFavorite.querySelector('svg') || modalBtnFavorite.querySelector('i');
      if (icon) icon.style.fill = 'none';
    }

    // Seller Info
    modalSellerName.textContent = item.seller.name;
    
    // Anonymize/protect or display Student ID
    modalSellerNo.textContent = item.seller.studentId;
    modalSellerPhone.textContent = item.seller.phone;
    modalSellerEmail.textContent = item.seller.email;

    // Contact Actions URLs
    // Clean phone number format for WhatsApp api (e.g. removes lead 0 or spaces)
    let cleanPhone = item.seller.phone.replace(/\s+/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '90' + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith('90')) {
      cleanPhone = '90' + cleanPhone;
    }
    
    const message = encodeURIComponent(`Merhaba, OKÜ Takas uygulamasındaki "${item.name}" (${item.id}) ilanınızla ilgileniyorum. Duruyor mu?`);
    btnActionWhatsapp.href = `https://wa.me/${cleanPhone}?text=${message}`;
    btnActionCall.href = `tel:${item.seller.phone}`;

    openModal(productDetailModal);
  }

  // --- DETAILS MODAL FAVORITE CLICK LISTENER ---
  modalBtnFavorite.addEventListener('click', () => {
    if (!state.activeUser) {
      showToast('Favorilere eklemek için önce giriş yapmalısınız.', 'error');
      openModal(authModal);
      return;
    }
    if (!activeDetailedItem) return;
    
    const added = state.toggleFavorite(activeDetailedItem.id);
    
    // Update modal button UI
    if (added) {
      modalBtnFavorite.classList.add('is-favorite');
      const icon = modalBtnFavorite.querySelector('svg') || modalBtnFavorite.querySelector('i');
      if (icon) icon.style.fill = 'currentColor';
      showToast('Ürün favorilerinize eklendi.');
    } else {
      modalBtnFavorite.classList.remove('is-favorite');
      const icon = modalBtnFavorite.querySelector('svg') || modalBtnFavorite.querySelector('i');
      if (icon) icon.style.fill = 'none';
      showToast('Ürün favorilerinizden çıkarıldı.');
    }

    // Sync listing card toggle in feed grid (if card is rendered)
    const card = document.querySelector(`.listing-card[data-id="${activeDetailedItem.id}"]`);
    if (card) {
      const cardFavBtn = card.querySelector('.btn-favorite-toggle');
      if (cardFavBtn) {
        if (added) {
          cardFavBtn.classList.add('is-favorite');
          const cardIcon = cardFavBtn.querySelector('svg') || cardFavBtn.querySelector('i');
          if (cardIcon) cardIcon.style.fill = 'currentColor';
        } else {
          cardFavBtn.classList.remove('is-favorite');
          const cardIcon = cardFavBtn.querySelector('svg') || cardFavBtn.querySelector('i');
          if (cardIcon) cardIcon.style.fill = 'none';
        }
      }
    }

    // Refresh favorites list view (in case user is currently in favorites tab)
    renderFavorites();
  });
});
