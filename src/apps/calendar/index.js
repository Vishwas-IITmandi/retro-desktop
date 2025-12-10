export function createCalendar() {
    // Inject CSS if needed (checking if it exists first to avoid duplicates)
    if (!document.getElementById('css-calendar')) {
        const link = document.createElement('link');
        link.id = 'css-calendar'; 
        link.rel = 'stylesheet';
        link.href = './src/apps/calendar/styles.css';
        document.head.appendChild(link);
    }

    const container = document.createElement('div');
    container.className = 'calendar-app';

    const now = new Date();
    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();

    function renderCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDayOfWeek = firstDay.getDay();
        
        const today = new Date();
        const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
        const todayDate = today.getDate();

        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        let html = `
            <div class="calendar-header">
                <button class="calendar-nav" data-action="prev">◀</button>
                <div class="calendar-title">${monthNames[currentMonth]} ${currentYear}</div>
                <button class="calendar-nav" data-action="next">▶</button>
            </div>
            <div class="calendar-weekdays">
                ${dayNames.map(day => `<div class="calendar-weekday">${day}</div>`).join('')}
            </div>
            <div class="calendar-days">
        `;

        // Empty cells for days before month starts
        for (let i = 0; i < startDayOfWeek; i++) {
            html += '<div class="calendar-day empty"></div>';
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = isCurrentMonth && day === todayDate;
            const classes = `calendar-day${isToday ? ' today' : ''}`;
            html += `<div class="${classes}">${day}</div>`;
        }

        html += '</div>';

        // Digital clock
        const timeStr = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: true 
        });
        const dateStr = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        html += `
            <div class="calendar-clock">
                <div class="clock-time">${timeStr}</div>
                <div class="clock-date">${dateStr}</div>
            </div>
        `;

        container.innerHTML = html;

        // Add event listeners for navigation
        container.querySelector('[data-action="prev"]').onclick = () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        };

        container.querySelector('[data-action="next"]').onclick = () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        };
    }

    // Update clock every second
    renderCalendar();
    const clockInterval = setInterval(() => {
        const clockTime = container.querySelector('.clock-time');
        const clockDate = container.querySelector('.clock-date');
        if (clockTime && clockDate) {
            const now = new Date();
            clockTime.textContent = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: true 
            });
            clockDate.textContent = now.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } else {
            clearInterval(clockInterval);
        }
    }, 1000);

    return container;
}
