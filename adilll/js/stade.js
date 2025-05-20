// Images du stade
const stadeImages = [
    { src: "images/stade1.jpg", alt: "Vue du terrain de football" },
    { src: "images/stade2.jpg", alt: "Piste d'athlétisme" },

];

// Initialisation de la page
document.addEventListener('DOMContentLoaded', () => {
    // Initialisation de la galerie
    initGallery('stade-gallery', stadeImages);
    
    // Initialisation du calendrier
    initCalendar();
    
    // Initialisation des créneaux horaires
    initTimeSlots();
    
    // Gestion du formulaire de réservation
    initBookingForm();
});

// Gestion du calendrier
function initCalendar() {
    const calendar = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    
    let currentDate = new Date();
    let selectedDate = null;

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        currentMonthElement.textContent = new Date(year, month).toLocaleDateString('fr-FR', { 
            month: 'long', 
            year: 'numeric' 
        });

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        calendar.innerHTML = '';
        
        // En-têtes des jours
        const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day header';
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        });

        // Jours du mois précédent
        const firstDayIndex = (firstDay.getDay() + 6) % 7;
        for (let i = firstDayIndex; i > 0; i--) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day disabled';
            dayElement.textContent = new Date(year, month, 1 - i).getDate();
            calendar.appendChild(dayElement);
        }

        // Jours du mois actuel
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            const currentDay = new Date(year, month, day);
            if (currentDay < new Date().setHours(0,0,0,0)) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.addEventListener('click', () => selectDate(currentDay, dayElement));
            }
            
            calendar.appendChild(dayElement);
        }
    }

    function selectDate(date, element) {
        // Réinitialiser la sélection précédente
        const previousSelected = calendar.querySelector('.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }
        
        selectedDate = date;
        element.classList.add('selected');
        
        // Mettre à jour les créneaux horaires
        updateTimeSlots(date);
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Rendu initial du calendrier
    renderCalendar(currentDate);
}

// Gestion des créneaux horaires
function initTimeSlots() {
    const timeSlotsContainer = document.getElementById('timeSlots');
    
    function createTimeSlots() {
        const slots = [
            "09:00 - 10:00",
            "10:00 - 11:00",
            "11:00 - 12:00",
            "14:00 - 15:00",
            "15:00 - 16:00",
            "16:00 - 17:00",
            "17:00 - 18:00",
            "18:00 - 19:00",
            "19:00 - 20:00"
        ];

        timeSlotsContainer.innerHTML = '';
        slots.forEach(slot => {
            const slotElement = document.createElement('div');
            slotElement.className = 'time-slot';
            slotElement.textContent = slot;
            
            slotElement.addEventListener('click', () => {
                const previousSelected = timeSlotsContainer.querySelector('.selected');
                if (previousSelected) {
                    previousSelected.classList.remove('selected');
                }
                slotElement.classList.add('selected');
            });
            
            timeSlotsContainer.appendChild(slotElement);
        });
    }

    function updateTimeSlots(date) {
        // Ici, vous pourriez vérifier la disponibilité réelle des créneaux
        // en fonction de la date sélectionnée (via une API par exemple)
        createTimeSlots();
    }

    // Créneaux initiaux
    createTimeSlots();
}

// Gestion du formulaire de réservation
function initBookingForm() {
    const form = document.getElementById('bookingForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Vérifier si une date et un créneau sont sélectionnés
        const selectedDate = document.querySelector('.calendar-day.selected');
        const selectedSlot = document.querySelector('.time-slot.selected');
        
        if (!selectedDate || !selectedSlot) {
            alert('Veuillez sélectionner une date et un créneau horaire');
            return;
        }

        // Récupérer les données du formulaire
        const formData = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            activity: form.activity.value,
            participants: form.participants.value,
            date: selectedDate.textContent,
            timeSlot: selectedSlot.textContent
        };

        // Simulation d'envoi des données
        console.log('Réservation:', formData);
        alert('Réservation effectuée avec succès ! Vous recevrez un email de confirmation.');
        
        // Réinitialiser le formulaire
        form.reset();
        selectedDate.classList.remove('selected');
        selectedSlot.classList.remove('selected');
    });
}
