/**
 * Portfolio Main JavaScript
 * Optimized and enhanced with modern features
 */

document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    // Mobile Navigation Toggle
    const toggleMobileMenu = () => {
        const isExpanded = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
        document.body.style.overflow = isExpanded ? 'hidden' : '';
        
        // Animate nav items
        navItems.forEach((item, index) => {
            if (item.style.animation) {
                item.style.animation = '';
            } else {
                item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        hamburger.classList.toggle('active');
    };

    // Close mobile menu when clicking outside
    const closeMobileMenu = (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    };

    // Smooth scrolling with offset for fixed header
    const scrollToSection = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    };

    // Add scroll event for header shadow
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(255, 255, 255, 0.9)';
        }
        
        // Update active section in navigation
        updateActiveSection();
    };

    // Update active navigation link based on scroll position
    const updateActiveSection = () => {
        const scrollPosition = window.scrollY + 200;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    // Initialize animations with Intersection Observer
    const initAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with data-animate attribute
        document.querySelectorAll('[data-animate]').forEach(element => {
            observer.observe(element);
        });
    };

    // Initialize event listeners
    const init = () => {
        // Mobile menu toggle
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking on nav links
        navItems.forEach(link => {
            link.addEventListener('click', (e) => {
                scrollToSection(e);
                if (navLinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', closeMobileMenu);
        
        // Handle scroll events
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initialize animations
        initAnimations();
        
        // Initial scroll position check
        handleScroll();
    };

    // Initialize the application
    init();
});

// Add shadow to navbar on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formValues);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill, .project-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelectorAll('.skill');
    const projects = document.querySelectorAll('.project-card');
    
    // Set initial state
    skills.forEach(skill => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(20px)';
        skill.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    projects.forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(20px)';
        project.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animations on load
    setTimeout(() => {
        animateOnScroll();
    }, 500);
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Add active class to current section in navigation
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});
