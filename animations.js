// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Prevent multiple initialization
let animationsInitialized = false;

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (!animationsInitialized) {
        animationsInitialized = true;
        initializeAnimations();
    }
});

function initializeAnimations() {
    // Hero typing animation - disabled due to looping issue
    // initHeroTyping();
    
    // Simple hero fade-in instead
    initSimpleHero();
    
    // Scroll-triggered animations
    initScrollAnimations();
    
    // Advanced hover effects
    initHoverEffects();
    
    // Smooth scrolling navigation
    initSmoothScrolling();
    
    // Floating particles background
    initFloatingParticles();
    
    // Loading animations
    initLoadingAnimations();
    
    // Micro-interactions
    initMicroInteractions();
}

// Simple hero animation without typing
function initSimpleHero() {
    const heroElements = document.querySelectorAll('.hero h1, .hero-subtitle, .hero-description, .hero-cta');
    
    // Initial animation on page load
    gsap.fromTo(heroElements, 
        { opacity: 0, y: 30 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        }
    );
    
    // Re-animation when scrolling back to top
    ScrollTrigger.create({
        trigger: '.hero',
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
            gsap.fromTo(heroElements, 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1,
                    stagger: 0.2,
                    ease: "power2.out"
                }
            );
        },
        onLeave: () => {
            gsap.to(heroElements, { opacity: 0, y: -30, duration: 0.5, stagger: 0.1 });
        },
        onEnterBack: () => {
            gsap.fromTo(heroElements, 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1,
                    stagger: 0.2,
                    ease: "power2.out"
                }
            );
        },
        onLeaveBack: () => {
            gsap.to(heroElements, { opacity: 0, y: 30, duration: 0.5, stagger: 0.1 });
        }
    });
}

// Hero typing animation
function initHeroTyping() {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroCTA = document.querySelector('.hero-cta');
    
    // Check if already initialized
    if (heroTitle.dataset.typed === 'true') return;
    heroTitle.dataset.typed = 'true';
    
    // Hide elements initially
    gsap.set([heroSubtitle, heroDescription, heroCTA], { opacity: 0, y: 30 });
    
    // Create typing effect - only run once
    new Typed(heroTitle, {
        strings: ['Michael Cheers'],
        typeSpeed: 50,
        showCursor: false,
        loop: false,
        startDelay: 500,
        onComplete: function() {
            // Animate other hero elements after typing
            gsap.to([heroSubtitle, heroDescription, heroCTA], {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
        }
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    // Animate sections on scroll
    gsap.utils.toArray('.section').forEach(section => {
        gsap.fromTo(section, 
            { 
                opacity: 0, 
                y: 100 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Animate project cards with stagger
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                x: index % 2 === 0 ? -100 : 100,
                scale: 0.8
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Animate skills with stagger
    gsap.utils.toArray('.skill-category').forEach((skill, index) => {
        gsap.fromTo(skill,
            {
                opacity: 0,
                y: 50,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: skill,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Animate individual skill tags
    gsap.utils.toArray('.skill').forEach((tag, index) => {
        gsap.fromTo(tag,
            {
                opacity: 0,
                scale: 0,
                rotation: -180
            },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.5,
                delay: index * 0.05,
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                    trigger: tag.closest('.skill-category'),
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Animate stats with counter effect
    gsap.utils.toArray('.stat').forEach(stat => {
        const number = stat.querySelector('.stat-number');
        const originalText = number.textContent;
        
        gsap.fromTo(stat,
            {
                opacity: 0,
                scale: 0.5
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                    trigger: stat,
                    start: "top 90%",
                    onEnter: () => {
                        // Add pulse animation
                        gsap.to(number, {
                            scale: 1.2,
                            duration: 0.3,
                            yoyo: true,
                            repeat: 1,
                            ease: "power2.inOut"
                        });
                    }
                }
            }
        );
    });
}

// Advanced hover effects
function initHoverEffects() {
    // Project card hover effects
    gsap.utils.toArray('.project-card').forEach(card => {
        const image = card.querySelector('.project-image img');
        const title = card.querySelector('h3');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -15,
                boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                duration: 0.3,
                ease: "power2.out"
            });
            
            if (image) {
                gsap.to(image, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            gsap.to(title, {
                color: "#3b82f6",
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: "0 4px 25px rgba(0,0,0,0.1)",
                duration: 0.3,
                ease: "power2.out"
            });
            
            if (image) {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            gsap.to(title, {
                color: "#1f2937",
                duration: 0.3
            });
        });
    });
    
    // Button hover effects
    gsap.utils.toArray('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                y: -2,
                duration: 0.2,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                y: 0,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });
    
    // Skill tag hover effects
    gsap.utils.toArray('.skill').forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            gsap.to(skill, {
                scale: 1.1,
                y: -3,
                boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)",
                duration: 0.2,
                ease: "power2.out"
            });
        });
        
        skill.addEventListener('mouseleave', () => {
            gsap.to(skill, {
                scale: 1,
                y: 0,
                boxShadow: "none",
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });
}

// Smooth scrolling navigation
function initSmoothScrolling() {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Enhanced nav link highlighting
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    
    // Create scroll spy effect
    ScrollTrigger.batch(sections, {
        onEnter: (elements) => {
            const id = elements[0].id;
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${id}`) {
                    gsap.to(link, {
                        color: "#3b82f6",
                        scale: 1.1,
                        duration: 0.3
                    });
                } else {
                    gsap.to(link, {
                        color: "#4b5563",
                        scale: 1,
                        duration: 0.3
                    });
                }
            });
        },
        start: "top 50%",
        end: "bottom 50%"
    });
    
    // Add click animations to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Calculate offset to account for fixed navbar
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Button press effect
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        });
    });
}

// Floating particles background
function initFloatingParticles() {
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.innerHTML = `
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
        <div class="particle particle-4"></div>
        <div class="particle particle-5"></div>
        <div class="particle particle-6"></div>
    `;
    document.body.appendChild(particleContainer);
    
    // Animate particles
    gsap.utils.toArray('.particle').forEach((particle, index) => {
        gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1
        });
        
        gsap.to(particle, {
            x: `+=${Math.random() * 200 - 100}`,
            y: `+=${Math.random() * 200 - 100}`,
            rotation: 360,
            duration: Math.random() * 20 + 10,
            repeat: -1,
            yoyo: true,
            ease: "none"
        });
    });
}

// Loading animations
function initLoadingAnimations() {
    // Animate page elements on load
    gsap.fromTo('.navbar',
        { 
            y: -100, 
            opacity: 0 
        },
        { 
            y: 0, 
            opacity: 1, 
            duration: 1,
            ease: "power2.out"
        }
    );
    
    // Progressive enhancement for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            // Image already loaded
            gsap.set(img, { opacity: 1 });
        } else {
            // Image still loading
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                gsap.to(this, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        }
    });
}

// Micro-interactions
function initMicroInteractions() {
    // Add ripple effect to clickable elements
    const clickables = document.querySelectorAll('.btn-primary, .btn-secondary, .project-image a');
    
    clickables.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            gsap.fromTo(ripple,
                {
                    scale: 0,
                    opacity: 0.6
                },
                {
                    scale: 4,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    onComplete: () => ripple.remove()
                }
            );
        });
    });
    
    // Parallax effect on scroll
    gsap.to('.hero::before', {
        y: -100,
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
    
    // Text reveal animations
    gsap.utils.toArray('.section h2').forEach(heading => {
        gsap.fromTo(heading,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: heading,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
}

// Utility function for random animations
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// Performance optimization
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
    }
}