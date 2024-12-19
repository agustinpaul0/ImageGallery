import { setupEventHandlers } from '../ui/eventHandlers.js';

export function initApp() {
  localStorage.clear();
  setupEventHandlers();
}