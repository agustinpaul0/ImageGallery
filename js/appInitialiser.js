import { setupEventHandlers } from './ui/eventHandlers.js';
import { loadImagesFromLocalStorage } from './storage/storageManager.js';

export function initApp() {
  setupEventHandlers();
  loadImagesFromLocalStorage();
}