export function createCalculator() {
    // Inject CSS if needed (checking if it exists first to avoid duplicates)
    if (!document.getElementById('css-calc')) {
        const link = document.createElement('link');
        link.id = 'css-calc'; link.rel = 'stylesheet';
        link.href = './src/apps/calculator/styles.css';
        document.head.appendChild(link);
    }

    const container = document.createElement('div');
    container.className = 'calc-app';
    container.innerHTML = `
        <div class="calc-display">0</div>
        <div class="calc-row"><button class="calc-btn">7</button><button class="calc-btn">8</button><button class="calc-btn">9</button><button class="calc-btn">/</button></div>
        <div class="calc-row"><button class="calc-btn">4</button><button class="calc-btn">5</button><button class="calc-btn">6</button><button class="calc-btn">*</button></div>
        <div class="calc-row"><button class="calc-btn">1</button><button class="calc-btn">2</button><button class="calc-btn">3</button><button class="calc-btn">-</button></div>
        <div class="calc-row"><button class="calc-btn">0</button><button class="calc-btn">C</button><button class="calc-btn">=</button><button class="calc-btn">+</button></div>
    `;

    const display = container.querySelector('.calc-display');
    let expression = '';

    container.onclick = (e) => {
        if (!e.target.classList.contains('calc-btn')) return;
        const val = e.target.innerText;

        if (val === 'C') { expression = ''; display.innerText = '0'; }
        else if (val === '=') {
            try { display.innerText = eval(expression); expression = display.innerText; }
            catch { display.innerText = 'Err'; expression = ''; }
        } else {
            expression += val;
            display.innerText = expression;
        }
    };

    return container;
}