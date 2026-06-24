document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // MOBILE NAV MENU TOGGLE
    // ==========================================================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Simple indicator rotation
        mobileMenuToggle.style.transform = navMenu.classList.contains('active') ? 'rotate(90deg)' : 'none';
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.style.transform = 'none';
        });
    });

    // ==========================================================================
    // LIGHT / DARK MODE THEME SYSTEM
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const body = document.body;

    // Load theme preference from localStorage or fallback to system dark-theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.className = prefersDark ? 'dark-theme' : 'light-theme';
    }
    updateThemeIcons();

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
        updateThemeIcons();
    });

    function updateThemeIcons() {
        if (body.classList.contains('dark-theme')) {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        } else {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    }

    // ==========================================================================
    // EXPERIENCE & EDUCATION TAB SWITCHER
    // ==========================================================================
    const tabExperience = document.getElementById('tab-experience');
    const tabEducation = document.getElementById('tab-education');
    const panelExperience = document.getElementById('tabpanel-experience');
    const panelEducation = document.getElementById('tabpanel-education');

    tabExperience.addEventListener('click', () => {
        tabExperience.classList.add('active');
        tabExperience.setAttribute('aria-selected', 'true');
        tabEducation.classList.remove('active');
        tabEducation.setAttribute('aria-selected', 'false');
        
        panelExperience.classList.add('active');
        panelEducation.classList.remove('active');
    });

    tabEducation.addEventListener('click', () => {
        tabEducation.classList.add('active');
        tabEducation.setAttribute('aria-selected', 'true');
        tabExperience.classList.remove('active');
        tabExperience.setAttribute('aria-selected', 'false');
        
        panelEducation.classList.add('active');
        panelExperience.classList.remove('active');
    });

    // ==========================================================================
    // CONTACT FORM — Formspree integration
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const submitBtn = document.getElementById('form-submit-btn');

    // TODO: Replace YOUR_FORMSPREE_ID below with your actual Formspree form ID
    // Sign up at https://formspree.io → New Form → copy the ID from the endpoint
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkologeq';

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (contactForm.checkValidity()) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Sending...';

                try {
                    const response = await fetch(FORMSPREE_ENDPOINT, {
                        method: 'POST',
                        body: new FormData(contactForm),
                        headers: { 'Accept': 'application/json' }
                    });

                    if (response.ok) {
                        contactForm.classList.add('hidden');
                        formSuccess.classList.remove('hidden');
                        contactForm.reset();
                    } else {
                        submitBtn.disabled = false;
                        submitBtn.innerText = 'Send Message';
                        alert('Something went wrong. Please email directly at patwal.rachna95@gmail.com');
                    }
                } catch (err) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'Send Message';
                    alert('Something went wrong. Please email directly at patwal.rachna95@gmail.com');
                }
            }
        });
    }
});
