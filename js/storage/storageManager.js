import { handleLocalStorageError } from "../exceptionHandlers/handleLocalStorageError.js";
import { getSavedImagesFromLocalStorage } from "../utils/localStorageUtilities.js";
import { 
  resetGrid,
  appendImageToGrid,
  getImageElementFromLocalStorage
 } from "../utils/domUtilities.js";

export function loadImagesFromLocalStorage() {
  const imageGrid = document.getElementById("image-grid");
  resetGrid(imageGrid);
  loadImages(imageGrid);
}

function loadImages(grid) {
  const savedImages = getSavedImagesFromLocalStorage();
  console.log(Array.isArray(savedImages));
  savedImages.forEach((imgAttr) => {
    const imgElement = getImageElementFromLocalStorage(imgAttr);
    appendImageToGrid(grid, imgElement);
  });
}

export function saveImageToLocalStorage(imageAttributes) {
  try {
    const savedImages = getSavedImagesFromLocalStorage(); 
    savedImages.push(imageAttributes); 
    localStorage.setItem("uploadedImages", JSON.stringify(savedImages));
    return true;
  } catch (error) {
    handleLocalStorageError(error);
    return false;
  }
}

export function deleteImageFromLocalStorage(imageId) {
  const savedImages = getSavedImagesFromLocalStorage().filter(
    (imgAttr) => imgAttr.id !== imageId
  );
  localStorage.setItem("uploadedImages", JSON.stringify(savedImages));
}