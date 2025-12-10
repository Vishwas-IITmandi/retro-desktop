import { sysEvents } from './event-bus.js';

export class Taskbar {
    constructor() {
        this.container = document.getElementById('taskbar-apps');
        this.init();
    }

    init() {
        // Listen to System Events
        sysEvents.on('window-opened', (data) => this.addTab(data));
        sysEvents.on('window-closed', (data) => this.removeTab(data));
        sysEvents.on('window-focused', (data) => this.highlightTab(data));
        
        this.startClock();
    }

    addTab({ id, title }) {
        const tab = document.createElement('div');
        tab.className = 'taskbar-item';
        tab.id = `tab-${id}`;
        tab.innerText = title;
        
        // If we click the tab, we could conceptually minimize/restore
        // For now, let's just make it focus the window
        tab.onclick = () => {
             // We would need to reference WindowManager here, 
             // or emit an event 'request-focus' that WM listens to.
             // For simplicity, we just visually select it.
             this.highlightTab({ id });
        };
        
        this.container.appendChild(tab);
    }

    removeTab({ id }) {
        const tab = document.getElementById(`tab-${id}`);
        if (tab) tab.remove();
    }

    highlightTab({ id }) {
        document.querySelectorAll('.taskbar-item').forEach(t => t.classList.remove('active'));
        const tab = document.getElementById(`tab-${id}`);
        if (tab) tab.classList.add('active');
    }

    startClock() {
        setInterval(() => {
            const now = new Date();
            document.getElementById('clock-tray').innerText = 
                now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }, 1000);
    }
}