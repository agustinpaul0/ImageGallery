import { handleImageClick } from "../ui/handleImageClick.js";
import { currentlyDisplayedImage } from "../utils/domUtils.js";

export function loadImagesFromLocalStorage() {
  const savedImages = getSavedImagesFromLocalStorage();
  const imageGrid = document.getElementById("image-grid");
  resetGrid(imageGrid);

  savedImages.forEach((imgAttr) => {
    const imgElement = createImageElement(imgAttr);
    appendImageToGrid(imageGrid, imgElement);
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

export function updateImageViewer() {
  const noImagesMessage = document.getElementById("no-images-selected-msg");
  const currentImage = document.getElementById("current-image");

  if (currentlyDisplayedImage != null) {
    toggleVisibility(noImagesMessage, true);
    toggleVisibility(currentImage, false);
  } else {
    toggleVisibility(noImagesMessage, false);
    toggleVisibility(currentImage, true);
  }
}

export function appendImageToGrid(imageGrid, imgElement) {
  imageGrid.appendChild(imgElement);
}

function getSavedImagesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("uploadedImages")) || [];
}

function createImageElement(imgAttr) {
  const imgElement = document.createElement("img");
  imgElement.src = imgAttr.src;
  imgElement.alt = imgAttr.alt;
  imgElement.id = imgAttr.id;
  imgElement.className = imgAttr.classList.join(" ");
  imgElement.addEventListener("click", () => handleImageClick(imgElement));
  return imgElement;
}

function resetGrid(grid) {
  grid.innerHTML = "";
}

function handleLocalStorageError(error) {
  if (error.name === "QuotaExceededError") {
    alert("No hay suficiente espacio en el almacenamiento local");
  } else {
    console.error("Error al interactuar con el localStorage", error);
  }
}

function toggleVisibility(element, hidden) {
  if (hidden) {
    element.classList.add("hidden");
  } else {
    element.classList.remove("hidden");
  }
}
