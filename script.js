 document.addEventListener('DOMContentLoaded', function() {
            // Tab navigation functionality
            const tabs = document.querySelectorAll('.nav-tab');
            const sections = document.querySelectorAll('.service-section');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all tabs and sections
                    tabs.forEach(t => t.classList.remove('active'));
                    sections.forEach(s => s.classList.remove('active'));
                    
                    // Add active class to clicked tab and corresponding section
                    this.classList.add('active');
                    const sectionId = this.getAttribute('data-section');
                    document.getElementById(sectionId).classList.add('active');
                    
                    // Scroll to the section
                    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
                });
            });
            
            // Carousel functionality
            const carousels = document.querySelectorAll('.carousel');
            
            carousels.forEach(carousel => {
                const inner = carousel.querySelector('.carousel-inner');
                const items = carousel.querySelectorAll('.carousel-item');
                const prevBtn = carousel.querySelector('.prev');
                const nextBtn = carousel.querySelector('.next');
                
                let currentIndex = 0;
                const itemCount = items.length;
                
                function updateCarousel() {
                    inner.style.transform = `translateX(-${currentIndex * 100}%)`;
                }
                
                prevBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemCount - 1;
                    updateCarousel();
                });
                
                nextBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
                    updateCarousel();
                });
                
                // Auto-advance every 5 seconds
                setInterval(() => {
                    currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
                    updateCarousel();
                }, 5000);
            });
            
            // Quote Modal Functionality
            const quoteBtn = document.getElementById('quoteBtn');
            const quoteModal = document.getElementById('quoteModal');
            const closeModal = document.querySelector('.close-modal');
            const closeConfirmation = document.getElementById('closeConfirmation');
            const submitQuote = document.getElementById('submitQuote');
            const quoteForm = document.getElementById('quoteForm');
            const confirmationMessage = document.getElementById('confirmationMessage');
            
            // Open modal
            quoteBtn.addEventListener('click', () => {
                quoteModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
            
            // Close modal
            closeModal.addEventListener('click', () => {
                quoteModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // Close confirmation
            closeConfirmation.addEventListener('click', () => {
                quoteModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === quoteModal) {
                    quoteModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            
            // Seasonal default section logic
const month = new Date().getMonth(); 
// Jan = 0, Feb = 1, ... Dec = 11

let defaultSection = 'mowing';

if ([11, 0, 1].includes(month)) {
    // Dec, Jan, Feb
    defaultSection = 'snow';
} else if ([9, 10].includes(month)) {
    // Oct, Nov
    defaultSection = 'fall-cleanup';
}

// Clear existing active states
tabs.forEach(tab => tab.classList.remove('active'));
sections.forEach(section => section.classList.remove('active'));

// Activate correct tab + section
const activeTab = document.querySelector(`.nav-tab[data-section="${defaultSection}"]`);
const activeSection = document.getElementById(defaultSection);

if (activeTab && activeSection) {
    activeTab.classList.add('active');
    activeSection.classList.add('active');
    
    //activeSection.scrollIntoView({ behavior: 'smooth' });
}
            
            
            
            
            
            // Form submission
            submitQuote.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const address = document.getElementById('address').value;
                const details = document.getElementById('details').value;
                
                // Get selected services
                const serviceCheckboxes = document.querySelectorAll('.service-checkbox input:checked');
                const services = Array.from(serviceCheckboxes).map(cb => cb.value).join(', ');
                
                // Validate required fields
                if (!name || !email || !phone || !address) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                // Prepare email body
                const subject = `New Quote Request from ${name}`;
                const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Address: ${address}

Services Needed: ${services || 'None selected'}

Details:
${details || 'No details provided'}
                `;
                
                // Encode for mailto
                const encodedSubject = encodeURIComponent(subject);
                const encodedBody = encodeURIComponent(body);
                
                // Send email
                window.location.href = `mailto:treelanelawncare@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
                
                // Send SMS (using SMS gateway)
                const smsBody = encodeURIComponent(`New Quote Request:\nName: ${name}\nPhone: ${phone}\nServices: ${services || 'None'}`);
                window.open(`sms:17342608922?body=${smsBody}`, '_blank');
                
                // Show confirmation
                quoteForm.style.display = 'none';
                confirmationMessage.style.display = 'block';
            });
            
/* ---------------------------
       Mobile Compact Nav Logic
    ---------------------------- */
const nav = document.querySelector('nav');
    const navList = nav.querySelector('ul');
    const contactBar = document.querySelector('.contact-bar');
    const callBtn = document.querySelector('.call-btn');
    
    const collapsePoint = 300;
    let buttonsMoved = false;
    let lockedHeight = null;

    function lockNavHeight() {
        if (!lockedHeight) {
            lockedHeight = nav.offsetHeight;
            nav.style.minHeight = `${lockedHeight}px`;
        }
    }

    function unlockNavHeight() {
        nav.style.minHeight = '';
        lockedHeight = null;
    }

    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768 && window.scrollY > collapsePoint) {
            
            nav.classList.add('compact');
            lockNavHeight();

            if (!buttonsMoved) {
                nav.insertBefore(callBtn, navList);
                nav.insertBefore(quoteBtn, navList);
                buttonsMoved = true;
            }

        } else {
            nav.classList.remove('compact');
            unlockNavHeight();

            if (buttonsMoved) {
                contactBar.appendChild(callBtn);
                contactBar.appendChild(quoteBtn);
                buttonsMoved = false;
            }
        }
    });

        });