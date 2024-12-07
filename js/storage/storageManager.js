import { handleLocalStorageError } from "../exceptionHandlers/handleLocalStorageError.js";
import { getSavedImagesFromLocalStorage } from "../utils/localStorageUtilities.js";
import { 
  resetGrid,
  appendImageToGrid,
  getImageElementFromLocalStorage
 } from "../utils/domUtilities.js";

export function loadImagesFromLocalStorage() {
  const savedImages = getSavedImagesFromLocalStorage();
  const imageGrid = document.getElementById("image-grid");

  resetGrid(imageGrid);
  loadImages(savedImages, imageGrid);
}

function loadImages(savedImages, grid) {
  savedImages.forEach((imgAttr) => {
    const imgElement = getImageElementFromLocalStorage(imgAttr);
    appendImageToGrid(grid, imgElement);
  });
}

export function saveImageToLocalStorage(imageAttributes) {
  try {
    const savedImages = getSavedImagesFromLocalStorage().push(imageAttributes);
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