const burgerBtn = document.getElementById('burger-btn');
const burgerMenu = document.getElementById('burger-menu');
const closeMenuBtn = document.getElementById('close-menu-btn');
const navItems = document.querySelectorAll('.nav-item');
const body = document.querySelector('body');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const header = document.querySelector('header');

burgerBtn.addEventListener('click', () => {
    const isExpanded = burgerMenu.classList.contains('open');
    burgerMenu.classList.toggle('open');
    body.classList.toggle('menu-open');
    burgerBtn.setAttribute('aria-expanded', !isExpanded);
});

closeMenuBtn.addEventListener('click', () => {
    burgerMenu.classList.remove('open');
    body.classList.remove('menu-open');
    burgerBtn.setAttribute('aria-expanded', false);
});

document.addEventListener('click', (event) => {
    if (burgerMenu.classList.contains('open') && !burgerMenu.contains(event.target) && event.target !== burgerBtn) {
        burgerMenu.classList.remove('open');
        body.classList.remove('menu-open');
        burgerBtn.setAttribute('aria-expanded', false);
    }
});

navItems.forEach(item => {
    const subMenu = item.querySelector('.sub-menu');
    if (subMenu) {
        item.addEventListener('mouseenter', () => {
            subMenu.style.display = 'flex'; // Ou 'block' selon votre CSS
        });

        item.addEventListener('mouseleave', (event) => {
            // Vérifie si la souris n'est plus sur l'élément parent OU sur le sous-menu
            if (!item.contains(event.relatedTarget) && !subMenu.contains(event.relatedTarget)) {
                subMenu.style.display = 'none';
            }
        });

        subMenu.addEventListener('mouseenter', () => {
            subMenu.style.display = 'flex'; // Garde le sous-menu ouvert si la souris est dessus
        });

        subMenu.addEventListener('mouseleave', (event) => {
            // Vérifie si la souris quitte le sous-menu
            if (!item.contains(event.relatedTarget)) {
                subMenu.style.display = 'none';
            }
        });
    }
});

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
        alert(`Recherche pour : ${searchTerm}`);
    } else {
        alert("Veuillez entrer un terme de recherche.");
    }
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

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

    // Si l'utilisateur a défilé plus de 50px (valeur à ajuster selon la hauteur de votre header initial)
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}

// Écouteur d'événement pour le défilement
window.addEventListener('scroll', handleScroll);

// Exécute la fonction au chargement pour le cas où la page est déjà scrollée
handleScroll();
