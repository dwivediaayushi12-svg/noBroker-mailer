// Main JavaScript functionality for Estates Real Estate App

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize app functionality
function initializeApp() {
    setupImageLazyLoading();
    setupScrollAnimations();
    setupTouchInteractions();
    trackUserInteractions();
}

// Handle appointment request
function requestAppointment() {
    // Show loading state
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.style.opacity = '0.7';
        button.style.pointerEvents = 'none';
        button.innerHTML = 'REQUESTING...';
    });

    // Simulate API call
    setTimeout(() => {
        showAppointmentModal();
        
        // Reset buttons
        buttons.forEach(button => {
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';
            button.innerHTML = 'REQUEST AN APPOINTMENT';
        });
    }, 1500);
}

// Show appointment request modal
function showAppointmentModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Request Appointment</h3>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <form class="appointment-form" onsubmit="submitAppointment(event)">
                <input type="text" placeholder="Full Name" required>
                <input type="tel" placeholder="Phone Number" required>
                <input type="email" placeholder="Email Address" required>
                <select required>
                    <option value="">Preferred Time</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                    <option value="evening">Evening (5 PM - 8 PM)</option>
                </select>
                <textarea placeholder="Any specific requirements..." rows="3"></textarea>
                <button type="submit" class="submit-btn">BOOK APPOINTMENT</button>
            </form>
        </div>
    `;

    // Add modal styles
    const modalStyles = `
        <style>
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }
            .modal-content {
                background: white;
                padding: 0;
                border-radius: 15px;
                width: 90%;
                max-width: 400px;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #eee;
            }
            .modal-header h3 {
                color: #5d4037;
                font-size: 18px;
            }
            .close-btn {
                background: none;
                border: none;
                font-size: 24px;
                color: #999;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .appointment-form {
                padding: 20px;
            }
            .appointment-form input,
            .appointment-form select,
            .appointment-form textarea {
                width: 100%;
                padding: 12px;
                margin-bottom: 15px;
                border: 2px solid #eee;
                border-radius: 8px;
                font-size: 14px;
                transition: border-color 0.3s ease;
            }
            .appointment-form input:focus,
            .appointment-form select:focus,
            .appointment-form textarea:focus {
                outline: none;
                border-color: #ff8a65;
            }
            .submit-btn {
                width: 100%;
                padding: 15px;
                background: linear-gradient(135deg, #ffab91, #ff8a65);
                color: white;
                border: none;
                border-radius: 25px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                text-transform: uppercase;
                letter-spacing: 1px;
                transition: transform 0.3s ease;
            }
            .submit-btn:hover {
                transform: translateY(-2px);
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Submit appointment form
function submitAppointment(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('.submit-btn');
    submitBtn.innerHTML = 'BOOKING...';
    submitBtn.style.opacity = '0.7';
    
    // Simulate form submission
    setTimeout(() => {
        closeModal();
        showSuccessMessage();
    }, 2000);
}

// Show success message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #4caf50, #2e7d32);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            z-index: 1001;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
            animation: slideDown 0.5s ease;
        ">
            ✓ Appointment request sent successfully!
        </div>
        <style>
            @keyframes slideDown {
                from { transform: translateX(-50%) translateY(-100%); }
                to { transform: translateX(-50%) translateY(0); }
            }
        </style>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 4000);
}

// Setup lazy loading for images
function setupImageLazyLoading() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Setup scroll animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.highlight-item, .feature-item');
    
    if ('IntersectionObserver' in window) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            scrollObserver.observe(el);
        });
    }
    
    // Add slideInUp animation
    const slideAnimation = `
        <style>
            @keyframes slideInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', slideAnimation);
}

// Setup touch interactions for mobile
function setupTouchInteractions() {
    const highlightItems = document.querySelectorAll('.highlight-item');
    
    highlightItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        item.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Track user interactions for analytics
function trackUserInteractions() {
    // Track button clicks
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', () => {
            console.log('CTA button clicked:', button.textContent);
            // Here you would typically send data to analytics service
        });
    });
    
    // Track image views
    document.querySelectorAll('.highlight-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            console.log('Highlight image viewed:', index);
            // Here you would typically send data to analytics service
        });
    });
}

// Utility function to detect mobile device
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Add performance optimization
function optimizePerformance() {
    // Preload critical images
    const criticalImages = [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize performance optimizations
window.addEventListener('load', optimizePerformance);

// Handle window resize for responsive design
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate any dynamic layouts if needed
        console.log('Window resized, adjusting layout');
    }, 250);
});

// Export functions for external use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        requestAppointment,
        closeModal,
        submitAppointment
    };
}