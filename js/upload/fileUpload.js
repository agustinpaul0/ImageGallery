import { resizeImage } from "../utils/utilityFunctions.js";
import {
  appendImageToGrid,
  saveImageToLocalStorage,
} from "../storage/storageManager.js";
import { handleImageClick } from "../ui/handleImageClick.js";

let imageIdCounter = 1;

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

function createImageElement(src) {
  const imgElement = document.createElement("img");
  imgElement.src = src;
  imgElement.alt = `Uploaded image ${imageIdCounter}`;
  imgElement.id = `uploaded-image-${imageIdCounter}`;
  imgElement.classList.add("uploaded-image");
  imgElement.addEventListener("click", () => handleImageClick(imgElement));

  imageIdCounter++;
  return imgElement;
}

export function extractAttributes(imgElement) {
  return {
    src: imgElement.src,
    alt: imgElement.alt,
    id: imgElement.id,
    classList: Array.from(imgElement.classList),
  };
}

function resetFileInput(event) {
  event.target.value = "";
}
