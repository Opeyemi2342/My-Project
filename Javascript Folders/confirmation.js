document.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem('appointmentData');

  if (savedData) {
    const data = JSON.parse(savedData);

    // Guest Name
    const guestNameEl = document.getElementById('confirm-guest-name');
    if (guestNameEl && data.fullName) guestNameEl.textContent = data.fullName;

    // Practitioner Name
    const practitionerDetailEl = document.getElementById('confirm-practitioner');
    if (practitionerDetailEl && data.practitioner) practitionerDetailEl.textContent = data.practitioner;

    const practitionerHeaderEl = document.getElementById('confirm-practitioner-header');
    if (practitionerHeaderEl && data.practitioner) practitionerHeaderEl.textContent = data.practitioner;

    // Date & Time
    const dateHeaderEl = document.getElementById('confirm-date-header');
    if (dateHeaderEl && data.visitDate) dateHeaderEl.textContent = data.visitDate;

    const timeHeaderEl = document.getElementById('confirm-time-header');
    if (timeHeaderEl && data.preferredTime) timeHeaderEl.textContent = data.preferredTime;

    // Total Fee
    const totalFeeEl = document.getElementById('confirm-total-fee');
    if (totalFeeEl && data.totalFee) {
      totalFeeEl.textContent = data.totalFee;
    }

    // Email Notice
    const emailNoticeEl = document.getElementById('confirm-email');
    if (emailNoticeEl && data.email) emailNoticeEl.textContent = data.email;
  }
});