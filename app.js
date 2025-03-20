// Fichier JavaScript général pour les fonctionnalités communes à toutes les pages
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si la barre de progression existe déjà sur la page
    let progressBar = document.getElementById("myBar");
    
    // Si la barre de progression n'existe pas, la créer
    if (!progressBar) {
        // Créer le conteneur de la barre de progression
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        
        // Créer la barre de progression
        progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.id = 'myBar';
        
        // Ajouter la barre au conteneur
        progressContainer.appendChild(progressBar);
        
        // Ajouter le conteneur au début du body
        document.body.insertBefore(progressContainer, document.body.firstChild);
    }
    
    // Barre de progression pour le défilement
    window.onscroll = function() {
        // Calculer la position de défilement
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        // Calculer la hauteur totale de défilement (hauteur du document moins hauteur de la fenêtre)
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        // Calculer le pourcentage de défilement
        let scrolled = (winScroll / height) * 100;
        // Mettre à jour la largeur de la barre de progression
        document.getElementById("myBar").style.width = scrolled + "%";
    };
    
    // Ajouter le menu hamburger pour la navigation mobile
    const headerContent = document.querySelector('.header-content');
    const mainNav = document.querySelector('.main-nav');
    
    // Créer le bouton du menu hamburger s'il n'existe pas déjà
    if (!document.querySelector('.menu-toggle')) {
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        
        // Ajouter les trois barres du hamburger
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            menuToggle.appendChild(span);
        }
        
        // Insérer le bouton hamburger avant la navigation
        if (headerContent && mainNav) {
            headerContent.insertBefore(menuToggle, mainNav);
        }
        
        // Ajouter l'événement de clic pour le menu hamburger
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
    
    // Fermer le menu mobile lorsqu'un lien est cliqué
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const menuToggle = document.querySelector('.menu-toggle');
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    });
    
    // Fonctionnalités communes à toutes les pages
    
    // Animation du bouton de don
    const donateButton = document.querySelector('.donate-button');
    if (donateButton) {
        donateButton.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        donateButton.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
        
        donateButton.addEventListener('click', function() {
            alert('Merci pour votre soutien ! Vous allez être redirigé vers notre page de dons.');
        });
    }
    
    // Animation des liens sociaux dans le footer
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.classList.add('bounce');
        });
        
        link.addEventListener('mouseleave', function() {
            this.classList.remove('bounce');
        });
    });
    
    // La navbar n'est plus fixe, donc nous n'avons plus besoin de changer son apparence lors du défilement
});