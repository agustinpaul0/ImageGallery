import { handleFileUpload } from "../upload/fileUpload.js";
import { removeImage } from "./deletion.js";
import { showGalleryScreen, showHomeScreen } from "../screens/screenManager.js";
import { showNextImage, showPrevImage } from "./navigation.js";
import { updateCurrentDescriptionParagraph } from "../storage/storageManager.js";
import { getDomElement } from "../utils/domUtilities.js";

export function setupEventHandlers() {
  getDomElement("open-gallery-btn").addEventListener("click", showGalleryScreen);
  getDomElement("back-to-home-btn").addEventListener("click", showHomeScreen);
  getDomElement("file-input").addEventListener("change", (event) => handleFileUpload(event));
  getDomElement("next-btn").addEventListener("click", showNextImage);
  getDomElement("prev-btn").addEventListener("click", showPrevImage);
  getDomElement("delete-image-btn").addEventListener("click", removeImage);
  
  document.addEventListener("click", (event) => {
    const textarea = document.querySelector('textarea'); 
    if (textarea) { 
        if (!textarea.contains(event.target)) {
            updateCurrentDescriptionParagraph(); 
        }
    }
  });
}
