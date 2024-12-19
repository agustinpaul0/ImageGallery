import { handleFileUpload } from "../upload/fileUpload.js";
import { removeImage } from "./deletion.js";
import { showGalleryScreen, showHomeScreen } from "../screens/screenManager.js";
import { showNextImage, showPrevImage } from "./navigation.js";
import { saveCurrentDescription } from "../storage/storageManager.js";

export function setupEventHandlers() {
  document
    .getElementById("open-gallery-btn")
    .addEventListener("click", showGalleryScreen);
  document
    .getElementById("back-to-home-btn")
    .addEventListener("click", showHomeScreen);
  document
    .getElementById("file-input")
    .addEventListener("change", (event) => handleFileUpload(event));
  document.getElementById("next-btn").addEventListener("click", showNextImage);
  document.getElementById("prev-btn").addEventListener("click", showPrevImage);
  document
    .getElementById("delete-image-btn")
    .addEventListener("click", removeImage);
  document.addEventListener("click", (event) => {
    const textarea = document.querySelector('textarea'); 
    if (textarea) { 
        if (!textarea.contains(event.target)) {
            saveCurrentDescription(); 
        }
    }
  });
}
