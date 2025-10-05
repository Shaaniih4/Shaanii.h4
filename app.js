// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Form elements
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const modalClose = document.getElementById('modal-close');
    
    // Mobile Navigation Toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbar.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Navigation Link Highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100; // Offset for better UX
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }
    
    // Navbar Background on Scroll
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(252, 252, 249, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // Dark mode handling
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(31, 33, 33, 0.98)';
            } else {
                navbar.style.background = 'rgba(38, 40, 40, 0.95)';
            }
        }
    }
    
    // Scroll Event Listeners
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbarBackground();
    });
    
    // Initial call to set active nav link
    updateActiveNavLink();
    updateNavbarBackground();
    
    // Contact Form Validation and Submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
        
        // Validation
        let isValid = true;
        const errors = [];
        
        // Name validation
        if (!name) {
            errors.push('Name is required');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.push('Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            errors.push('Please enter a valid email address');
            isValid = false;
        }
        
        // Message validation
        if (!message) {
            errors.push('Message is required');
            isValid = false;
        }
        
        // Remove previous error styling
        const formControls = contactForm.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.style.borderColor = '';
        });
        
        // Remove previous error messages
        const existingErrors = contactForm.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        
        if (!isValid) {
            // Show validation errors
            errors.forEach(error => {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.style.color = 'var(--color-error)';
                errorDiv.style.fontSize = 'var(--font-size-sm)';
                errorDiv.style.marginTop = 'var(--space-8)';
                errorDiv.textContent = error;
                
                // Insert error message after the form
                contactForm.appendChild(errorDiv);
            });
            
            // Highlight invalid fields
            if (!name) {
                document.getElementById('name').style.borderColor = 'var(--color-error)';
            }
            if (!email || !emailRegex.test(email)) {
                document.getElementById('email').style.borderColor = 'var(--color-error)';
            }
            if (!message) {
                document.getElementById('message').style.borderColor = 'var(--color-error)';
            }
            
            return;
        }
        
        // If validation passes, simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Clear form
            contactForm.reset();
            
            // Show success modal
            showSuccessModal();
        }, 1500);
    });
    
    // Modal Functions
    function showSuccessModal() {
        successModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    function hideSuccessModal() {
        successModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    // Modal Event Listeners
    modalClose.addEventListener('click', hideSuccessModal);
    
    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            hideSuccessModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !successModal.classList.contains('hidden')) {
            hideSuccessModal();
        }
    });
    
    // Enhanced Link Interactions
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a subtle feedback effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Intersection Observer for Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards for animation
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Theme Detection and Handling
    function handleThemeChange() {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        updateNavbarBackground();
        
        // Update any theme-dependent elements
        if (isDark) {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
        } else {
            document.documentElement.setAttribute('data-color-scheme', 'light');
        }
    }
    
    // Listen for theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener(handleThemeChange);
        handleThemeChange(); // Initial call
    }
    
    // Utility Functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Debounced scroll handler for better performance
    const debouncedScrollHandler = debounce(() => {
        updateActiveNavLink();
        updateNavbarBackground();
    }, 10);
    
    // Replace the regular scroll listener with debounced version
    window.removeEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbarBackground();
    });
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Form Input Enhancement
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        // Add focus and blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value.trim() !== '') {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
        
        // Check initial values
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('has-value');
        }
    });
    
    // Enhanced Button Interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Preload External Links
    const linkPreloader = document.createElement('link');
    linkPreloader.rel = 'dns-prefetch';
    linkPreloader.href = '//drive.google.com';
    document.head.appendChild(linkPreloader);
    
    const githubPreloader = document.createElement('link');
    githubPreloader.rel = 'dns-prefetch';
    githubPreloader.href = '//github.com';
    document.head.appendChild(githubPreloader);
    
    // Console welcome message
    console.log('%c👋 Welcome to Arjun Sharma\'s Portfolio!', 'color: #2180bd; font-size: 16px; font-weight: bold;');
    console.log('%cBuilt with modern web technologies and ready for deployment on GitHub Pages.', 'color: #626c71; font-size: 12px;');
    console.log('%cFrom Assam, India 🇮🇳', 'color: #2180bd; font-size: 12px;');
});