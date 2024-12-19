import { setupEventHandlers } from '../ui/eventHandlers.js';

export function initApp() {
  localStorage.clear();
  console.log("Borrar clear en appInitialiser");
  setupEventHandlers();
}