// =========================================================
// 1. JS Feature: Slide-show or Image Carousel (Home Page)
// =========================================================
let slideIndex = 1;

// Only run carousel logic if the elements exist on the page
if (document.querySelector('.image-carousel')) {
    showSlides(slideIndex);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-img");
    let dots = document.getElementsByClassName("dot");

    // Handle looping
    if (n > slides.length) { 
        slideIndex = 1;
    }
    if (n < 1) { 
        slideIndex = slides.length;
    }

    // Hide all slides and remove active dot class
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }

    // Show the current slide and mark the corresponding dot as active
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active-dot";
}

// Automatic slide change every 5 seconds
setInterval(function() {
    slideIndex++;
    showSlides(slideIndex);
}, 5000); 

// =========================================================
// 2. JS Feature: Form Validation (Contact Page)
// 3. JS Feature: Alert or Confirmation (Contact Page)
// =========================================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop default form submission
        
        // 1. Form Validation Logic
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll('.error').forEach(e => e.remove());
        
        // Helper function to show errors
        function showError(elementId, errorMessage) {
            const element = document.getElementById(elementId);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error';
            errorDiv.textContent = errorMessage;
            element.parentNode.insertBefore(errorDiv, element.nextSibling);
            isValid = false;
        }

        if (name === "") {
            showError('name', 'Name is required.');
        }

        if (email === "") {
            showError('email', 'Email is required.');
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address.');
        }

        if (message === "") {
            showError('message', 'A message is required.');
        }

        if (isValid) {
            // If validation passes, simulate submission and show confirmation

            // 2. Alert/Confirmation Feature
            showConfirmation();
            
            // In a real application, you would send the data here:
            // fetch('/submit-form', { method: 'POST', body: new FormData(contactForm) });
            
            contactForm.reset(); // Clear the form fields
        }
    });
}

// Simple Email Regex check
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Function to display the confirmation message
function showConfirmation() {
    const messageElement = document.getElementById('confirmation-message');
    if (messageElement) {
        // Dynamic content change
        messageElement.textContent = "Thank you! Your inquiry has been sent to The Daily Grind. We will respond shortly.";
        messageElement.classList.remove('hidden');
        
        // Hide the message after 8 seconds
        setTimeout(() => {
            messageElement.classList.add('hidden');
        }, 8000); 
    }
}