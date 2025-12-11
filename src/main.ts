// Portfolio main app controller
class Portfolio {
    private hamburger: HTMLElement | null;
    private navLinks: HTMLElement | null;
    private navItems: NodeListOf<HTMLAnchorElement>;
    private sections: NodeListOf<HTMLElement>;
    private contactForm: HTMLFormElement | null;
    private isMobileMenuOpen: boolean;
    private revealObserver: IntersectionObserver | null;

    constructor() {
        this.hamburger = document.querySelector<HTMLElement>('.hamburger');
        this.navLinks = document.querySelector<HTMLElement>('.nav-links');
        this.navItems = document.querySelectorAll<HTMLAnchorElement>('.nav-links a');
        this.sections = document.querySelectorAll<HTMLElement>('section[id]');
        this.contactForm = document.querySelector<HTMLFormElement>('#contact-form');
        this.isMobileMenuOpen = false;
        this.revealObserver = null;

        this.initializeEventListeners();
        this.initializeRevealAnimations();
        this.handleScroll(); // set initial nav + header state
    }

    // -----------------------------
    // Event bindings
    // -----------------------------
    private initializeEventListeners(): void {
        // Mobile navigation toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
            this.hamburger.setAttribute('aria-expanded', 'false');
            this.hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        }

        // Close mobile menu when clicking on nav links
        this.navItems.forEach(link => {
            link.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId && targetId !== '#') {
                    this.scrollToSection(targetId);
                }
                this.closeMobileMenu();
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;

            anchor.addEventListener('click', (e: Event) => {
                e.preventDefault();
                this.scrollToSection(href);
            });
        });

        // Header behavior + active nav on scroll
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

        // Contact form submit
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e: Event) => {
                e.preventDefault();
                if (this.contactForm) {
                    this.handleFormSubmit(e);
                }
            });
        }

        // On initial load, update things once more
        window.addEventListener('load', () => {
            this.handleScroll();
        });
    }

    // -----------------------------
    // Mobile navigation
    // -----------------------------
    private toggleMobileMenu(): void {
        if (!this.navLinks || !this.hamburger) return;

        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        const isExpanded = this.isMobileMenuOpen ? 'true' : 'false';
        
        this.navLinks.classList.toggle('active', this.isMobileMenuOpen);
        this.hamburger.classList.toggle('active', this.isMobileMenuOpen);
        this.hamburger.setAttribute('aria-expanded', isExpanded);

        // Lock/unlock scrolling when mobile menu open
        document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';

        // Animate nav items
        const navItems = this.navLinks.querySelectorAll<HTMLLIElement>('li');
        if (this.isMobileMenuOpen) {
            navItems.forEach((item, index) => {
                item.style.animation = `fadeIn 0.3s ease forwards ${index * 0.1}s`;
                item.setAttribute('tabindex', '0');
            });
            // Focus on first nav item when menu opens
            if (navItems.length > 0) {
                const firstNavItem = navItems[0].querySelector('a');
                firstNavItem?.focus();
            }
        } else {
            navItems.forEach(item => {
                item.style.animation = '';
                item.removeAttribute('tabindex');
            });
            // Return focus to hamburger button when menu closes
            this.hamburger.focus();
        }
    }

    private closeMobileMenu(): void {
        if (!this.navLinks || !this.hamburger || !this.isMobileMenuOpen) return;

        this.isMobileMenuOpen = false;
        this.navLinks.classList.remove('active');
        this.hamburger.classList.remove('active');
        this.hamburger.setAttribute('aria-expanded', 'false');

        // Re-enable scrolling
        document.body.style.overflow = '';

        // Remove tabindex from nav items
        const navItems = this.navLinks.querySelectorAll<HTMLLIElement>('li');
        navItems.forEach(item => {
            item.style.animation = '';
            item.removeAttribute('tabindex');
        });
    }

    // -----------------------------
    // Smooth scrolling
    // -----------------------------
    private scrollToSection(targetId: string): void {
        const targetElement = document.querySelector<HTMLElement>(targetId);
        if (!targetElement) return;

        // Close menu on mobile if open
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }

        // Calculate scroll position with offset for fixed header
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        // Smooth scroll to target
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Update URL without scroll jump
        if (history.pushState) {
            history.pushState(null, '', targetId);
        } else {
            window.location.hash = targetId;
        }
    }

    private handleAnchorClick(event: Event): void {
        event.preventDefault();
        const target = event.currentTarget as HTMLAnchorElement;
        const targetId = target.getAttribute('href');
        
        if (targetId && targetId !== '#') {
            this.scrollToSection(targetId);
        }
    }

    // -----------------------------
    // Scroll handling: header + active link
    // -----------------------------
    private handleScroll(): void {
        const header = document.querySelector<HTMLElement>('header');
        if (!header) return;

        // Add/remove shadow and change background on scroll
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.classList.add('scrolled');
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.classList.remove('scrolled');
        }

        // Update active section in navigation
        this.updateActiveSection();
    }

    private updateActiveSection(): void {
        if (!this.sections.length || !this.navItems.length) return;

        const scrollPosition = window.scrollY + 100; // Offset for header
        const headerHeight = 80; // Should match your header height
        const scrollOffset = scrollPosition + headerHeight;

        // Find the section in view
        let currentSectionId = '';
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollOffset >= sectionTop && scrollOffset < sectionTop + sectionHeight) {
                currentSectionId = section.id;
            }
        });

        // Update active state for navigation links
        this.navItems.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    // -----------------------------
    // Contact form
    // -----------------------------
    private handleFormSubmit(event: Event): void {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        if (!form) return;

        // Get form data
        const formData = new FormData(form);
        const formValues: Record<string, FormDataEntryValue> = {};
        
        // Convert FormData to plain object
        formData.forEach((value, key) => {
            formValues[key] = value;
        });

        // Basic form validation
        const requiredFields = ['name', 'email', 'message'];
        const missingFields = requiredFields.filter(field => !formValues[field]);

        if (missingFields.length > 0) {
            alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formValues.email as string)) {
            alert('Please enter a valid email address');
            return;
        }

        // In a real application, you would send the form data to a server here
        console.log('Contact form submitted:', formValues);

        // Show success message
        const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
        if (submitButton) {
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Simulate form submission
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                form.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 3000);
            }, 1000);
        } else {
            form.reset();
            alert('Thank you for your message! I will get back to you soon.');
        }
    }

    // -----------------------------
    // Reveal-on-scroll animations
    // -----------------------------
    private initializeRevealAnimations(): void {
        // Elements to animate when they come into view
        const animatedSelectors = [
            '.about-content',
            '.skill',
            '.project-card',
            '.experience-item',
            '.section-title',
            '.timeline-item',
            '.contact-info',
            '[data-animate]'
        ];

        const elements = document.querySelectorAll<HTMLElement>(animatedSelectors.join(', '));
        if (!elements.length) return;

        // Initialize elements in "not animated" state
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        // Use Intersection Observer for modern browsers
        if ('IntersectionObserver' in window) {
            const observerOptions: IntersectionObserverInit = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };

            const animate = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target as HTMLElement;
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                        observer.unobserve(element);
                    }
                });
            };

            this.revealObserver = new IntersectionObserver(animate, observerOptions);
            elements.forEach(el => this.revealObserver?.observe(el));
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }
}

// Initialize the portfolio app once DOM is ready
const initPortfolio = (): void => {
    try {
        const portfolio = new Portfolio();
        
        // Make portfolio instance available globally for debugging if needed
        (window as any).portfolio = portfolio;
        
        // Add loaded class to body when everything is ready
        document.body.classList.add('loaded');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
};

// Check if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    // DOMContentLoaded has already fired
    setTimeout(initPortfolio, 0);
}

// Export for modules if needed
export default Portfolio;
