document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu on link click
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }


    // --- Achievement Counter Animation ---
    const counters = document.querySelectorAll('.counter-val');
    const speed = 200; // The lower the number, the faster the count

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const updateCount = () => {
            // Determine a safe increment step
            const increment = target / speed;
            if (count < target) {
                // Use Math.ceil to ensure it eventually hits the target without huge jumps
                count = Math.ceil(count + increment); 
                counter.innerText = count.toLocaleString(); // Use toLocaleString for number formatting if needed
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    };

    // Intersection Observer to trigger counter when visible
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

        counters.forEach(counter => {
            observer.observe(counter);
        });
    } else {
        // Fallback for non-supporting browsers: immediately set the final value
        counters.forEach(counter => {
            counter.innerText = counter.getAttribute('data-target').toLocaleString();
        });
    }

    // --- Contact Form Submission (Frontend only - POST to placeholder API) ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formMessage.className = 'form-message-style text-cf-dark font-semibold';
            formMessage.innerHTML = 'Sending...';

            // Data to be sent
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
            };

            // Simulating API call with a 1-second delay
            try {
                // **NOTE:** Since this is a placeholder URL ('http://localhost:5000/api/contact'),
                // the `fetch` will likely fail unless a local server is running.
                // For a more robust frontend-only simulation, we can use a setTimeout here.
                
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

                // Simulate a successful response
                const simulatedSuccess = true;

                if (simulatedSuccess) {
                    formMessage.style.color = '#059669'; // green-600
                    formMessage.innerText = '✅ Message sent successfully! We will get back to you soon.';
                    contactForm.reset();
                } else {
                    // Simulate a failed response
                    formMessage.style.color = '#dc2626'; // red-600
                    formMessage.innerText = '❌ Error: Failed to submit. (Simulated Failure)';
                }

            } catch (error) {
                // This catch block handles actual network errors (e.g., if localhost:5000 isn't running)
                formMessage.style.color = '#dc2626'; // red-600
                formMessage.innerText = '❌ Network error. Ensure the backend is running on port 5000, or check the simulated logic.';
            }
        });
    }
});