import { resizeImage } from "../utils/utilityFunctions.js";
import { saveImageToLocalStorage } from "../storage/storageManager.js";
import { 
  appendImageToGrid,
  createImageElement,
  extractAttributes
} from "../utils/domUtilities.js";

export function handleFileUpload(event, imageGrid) {
  const files = event.target.files;

  processFiles(Array.from(files), imageGrid);

  resetFileInput(event);
}

function processFiles(files, imageGrid) {
  files.forEach((file) => handleFile(file, imageGrid));
}

function handleFile(file, imageGrid) {
  resizeImage(file, 800, 600, 0.7, (resizedDataUrl) => {
    const imgElement = createImageElement(resizedDataUrl);
    const imgAttributes = extractAttributes(imgElement);

    if (saveImageToLocalStorage(imgAttributes)) {
      appendImageToGrid(imageGrid, imgElement);
    }
  });
}

function resetFileInput(event) {
  event.target.value = "";
}
