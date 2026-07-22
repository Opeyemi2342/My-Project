document.addEventListener("DOMContentLoaded", () => {
  // Target the h1 element using your class name
  const heroHeading = document.querySelector(".slide-from-right");

  if (!heroHeading) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove initial hidden/shifted state to trigger the 2-second slide to the left
          entry.target.classList.remove("opacity-0", "translate-x-24");
          entry.target.classList.add("opacity-100", "translate-x-0");
          
          // Stop observing once the animation has triggered
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1 // Triggers as soon as 10% of the heading is visible on screen
    }
  );

  observer.observe(heroHeading);
});