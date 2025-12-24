// ============================================
// MOBILE MENU TOGGLE
// ============================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// ============================================
// BUTTON CLICK HANDLERS
// ============================================

const ctaButtons = document.querySelectorAll('.btn-primary, .btn-dark, .nav-cta');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Prevent default if it's a link
        if (button.tagName === 'A') {
            return;
        }
        
        // Show alert or handle consultation request
        showConsultationModal();
    });
});

// ============================================
// CHAT BUTTON
// ============================================

const chatBtn = document.getElementById('chatBtn');

if (chatBtn) {
    chatBtn.addEventListener('click', () => {
        showChatModal();
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            return;
        }
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.concern-card, .instructor-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// ============================================
// COUNT UP STATS
// ============================================

const counters = document.querySelectorAll('.count-up');
const countOptions = { threshold: 0.4 };

function animateCount(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    let current = 0;
    const duration = 1600;
    const start = performance.now();

    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        current = Math.floor(target * progress);
        el.textContent = progress === 1 ? target.toLocaleString() : current.toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
        }
    });
}, countOptions);

counters.forEach(c => counterObserver.observe(c));

// ============================================
// MODAL FUNCTIONS
// ============================================

function showConsultationModal() {
    const modal = createModal(
        '상담 문의',
        '보컬 레슨에 관심이 있으신가요?<br>아래 정보를 입력해주세요.',
        [
            { type: 'text', placeholder: '이름', name: 'name' },
            { type: 'tel', placeholder: '전화번호', name: 'phone' },
            { type: 'email', placeholder: '이메일', name: 'email' },
            { type: 'textarea', placeholder: '문의 내용', name: 'message' }
        ]
    );
    
    document.body.appendChild(modal);
}

function showChatModal() {
    const modal = createModal(
        '채팅 상담',
        '하비보컬에 문의하세요!<br>빠르게 답변해드리겠습니다.',
        [
            { type: 'textarea', placeholder: '문의 내용을 입력해주세요...', name: 'chat' }
        ],
        true
    );
    
    document.body.appendChild(modal);
}

function createModal(title, description, fields = [], isChat = false) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${title}</h2>
            <p>${description}</p>
            <form class="modal-form">
                ${fields.map(field => {
                    if (field.type === 'textarea') {
                        return `<textarea name="${field.name}" placeholder="${field.placeholder}" rows="4" required></textarea>`;
                    }
                    return `<input type="${field.type}" name="${field.name}" placeholder="${field.placeholder}" required>`;
                }).join('')}
                <button type="submit" class="btn btn-primary">전송</button>
            </form>
        </div>
    `;
    
    // Add styles to modal
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background-color: #1a2332;
            border-radius: 1rem;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: #ffffff;
            font-size: 1.5rem;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.3s ease;
        }
        
        .modal-close:hover {
            color: #a855f7;
        }
        
        .modal-content h2 {
            color: #ffffff;
            margin-bottom: 0.5rem;
            font-size: 1.75rem;
        }
        
        .modal-content p {
            color: #b0b0b0;
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
        }
        
        .modal-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .modal-form input,
        .modal-form textarea {
            padding: 0.75rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 0.5rem;
            background-color: rgba(255, 255, 255, 0.05);
            color: #ffffff;
            font-size: 0.95rem;
            font-family: inherit;
            transition: all 0.3s ease;
        }
        
        .modal-form input::placeholder,
        .modal-form textarea::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }
        
        .modal-form input:focus,
        .modal-form textarea:focus {
            outline: none;
            border-color: #a855f7;
            background-color: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
        }
        
        .modal-form button {
            margin-top: 0.5rem;
        }
    `;
    document.head.appendChild(style);
    
    // Close modal functionality
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    
    const closeModal = () => {
        modal.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    // Handle form submission
    const form = modal.querySelector('.modal-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Log the data (in a real application, you would send this to a server)
        console.log('Form submitted:', data);
        
        // Show success message
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '전송되었습니다!';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            closeModal();
        }, 1500);
    });
    
    return modal;
}

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
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

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: #a855f7;
        border-bottom: 2px solid #a855f7;
        padding-bottom: 0.25rem;
    }
`;
document.head.appendChild(style);

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

window.addEventListener('load', () => {
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeIn 0.8s ease';
    }
});

const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(fadeInStyle);

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// INITIALIZATION
// ============================================

// ============================================
// CURRICULUM ACCORDION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('HAVY 보컬 웹사이트가 로드되었습니다.');
    
    // Curriculum accordion functionality
    const curriculumButtons = document.querySelectorAll('.curriculum-header-btn');
    
    curriculumButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const curriculumItem = button.closest('.curriculum-item');
            const isActive = curriculumItem.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.curriculum-item').forEach(item => {
                if (item !== curriculumItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                curriculumItem.classList.remove('active');
            } else {
                curriculumItem.classList.add('active');
            }
        });
    });
    
    // FAQ accordion functionality
    const faqButtons = document.querySelectorAll('.faq-header-btn');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const faqItem = button.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                faqItem.classList.remove('active');
            } else {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Inquiry form submission
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(inquiryForm);
            const data = Object.fromEntries(formData);
            
            // Log the data (in a real application, you would send this to a server)
            console.log('Inquiry submitted:', data);
            
            // Show success message
            const submitBtn = inquiryForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '문의가 접수되었습니다!';
            submitBtn.disabled = true;
            submitBtn.style.background = '#22c55e';
            
            // Reset form
            inquiryForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        });
    }
    
    // Kakao button click handler
    const kakaoBtn = document.getElementById('kakaoBtn');
    if (kakaoBtn) {
        kakaoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // 카카오톡 링크를 여기에 추가하세요
            // 예: window.open('카카오톡 링크', '_blank');
            alert('카카오톡 상담 링크를 추가해주세요.');
        });
    }
    
    // Top button
    const topBtn = document.getElementById('topBtn');
    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Phone button
    const phoneBtn = document.getElementById('phoneBtn');
    if (phoneBtn) {
        phoneBtn.addEventListener('click', () => {
            // 전화번호를 여기에 추가하세요
            window.location.href = 'tel:010-0000-0000';
        });
    }
    
    // Kakao fixed button
    const kakaoFixedBtn = document.getElementById('kakaoFixedBtn');
    if (kakaoFixedBtn) {
        kakaoFixedBtn.addEventListener('click', () => {
            // 카카오톡 링크를 여기에 추가하세요
            // 예: window.open('카카오톡 링크', '_blank');
            alert('카카오톡 상담 링크를 추가해주세요.');
        });
    }
});
