document.addEventListener("DOMContentLoaded", () => {
  // Target all team cards
  const teamCards = document.querySelectorAll(".team-card");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove opacity-0 and scale-90 to expand the card to full size
        entry.target.classList.remove("opacity-0", "scale-90");
        entry.target.classList.add("opacity-100", "scale-100");

        // Stop observing after it has animated once
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2 // Triggers when 20% of the card is visible
  });

  teamCards.forEach((card) => observer.observe(card));
});