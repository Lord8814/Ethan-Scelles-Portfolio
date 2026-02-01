// Gestion des accordéons
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Fermer tous les accordéons
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Ouvrir l'accordéon cliqué s'il n'était pas actif
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });

    // Fonction de copie de code
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Empêcher la propagation au header de l'accordéon
            
            const codeBlock = this.closest('.code-block');
            const code = codeBlock.querySelector('code').textContent;
            
            // Copier dans le presse-papiers
            navigator.clipboard.writeText(code).then(() => {
                // Feedback visuel
                const originalText = this.textContent;
                this.textContent = 'Copié !';
                this.style.background = 'var(--accent-cyan)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = 'var(--purple-primary)';
                }, 2000);
            }).catch(err => {
                console.error('Erreur lors de la copie:', err);
                this.textContent = 'Erreur';
                setTimeout(() => {
                    this.textContent = 'Copier';
                }, 2000);
            });
        });
    });

    // Animation au scroll (fade-in pour les éléments)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes et sections
    const animatedElements = document.querySelectorAll(
        '.context-card, .realization-item, .result-card, .skill-card, .accordion-item, ' +
        '.mvc-card, .hierarchy-card, .viz-mode, .limit-card, .screenshot-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Smooth scroll pour les liens d'ancrage
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
});
