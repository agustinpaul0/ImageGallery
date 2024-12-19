import { loadElementsFromLocalStorage } from '../storage/storageManager.js';
import { getDomElement } from '../utils/domUtilities.js';

export function showGalleryScreen() {
  loadElementsFromLocalStorage();
  showScreen("gallery-screen");
  hideScreen("home-screen");
}

export function showHomeScreen() {
  showScreen("home-screen");
  hideScreen("gallery-screen");
}

function showScreen(screenId) {
  getDomElement(screenId).classList.remove("hidden");
}

function hideScreen(screenId) {
  getDomElement(screenId).classList.add("hidden");
}