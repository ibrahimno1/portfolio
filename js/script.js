// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply the current theme
if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
} else {
    document.body.removeAttribute('data-theme');
    themeToggle.textContent = '🌙';
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animate sections on scroll
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Initialize EmailJS
(function() {
    emailjs.init("anVGljQxrlOtZcBvO");
})();

// Contact form functionality
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form elements
    const form = this;
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const successMsg = document.getElementById('success-message');
    const errorMsg = document.getElementById('error-message');

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    // Prepare email parameters
    const templateParams = {
        from_name: `${form.firstName.value} ${form.lastName.value}`,
        from_email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
        to_name: 'Ibrahim Ali',
    };

    // Send email using EmailJS
    emailjs.send('service_6fm08j6', 'template_id', templateParams)
        .then(function() {
            // Show success message
            successMsg.style.display = 'block';
            successMsg.classList.add('show');
            form.reset();
        })
        .catch(function(error) {
            // Show error message
            console.error('Email error:', error);
            errorMsg.style.display = 'block';
            errorMsg.classList.add('show');
        })
        .finally(function() {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
        });
}); 