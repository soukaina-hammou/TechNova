// --- DARK MODE LOGIC ---
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

// Initialize Theme
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    lightIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
    darkIcon.classList.remove('hidden');
}

// Toggle Theme
themeToggleBtn.addEventListener('click', function() {
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');

    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
});

// --- NAVBAR SCROLL EFFECT ---
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 20) {
        nav.classList.add('py-1', 'shadow-lg');
    } else {
        nav.classList.remove('py-1', 'shadow-lg');
    }
});

// --- ADD TO CART FEEDBACK ---
const cartButtons = document.querySelectorAll('.add-to-cart');
const cartBadge = document.querySelector('.cart-badge');
let cartCount = 0;

cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        cartBadge.innerText = cartCount;
        
        // Simple animation
        button.innerText = 'Added!';
        button.classList.add('bg-green-500');
        
        setTimeout(() => {
            button.innerText = 'Add to Cart';
            button.classList.remove('bg-green-500');
        }, 1000);
    });
});
// --- PRODUCT FILTERING LOGIC ---
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Update Button Styles
        filterBtns.forEach(b => {
            b.classList.remove('bg-blue-600', 'text-white', 'active');
            b.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-600', 'dark:text-gray-300');
        });
        btn.classList.add('bg-blue-600', 'text-white', 'active');
        btn.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-600', 'dark:text-gray-300');

        // 2. Filter Products
        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hidden');
                // Smooth fade-in effect
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});