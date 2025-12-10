export function createTemplateApp() {
    const container = document.createElement('div');
    container.className = 'template-app';
    container.innerText = "Hello! I am a new app.";
    return container;
}