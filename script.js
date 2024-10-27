// Loading overlay functionality
window.addEventListener('load', function() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('opacity-100', 'visible');
        loadingOverlay.classList.add('opacity-0', 'invisible');
    }
});

// tab function
function showTabContent(contentId) {
    document.querySelectorAll('.tab-content').forEach(function(content) {
        content.classList.add('hidden');
    });

    document.querySelectorAll('.tab').forEach(function(tab) {
        tab.classList.remove('active');
    });

    document.getElementById(contentId).classList.remove('hidden');

    event.target.closest('.tab').classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
    // Testimonial carousel functionality
    const testimonials = document.getElementById('testimonials');
    const testimonialContainer = document.getElementById('testimonial-container');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');

    if (testimonials && testimonialContainer && nextButton && prevButton) {
        let currentIndex = 0;
        const testimonialCount = testimonials.children.length;

        function updateTestimonials() {
            testimonials.style.transform = `translateX(-${currentIndex * testimonialContainer.clientWidth}px)`;
        }

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonialCount;
            updateTestimonials();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonialCount) % testimonialCount;
            updateTestimonials();
        });

        window.addEventListener('resize', updateTestimonials);
    }

    // Mobile menu toggle functionality
    const menuToggleButtons = document.getElementsByClassName('menu_toggle');
    const mobileMenuContent = document.getElementById('mobile_menu_content');
    let canToggle = true;

    if (menuToggleButtons && mobileMenuContent) {
        Array.from(menuToggleButtons).forEach(button => {
            button.addEventListener('click', () => {
                if (!canToggle) return;
                mobileMenuContent.classList.toggle('hidden');
                mobileMenuContent.classList.toggle('flex');

                canToggle = false;
                setTimeout(() => canToggle = true, 300);
            });
        });
    }

    // Menu with cooldown functionality
    const cooldowns = {};
    document.querySelectorAll('.menu-toggle').forEach(function (toggleLink) {
        toggleLink.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = toggleLink.getAttribute('data-target');
            const hiddenBlock = document.getElementById(targetId);

            if (!cooldowns[targetId]) cooldowns[targetId] = false;
            if (cooldowns[targetId]) return;

            hiddenBlock.classList.toggle('invisible');
            hiddenBlock.classList.toggle('h-0');
            hiddenBlock.classList.toggle('h-auto');
            hiddenBlock.classList.toggle('block');

            cooldowns[targetId] = true;
            setTimeout(() => cooldowns[targetId] = false, 600);
        });
    });

    // tab function
    function showTabContent(contentId) {
        document.querySelectorAll('.tab-content').forEach(function(content) {
            content.classList.add('hidden');
        });
        document.querySelectorAll('.tab').forEach(function(tab) {
            tab.classList.remove('active');
        });
        document.getElementById(contentId).classList.remove('hidden');
        event.target.closest('.tab').classList.add('active');
    }

    // Form validation
    const estimateForm = document.getElementById('estimateForm');
    if (estimateForm) {
        estimateForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const zipCode = document.getElementById('zipCode').value.trim();
            const message = document.getElementById('message').value.trim();

            const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            const phonePattern = /^(?:\\+?\\d{1,3}[- ]?)?(?:\\(\\d{1,4}\\)|\\d{1,4})?[- ]?\\d{1,4}[- ]?\\d{1,4}[- ]?\\d{1,9}$/;
            const zipPattern = /^\\d+$/;

            if (!fullName) return alert('Full Name is required.');
            if (!emailPattern.test(email)) return alert('Please enter a valid email address.');
            if (!phonePattern.test(phone)) return alert('Please enter a valid phone number.');
            if (!zipPattern.test(zipCode)) return alert('Please enter a valid Zip Code.');
            if (!message) return alert('Message is required.');

            estimateForm.submit();
        });
    }
});
