document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollEffects();
    initLoadingAnimations();
    initSmoothScrolling();
    initContactForm();
    setTimeout(initHoneycombAnimation, 500);

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

function initLoadingAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    const elementsToAnimate = [
        '.feature-card',
        '.hero-content',
        '.hero-visual',
        '.section-title',
        '.cta-content'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('loading');
            observer.observe(element);
        });
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initHoneycombAnimation() {
    const hexagons = document.querySelectorAll('.hex');
    
    hexagons.forEach((hex, index) => {
        hex.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = 'rgba(255, 107, 53, 0.3)';
        });
        
        hex.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        
        hex.style.animationDelay = `${-index * 0.5}s`;
    });
}

function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    // Remove all existing error messages
    form.querySelectorAll('.error-message').forEach(msg => msg.remove());
    
    inputs.forEach(input => {
        const value = input.value.trim();
        let errorMessage = '';
        
        // Required field validation
        if (input.hasAttribute('required') && !value) {
            errorMessage = `${getFieldLabel(input)} is required`;
            isValid = false;
        }
        
        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
            if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 8) {
                errorMessage = 'Please enter a valid phone number (minimum 10 digits)';
                isValid = false;
            }
        }
        
        // Name validation (only letters, spaces, hyphens, apostrophes)
        if (input.name === 'name' && value) {
            const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
            if (!nameRegex.test(value)) {
                errorMessage = 'Name should only contain letters, spaces, hyphens, and apostrophes (2-50 characters)';
                isValid = false;
            }
        }
        
        // Message length validation
        if (input.name === 'message' && value) {
            if (value.length < 10) {
                errorMessage = 'Message should be at least 10 characters long';
                isValid = false;
            } else if (value.length > 1000) {
                errorMessage = 'Message should not exceed 1000 characters';
                isValid = false;
            }
        }
        
        // Apply error styling and message
        if (errorMessage) {
            input.classList.add('error');
            showFieldError(input, errorMessage);
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

function getFieldLabel(input) {
    const label = input.closest('.form-group')?.querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : input.name || 'This field';
}

function showFieldError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    input.parentNode.appendChild(errorElement);
}

function showSuccessMessage(form) {
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    const successMessage = document.createElement('div');
    successMessage.className = 'form-message success-message';
    successMessage.innerHTML = `
        <div class="message-content">
            <i class="fas fa-check-circle"></i>
            <h3>Thank You!</h3>
            <p>Your message has been successfully sent. We appreciate you reaching out to us and will get back to you within 24 hours.</p>
        </div>
    `;
    
    form.parentNode.insertBefore(successMessage, form);
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Reset form
    form.reset();
    
    // Remove success message after 8 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 8000);
}

function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission (replace with actual submission logic)
                setTimeout(() => {
                    showSuccessMessage(this);
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1500);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim()) {
                    validateSingleField(this);
                }
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateSingleField(this);
                }
            });
        });
    }
}

function validateSingleField(input) {
    const form = input.closest('form');
    const formGroup = input.closest('.form-group');
    
    // Remove existing error message for this field
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const value = input.value.trim();
    let errorMessage = '';
    
    // Apply same validation logic as validateForm but for single field
    if (input.hasAttribute('required') && !value) {
        errorMessage = `${getFieldLabel(input)} is required`;
    } else if (input.type === 'email' && value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
        }
    } else if (input.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 8) {
            errorMessage = 'Please enter a valid phone number (minimum 8 digits)';
        }
    } else if (input.name === 'name' && value) {
        const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
        if (!nameRegex.test(value)) {
            errorMessage = 'Name should only contain letters, spaces, hyphens, and apostrophes (2-50 characters)';
        }
    } else if (input.name === 'message' && value) {
        if (value.length < 10) {
            errorMessage = 'Message should be at least 10 characters long';
        } else if (value.length > 1000) {
            errorMessage = 'Message should not exceed 1000 characters';
        }
    }
    
    if (errorMessage) {
        input.classList.add('error');
        showFieldError(input, errorMessage);
    } else {
        input.classList.remove('error');
    }
}

function animateElement(element, className, duration = 300) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
    }, duration);
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

window.addEventListener('scroll', throttle(function() {
}, 16));

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    const elementsToFadeIn = document.querySelectorAll('.loading');
    elementsToFadeIn.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('loaded');
        }, index * 100);
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function toggleAccordion(header) {
    const accordionItem = header.parentElement;
    const content = accordionItem.querySelector('.accordion-content');
    const icon = header.querySelector('.accordion-icon');
    
    const allAccordionItems = document.querySelectorAll('.accordion-item');
    allAccordionItems.forEach(item => {
        if (item !== accordionItem && item.classList.contains('active')) {
            item.classList.remove('active');
            const otherContent = item.querySelector('.accordion-content');
            const otherIcon = item.querySelector('.accordion-icon');
            if (otherContent) otherContent.style.maxHeight = '0';
            if (otherIcon) otherIcon.textContent = '+';
        }
    });
    
    if (accordionItem.classList.contains('active')) {
        accordionItem.classList.remove('active');
        content.style.maxHeight = '0';
        icon.textContent = '+';
    } else {
        accordionItem.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.textContent = '−';
    }
}