document.addEventListener('DOMContentLoaded', () => {
  const appointmentForm = document.getElementById('appointment-form');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get Practitioner Name
      const practitionerSelect = document.getElementById('practitioner');
      const selectedPractitionerText = practitionerSelect.options[practitionerSelect.selectedIndex].text;

      // Calculate Total Fee directly from bookingCart array
      const storedCart = JSON.parse(localStorage.getItem('bookingCart')) || [];
      const totalAmount = storedCart.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
      
      // Format total with Naira symbol and commas (e.g. ₦130,000.00)
      const formattedTotalFee = `₦${totalAmount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      // Save form data + total fee
      const appointmentData = {
        practitioner: selectedPractitionerText,
        visitDate: document.getElementById('visit-date').value,
        preferredTime: document.getElementById('preferred-time').value,
        fullName: document.getElementById('full-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        instructions: document.getElementById('instructions').value,
        totalFee: formattedTotalFee // Dynamic calculated fee
      };

      localStorage.setItem('appointmentData', JSON.stringify(appointmentData));
      window.location.href = 'ReservationConfirmed.html';
    });
  }
});