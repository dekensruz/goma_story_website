// Chargement de la carte interactive et initialisation du carousel
document.addEventListener('DOMContentLoaded', function () {
    // Configuration du carousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let autoSlideInterval;

    // Création des points de navigation
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Fonction pour mettre à jour le carousel
// Activer l'affichage des légendes pour la slide active
function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.carousel-slide').forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

    // Fonction pour aller à une slide spécifique
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    // Fonction pour passer à la slide suivante
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    // Fonction pour revenir à la slide précédente
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    // Événements des boutons
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Défilement automatique
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Démarrer le défilement automatique
    startAutoSlide();

    // Arrêter le défilement automatique au survol
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);

    // Initialisation de la carte Leaflet
    const map = L.map('map').setView([-1.6777, 29.2389], 12); // Coordonnées de Goma

    // Ajout de la couche OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Exemple de marqueur pour Goma
    L.marker([-1.6777, 29.2389], {
        icon: L.icon({
            iconUrl: 'assets/images/marker-icon.png', // Remplacez par votre icône de marqueur
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
        })
    }).bindPopup('Goma, RDC').addTo(map);

    // Données historiques de Goma
    const histoireGoma = [
        {
            annee: '1906',
            titre: 'Fondation de Goma',
            description: 'Établissement du premier poste administratif colonial à Goma.'
        },
        {
            annee: '1977',
            titre: 'Développement Urbain',
            description: 'Expansion majeure de la ville et développement des infrastructures.'
        },
        {
            annee: '2002',
            titre: 'Première éruption volcanique du Nyiragongo',
            description: 'La ville démontre sa résilience face à une catastrophe naturelle majeure.'
        },
        {
            annee: '2012',
            titre: 'Première prise de la ville par les M23',
            description: 'La ville a été prise par les rebelles du M23 mais ils ont été ensuite chassés par les forces armées du pays, les FARDC.'
        },
        {
            annee: '2021',
            titre: 'Deuxième éruption volcanique du Nyiragongo',
            description: 'Goma a encore fait face à une deuxième éruption volcanique du Nyiragongo.'
        },
        {
            annee: '2025',
            titre: 'Goma Aujourd\'hui',
            description: 'Une ville dynamique, centre économique et culturel important de la région, mais contrôlée par les rebelles du M23.'
        }
    ];

    // Affichage de la chronologie
    const timelineContainer = document.querySelector('.timeline-container');
    histoireGoma.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'timeline-event';
        eventElement.innerHTML = `
            <div class="timeline-date">${event.annee}</div>
            <div class="timeline-content">
                <h3>${event.titre}</h3>
                <p>${event.description}</p>
            </div>
        `;
        timelineContainer.appendChild(eventElement);
    });

    // Données culturelles
    const cultureGoma = [
        {
            titre: 'Art et Artisanat',
            description: 'Découvrez les talents locaux et l\'artisanat traditionnel de Goma.',
            image: 'art_goma.jpg'
        }
    ];

    // Affichage du contenu culturel
    const cultureGrid = document.querySelector('.culture-grid');
    cultureGoma.forEach(item => {
        const cultureElement = document.createElement('div');
        cultureElement.className = 'culture-item';
        cultureElement.innerHTML = `
            <img src="assets/images/${item.image}" alt="${item.titre}" loading="lazy">
            <h3>${item.titre}</h3>
            <p>${item.description}</p>
        `;
        cultureGrid.appendChild(cultureElement);
    });

    // Attractions naturelles
    const attractionsNaturelles = [
        {
            nom: 'Volcan Nyiragongo',
            description: 'Un des volcans les plus actifs d\'Afrique, offrant une vue spectaculaire.',
            image: 'volcan.jpg'
        }
    ];

    // Affichage des attractions naturelles
    const natureShowcase = document.querySelector('.nature-showcase');
    attractionsNaturelles.forEach(attraction => {
        const attractionElement = document.createElement('div');
        attractionElement.className = 'nature-item';
        attractionElement.innerHTML = `
            <img src="assets/images/${attraction.image}" alt="${attraction.nom}" loading="lazy">
            <h3>${attraction.nom}</h3>
            <p>${attraction.description}</p>
        `;
        natureShowcase.appendChild(attractionElement);
    });

    // Actualités mises à jour
    const actualites = [
        {
            titre: 'Festival Culturel de Goma',
            contenu: 'Célébration de la diversité culturelle avec des artistes locaux...',
            date: '2024-01-20'
        },
        {
            titre: 'Développement Économique',
            contenu: 'Nouveaux projets de développement urbain en partenariat avec Eco Group...',
            date: '2024-01-19'
        }
    ];

    // Affichage des actualités
    const newsContainer = document.querySelector('.news-container');
    actualites.forEach(actualite => {
        const articleElement = document.createElement('article');
        articleElement.innerHTML = `
            <h3>${actualite.titre}</h3>
            <p>${actualite.contenu}</p>
            <small>${actualite.date}</small>
        `;
        newsContainer.appendChild(articleElement);
    });

    // Simulation des témoignages
    const temoignages = [
        {
            nom: 'Jean K.',
            message: 'La situation reste préoccupante, mais nous gardons espoir...',
            date: '2024-01-18'
        },
        {
            nom: 'Marie L.',
            message: 'Nous avons besoin de plus de soutien international...',
            date: '2024-01-17'
        }
    ];

    // Affichage des témoignages
    const testimonialsContainer = document.querySelector('.testimonials-container');
    temoignages.forEach(temoignage => {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = 'testimonial';
        testimonialElement.innerHTML = `
            <blockquote>${temoignage.message}</blockquote>
            <cite>- ${temoignage.nom}</cite>
            <small>${temoignage.date}</small>
        `;
        testimonialsContainer.appendChild(testimonialElement);
    });

    // Simulation des initiatives d'aide
    const initiatives = [
        {
            titre: 'Distribution de nourriture',
            description: 'Programme de distribution alimentaire dans les zones affectées...',
            organisation: 'ONG Aide Urgente'
        },
        {
            titre: 'Assistance médicale',
            description: 'Services médicaux mobiles pour les populations déplacées...',
            organisation: 'Médecins Sans Frontières'
        }
    ];

    // Affichage des initiatives d'aide
    const aidContainer = document.querySelector('.aid-initiatives');
    initiatives.forEach(initiative => {
        const initiativeElement = document.createElement('div');
        initiativeElement.className = 'initiative';
        initiativeElement.innerHTML = `
            <h3>${initiative.titre}</h3>
            <p>${initiative.description}</p>
            <small>Par ${initiative.organisation}</small>
        `;
        aidContainer.appendChild(initiativeElement);
    });

    // Configuration de la galerie multimédia
    const images = [
        'goma_rdc.jpeg',
        'guerre.jpeg',
        'guerre1.jpg',
        'guerre3.webp',
        'image5.avif',
        'deplace_guerre.jpg'
    ];

    const galleryContainer = document.querySelector('.gallery-container');
    images.forEach(image => {
        const imageElement = document.createElement('div');
        imageElement.className = 'gallery-item';
        imageElement.innerHTML = `
            <img src="assets/images/${image}" alt="Image de la situation à Goma" loading="lazy">
            <div class="gallery-overlay">
                <span>Voir plus</span>
            </div>
        `;
        galleryContainer.appendChild(imageElement);
    });

    // Lightbox pour la galerie
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `<img src="${imgSrc}" alt="Gallery Image">`;
            document.body.appendChild(lightbox);
            lightbox.addEventListener('click', () => lightbox.remove());
        });
    });
});

// Animation des légendes du carrousel
const carouselSlides = document.querySelectorAll('.carousel-slide');
// Captions are now always visible by default
// No need for mouseenter/mouseleave events
/*
carouselSlides.forEach(slide => {
    // Event listeners removed to keep captions always visible
});
*/