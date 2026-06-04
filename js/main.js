// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.feature-card, .product-card, .hero-section h1, .hero-section p');
    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // --- PDP Tabs Logic ---
    const tabs = document.querySelectorAll('.pdp-tab');
    const tabContents = document.querySelectorAll('.tab-content-area');

    if (tabs.length > 0 && tabContents.length > 0) {
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                if(tabContents[index]) {
                    tabContents[index].classList.add('active');
                }
            });
        });
    }

    // --- Quantity and Price Logic ---
    const qtyMinusBtn = document.querySelector('.btn-minus');
    const qtyPlusBtn = document.querySelector('.btn-plus');
    const qtyValueDisplay = document.querySelector('.qty-value');
    const totalQtyDisplay = document.querySelector('.total-qty');
    const totalPriceDisplay = document.querySelector('.total-price');
    const basePriceElement = document.querySelector('.pdp-sale-price');

    if (qtyMinusBtn && qtyPlusBtn && qtyValueDisplay && totalPriceDisplay && basePriceElement) {
        // Extract base price (remove commas and '원')
        const basePriceText = basePriceElement.innerText.replace(/[^0-9]/g, '');
        const basePrice = parseInt(basePriceText, 10);
        let currentQty = parseInt(qtyValueDisplay.innerText, 10);

        function updatePriceAndQty() {
            qtyValueDisplay.innerText = currentQty;
            if(totalQtyDisplay) totalQtyDisplay.innerText = currentQty;
            
            const total = basePrice * currentQty;
            totalPriceDisplay.innerText = total.toLocaleString() + '원';
        }

        qtyPlusBtn.addEventListener('click', () => {
            currentQty++;
            updatePriceAndQty();
        });

        qtyMinusBtn.addEventListener('click', () => {
            if (currentQty > 1) {
                currentQty--;
                updatePriceAndQty();
            }
        });
    }
});

