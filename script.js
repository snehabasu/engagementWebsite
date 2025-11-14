// Tab Switching Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// RSVP Form Submission to Google Sheets
// IMPORTANT: Replace 'YOUR_GOOGLE_SCRIPT_URL' with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL';

document.getElementById('rsvpForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    const formStatus = document.getElementById('formStatus');

    // Disable submit button during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        attendance: document.getElementById('attendance').value,
        guests: document.getElementById('guests').value,
        dietary: document.getElementById('dietary').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toLocaleString()
    };

    try {
        // Send data to Google Sheets via Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Note: With no-cors mode, we can't read the response, but the data is sent
        // Show success message
        formStatus.textContent = 'Thank you! Your RSVP has been submitted successfully.';
        formStatus.classList.add('success');

        // Reset form
        this.reset();

    } catch (error) {
        console.error('Error:', error);
        formStatus.textContent = 'There was an error submitting your RSVP. Please try again or contact us directly.';
        formStatus.classList.add('error');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit RSVP';
    }
});

// Form validation - update guest count based on attendance
document.getElementById('attendance').addEventListener('change', function() {
    const guestsInput = document.getElementById('guests');
    if (this.value === 'no') {
        guestsInput.value = 0;
        guestsInput.disabled = true;
    } else {
        guestsInput.disabled = false;
        if (guestsInput.value === '0') {
            guestsInput.value = 1;
        }
    }
});
