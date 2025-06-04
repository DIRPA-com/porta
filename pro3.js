 const burgerBtn = document.getElementById('burger-btn');
const burgerMenu = document.getElementById('burger-menu');
const closeMenuBtn = document.getElementById('close-menu-btn');
const navItems = document.querySelectorAll('.nav-item');
const body = document.querySelector('body');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const header = document.querySelector('header'); // Sélection de l'élément header

// Gestion de l'ouverture/fermeture du menu burger
burgerBtn.addEventListener('click', () => {
    const isExpanded = burgerMenu.classList.contains('open');
    burgerMenu.classList.toggle('open');
    body.classList.toggle('menu-open'); // Ajoute/retire la classe pour bloquer le scroll du body
    burgerBtn.setAttribute('aria-expanded', !isExpanded);
});

closeMenuBtn.addEventListener('click', () => {
    burgerMenu.classList.remove('open');
    body.classList.remove('menu-open');
    burgerBtn.setAttribute('aria-expanded', false);
});

// Fermer le menu burger si on clique en dehors
document.addEventListener('click', (event) => {
    if (burgerMenu.classList.contains('open') && !burgerMenu.contains(event.target) && event.target !== burgerBtn && !burgerBtn.contains(event.target)) {
        burgerMenu.classList.remove('open');
        body.classList.remove('menu-open');
        burgerBtn.setAttribute('aria-expanded', false);
    }
});

// Gestion des sous-menus (avec une légère modification pour les écrans tactiles)
navItems.forEach(item => {
    const subMenu = item.querySelector('.sub-menu');
    if (subMenu) {
        // Pour les écrans non tactiles (desktop), utilisez le hover
        if (!('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)) {
            item.addEventListener('mouseenter', () => {
                subMenu.style.display = 'flex';
            });
            item.addEventListener('mouseleave', (event) => {
                if (!item.contains(event.relatedTarget) && !subMenu.contains(event.relatedTarget)) {
                    subMenu.style.display = 'none';
                }
            });
            subMenu.addEventListener('mouseenter', () => {
                subMenu.style.display = 'flex';
            });
            subMenu.addEventListener('mouseleave', (event) => {
                if (!item.contains(event.relatedTarget)) {
                    subMenu.style.display = 'none';
                }
            });
        } else {
            // Pour les écrans tactiles, utilisez le clic pour toggle le sous-menu
            item.addEventListener('click', (event) => {
                // Empêche le comportement par défaut si le lien a un sous-menu
                if (event.target.tagName === 'A' && event.target.closest('.nav-item') === item) {
                    event.preventDefault(); // Empêche la navigation immédiate
                }

                // Ferme tous les autres sous-menus ouverts
                document.querySelectorAll('.sub-menu').forEach(otherSubMenu => {
                    if (otherSubMenu !== subMenu && otherSubMenu.style.display === 'flex') {
                        otherSubMenu.style.display = 'none';
                    }
                });

                // Toggle le sous-menu cliqué
                if (subMenu.style.display === 'flex') {
                    subMenu.style.display = 'none';
                } else {
                    subMenu.style.display = 'flex';
                }
            });
            // Pour fermer le sous-menu si on clique ailleurs sur l'écran
            document.addEventListener('click', (event) => {
                if (!item.contains(event.target) && subMenu.style.display === 'flex') {
                    subMenu.style.display = 'none';
                }
            });
        }
    }
});


// Gestion de la recherche
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
        alert(`Recherche pour : ${searchTerm}`);
        // Ici, vous intégreriez votre logique de recherche réelle
    } else {
        alert("Veuillez entrer un terme de recherche.");
    }
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

// Logique du slider d'images
const sliderContainer = document.querySelector('.fixed-size-slider-container');
const slider = document.querySelector('.fixed-size-slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slideCount = slides.length;
let currentIndex = 0;
let intervalTime = 3000; // Temps en millisecondes (3 secondes)
let slideInterval;

function goToSlide(index) {
    if (index < 0) {
        currentIndex = slideCount - 1;
    } else if (index >= slideCount) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    const translateX = -currentIndex * 100 + '%';
    slider.style.transform = `translateX(${translateX})`;
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

function startSlider() {
    slideInterval = setInterval(nextSlide, intervalTime);
}

function stopSlider() {
    clearInterval(slideInterval);
}

// Démarrer le slider automatiquement
startSlider();

// Mettre en pause au survol (optionnel)
sliderContainer.addEventListener('mouseenter', stopSlider);
sliderContainer.addEventListener('mouseleave', startSlider);


// --- Comportement du header au défilement ---
let lastScrollTop = 0; // Pour détecter la direction du scroll (pas strictement nécessaire ici, mais bonne pratique)

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Ajustez ce seuil en fonction de la hauteur initiale de votre header et de la hauteur que vous voulez qu'il atteigne avant de se réduire
    if (scrollTop > 100) { // Déclencheur après 100px de défilement
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Pour Mobile ou défilement négatif
}

// Écouteur d'événement pour le défilement
window.addEventListener('scroll', handleScroll);

// Exécute la fonction au chargement pour le cas où la page est déjà scrollée
handleScroll();
