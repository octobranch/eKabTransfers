// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu after click
            document.getElementById('mobileMenu').classList.remove('active');
            // Change the menu icon back to bars
            document.getElementById('navToggle').innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Vehicle selection functionality
function setupVehicleSelection() {
    document.querySelectorAll('.vehicle-option').forEach(option => {
        option.addEventListener('click', function() {
            const card = this.closest('.route-card');
            const optionsContainer = this.closest('.vehicle-options');
            
            // Remove selected class from all options in this container
            optionsContainer.querySelectorAll('.vehicle-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Update price and WhatsApp link
            updateRouteCard(card);
        });
    });
}

// Update route card with selected vehicle
function updateRouteCard(card) {
    const vehicleOptions = card.querySelector('.vehicle-options');
    if (vehicleOptions) {
        // This card has vehicle options (it's not a quote-only card)
        const selectedOption = card.querySelector('.vehicle-option.selected');
        if (!selectedOption) return;
        
        const price = selectedOption.dataset.price;
        const vehicleType = selectedOption.dataset.type;
        const destination = card.querySelector('.route-name').textContent;
        
        // Update price display
        const priceElement = card.querySelector('.route-price');
        const fromLabel = document.documentElement.lang === 'es' ? 'Desde' : 'From';
        priceElement.innerHTML = `<span class="price-label">${fromLabel}</span> $${price} MXN`;
        
        // Update WhatsApp link
        const button = card.querySelector('.route-btn');
        let vehicleName = '';
        
        if (vehicleType === 'van8') {
            vehicleName = document.documentElement.lang === 'es' ? 'Van Estándar' : 'Standard Van';
        } else if (vehicleType === 'suv') {
            vehicleName = 'SUV';
        } else if (vehicleType === 'van15') {
            vehicleName = document.documentElement.lang === 'es' ? 'Van Grande' : 'Large Van';
        }
        
        let message = '';
        if (document.documentElement.lang === 'es') {
            message = `Hola, quiero reservar un traslado con eKab desde el aeropuerto de Cancún hacia ${destination} en una ${vehicleName}.`;
        } else {
            message = `Hello, I want to book a transfer with eKab from Cancun Airport to ${destination} in a ${vehicleName}.`;
        }
        
        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(message);
        button.href = `https://wa.me/529999908811?text=${encodedMessage}`;
    } else {
        // This is a quote card (without vehicle options)
        const destination = card.querySelector('.route-name').textContent;
        const button = card.querySelector('.route-btn');
        let message = '';
        if (document.documentElement.lang === 'es') {
            message = `Hola, quiero cotizar un traslado con eKab desde el aeropuerto de Cancún hacia ${destination}. Por favor, indique el número de personas y tipo de vehículo deseado.`;
        } else {
            message = `Hello, I want to get a quote for a transfer with eKab from Cancun Airport to ${destination}. Please specify the number of passengers and desired vehicle type.`;
        }
        const encodedMessage = encodeURIComponent(message);
        button.href = `https://wa.me/529999908811?text=${encodedMessage}`;
    }
}

// Update all route cards
function updateAllRouteCards() {
    document.querySelectorAll('.route-card').forEach(card => {
        // If this card has vehicle options, select the first option by default if none selected
        const vehicleOptions = card.querySelector('.vehicle-options');
        if (vehicleOptions) {
            if (!card.querySelector('.vehicle-option.selected')) {
                const firstOption = vehicleOptions.querySelector('.vehicle-option');
                if (firstOption) {
                    firstOption.classList.add('selected');
                }
            }
        }
        
        updateRouteCard(card);
    });
}

// FAQ Toggle
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const icon = faqItem.querySelector('.faq-icon');
    
    answer.classList.toggle('active');
    if (answer.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Change icon based on menu state
    if (mobileMenu.classList.contains('active')) {
        navToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    } else {
        navToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Setup vehicle selection
    setupVehicleSelection();
    updateAllRouteCards();
    
    // Initialize all FAQ items
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.classList.remove('active');
    });
    
    // Set up FAQ toggle events
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
    
    // Cookie Script
    (function(){
        if(!localStorage.getItem('cookies-accepted')) {
            document.getElementById('cookie-banner').classList.remove('hidden');
        }
        document.getElementById('accept-cookies').addEventListener('click', () => {
            localStorage.setItem('cookies-accepted', 'true');
            document.getElementById('cookie-banner').classList.add('hidden');
        });
    })();
});
