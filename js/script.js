/* ============================================================
   FreshMart — Main JavaScript
   Cart system, search, filters, animations, theme toggle
   ============================================================ */

'use strict';

/* ── Product Database ───────────────────────────────────────── */
const PRODUCTS = [
  // Fruits & Veggies
  { id:1,  name:'Fresh Strawberries',   emoji:'🍓', category:'fruits',    price:89,  originalPrice:120, rating:4.8, reviews:342, badge:'Sale',    stock:true },
  { id:2,  name:'Organic Avocados',     emoji:'🥑', category:'fruits',    price:149, originalPrice:180, rating:4.7, reviews:218, badge:'Organic', stock:true },
  { id:3,  name:'Ripe Bananas (6 pcs)', emoji:'🍌', category:'fruits',    price:49,  originalPrice:null, rating:4.5, reviews:510, badge:null,     stock:true },
  { id:4,  name:'Broccoli Crown',       emoji:'🥦', category:'fruits',    price:59,  originalPrice:75,  rating:4.6, reviews:189, badge:'Sale',    stock:true },
  { id:5,  name:'Cherry Tomatoes',      emoji:'🍅', category:'fruits',    price:79,  originalPrice:null, rating:4.4, reviews:276, badge:'New',     stock:true },
  { id:6,  name:'Sweet Corn',           emoji:'🌽', category:'fruits',    price:35,  originalPrice:null, rating:4.3, reviews:145, badge:null,     stock:true },
  { id:7,  name:'Mangoes (Alphonso)',   emoji:'🥭', category:'fruits',    price:199, originalPrice:250, rating:4.9, reviews:632, badge:'Premium', stock:true },
  { id:8,  name:'Baby Spinach',         emoji:'🥬', category:'fruits',    price:45,  originalPrice:null, rating:4.5, reviews:201, badge:'Organic', stock:true },
  // Dairy & Eggs
  { id:9,  name:'Full Cream Milk 1L',   emoji:'🥛', category:'dairy',     price:68,  originalPrice:null, rating:4.6, reviews:890, badge:null,     stock:true },
  { id:10, name:'Farm Fresh Eggs (12)', emoji:'🥚', category:'dairy',     price:89,  originalPrice:110, rating:4.7, reviews:745, badge:'Sale',    stock:true },
  { id:11, name:'Greek Yogurt 400g',    emoji:'🍦', category:'dairy',     price:129, originalPrice:150, rating:4.8, reviews:312, badge:'New',     stock:true },
  { id:12, name:'Butter (Unsalted)',    emoji:'🧈', category:'dairy',     price:99,  originalPrice:null, rating:4.5, reviews:421, badge:null,     stock:true },
  { id:13, name:'Paneer 200g',          emoji:'🧀', category:'dairy',     price:89,  originalPrice:null, rating:4.6, reviews:389, badge:null,     stock:true },
  { id:14, name:'Cheddar Cheese Slices',emoji:'🧀', category:'dairy',     price:199, originalPrice:240, rating:4.4, reviews:167, badge:'Sale',    stock:true },
  // Bakery
  { id:15, name:'Whole Wheat Bread',    emoji:'🍞', category:'bakery',    price:45,  originalPrice:null, rating:4.5, reviews:634, badge:null,     stock:true },
  { id:16, name:'Butter Croissants',    emoji:'🥐', category:'bakery',    price:89,  originalPrice:110, rating:4.8, reviews:289, badge:'Fresh',   stock:true },
  { id:17, name:'Sourdough Loaf',       emoji:'🍞', category:'bakery',    price:149, originalPrice:null, rating:4.9, reviews:178, badge:'Artisan', stock:true },
  { id:18, name:'Multigrain Biscuits',  emoji:'🍪', category:'bakery',    price:65,  originalPrice:80,  rating:4.3, reviews:412, badge:'Sale',    stock:true },
  // Meat & Seafood
  { id:19, name:'Chicken Breast 500g',  emoji:'🍗', category:'meat',      price:199, originalPrice:240, rating:4.6, reviews:523, badge:'Sale',    stock:true },
  { id:20, name:'Salmon Fillet 300g',   emoji:'🐟', category:'meat',      price:349, originalPrice:420, rating:4.8, reviews:234, badge:'Premium', stock:true },
  { id:21, name:'Mutton Keema 500g',    emoji:'🥩', category:'meat',      price:299, originalPrice:null, rating:4.5, reviews:189, badge:null,     stock:true },
  { id:22, name:'Prawns 250g',          emoji:'🍤', category:'meat',      price:249, originalPrice:300, rating:4.7, reviews:156, badge:'Sale',    stock:true },
  // Beverages
  { id:23, name:'Orange Juice 1L',      emoji:'🍊', category:'beverages', price:99,  originalPrice:120, rating:4.5, reviews:456, badge:'Sale',    stock:true },
  { id:24, name:'Green Tea (20 bags)',  emoji:'🍵', category:'beverages', price:149, originalPrice:null, rating:4.7, reviews:678, badge:'Organic', stock:true },
  { id:25, name:'Coconut Water 500ml',  emoji:'🥥', category:'beverages', price:69,  originalPrice:null, rating:4.6, reviews:334, badge:'Natural', stock:true },
  { id:26, name:'Cold Brew Coffee',     emoji:'☕', category:'beverages', price:179, originalPrice:210, rating:4.8, reviews:212, badge:'New',     stock:true },
  { id:27, name:'Mixed Fruit Juice 1L', emoji:'🧃', category:'beverages', price:129, originalPrice:null, rating:4.4, reviews:267, badge:null,     stock:true },
  // Snacks
  { id:28, name:'Mixed Nuts 250g',      emoji:'🥜', category:'snacks',    price:249, originalPrice:299, rating:4.7, reviews:389, badge:'Sale',    stock:true },
  { id:29, name:'Dark Chocolate Bar',   emoji:'🍫', category:'snacks',    price:89,  originalPrice:null, rating:4.8, reviews:534, badge:'Premium', stock:true },
  { id:30, name:'Popcorn (Butter)',     emoji:'🍿', category:'snacks',    price:59,  originalPrice:null, rating:4.3, reviews:298, badge:null,     stock:true },
  { id:31, name:'Granola Bars (6pk)',   emoji:'🌾', category:'snacks',    price:179, originalPrice:210, rating:4.5, reviews:167, badge:'Sale',    stock:true },
  { id:32, name:'Roasted Peanuts 200g', emoji:'🥜', category:'snacks',    price:49,  originalPrice:null, rating:4.2, reviews:445, badge:null,     stock:true },
];

/* ── State ──────────────────────────────────────────────────── */
let cart         = JSON.parse(localStorage.getItem('fm_cart') || '[]');
let wishlist     = JSON.parse(localStorage.getItem('fm_wishlist') || '[]');
let currentPage  = detectPage();
let filterState  = { cat:'all', maxPrice:500, sort:'default', inStock:false, onSale:false };

/* ── Helpers ────────────────────────────────────────────────── */
function detectPage() {
  const path = window.location.pathname;
  if (path.includes('products')) return 'products';
  if (path.includes('cart'))     return 'cart';
  if (path.includes('about'))    return 'about';
  if (path.includes('contact'))  return 'contact';
  return 'home';
}

function saveCart() {
  localStorage.setItem('fm_cart', JSON.stringify(cart));
}
function saveWishlist() {
  localStorage.setItem('fm_wishlist', JSON.stringify(wishlist));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}
function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function formatPrice(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function starsHTML(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < full; i++) html += '★';
  if (half) html += '½';
  return html;
}

/* ── Toast ──────────────────────────────────────────────────── */
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className   = `toast ${type} show`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.classList.remove('show'); }, 2800);
}

/* ── Cart Badge ─────────────────────────────────────────────── */
function updateCartBadge() {
  const badges = document.querySelectorAll('#cartBadge');
  const count  = getCartCount();
  badges.forEach(b => {
    b.textContent = count;
    if (count > 0) b.classList.add('bump');
    setTimeout(() => b.classList.remove('bump'), 350);
  });
}

/* ── Add To Cart ────────────────────────────────────────────── */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
    showToast(`Added another ${product.name}! 🛒`);
  } else {
    cart.push({ ...product, qty: 1 });
    showToast(`${product.name} added to cart! 🛒`);
  }
  saveCart();
  updateCartBadge();

  // Visual feedback on button
  const btns = document.querySelectorAll(`.add-to-cart-btn[data-id="${productId}"]`);
  btns.forEach(btn => {
    btn.textContent = '✓ Added';
    btn.classList.add('added');
    setTimeout(() => {
      btn.innerHTML = '<i class="fa fa-cart-plus"></i> Add to Cart';
      btn.classList.remove('added');
    }, 1500);
  });
}

/* ── Wishlist ───────────────────────────────────────────────── */
function toggleWishlist(productId) {
  const idx = wishlist.indexOf(productId);
  const btn = document.querySelector(`.wishlist-btn[data-id="${productId}"]`);
  if (idx === -1) {
    wishlist.push(productId);
    showToast('Added to wishlist! ❤️', 'info');
    if (btn) btn.classList.add('active');
  } else {
    wishlist.splice(idx, 1);
    showToast('Removed from wishlist', 'info');
    if (btn) btn.classList.remove('active');
  }
  saveWishlist();
}

/* ── Build Product Card ─────────────────────────────────────── */
function buildProductCard(product, delay = 0) {
  const isWished   = wishlist.includes(product.id);
  const discount   = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const badgeHTML = product.badge
    ? `<span class="product-badge ${product.badge === 'New' ? 'new-badge' : ''}">${product.badge}</span>`
    : '';

  return `
    <div class="product-card fade-in-section" style="animation-delay:${delay}ms">
      <div class="product-img">
        ${badgeHTML}
        <span style="font-size:4.5rem">${product.emoji}</span>
      </div>
      <div class="product-body">
        <div class="product-category">${product.category}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-rating">
          <span class="stars-display">${starsHTML(product.rating)}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
          ${discount > 0 ? `<span class="price-discount">-${discount}%</span>` : ''}
        </div>
        <div class="product-footer">
          <button class="add-to-cart-btn" data-id="${product.id}" onclick="addToCart(${product.id})">
            <i class="fa fa-cart-plus"></i> Add to Cart
          </button>
          <button class="wishlist-btn ${isWished ? 'active' : ''}" data-id="${product.id}"
                  onclick="toggleWishlist(${product.id})" title="Wishlist">
            <i class="fa fa-heart"></i>
          </button>
        </div>
      </div>
    </div>`;
}

/* ── Home Page ──────────────────────────────────────────────── */
function initHomePage() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  // Show 8 featured products (mix of categories)
  const featured = [1, 9, 16, 19, 24, 28, 7, 11];
  const products = featured.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  grid.innerHTML = products.map((p, i) => buildProductCard(p, i * 80)).join('');
  observeFadeIns();
}

/* ── Products Page ──────────────────────────────────────────── */
function initProductsPage() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  // Check URL params for pre-selected category
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('cat');
  if (catParam) {
    filterState.cat = catParam;
    const radio = document.querySelector(`input[name="cat"][value="${catParam}"]`);
    if (radio) radio.checked = true;
  }

  renderProducts();
  bindFilters();
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  if (!grid) return;

  let filtered = [...PRODUCTS];

  // Category filter
  if (filterState.cat !== 'all') {
    filtered = filtered.filter(p => p.category === filterState.cat);
  }
  // Price filter
  filtered = filtered.filter(p => p.price <= filterState.maxPrice);
  // In stock
  if (filterState.inStock) filtered = filtered.filter(p => p.stock);
  // On sale
  if (filterState.onSale) filtered = filtered.filter(p => p.originalPrice);

  // Sort
  switch (filterState.sort) {
    case 'price-asc':  filtered.sort((a,b) => a.price - b.price); break;
    case 'price-desc': filtered.sort((a,b) => b.price - a.price); break;
    case 'name-asc':   filtered.sort((a,b) => a.name.localeCompare(b.name)); break;
    case 'rating':     filtered.sort((a,b) => b.rating - a.rating); break;
  }

  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    return;
  }
  if (noResults) noResults.style.display = 'none';
  grid.innerHTML = filtered.map((p, i) => buildProductCard(p, i * 60)).join('');
  observeFadeIns();
}

function bindFilters() {
  // Category radio
  document.querySelectorAll('input[name="cat"]').forEach(radio => {
    radio.addEventListener('change', () => {
      filterState.cat = radio.value;
      renderProducts();
    });
  });
  // Price range
  const priceRange = document.getElementById('priceRange');
  const priceVal   = document.getElementById('priceVal');
  if (priceRange) {
    priceRange.addEventListener('input', () => {
      filterState.maxPrice = parseInt(priceRange.value);
      if (priceVal) priceVal.textContent = formatPrice(filterState.maxPrice);
      renderProducts();
    });
  }
  // Sort
  const sortBy = document.getElementById('sortBy');
  if (sortBy) {
    sortBy.addEventListener('change', () => {
      filterState.sort = sortBy.value;
      renderProducts();
    });
  }
  // In stock
  const inStock = document.getElementById('inStock');
  if (inStock) {
    inStock.addEventListener('change', () => {
      filterState.inStock = inStock.checked;
      renderProducts();
    });
  }
  // On sale
  const onSale = document.getElementById('onSale');
  if (onSale) {
    onSale.addEventListener('change', () => {
      filterState.onSale = onSale.checked;
      renderProducts();
    });
  }
  // Clear all
  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) {
    clearBtn.addEventListener('click', resetFilters);
  }
  // View toggle
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const grid = document.getElementById('productsGrid');
      if (btn.dataset.view === 'list') {
        grid.classList.add('list-view');
      } else {
        grid.classList.remove('list-view');
      }
    });
  });
  // Filter sidebar toggle (mobile)
  const filterToggle = document.getElementById('filterToggleBtn');
  const sidebar      = document.getElementById('filtersSidebar');
  if (filterToggle && sidebar) {
    filterToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }
}

function resetFilters() {
  filterState = { cat:'all', maxPrice:500, sort:'default', inStock:false, onSale:false };
  const allRadio = document.querySelector('input[name="cat"][value="all"]');
  if (allRadio) allRadio.checked = true;
  const priceRange = document.getElementById('priceRange');
  if (priceRange) priceRange.value = 500;
  const priceVal = document.getElementById('priceVal');
  if (priceVal) priceVal.textContent = '₹500';
  const sortBy = document.getElementById('sortBy');
  if (sortBy) sortBy.value = 'default';
  const inStock = document.getElementById('inStock');
  if (inStock) inStock.checked = false;
  const onSale = document.getElementById('onSale');
  if (onSale) onSale.checked = false;
  renderProducts();
}

/* ── Cart Page ──────────────────────────────────────────────── */
function initCartPage() {
  renderCart();

  // Clear cart
  const clearBtn = document.getElementById('clearCartBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      if (confirm('Clear all items from cart?')) {
        cart = [];
        saveCart();
        updateCartBadge();
        renderCart();
        showToast('Cart cleared', 'info');
      }
    });
  }

  // Coupon
  const couponBtn = document.getElementById('applyCoupon');
  if (couponBtn) {
    couponBtn.addEventListener('click', applyCoupon);
  }

  // Checkout
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleCheckout);
  }
}

function renderCart() {
  const emptyEl   = document.getElementById('emptyCart');
  const contentEl = document.getElementById('cartContent');
  const listEl    = document.getElementById('cartItemsList');

  if (cart.length === 0) {
    if (emptyEl)   emptyEl.style.display   = 'block';
    if (contentEl) contentEl.style.display = 'none';
    return;
  }
  if (emptyEl)   emptyEl.style.display   = 'none';
  if (contentEl) contentEl.style.display = 'grid';

  if (listEl) {
    listEl.innerHTML = cart.map(item => `
      <div class="cart-item" id="cart-item-${item.id}">
        <div class="cart-item-emoji">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-cat">${item.category}</div>
          <div class="cart-item-price">${formatPrice(item.price)} each</div>
        </div>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
        <div class="cart-item-total">${formatPrice(item.price * item.qty)}</div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove">
          <i class="fa fa-trash"></i>
        </button>
      </div>`).join('');
  }

  const countEl = document.getElementById('cartItemCount');
  if (countEl) countEl.textContent = cart.length;

  updateOrderSummary();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  updateCartBadge();
  renderCart();
}

function removeFromCart(productId) {
  const idx = cart.findIndex(i => i.id === productId);
  if (idx === -1) return;
  const name = cart[idx].name;
  cart.splice(idx, 1);
  saveCart();
  updateCartBadge();
  renderCart();
  showToast(`${name} removed from cart`, 'info');
}

let appliedDiscount = 0;
const COUPONS = {
  'FRESH10': 0.10,
  'SAVE20':  0.20,
  'FIRSTBUY':0.15,
};

function applyCoupon() {
  const input = document.getElementById('couponInput');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  if (!code) { showToast('Enter a coupon code', 'error'); return; }

  if (COUPONS[code]) {
    appliedDiscount = COUPONS[code];
    showToast(`🎉 Coupon applied! ${Math.round(appliedDiscount*100)}% off!`);
    input.value = '';
    updateOrderSummary();
  } else {
    appliedDiscount = 0;
    showToast('Invalid coupon code ❌', 'error');
    updateOrderSummary();
  }
}

function updateOrderSummary() {
  const subtotal    = getCartTotal();
  const delivery    = subtotal >= 499 ? 0 : 49;
  const discount    = Math.round(subtotal * appliedDiscount);
  const total       = subtotal + delivery - discount;

  const subEl = document.getElementById('subtotal');
  const delEl = document.getElementById('deliveryFee');
  const totEl = document.getElementById('totalPrice');
  const disRow = document.getElementById('discountRow');
  const disAmt = document.getElementById('discountAmt');

  if (subEl) subEl.textContent = formatPrice(subtotal);
  if (delEl) delEl.textContent = delivery === 0 ? 'FREE 🎉' : formatPrice(delivery);
  if (totEl) totEl.textContent = formatPrice(total);
  if (disRow) disRow.style.display = discount > 0 ? 'flex' : 'none';
  if (disAmt) disAmt.textContent = '-' + formatPrice(discount);
}

function handleCheckout() {
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error'); return;
  }
  const modal   = document.getElementById('checkoutModal');
  const orderEl = document.getElementById('orderId');
  if (modal) {
    const orderId = 'FM' + Date.now().toString().slice(-6);
    if (orderEl) orderEl.textContent = orderId;
    modal.style.display = 'flex';
    cart = [];
    appliedDiscount = 0;
    saveCart();
    updateCartBadge();
  }
}

function closeModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.style.display = 'none';
  window.location.href = 'products.html';
}

/* ── Contact Page ───────────────────────────────────────────── */
function initContactPage() {
  const form    = document.getElementById('contactForm');
  const message = document.getElementById('message');
  const charCnt = document.getElementById('charCount');

  if (message && charCnt) {
    message.addEventListener('input', () => {
      const len = message.value.length;
      charCnt.textContent = `${len} / 500`;
      if (len > 500) message.value = message.value.slice(0, 500);
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateContactForm()) {
        // Simulate submission
        const btn = document.getElementById('submitBtn');
        if (btn) {
          btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
          btn.disabled  = true;
        }
        setTimeout(() => {
          form.style.display    = 'none';
          const success = document.getElementById('formSuccess');
          if (success) success.style.display = 'block';
        }, 1500);
      }
    });

    // Live validation
    ['firstName','lastName','email','subject','message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('blur', () => validateField(id));
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

function validateField(id) {
  const el    = document.getElementById(id);
  const errEl = document.getElementById(id + 'Error');
  if (!el || !errEl) return true;

  let error = '';
  const val = el.value.trim();

  if (['firstName','lastName','subject','message'].includes(id)) {
    if (!val) error = 'This field is required.';
    else if (id === 'message' && val.length < 10) error = 'Message too short (min 10 chars).';
  }
  if (id === 'email') {
    if (!val) error = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) error = 'Enter a valid email address.';
  }

  errEl.textContent = error;
  el.classList.toggle('error', !!error);
  return !error;
}

function validateContactForm() {
  const fields = ['firstName','lastName','email','subject','message'];
  return fields.map(id => validateField(id)).every(Boolean);
}

function resetContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (form) { form.reset(); form.style.display = 'flex'; }
  if (success) success.style.display = 'none';
  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

/* ── Search ─────────────────────────────────────────────────── */
function initSearch() {
  const input   = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!input || !results) return;

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      if (!q || q.length < 2) { results.classList.remove('visible'); return; }

      const matches = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 6);

      if (matches.length === 0) {
        results.innerHTML = '<div class="search-no-result">No results found</div>';
      } else {
        results.innerHTML = matches.map(p => `
          <div class="search-result-item" onclick="goToProduct(${p.id})">
            <span class="result-emoji">${p.emoji}</span>
            <div class="result-info">
              <strong>${p.name}</strong>
              <span>${formatPrice(p.price)}</span>
            </div>
          </div>`).join('');
      }
      results.classList.add('visible');
    }, 200);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.remove('visible');
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') results.classList.remove('visible');
    if (e.key === 'Enter') {
      const q = input.value.trim();
      if (q) {
        window.location.href = `products.html?q=${encodeURIComponent(q)}`;
      }
    }
  });
}

function goToProduct(id) {
  window.location.href = `products.html`;
}

/* ── Navbar Behaviour ───────────────────────────────────────── */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Hamburger
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ── Theme Toggle ───────────────────────────────────────────── */
function initTheme() {
  const saved = localStorage.getItem('fm_theme') || 'light';
  setTheme(saved);

  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('fm_theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? '<i class="fa fa-sun"></i>' : '<i class="fa fa-moon"></i>';
  }
}

/* ── Loader ─────────────────────────────────────────────────── */
function initLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('hidden');
    }, 1200);
  });
}

/* ── Scroll Animations ──────────────────────────────────────── */
function observeFadeIns() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
}

function addFadeIns() {
  // Apply fade-in class to sections
  const selectors = [
    '.feature-card', '.testi-card', '.offer-card',
    '.team-card', '.mission-card', '.info-card', '.stat-box'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('fade-in-section');
    });
  });
  observeFadeIns();
}

/* ── Init ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initNavbar();
  initSearch();
  updateCartBadge();
  addFadeIns();

  switch (currentPage) {
    case 'home':     initHomePage();    break;
    case 'products': initProductsPage(); break;
    case 'cart':     initCartPage();    break;
    case 'contact':  initContactPage(); break;
    case 'about':    /* no special init needed */ break;
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
