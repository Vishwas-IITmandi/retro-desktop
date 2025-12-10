// config.js
import { createCalculator } from './src/apps/calculator/index.js';
import { createNotepad } from './src/apps/notepad/index.js';

export const INSTALLED_APPS = [
    {
        id: 'calc',
        title: 'Calculator',
        icon: '🧮', // Using emoji as placeholder for images
        component: createCalculator 
    },
    {
        id: 'notepad',
        title: 'Notepad',
        icon: '📝',
        component: createNotepad
    }
];