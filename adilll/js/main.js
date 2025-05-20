// Données du menu et des photos
const menuData = {
    entrees: [
        { nom: "Salade César", prix: "15 DH", description: "Laitue romaine, croûtons, parmesan, sauce césar", image: "images/food/salade-cesar.jpg" },
        { nom: "Soupe du jour", prix: "30 DH", description: "Préparée avec des légumes frais de saison", image: "images/food/soupe.jpg" },
        { nom: "Carpaccio de bœuf", prix: "70 DH", description: "Fines tranches de bœuf, copeaux de parmesan, roquette", image: "images/food/carpaccio.jpg" }
    ],
    plats: [
        { nom: "Filet de saumon grillé", prix: "124 DH", description: "Accompagné de légumes de saison", image: "images/food/saumon.jpg" },
        { nom: "Entrecôte", prix: "100 DH", description: "Sauce au choix, frites maison", image: "images/food/entrecote.jpg" },
        { nom: "Risotto aux champignons", prix: "60 DH", description: "Champignons sauvages, parmesan", image: "images/food/risotto.jpg" }
    ],
    desserts: [
        { nom: "Tiramisu maison", prix: "30 DH", description: "Recette traditionnelle italienne", image: "images/food/tiramisu.jpg" },
        { nom: "Crème brûlée", prix: "40 DH", description: "À la vanille de Madagascar", image: "images/food/creme-brulee.jpg" },
        { nom: "Fondant au chocolat", prix: "37 DH", description: "Cœur coulant, glace vanille", image: "images/food/fondant.jpg" }
    ]
};

// Images des galeries
const cafeImages = [
    { src: "images/cafe1.jpg", alt: "Intérieur du café" },
    { src: "images/cafe2.jpg", alt: "Sélection de pâtisseries" },
    { src: "images/cafe3.jpg", alt: "Service du café" }
];

const piscineImages = [
    { src: "images/piscine1.jpg", alt: "Vue de la piscine" },
    { src: "images/piscine2.jpg", alt: "Espace détente" },
    { src: "images/piscine3.jpg", alt: "Bassin principal" }
];

// Gestion du menu burger
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navMobile = document.querySelector('.nav-mobile');
    const navLinks = document.querySelectorAll('.nav-mobile a');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navMobile.classList.toggle('active');
        
        // Animation du burger
        const spans = burgerMenu.querySelectorAll('span');
        spans[0].style.transform = burgerMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
        spans[1].style.opacity = burgerMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = burgerMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : '';
    });

    // Fermer le menu mobile lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMobile.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });

    // Initialisation des galeries
    initGallery('cafe-gallery', cafeImages);
    initGallery('piscine-gallery', piscineImages);

    // Initialisation du menu restaurant
    initMenu();
    
    // Gestion du formulaire de contact
    initContactForm();
});

// Fonction pour initialiser les galeries
function initGallery(galleryId, images) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;

    images.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.alt = img.alt;
        imgElement.loading = "lazy";
        gallery.appendChild(imgElement);
    });
}

// Fonction pour initialiser le menu du restaurant
function initMenu() {
    const menuContent = document.getElementById('menu-content');
    const menuButtons = document.querySelectorAll('.menu-btn');
    const foodGallery = document.getElementById('food-gallery');

    // Afficher les entrées par défaut
    displayMenuItems('entrees');
    displayFoodGallery('entrees');

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            menuButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayMenuItems(category);
            displayFoodGallery(category);
        });
    });
}

// Fonction pour afficher les éléments du menu
function displayMenuItems(category) {
    const menuContent = document.getElementById('menu-content');
    menuContent.innerHTML = '';

    menuData[category].forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <h3>${item.nom}</h3>
            <p class="price">${item.prix}</p>
            <p class="description">${item.description}</p>
        `;
        menuContent.appendChild(menuItem);
    });
}

// Fonction pour afficher la galerie de photos
function displayFoodGallery(category) {
    const galleries = document.querySelectorAll('.gallery-category');
    galleries.forEach(gallery => gallery.classList.remove('active'));

    const targetGallery = document.getElementById(`gallery-${category}`);
    targetGallery.classList.add('active');
    targetGallery.innerHTML = '';

    menuData[category].forEach(item => {
        const foodImage = document.createElement('div');
        foodImage.className = 'food-image';
        foodImage.innerHTML = `
            <img src="${item.image}" alt="${item.nom}" loading="lazy">
            <div class="caption">
                <h4>${item.nom}</h4>
                <p>${item.prix}</p>
            </div>
        `;
        targetGallery.appendChild(foodImage);
    });
}

// Fonction pour gérer le formulaire de contact
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;

        // Simulation d'envoi (à remplacer par un vrai backend)
        alert('Message envoyé ! Nous vous contacterons bientôt.');
        form.reset();
    });
}

// Animation au scroll
const sections = document.querySelectorAll('.section');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});
