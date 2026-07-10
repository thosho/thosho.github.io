// App State
let cart = JSON.parse(localStorage.getItem('thoshoCart')) || [];

// Product Database
const products = [
    {
        id: 'p1',
        title: 'Vaideo Pro License',
        description: 'Lifetime license for Vaideo Pro. Unleash advanced AI video generation with limitless timeline editing capabilities.',
        price: 199.00,
        image: './images/vaideo_pro.jpg'
    },
    {
        id: 'p2',
        title: 'Engaine Enterprise API',
        description: '1 Year API Access to the Engaine cloud infrastructure. High-speed rate limits and enterprise-grade SLA.',
        price: 499.00,
        image: './images/engaine_api.jpg'
    },
    {
        id: 'p3',
        title: 'Toscript Masterclass eBook',
        description: 'The definitive guide to screenplay writing using Toscript. Includes templates, formatting rules, and publishing tips.',
        price: 29.00,
        image: './images/toscript_ebook.jpg'
    }
];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartOverlay = document.getElementById('cart-overlay');
const cartDrawer = document.getElementById('cart-drawer');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

const checkoutModalOverlay = document.getElementById('checkout-modal-overlay');
const closeCheckoutBtn = document.getElementById('close-checkout');
const checkoutForm = document.getElementById('checkout-form');
const checkoutContent = document.getElementById('checkout-content');
const checkoutSuccess = document.getElementById('checkout-success');
const continueBtn = document.getElementById('continue-btn');

// Initialize Store
function initStore() {
    renderProducts();
    updateCartUI();
    setupEventListeners();
}

// Render Products to Grid
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="btn-add" onclick="addToCart('${product.id}')">
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Add Item to Cart
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if already in cart (for digital products, usually qty is 1, but we'll allow multiples for demo or just add)
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    
    // Optional: Auto open cart or show toast
    openCart();
};

// Remove Item from Cart
window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
};

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('thoshoCart', JSON.stringify(cart));
}

// Update Cart UI
function updateCartUI() {
    // Update badge count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;
    
    // Render items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
        cartTotalElement.innerText = '$0.00';
        checkoutBtn.disabled = true;
        return;
    }
    
    checkoutBtn.disabled = false;
    let totalPrice = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title} (x${item.quantity})</div>
                <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });
    
    cartTotalElement.innerText = `$${totalPrice.toFixed(2)}`;
}

// Open/Close Cart
function openCart() {
    cartOverlay.classList.add('active');
    cartDrawer.classList.add('active');
}

function closeCart() {
    cartOverlay.classList.remove('active');
    cartDrawer.classList.remove('active');
}

// Open/Close Checkout Modal
function openCheckout() {
    closeCart(); // close cart drawer first
    checkoutModalOverlay.classList.add('active');
    checkoutContent.style.display = 'block';
    checkoutSuccess.style.display = 'none';
}

function closeCheckout() {
    checkoutModalOverlay.classList.remove('active');
}

// Handle Form Submit (Mock Checkout)
function handleCheckout(e) {
    e.preventDefault();
    
    // Simulate API call delay
    const submitBtn = checkoutForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Clear cart
        cart = [];
        saveCart();
        updateCartUI();
        
        // Show success UI
        checkoutContent.style.display = 'none';
        checkoutSuccess.style.display = 'block';
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        checkoutForm.reset();
    }, 1500);
}

// Event Listeners
function setupEventListeners() {
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    checkoutBtn.addEventListener('click', openCheckout);
    closeCheckoutBtn.addEventListener('click', closeCheckout);
    // Only close modal if clicked outside modal content
    checkoutModalOverlay.addEventListener('click', (e) => {
        if(e.target === checkoutModalOverlay) closeCheckout();
    });
    
    checkoutForm.addEventListener('submit', handleCheckout);
    
    continueBtn.addEventListener('click', () => {
        closeCheckout();
    });
}

// Run
document.addEventListener('DOMContentLoaded', initStore);
