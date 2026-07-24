// Array containing all 20 shop items
const products = [
    { id: 1, name: "Mascara", category: "Make up", basePrice: 5000, img: "./src/mascara.png" },
    { id: 2, name: "Make-up Foundation", category: "Make up Foundation", basePrice: 20000, img: "./src/Make Up foundation.png" },
    { id: 3, name: "Hot Comb", category: "Styling", basePrice: 50000, img: "./src/hot comb.png" },
    { id: 4, name: "Expression Attachment", category: "Attachment", basePrice: 7000, img: "./src/expression.attachment.png" },
    { 
        id: 5, 
        name: "Body Weave Weavon", 
        category: "Naked Weavon", 
        isHair: true,
        variants: [
            { length: '10 inch', price: 100000 },
            { length: '12 inch', price: 120000 },
            { length: '16 inch', price: 150000 },
            { length: '20 inch', price: 180000 }
        ],
        img: "./src/Bodywave.png" 
    },
    { id: 6, name: "Blush", category: "Make up", basePrice: 25000, img: "./src/blush2.png" },
    { id: 7, name: "Eye Liner", category: "Line your Eyes", basePrice: 5000, img: "./src/eyeliner1.png" },
    { id: 8, name: "Lush Relaxer", category: "Relaxer", basePrice: 7500, img: "./src/lushrelaxer.png" },
    { id: 9, name: "Edge Control", category: "Slay Your Edges Using Edge Control", basePrice: 5000, img: "./src/Edge control.png" },
    { 
        id: 10, 
        name: "Bone Straight Weavon", 
        category: "Naked Weavon", 
        isHair: true,
        variants: [
            { length: '12 inch', price: 150000 },
            { length: '16 inch', price: 180000 },
            { length: '20 inch', price: 220000 },
            { length: '24 inch', price: 260000 }
        ],
        img: "./src/Bonestraight.png" 
    },
    { 
        id: 11, 
        name: "Deep Curls Weavon", 
        category: "Naked Weavon", 
        isHair: true,
        variants: [
            { length: '12 inch', price: 120000 },
            { length: '16 inch', price: 145000 },
            { length: '20 inch', price: 170000 }
        ],
        img: "./src/deepcurls.png" 
    },
    { id: 12, name: "Kim-k Closure", category: "Closure", basePrice: 50000, img: "./src/CLosure.jpg" },
    { id: 13, name: "Clipper", category: "Cut and Trim", basePrice: 50000, img: "./src/clipper1.png" },
    { id: 14, name: "Eye Lashes", category: "Lash Extension", basePrice: 10000, img: "./src/evelashes.png" },
    { id: 15, name: "Wax Stick", category: "Nourish and Styling", basePrice: 5000, img: "./src/Waxstick.png" },
    { id: 16, name: "Got 2b Ultra Glue", category: "Frontal Glue", basePrice: 10000, img: "./src/got2bglue.png" },
    { id: 17, name: "Shine N Jam", category: "Styling Gel", basePrice: 5000, img: "./src/shine and jam.png" },
    { id: 18, name: "Tail Comb", category: "Comb", basePrice: 1000, img: "./src/tailcomb.png" },
    { id: 19, name: "Magic Twist Hair Curl Foam", category: "For curls", basePrice: 5000, img: "./src/Magictwisthaircurlfoam.png" },
    { id: 20, name: "Men Hair Cream", category: "Anti Dandruff", basePrice: 20000, img: "./src/Men hair cream.png" }
];

// Utility function to format numbers as currency with commas
function formatMoney(amount) {
    return Number(amount).toLocaleString();
}

// 1. SCROLL REVEAL OBSERVER
function setupScrollReveal() {
    // Select elements with reveal-card OR hardcoded .product-card
    const cards = document.querySelectorAll(".reveal-card, .product-card");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Reveal the element and animate it up
                    entry.target.classList.remove("opacity-0", "translate-y-8");
                    entry.target.classList.add("opacity-100", "translate-y-0");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1 // Triggers when 10% of element is on screen
        }
    );

    cards.forEach((card) => observer.observe(card));
}

// 2. Render Products onto the HTML grid dynamically (if used)
function renderProducts(itemsToDisplay) {
    const grid = document.getElementById("productGrid");
    const notFound = document.getElementById("notFoundMessage");

    if (!grid) return;

    // Remove all existing product cards
    const productCards = grid.querySelectorAll(".product-card");
    productCards.forEach(card => card.remove());

    // If no products are found
    if (!itemsToDisplay || itemsToDisplay.length === 0) {
        if (notFound) {
            notFound.classList.remove("hidden");
        }
        return;
    }

    // Hide "Item not found" message
    if (notFound) {
        notFound.classList.add("hidden");
    }

    itemsToDisplay.forEach((product) => {

        const card = document.createElement("div");

        card.className =
            "product-card reveal-card opacity-0 translate-y-8 transition-all duration-700 ease-out border p-2 rounded-xl bg-white/20 flex flex-col justify-between";

        let hairSelectHTML = "";
        let defaultPrice = product.basePrice;

        // Hair product options
        if (product.isHair) {

            defaultPrice = product.variants[0].price;

            hairSelectHTML = `
                <div class="mt-2 mb-2">

                    <label class="block text-xs font-semibold mb-1">
                        Select Length:
                    </label>

                    <select
                        onchange="updateHairPrice(event, ${product.id})"
                        class="w-full text-xs p-1 rounded border border-gray-300 bg-white outline-none"
                    >
                        ${product.variants.map(v => `
                            <option value="${v.price}">
                                ${v.length}
                            </option>
                        `).join("")}
                    </select>

                </div>
            `;
        }

        // Product card HTML
        card.innerHTML = `

            <div>

                <div>
                    <img
                        src="${product.img}"
                        alt="${product.name}"
                        class="rounded-xl w-full h-48 object-cover"
                    >
                </div>

                <div class="mt-2">

                    <h3 class="font-bold mb-1 text-base">
                        ${product.name}
                    </h3>

                    <p class="text-xs mb-1 text-gray-800">
                        ${product.category}
                    </p>

                    <p class="text-sm font-bold flex items-center gap-1">

                        <i class="fa-solid fa-naira-sign text-xs"></i>

                        <span id="price-${product.id}">
                            ${formatMoney(defaultPrice)}
                        </span>

                    </p>

                </div>

                ${hairSelectHTML}

            </div>

            <div
                class="flex justify-center mt-3"
                id="action-area-${product.id}"
            >

                <button
                    onclick="handleBuyClick(this, ${product.id})"
                    class="buy-btn border px-12 py-1 rounded-full bg-yellow-800 hover:bg-yellow-900 text-white font-semibold transition-colors duration-200"
                >
                    Buy
                </button>

            </div>

        `;

        grid.appendChild(card);
    });

    // Re-trigger animation for newly created cards
    setupScrollReveal();
}



function updateCartCount() {

    const cartCountElement = document.getElementById("cartCount");

    if (!cartCountElement) return;

    const cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    const totalItems = cart.reduce(
        (total, item) => {
            return total + Number(item.quantity || 0);
        },
        0
    );

    cartCountElement.textContent = totalItems;

}


// 3. Hair Length Selector Handler
function updateHairPrice(event, productId) {
    const selectedPrice = event.target.value;
    const priceDisplay = document.getElementById(`price-${productId}`);
    if (priceDisplay) {
        priceDisplay.innerText = formatMoney(selectedPrice);
    }
}

// 4. Buy Button Click Handler
function handleBuyClick(button, productId) {

    button.classList.remove(
        "bg-yellow-800",
        "hover:bg-yellow-900"
    );

    button.classList.add("bg-black");


    setTimeout(() => {

        const actionArea = document.getElementById(
            `action-area-${productId}`
        );


        if (actionArea) {

            actionArea.innerHTML = `

                <div class="flex items-center justify-center gap-2 bg-white px-3 py-1 rounded-full border shadow-sm">

                    <button
                        onclick="changeQty(${productId}, -1)"
                        class="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700"
                    >
                        -
                    </button>


                    <span
                        id="qty-${productId}"
                        class="font-bold text-sm min-w-[18px] text-center"
                    >
                        1
                    </span>


                    <button
                        onclick="changeQty(${productId}, 1)"
                        class="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700"
                    >
                        +
                    </button>


                    <button
                        onclick="addToCart(${productId})"
                        class="ml-1 bg-amber-800 hover:bg-amber-900 text-white text-xs px-2.5 py-1 rounded-full font-bold transition-colors"
                    >
                        OK
                    </button>

                </div>

            `;

        }

    }, 150);

}

// 5. Quantity Adjuster
function changeQty(productId, delta) {
    const qtySpan = document.getElementById(`qty-${productId}`);
    if (!qtySpan) return;

    let currentQty = parseInt(qtySpan.innerText);
    currentQty += delta;

    if (currentQty < 1) {
        resetBuyButton(productId);
    } else {
        qtySpan.innerText = currentQty;
    }
}

// 6. Add to Cart Confirmation Handler
function addToCart(productId) {

    const actionArea = document.getElementById(
        `action-area-${productId}`
    );

    const qtySpan = document.getElementById(
        `qty-${productId}`
    );

    const quantitySelected = qtySpan
        ? parseInt(qtySpan.innerText, 10)
        : 1;


    // Find the product
    const product = products.find(
        product => product.id === productId
    );

    if (!product) {
        console.error("Product not found:", productId);
        return;
    }


    // Get existing cart
    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];


    // Check if product already exists
    const existingProduct = cart.find(
        item => item.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity || 0)
            + quantitySelected;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            category: product.category,
            img: product.img,
            basePrice: product.basePrice,
            isHair: product.isHair || false,
            variants: product.variants || [],
            quantity: quantitySelected

        });

    }


    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Update cart badge
    updateCartCount();


    // Show success message
    if (actionArea) {

        actionArea.innerHTML = `

            <div class="bg-emerald-800 text-white text-xs font-bold px-6 py-1.5 rounded-full flex items-center justify-center gap-1.5 shadow-sm">

                <i class="fa-solid fa-check text-xs"></i>

                <span>
                    Added to Cart (${quantitySelected})
                </span>

            </div>

        `;


        setTimeout(() => {

            resetBuyButton(productId);

        }, 2500);

    }

}

// Helper: Resets product card back to original Buy button
function resetBuyButton(productId) {
    const actionArea = document.getElementById(`action-area-${productId}`);
    if (actionArea) {
        actionArea.innerHTML = `
            <button 
                onclick="handleBuyClick(this, ${productId})" 
                class="buy-btn border px-12 py-1 rounded-full bg-yellow-800 hover:bg-yellow-900 text-white font-semibold transition-colors duration-200"
            >
                Buy
            </button>
        `;
    }
}

// 7. Search Bar Filter Handler
function searchProducts() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();

    if (query === "") {
        renderProducts(products);
        return;
    }

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    );

    renderProducts(filtered);
}

// 8. See All Reset Handler
function showAllProducts() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.value = "";
    }
    renderProducts(products);
}

document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();

    if (document.getElementById("productGrid")) {

        renderProducts(products);

        setupScrollReveal();

    }

});
