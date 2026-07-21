document.addEventListener("DOMContentLoaded", () => {
    // Get all category buttons and treatment cards
    const categoryButtons = document.querySelectorAll(".category-btn");
    const treatmentCards = document.querySelectorAll(".treatment-card");

    // Helper function to handle filtering and active styles
    function filterCategory(selectedCategory, targetButton) {
        // 1. Filter the treatment cards
        treatmentCards.forEach((card) => {
            const treatmentCategory = card.dataset.category;

            if (selectedCategory === "all" || selectedCategory === treatmentCategory) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });

        // 2. Reset active styling on all category buttons
        categoryButtons.forEach((btn) => {
            btn.classList.remove("bg-amber-950", "text-white");
            btn.classList.add("bg-white", "text-black");
        });

        // 3. Highlight the target active button
        if (targetButton) {
            targetButton.classList.remove("bg-white", "text-black");
            targetButton.classList.add("bg-amber-950", "text-white");
        }
    }

    // Attach click events to buttons
    categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.filter;
            filterCategory(selectedCategory, button);
        });
    });

    // AUTO-FILTER VIA URL PARAMETER (e.g., ServicePage.html?category=hair-braids)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");

    if (categoryParam) {
        // Find matching button on page load
        const matchingBtn = document.querySelector(`[data-filter="${categoryParam}"]`);
        
        if (matchingBtn) {
            filterCategory(categoryParam, matchingBtn);
        }
    }
});

