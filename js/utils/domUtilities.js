import { handleImageClick } from "../ui/handleImageClick.js";

export let currentlyDisplayedImage = null;

let imageIdCounter = 1;

export function getImageElement(imageId) {
  return document.getElementById(imageId);
}

export function updateCurrentlyDisplayedImage(imageAttr) {
  const currentImageIMG = getImageElement("current-image");
  currentImageIMG.src = imageAttr.src;
  currentlyDisplayedImage = getImageElement(imageAttr.id);
}

export function clearImagePanel() {
  const currentImageIMG = getImageElement("current-image");
  currentImageIMG.src = "";
}

export function clearGridPanel() {
  if (currentlyDisplayedImage != null) {
    currentlyDisplayedImage.remove();
    currentlyDisplayedImage = null;
  }
}

export function resetGrid(grid) {
  grid.innerHTML = "";
}

export function enableDeleteButton() {
  const deleteImageBtn = getImageElement("delete-image-btn");
  deleteImageBtn.disabled = false;
}

export function disableDeleteButton() {
  const deleteImageBtn = getImageElement("delete-image-btn");
  deleteImageBtn.disabled = true;
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

function toggleVisibility(element, hidden) {
  if (hidden) {
    element.classList.add("hidden");
  } else {
    element.classList.remove("hidden");
  }
}

export function appendImageToGrid(imageGrid, imgElement) {
  imageGrid.appendChild(imgElement);
}

export function getImageElementFromLocalStorage(imgAttr) {
  const imgElement = document.createElement("img");
  imgElement.src = imgAttr.src;
  imgElement.alt = imgAttr.alt;
  imgElement.id = imgAttr.id;
  imgElement.className = imgAttr.classList.join(" ");
  imgElement.addEventListener("click", () => handleImageClick(imgElement));
  return imgElement;
}

export function createImageElement(src) {
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