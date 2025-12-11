// Typing Animation
const typingElement = document.querySelector('.typing');
const words = ['Data Scientist', 'AI Engineer', 'Python Developer', 'Data Analyst'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100; // Typing speed in milliseconds

type();

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Delete character
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster when deleting
    } else {
        // Type character
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentWord.length) {
        // Pause at end of word
        typeSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(type, typeSpeed);
}

// Animate stats counter
function animateCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the faster
    
    statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-count');
        const count = +stat.innerText;
        const increment = target / speed;
        
        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(animateCounter, 1);
        } else {
            stat.innerText = target;
        }
    });
}

// Start counter when scrolled to stats
function startCounterOnScroll() {
    const statsSection = document.querySelector('.hero-stats');
    const statsPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (statsPosition < screenPosition) {
        animateCounter();
        window.removeEventListener('scroll', startCounterOnScroll);
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize
window.addEventListener('load', () => {
    // Start counter if stats are in view on load
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (statsPosition < screenPosition) {
            animateCounter();
        } else {
            window.addEventListener('scroll', startCounterOnScroll);
        }
    }
});
