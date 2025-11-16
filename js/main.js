// ===================================
// Premium Portfolio - Main JavaScript
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // 1. Navigation
    // ===================================
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('.section, .hero');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===================================
    // 2. Smooth Scrolling
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // 3. Scroll Reveal Animation
    // ===================================
    const revealElements = document.querySelectorAll('.service-card, .project-card, .skill-item');
    
    function reveal() {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('reveal', 'active');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
    
    // ===================================
    // 4. Counter Animation (About Stats)
    // ===================================
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
        
        countersAnimated = true;
    }
    
    // Trigger counter animation when about section is in view
    const aboutSection = document.getElementById('about');
    
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(aboutSection);
    }
    
    // ===================================
    // 5. Projects Modal
    // ===================================
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const viewProjectButtons = document.querySelectorAll('.btn-view-project');
    
    // Project data
    const projectsData = {
        1: {
            category: 'E-commerce',
            title: 'Luxury Fashion Boutique',
            description: 'A sophisticated e-commerce platform designed for a high-end fashion brand. Features include immersive product galleries with zoom functionality, personalized recommendations powered by AI, seamless checkout with multiple payment options, and real-time inventory management. The platform combines elegant aesthetics with cutting-edge technology to deliver an exceptional shopping experience that mirrors the luxury of in-store boutique shopping.',
            client: 'Fashion Elite Ltd.',
            year: '2024',
            role: 'Full Stack Developer & UI Designer',
            tags: ['React', 'Node.js', 'Stripe', 'MongoDB', 'AWS'],
            image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop',
            liveLink: '#',
            githubLink: '#'
        },
        2: {
            category: 'Corporate',
            title: 'Tech Startup Hub',
            description: 'A dynamic corporate website built for a fast-growing technology startup. Integrated with a powerful CMS for easy content management, real-time collaboration tools for team communication, and an interactive product showcase. The design emphasizes innovation and forward-thinking while maintaining professional credibility. Features include automated blog publishing, team member profiles, investor relations portal, and career opportunities section.',
            client: 'InnovateTech Inc.',
            year: '2024',
            role: 'Lead Developer',
            tags: ['Vue.js', 'Firebase', 'Tailwind CSS', 'Nuxt.js'],
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
            liveLink: '#',
            githubLink: '#'
        },
        3: {
            category: 'Portfolio',
            title: 'Artist Showcase',
            description: 'An elegant portfolio website crafted for a renowned visual artist. Features stunning full-screen galleries with smooth transitions, detailed project case studies, interactive artwork exploration with WebGL effects, and an integrated shop for limited edition prints. The design puts the artwork front and center while providing an intuitive navigation experience. Includes artist biography, exhibition history, press coverage, and a newsletter subscription system.',
            client: 'Creative Artist Studio',
            year: '2023',
            role: 'Creative Developer',
            tags: ['HTML5', 'GSAP', 'WebGL', 'Three.js', 'CSS3'],
            image: 'https://images.unsplash.com/photo-1501959915551-4e8d30928317?q=80&w=2069&auto=format&fit=crop',
            liveLink: '#',
            githubLink: '#'
        },
        4: {
            category: 'Dashboard',
            title: 'Analytics Platform',
            description: 'A comprehensive data visualization dashboard for business intelligence and analytics. Features real-time data processing, interactive charts and graphs powered by D3.js, customizable widgets, multi-user collaboration, and automated report generation. The platform handles millions of data points with smooth performance, offering insights through beautiful visualizations. Includes predictive analytics, data export functionality, and integration with major business tools.',
            client: 'DataViz Solutions',
            year: '2024',
            role: 'Senior Frontend Developer',
            tags: ['Angular', 'D3.js', 'MongoDB', 'Express', 'Socket.io'],
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
            liveLink: '#',
            githubLink: '#'
        },
        5: {
            category: 'Mobile',
            title: 'Fitness Tracker App',
            description: 'A progressive web app designed for fitness enthusiasts to track workouts, nutrition, and health metrics. Features include personalized workout plans, social sharing capabilities, achievement badges, integration with wearable devices, and offline functionality. The app uses machine learning to provide personalized recommendations and adapts to user progress over time. Includes community challenges, trainer connections, and comprehensive analytics dashboard.',
            client: 'FitLife Technologies',
            year: '2023',
            role: 'PWA Specialist',
            tags: ['PWA', 'TypeScript', 'GraphQL', 'Service Workers', 'IndexedDB'],
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
            liveLink: '#',
            githubLink: '#'
        },
        6: {
            category: 'Branding',
            title: 'Restaurant Rebrand',
            description: 'Complete digital transformation for an upscale restaurant chain. The project included a new visual identity, responsive website with online reservation system, menu management portal, and integration with third-party delivery services. Features tableside ordering capabilities, loyalty program integration, event booking system, and chef\'s table experiences. The design celebrates culinary artistry while making it easy for customers to discover, book, and enjoy exceptional dining experiences.',
            client: 'Gourmet Dining Group',
            year: '2024',
            role: 'Brand & Web Developer',
            tags: ['Next.js', 'Sanity CMS', 'Vercel', 'Stripe', 'OpenTable API'],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
            liveLink: '#',
            githubLink: '#'
        }
    };
    
    // Open modal
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectsData[projectId];
            
            if (project) {
                document.getElementById('modalCategory').textContent = project.category;
                document.getElementById('modalTitle').textContent = project.title;
                document.getElementById('modalDescription').textContent = project.description;
                document.getElementById('modalClient').textContent = project.client;
                document.getElementById('modalYear').textContent = project.year;
                document.getElementById('modalRole').textContent = project.role;
                document.getElementById('modalImage').src = project.image;
                document.getElementById('modalLiveLink').href = project.liveLink;
                document.getElementById('modalGithubLink').href = project.githubLink;
                
                const tagsContainer = document.getElementById('modalTags');
                tagsContainer.innerHTML = '';
                project.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.textContent = tag;
                    tagsContainer.appendChild(tagSpan);
                });
                
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    function closeModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    modalClose.addEventListener('click', closeModal);
    
    document.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // ===================================
    // 6. Testimonials Carousel
    // ===================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('testimonialDots');
    
    let currentTestimonial = 0;
    
    // Create dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    function goToTestimonial(index) {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }
    
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(nextTestimonial, 5000);
    
    // Pause auto-rotate on hover
    const testimonialCarousel = document.querySelector('.testimonials-carousel');
    testimonialCarousel.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialCarousel.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
    
    // ===================================
    // 7. Skills Section
    // ===================================
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillGroups = document.querySelectorAll('.skill-group');
    
    skillCategories.forEach(category => {
        category.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Update active category
            skillCategories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding skill group
            skillGroups.forEach(group => {
                group.classList.remove('active');
                if (group.getAttribute('data-group') === targetCategory) {
                    group.classList.add('active');
                    
                    // Animate skill bars
                    const skillBars = group.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        bar.style.setProperty('--progress-width', progress + '%');
                        setTimeout(() => {
                            bar.classList.add('animated');
                        }, 100);
                    });
                }
            });
        });
    });
    
    // Trigger initial skill bar animation when skills section is in view
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeGroup = document.querySelector('.skill-group.active');
                    if (activeGroup) {
                        const skillBars = activeGroup.querySelectorAll('.skill-progress');
                        skillBars.forEach(bar => {
                            const progress = bar.getAttribute('data-progress');
                            bar.style.setProperty('--progress-width', progress + '%');
                            setTimeout(() => {
                                bar.classList.add('animated');
                            }, 100);
                        });
                    }
                    skillObserver.unobserve(skillsSection);
                }
            });
        }, { threshold: 0.3 });
        
        skillObserver.observe(skillsSection);
    }
    
    // ===================================
    // 8. Contact Form Validation & Submission
    // ===================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => group.classList.remove('error'));
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            } else if (name.length < 2) {
                showError('name', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                showError('email', 'Please enter your email');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate subject
            if (subject === '') {
                showError('subject', 'Please enter a subject');
                isValid = false;
            } else if (subject.length < 5) {
                showError('subject', 'Subject must be at least 5 characters');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('message', 'Please enter your message');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.btn-submit');
                submitBtn.classList.add('loading');
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    showFormMessage('success', 'Thank you for your message! I\'ll get back to you soon.');
                    contactForm.reset();
                }, 2000);
            }
        });
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        errorMessage.textContent = message;
    }
    
    function showFormMessage(type, message) {
        const formMessage = document.querySelector('.form-message');
        formMessage.className = `form-message ${type}`;
        formMessage.textContent = message;
        
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    }
    
    // ===================================
    // 9. Back to Top Button
    // ===================================
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===================================
    // 10. Newsletter Form
    // ===================================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                // Simulate newsletter subscription
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // ===================================
    // 11. Performance Optimizations
    // ===================================
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===================================
    // 12. Accessibility Enhancements
    // ===================================
    
    // Add keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (projectModal.classList.contains('active')) {
            if (e.key === 'Tab') {
                // Keep focus within modal
                const focusableElements = projectModal.querySelectorAll(
                    'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
    
    // ===================================
    // 13. Initialize All Components
    // ===================================
    console.log('Portfolio initialized successfully! ✨');
});
