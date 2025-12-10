import { makeDraggable } from '../utils/drag.js';
import { sysEvents } from './event-bus.js';

export class WindowManager {
    constructor() {
        this.desktop = document.getElementById('desktop');
        this.cascadeOffset = 0;
        this.zIndexCounter = 100;
    }

    open(appId, title, contentElement) {
        const winId = `win-${Date.now()}`;
        
        // 1. Structure
        const win = document.createElement('div');
        win.className = 'window';
        win.id = winId;
        win.style.top = `${30 + this.cascadeOffset}px`;
        win.style.left = `${30 + this.cascadeOffset}px`;
        this.cascadeOffset = (this.cascadeOffset + 20) % 200;

        win.innerHTML = `
            <div class="window-title-bar">
                <span>${title}</span>
                <div class="window-controls"><button class="close-btn">X</button></div>
            </div>
            <div class="window-body"></div>
        `;

        // 2. Content
        win.querySelector('.window-body').appendChild(contentElement);

        // 3. Events
        win.querySelector('.close-btn').onclick = () => this.close(winId);
        win.onmousedown = () => this.focus(winId);

        // 4. Dragging
        const titleBar = win.querySelector('.window-title-bar');
        makeDraggable(win, titleBar);

        // 5. Append & Notify
        this.desktop.appendChild(win);
        this.focus(winId);
        
        sysEvents.emit('window-opened', { id: winId, title: title, appId: appId });
    }

    close(winId) {
        const win = document.getElementById(winId);
        if (win) {
            win.remove();
            sysEvents.emit('window-closed', { id: winId });
        }
    }

    focus(winId) {
        const win = document.getElementById(winId);
        if (win) {
            this.zIndexCounter++;
            win.style.zIndex = this.zIndexCounter;
            
            // Remove active class from all other windows if you had one
            document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
            win.classList.add('active');
            
            sysEvents.emit('window-focused', { id: winId });
        }
    }
}