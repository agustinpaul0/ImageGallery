import { loadElementsFromLocalStorage } from '../storage/storageManager.js';

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
  document.getElementById(screenId).classList.remove("hidden");
}

function hideScreen(screenId) {
  document.getElementById(screenId).classList.add("hidden");
}