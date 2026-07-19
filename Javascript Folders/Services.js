// Get all category 
const categoryButtons = document.querySelectorAll(".category-btn");

// Get all treatment cards
const treatmentCard = document.querySelectorAll(".treatment-card");

// Loop through every category button
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        
        //Get the category clicked
        const selectedCategory = button.dataset.filter;

        //check every treatment card
        treatmentCard.forEach(card => {

            const treatmentCategory = card.dataset.category;

            //If "All Treatment" is selected;

            if (
                selectedCategory === "all" ||
                selectedCategory === treatmentCategory
            ) {
                // Show the card
                card.classList.remove("hidden");
            } else {
                //Hide the card
                card.classList.add("hidden");
            }
        });

        // Remove active styling from all buttons
        categoryButtons.forEach(btn => {
            
            btn.classList.remove(
                "bg-black",
                "text-white"
            );
        });

        //Add active styling to clicked button
        button.classList.remove(
            "bg-gray-200",
            "text-black"
        );
    });
});