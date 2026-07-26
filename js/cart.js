/* ============================================================
   L3GENDARY — Cart & Checkout Engine
   ============================================================ */

const L3_CART_KEY = 'l3gendary_cart';

class L3Cart {
  constructor() {
    this.items = this._load();
    this._onUpdateCallbacks = [];
  }

  // ── Persistence ──
  _load() {
    try {
      const raw = localStorage.getItem(L3_CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }
  _save() {
    localStorage.setItem(L3_CART_KEY, JSON.stringify(this.items));
    this._notify();
  }

  // ── Events ──
  onChange(fn) { this._onUpdateCallbacks.push(fn); return () => { this._onUpdateCallbacks = this._onUpdateCallbacks.filter(c => c !== fn); }; }
  _notify() { this._onUpdateCallbacks.forEach(fn => fn(this)); }

  // ── API ──
  add(productId, qty = 1, variant = null) {
    const existing = this.items.find(i => i.id === productId && i.variant === variant);
    if (existing) {
      existing.qty += qty;
    } else {
      const product = L3_PRODUCTS.find(p => p.id === productId);
      if (!product) return;
      this.items.push({
        id: productId,
        name: product.name,
        artist: product.artist,
        price: product.salePrice || product.price,
        image: product.image,
        category: product.category,
        color: product.color,
        qty,
        variant
      });
    }
    this._save();
  }

  remove(productId, variant = null) {
    this.items = this.items.filter(i => !(i.id === productId && i.variant === variant));
    this._save();
  }

  updateQty(productId, qty, variant = null) {
    const item = this.items.find(i => i.id === productId && i.variant === variant);
    if (item) {
      item.qty = Math.max(1, Math.min(99, qty));
      this._save();
    }
  }

  clear() { this.items = []; this._save(); }

  // ── Computed ──
  get count() { return this.items.reduce((s, i) => s + i.qty, 0); }
  get subtotal() { return this.items.reduce((s, i) => s + (i.price * i.qty), 0); }
  get isEmpty() { return this.items.length === 0; }

  // Tax + shipping (simplified)
  get tax() { return this.subtotal * 0.07; }
  get shipping() { return this.subtotal > 75 ? 0 : 5.99; }
  get total() { return this.subtotal + this.tax + this.shipping; }

  // Format helpers
  formatPrice(n) { return '$' + n.toFixed(2); }
}

// Global cart instance
const cart = new L3Cart();

// ── Mini Cart UI ──
function renderMiniCart() {
  const countEl = document.getElementById('cart-count');
  const miniEl  = document.getElementById('mini-cart');
  if (countEl) countEl.textContent = cart.count;
  if (miniEl)  miniEl.innerHTML = cart.isEmpty
    ? '<div class="cart-empty-msg">Your cart is empty.<br><a href="shop.html">Start shopping →</a></div>'
    : cart.items.map(i => `
      <div class="mini-cart-item">
        <div class="mini-cart-img" style="background:${i.color || '#333'}">${i.image ? `<img src="${i.image}" alt="${i.name}">` : '<span>🛒</span>'}</div>
        <div class="mini-cart-info">
          <div class="mini-cart-name">${i.name}</div>
          <div class="mini-cart-price">${cart.formatPrice(i.price)} × ${i.qty}</div>
        </div>
        <button class="mini-cart-remove" onclick="cart.remove(${i.id}, ${i.variant ? `'${i.variant}'` : 'null'});renderCartDrawer();" title="Remove">×</button>
      </div>
    `).join('')
    + `<div class="mini-cart-total">
         <span>Subtotal</span><span>${cart.formatPrice(cart.subtotal)}</span>
       </div>
       <a href="cart.html" class="mini-cart-cta btn">View Cart</a>
       <a href="checkout.html" class="mini-cart-cta btn btn-accent">Checkout</a>`;
}

function renderCartDrawer() {
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (!overlay || !drawer) return;
  renderMiniCart();
  drawer.querySelector('.cart-drawer-inner').innerHTML = document.getElementById('mini-cart').innerHTML;
}

function toggleCartDrawer(show) {
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (!overlay || !drawer) return;
  if (show) {
    renderCartDrawer();
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderMiniCart();
  cart.onChange(() => renderMiniCart());

  // Cart toggle buttons
  document.querySelectorAll('[data-cart-toggle]').forEach(btn => {
    btn.addEventListener('click', e => { e.preventDefault(); toggleCartDrawer(true); });
  });
  // Cart overlay close
  const overlay = document.getElementById('cart-overlay');
  if (overlay) overlay.addEventListener('click', () => toggleCartDrawer(false));
  // Cart close button
  const closeBtn = document.getElementById('cart-drawer-close');
  if (closeBtn) closeBtn.addEventListener('click', () => toggleCartDrawer(false));
});
