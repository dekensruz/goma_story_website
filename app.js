// Chargement de la carte interactive et initialisation du carousel
document.addEventListener('DOMContentLoaded', function() {
    // Configuration du carousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    // Création des points de navigation
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Configuration du carousel
    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    // Événements des boutons
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Défilement automatique
    setInterval(nextSlide, 5000);

    // Initialisation de la carte Leaflet
    const map = L.map('map').setView([-1.6777, 29.2389], 12); // Coordonnées de Goma

    // Ajout de la couche OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Exemple de marqueur pour Goma
    L.marker([-1.6777, 29.2389])
        .bindPopup('Goma, RDC')
        .addTo(map);

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
            titre: 'Éruption du Nyiragongo',
            description: 'La ville démontre sa résilience face à une catastrophe naturelle majeure.'
        },
        {
            annee: '2024',
            titre: 'Goma Aujourd\'hui',
            description: 'Une ville dynamique, centre économique et culturel important de la région.'
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
            image: 'image4.jpeg'
        },
        {
            titre: 'Musique et Danse',
            description: 'La richesse des expressions culturelles à travers la musique et la danse.',
            image: 'image5.avif'
        },
        {
            titre: 'Gastronomie Locale',
            description: 'Savourez les délices culinaires uniques de la région.',
            image: 'image6.jpg'
        }
    ];

    // Affichage du contenu culturel
    const cultureGrid = document.querySelector('.culture-grid');
    cultureGoma.forEach(item => {
        const cultureElement = document.createElement('div');
        cultureElement.className = 'culture-item';
        cultureElement.innerHTML = `
            <img src="assets/images/${item.image}" alt="${item.titre}">
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
            image: 'image7.jpg'
        },
        {
            nom: 'Lac Kivu',
            description: 'Un joyau naturel aux eaux cristallines, bordant la ville.',
            image: 'image1.webp'
        },
        {
            nom: 'Parc des Virunga',
            description: 'Une biodiversité exceptionnelle aux portes de la ville.',
            image: 'image2.webp'
        }
    ];

    // Affichage des attractions naturelles
    const natureShowcase = document.querySelector('.nature-showcase');
    attractionsNaturelles.forEach(attraction => {
        const attractionElement = document.createElement('div');
        attractionElement.className = 'nature-item';
        attractionElement.innerHTML = `
            <img src="assets/images/${attraction.image}" alt="${attraction.nom}">
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
        'image1.webp',
        'image2.webp',
        'image3.jpg',
        'image4.jpeg',
        'image5.avif',
        'image6.jpg'
    ];

    const galleryContainer = document.querySelector('.gallery-container');
    images.forEach(image => {
        const imageElement = document.createElement('div');
        imageElement.className = 'gallery-item';
        imageElement.innerHTML = `
            <img src="assets/images/${image}" alt="Image de la situation à Goma">
            <div class="gallery-overlay">
                <span>Voir plus</span>
            </div>
        `;
        galleryContainer.appendChild(imageElement);
    });
});