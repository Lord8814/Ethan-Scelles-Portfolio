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

    // Lightbox pour les images
    createLightbox();
});

function createLightbox() {
    // Créer l'élément lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">‹</button>
            <button class="lightbox-next">›</button>
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Récupérer tous les screenshots cliquables
    const screenshots = document.querySelectorAll('.screenshot-item img');
    let currentIndex = 0;
    const screenshotsArray = Array.from(screenshots);

    // Fonction pour afficher l'image dans la lightbox
    function showLightbox(index) {
        currentIndex = index;
        const img = screenshotsArray[currentIndex];
        const caption = img.nextElementSibling?.textContent || '';
        
        lightbox.querySelector('.lightbox-image').src = img.src;
        lightbox.querySelector('.lightbox-caption').textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Fonction pour fermer la lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Fonction pour naviguer vers l'image précédente
    function showPrevious() {
        currentIndex = (currentIndex - 1 + screenshotsArray.length) % screenshotsArray.length;
        showLightbox(currentIndex);
    }

    // Fonction pour naviguer vers l'image suivante
    function showNext() {
        currentIndex = (currentIndex + 1) % screenshotsArray.length;
        showLightbox(currentIndex);
    }

    // Ajouter les événements de clic sur les images
    screenshots.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => showLightbox(index));
    });

    // Événements de fermeture
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Événements de navigation
    lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevious();
    });
    
    lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });

    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevious();
        if (e.key === 'ArrowRight') showNext();
    });
}
