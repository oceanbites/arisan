function generateCalendar() {
        const grid = document.getElementById('calendarGrid');
        const title = document.getElementById('calendarTitle');

        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

        title.textContent = `${monthNames[currentMonth]} ${currentYear}`;

        grid.innerHTML = '';

        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            grid.appendChild(dayHeader);
        });

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const today = new Date();

        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day';
            grid.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.innerHTML = `<div style="font-weight: 600;">${day}</div>`;

            if (currentYear === today.getFullYear() &&
                currentMonth === today.getMonth() &&
                day === today.getDate()) {
                dayElement.classList.add('today');
            }

            const dateString =
                `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (events[dateString]) {
                dayElement.classList.add('has-event');
                events[dateString].forEach((event, index) => {
                    if (index < 2) { 
                        const eventDiv = document.createElement('div');
                        eventDiv.className = 'event-indicator';
                        eventDiv.textContent = event.title;
                        dayElement.appendChild(eventDiv);
                    }
                });

                dayElement.addEventListener('click', () => showEventModal(dateString));
            }

            grid.appendChild(dayElement);
        }
    }

    function previousMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar();
    }

    function nextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar();
    }

    function showEventModal(dateString) {
        const modal = document.getElementById('eventModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        const eventList = events[dateString];
        if (!eventList) return;

        const date = new Date(dateString);
        const dateOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        modalTitle.textContent = `Kegiatan - ${date.toLocaleDateString('id-ID', dateOptions)}`;

        modalBody.innerHTML = '';
        eventList.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.style.cssText = `
                    background: linear-gradient(135deg, #fdf2f8, #fce7f3);
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 1rem;
                    border-left: 4px solid #ec4899;
                `;

            eventCard.innerHTML = `
                    <h4 style="color: #be185d; font-weight: 700; margin-bottom: 0.5rem;">${event.title}</h4>
                    <p style="color: #6b7280; margin-bottom: 0.5rem;"><strong>Waktu:</strong> ${event.time}</p>
                    <p style="color: #6b7280; margin-bottom: 0.5rem;"><strong>Lokasi:</strong> ${event.location}</p>
                    <p style="color: #374151; line-height: 1.6;">${event.description}</p>
                `;

            modalBody.appendChild(eventCard);
        });

        modal.classList.add('show');
    }

    function closeModal() {
        document.getElementById('eventModal').classList.remove('show');
    }