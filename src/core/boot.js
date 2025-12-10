import { WindowManager } from './window-manager.js';
import { Taskbar } from './taskbar.js';
import { INSTALLED_APPS } from '../../config.js';

console.log("💿 Booting Retro OS...");

// 1. Initialize System Services
const wm = new WindowManager();
const taskbar = new Taskbar(); // Starts listening to events immediately

// 2. Render Desktop Icons
const desktop = document.getElementById('desktop');

INSTALLED_APPS.forEach(app => {
    const iconDiv = document.createElement('div');
    iconDiv.className = 'desktop-icon';
    iconDiv.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 5px;">${app.icon}</div>
        <span>${app.title}</span>
    `;
    
    // Double click to open
    iconDiv.ondblclick = () => {
        // Create a new instance of the app content
        const content = app.component();
        wm.open(app.id, app.title, content);
    };

    desktop.appendChild(iconDiv);
});

console.log("✅ System Ready.");