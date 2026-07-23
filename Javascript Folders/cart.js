// ==========================================
// THE GLOSS STUDIO - BOOKING CART SYSTEM
// ==========================================

// 1. Load cart items from localStorage (or initialize an empty array)
let bookingCart = JSON.parse(localStorage.getItem('bookingCart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  // Render cart items as soon as the page loads
  renderCart();

  // 2. Attach click events to all "ADD TO BOOKING CART" buttons
  const addButtons = document.querySelectorAll('.add-to-cart-btn');

  addButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      // Find the parent card container (Checks both .service-item and .treatment-card)
      const targetBtn = event.currentTarget;
      const card = targetBtn.closest('.service-item') || targetBtn.closest('.treatment-card');

      if (!card) {
        console.error('Could not find parent card with class .service-item or .treatment-card');
        return;
      }

      // Extract details from dataset attributes
      const title = card.dataset.title || 'Selected Service';
      const duration = card.dataset.duration || '';
      
      // Clean price string (removes commas, currency symbols, spaces)
      const rawPrice = card.dataset.price ? card.dataset.price.toString().replace(/[^0-9.]/g, '') : '0';
      const price = parseFloat(rawPrice) || 0;

      // Create new service item object
      const newItem = {
        id: Date.now() + Math.random(), // Unique ID for deletion
        title: title,
        duration: duration,
        price: price
      };

      // Push item into array and update localStorage
      bookingCart.push(newItem);
      saveCartToStorage();

      // Refresh cart view & total (if cart container is present on page)
      renderCart();

      // --- VISUAL FEEDBACK ON BUTTON CLICK ---
      const originalText = targetBtn.innerHTML;
      targetBtn.innerHTML = "ADDED TO CART ✓";
      targetBtn.style.backgroundColor = "#15803d"; // Green feedback color

      setTimeout(() => {
        targetBtn.innerHTML = originalText;
        targetBtn.style.backgroundColor = ""; // Reset to original style
      }, 1500);
    });
  });

  // 3. Clear all items button
  const clearCartBtn = document.getElementById('clear-cart-btn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      bookingCart = [];
      saveCartToStorage();
      renderCart();
    });
  }
});

// ==========================================
// RENDER & TOTAL CALCULATION FUNCTION
// ==========================================
function renderCart() {
  const cartContainer = document.getElementById('cart-items-container');
  const subtotalElement = document.getElementById('cart-subtotal');
  const totalElement = document.getElementById('cart-total');

  if (!cartContainer) return;

  // Empty state handling
  if (bookingCart.length === 0) {
    cartContainer.innerHTML = `
      <p class="text-center text-sm text-gray-400 py-6 font-sans">
        Your booking cart is currently empty.
      </p>`;
    
    if (subtotalElement) subtotalElement.innerHTML = '&#8358;0.00';
    if (totalElement) totalElement.innerHTML = '&#8358;0.00';
    return;
  }

  let cartHTML = '';
  let grandTotal = 0;

  // Loop through items, build HTML, and sum up prices
  bookingCart.forEach(item => {
    grandTotal += item.price;

    cartHTML += `
      <div class="border border-[#E8E6DF] p-5 flex justify-between items-center bg-[#FAFAF7] mb-3">
        <div>
          <h2 class="font-serif text-xl text-[#221F1F] font-normal">
            ${item.title}
          </h2>
          <div class="flex items-center gap-2 mt-1 text-sm text-[#C4A482] font-semibold">
            <span>${item.duration}</span>
            <span class="text-[8px] text-[#C4A482]">&#9679;</span>
            <span>&#8358;${item.price.toLocaleString('en-NG')}</span>
          </div>
        </div>
        <button onclick="removeFromCart(${item.id})" class="text-[#A3A09A] hover:text-red-600 transition-colors p-1" title="Remove item">
          <i class="fa-regular fa-trash-can text-lg"></i>
        </button>
      </div>
    `;
  });

  cartContainer.innerHTML = cartHTML;

  // Format grand total with commas (e.g., 50000 -> ₦50,000.00)
  const formattedTotal = `&#8358;${grandTotal.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (subtotalElement) subtotalElement.innerHTML = formattedTotal;
  if (totalElement) totalElement.innerHTML = formattedTotal;
}

// ==========================================
// REMOVE SINGLE ITEM
// ==========================================
function removeFromCart(itemId) {
  bookingCart = bookingCart.filter(item => item.id !== itemId);
  saveCartToStorage();
  renderCart();
}

// Helper function to save current state
function saveCartToStorage() {
  localStorage.setItem('bookingCart', JSON.stringify(bookingCart));
}