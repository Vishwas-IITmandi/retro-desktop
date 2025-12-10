export function createNotepad() {
    if (!document.getElementById('css-notepad')) {
        const link = document.createElement('link');
        link.id = 'css-notepad'; link.rel = 'stylesheet';
        link.href = './src/apps/notepad/styles.css';
        document.head.appendChild(link);
    }

    const container = document.createElement('div');
    container.className = 'notepad-app';
    container.innerHTML = `
        <div class="notepad-toolbar">
            <button>Save</button>
            <span style="font-size: 0.8rem; color: gray; padding-top: 3px;"></span>
        </div>
        <textarea class="notepad-area"></textarea>
    `;

    const area = container.querySelector('textarea');
    const saveBtn = container.querySelector('button');
    const msg = container.querySelector('span');

    // Load
    area.value = localStorage.getItem('retro-notepad') || '';

    // Save
    saveBtn.onclick = () => {
        localStorage.setItem('retro-notepad', area.value);
        msg.innerText = 'Saved!';
        setTimeout(() => msg.innerText = '', 1500);
    };

    return container;
}