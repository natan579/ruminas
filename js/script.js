// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Update active nav link based on current page
    updateActiveNavLink();

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// ============================================
// UPDATE ACTIVE NAV LINK
// ============================================

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkPage = href.split('/').pop();

        if (linkPage === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === '' && href.includes('index.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

function handleFormSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Validate form
    if (!validateForm(data)) {
        showMessage('Please fill in all required fields correctly.', 'error');
        return;
    }

    // Simulate form submission (in a real app, this would send to a server)
    console.log('Form submitted with data:', data);
    
    // Show success message
    showMessage('Thank you for your message! We will get back to you soon.', 'success');
    
    // Reset form
    this.reset();

    // Clear message after 5 seconds
    setTimeout(() => {
        const messageEl = document.getElementById('formMessage');
        if (messageEl) {
            messageEl.classList.remove('success', 'error');
            messageEl.textContent = '';
            messageEl.style.display = 'none';
        }
    }, 5000);
}

// ============================================
// FORM VALIDATION
// ============================================

function validateForm(data) {
    // Check required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }

    return true;
}

// ============================================
// SHOW MESSAGE
// ============================================

function showMessage(message, type) {
    const messageEl = document.getElementById('formMessage');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.classList.remove('success', 'error');
        messageEl.classList.add(type);
        messageEl.style.display = 'block';
    }
}

// ============================================
// SMOOTH SCROLL ENHANCEMENT
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ============================================
// LOG MESSAGE
// ============================================

console.log('%cWelcome to Ruminas!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('Multi-page web application built with HTML, CSS, and JavaScript');