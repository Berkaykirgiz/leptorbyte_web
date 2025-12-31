document.addEventListener('DOMContentLoaded', function() {
    
    // --- Mobile Menu ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            document.body.classList.toggle('no-scroll'); // Menü açılınca sayfa kaymasını engellemek için CSS'e eklenebilir
        });
    }

    // Linke tıklayınca menüyü kapat
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Smooth Scroll (Eski tarayıcılar için JS, yeniler için CSS scroll-behavior yetiyor ama garanti olsun) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Form Handling ---
    /*
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('button');
            const originalText = btn.innerText;
            
            // Loading efekti
            btn.innerText = 'Gönderiliyor...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            // Simüle edilmiş gönderim (Buraya kendi backend kodun veya Formspree vs. gelecek)
            setTimeout(() => {
                //alert('Mesajınız başarıyla alındı! En kısa sürede dönüş yapacağız.');
                this.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 1500);
        });
    }*/
    // --- Form Handling (Mailto Yöntemi) ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Sayfa yenilenmesini engelle
            
            // Form verilerini al
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Konu ve Mesaj Gövdesini Hazırla
            const subject = `LeptOrbyte İletişim: ${name}`;
            const body = `Gönderen Adı: ${name}\nGönderen E-posta: ${email}\n\nMesaj:\n${message}`;
            
            // Türkçe karakterleri link yapısına uygun hale getir (encode)
            const mailtoLink = `mailto:infoleptorbyte@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Kullanıcıya bilgi ver ve mail uygulamasını aç
            // alert('Mail uygulamanız açılıyor, lütfen açılan pencereden gönderi onaylayın.'); // İstersen bu uyarıyı açabilirsin
            window.location.href = mailtoLink;
            
            // Formu temizle
            this.reset();
        });
    }


    // --- Footer Year Update ---
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }

    // --- Intersection Observer for Animations (Fade-in elements on scroll) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Sadece bir kere animasyon oynasın
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.game-card, .section-title, .about-content, .contact-wrapper');
    animatedElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // CSS class'ı JS ile ekliyoruz ki style dosyasında kalabalık etmesin
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});