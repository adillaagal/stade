document.addEventListener('DOMContentLoaded', function() {
    // Pool booking calculations
    const poolForm = document.getElementById('poolBookingForm');
    const poolPeople = document.getElementById('poolPeople');
    const poolTotal = document.getElementById('poolTotal');
    const poolPrice = 15; // Price per person

    poolPeople.addEventListener('input', function() {
        const total = this.value * poolPrice;
        poolTotal.textContent = total;
    });

    poolForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const date = document.getElementById('poolDate').value;
        const time = document.getElementById('poolTime').value;
        const people = poolPeople.value;
        const total = people * poolPrice;
        const name = document.getElementById('poolName').value;
        const email = document.getElementById('poolEmail').value;

        alert(`Pool Booking Confirmed!\n\nName: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time}\nPeople: ${people}\nTotal: $${total}`);
        this.reset();
        poolTotal.textContent = '0';
    });

    // Football field booking calculations
    const fieldForm = document.getElementById('fieldBookingForm');
    const fieldDuration = document.getElementById('fieldDuration');
    const fieldTotal = document.getElementById('fieldTotal');
    const fieldPrice = 50; // Price per hour

    fieldDuration.addEventListener('change', function() {
        const total = this.value * fieldPrice;
        fieldTotal.textContent = total;
    });

    fieldForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const date = document.getElementById('fieldDate').value;
        const time = document.getElementById('fieldTime').value;
        const duration = fieldDuration.value;
        const total = duration * fieldPrice;
        const name = document.getElementById('fieldName').value;
        const email = document.getElementById('fieldEmail').value;

        alert(`Football Field Booking Confirmed!\n\nName: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time}\nDuration: ${duration} hour(s)\nTotal: $${total}`);
        this.reset();
        fieldTotal.textContent = '50';
    });

    // Set minimum date to today for both forms
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('poolDate').min = today;
    document.getElementById('fieldDate').min = today;
});
