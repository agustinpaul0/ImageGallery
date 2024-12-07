import { resizeImage } from "../utilityFunctions.js";
import { appendImageToGrid, saveImageToLocalStorage } from "../storage/storageManager.js";
import { handleImageClick } from "../image/imageViewer.js";

let imageId = 1;

export function handleFileUpload(event, imageGrid) {
  const files = event.target.files;

  for (const file of files) {
    createImageElement(imageGrid, file);
  }

  // Reset input to allow repeated file uploads (after processing all files)
  event.target.value = "";
}

function createImageElement(imageGrid, file) {
  const imgElement = createImage(imageGrid, file);
}

function createImage(imageGrid, file) {
  const reader = new FileReader();
  reader.onload = () => {
    resizeImage(file, 800, 600, 0.7, (resizedDataUrl) => {
      const imgElement = document.createElement("img");
      imgElement.src = resizedDataUrl;
      imgElement.alt = "Uploaded image " + imageId;
      imgElement.id = "uploaded-image-" + imageId;
      imgElement.classList.add("uploaded-image");
      imgElement.addEventListener("click", () => handleImageClick(imgElement));
      imageId++;

      const imgAttributes = extractAttributes(imgElement);
      if (saveImageToLocalStorage(imgAttributes)) {
        appendImageToGrid(imageGrid, imgElement);
      }
    });
  };
  reader.readAsDataURL(file);
}

function extractAttributes(imgElement) {
  return {
    src: imgElement.src,
    alt: imgElement.alt,
    id: imgElement.id,
    classList: Array.from(imgElement.classList),
  };
}
