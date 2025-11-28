// Load header and footer
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Mobile services submenu toggle
        const mobileServicesBtn = document.getElementById('mobile-services-btn');
        const mobileServicesMenu = document.getElementById('mobile-services-menu');
        const mobileServicesArrow = document.getElementById('mobile-services-arrow');
        if (mobileServicesBtn) {
            mobileServicesBtn.addEventListener('click', () => {
                mobileServicesMenu.classList.toggle('hidden');
                mobileServicesArrow.classList.toggle('rotate-180');
            });
        }

        // Close mobile menu when a link is clicked
        const mobileMenuLinks = mobileMenu.getElementsByTagName('a');
        for (let link of mobileMenuLinks) {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        }

        // Services dropdown with hover delay
        const servicesDropdown = document.querySelector('.group .absolute');
        const servicesGroup = document.querySelector('.group');
        let dropdownTimeout;

        if (servicesGroup && servicesDropdown) {
            servicesGroup.addEventListener('mouseenter', () => {
                clearTimeout(dropdownTimeout);
                servicesDropdown.classList.remove('hidden');
                servicesDropdown.classList.add('block', 'opacity-100', 'translate-y-0');
                servicesDropdown.classList.remove('opacity-0', '-translate-y-1');
            });

            servicesGroup.addEventListener('mouseleave', () => {
                dropdownTimeout = setTimeout(() => {
                    servicesDropdown.classList.add('hidden');
                    servicesDropdown.classList.remove('block', 'opacity-100', 'translate-y-0');
                    servicesDropdown.classList.add('opacity-0', '-translate-y-1');
                }, 200); // 200ms delay
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    })
    .catch(error => console.error('Error loading header:', error));

fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
        // Set current year in footer after it's loaded
        document.getElementById('year').textContent = new Date().getFullYear();
    })
    .catch(error => console.error('Error loading footer:', error));

// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) { // Reveal when element is 100px from bottom
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Initial check in case elements are already in view on load
revealOnScroll();