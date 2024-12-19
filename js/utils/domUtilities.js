import { handleImageClick } from "../ui/handleImageClick.js";
import { showNextImage } from "../ui/navigation.js";

export let currentlyDisplayedImage = null;

let imageIdCounter = Date.now();

export function getDomElement(imageId) {
  return document.getElementById(imageId);
}

export function updateCurrentlyDisplayedImage(imageAttr) {
  const currentImageIMG = getDomElement("current-image");
  currentImageIMG.src = imageAttr.src;
  currentlyDisplayedImage = getDomElement(imageAttr.id);
}

export function updateCurrentlyDisplayedDescriptionParagraph(descriptionParagraph) {
  const container = getDomElement("image-description-paragraphs");
  container.appendChild(descriptionParagraph);
}

export function clearImageSrc() {
  const currentImageIMG = getDomElement("current-image");
  currentImageIMG.src = "";
}

export function clearImageViewerPanel() {
  if (currentlyDisplayedImage != null) {
    currentlyDisplayedImage.remove();
    currentlyDisplayedImage = null;
  }
}

export function clearDescriptionPanel() {
  const descriptionPanel = document.getElementById("image-description-paragraphs");
  descriptionPanel.innerHTML = '';  // Esto elimina todos los nodos hijos
}

export function resetGrid(grid) {
  grid.innerHTML = "";
}

export function enableDeleteButton() {
  const deleteImageBtn = getDomElement("delete-image-btn");
  deleteImageBtn.disabled = false;
}

export function disableDeleteButton() {
  const deleteImageBtn = getDomElement("delete-image-btn");
  deleteImageBtn.disabled = true;
}

export function enableImageNavigationButtons() {
  const prevBtn = getDomElement("prev-btn");
  const nextBtn = getDomElement("next-btn");

  prevBtn.disabled = false;
  nextBtn.disabled = false;
}

export function disableImageNavigationButtons() {
  const prevBtn = getDomElement("prev-btn");
  const nextBtn = getDomElement("next-btn");

  prevBtn.disabled = true;
  nextBtn.disabled = true;
}

export function updateImageViewer() {
  const noImagesMessage = document.getElementById("no-images-selected-msg");
  const currentImage = document.getElementById("current-image");
  const currentDescriptionParagraphDiv = document.getElementById("image-description-paragraphs");

  if (currentlyDisplayedImage != null) {
    hideElement(noImagesMessage);
    showElement(currentImage);
    showElement(currentDescriptionParagraphDiv);
  } else {
    showElement(noImagesMessage);
    hideElement(currentImage);
    hideElement(currentDescriptionParagraphDiv);
  }
}

export function showElement(element) {
  element.classList.remove("hidden");
}

export function hideElement(element) {
  element.classList.add("hidden");
}

export function appendElementToGrid(imageGrid, element) {
  imageGrid.appendChild(element);
}

export function appendElementToViewer(imageViewer, element) {
  imageViewer.appendChild(element);
}

export function appendElementToFragmentDocument(fragmentDocument, element) {
  fragmentDocument.appendChild(element);
}

export function createImageElement(src) {
  const imgElement = document.createElement("img");

  imgElement.src = src;
  imgElement.alt = `Uploaded image ${imageIdCounter}`;
  imgElement.id = `uploaded-image-${imageIdCounter}`;
  imgElement.classList.add("uploaded-image");
  imgElement.addEventListener("click", () => handleImageClick(imgElement));

  imageIdCounter = Date.now();

  return imgElement;
}

export function extractAttributes(imgElement) {
  return {
    src: imgElement.src,
    alt: imgElement.alt,
    id: imgElement.id,
    classList: Array.from(imgElement.classList)
  };
}

export function extractImageDescriptionParagraphAttributes(imgDescriptionParagraph) {
  return {
    id: imgDescriptionParagraph.id,
    value: imgDescriptionParagraph.value
  }
}

export function createDescriptionParagraph(imgAttr) {
  const imageId = imgAttr.id.split('-');
  const imageIdNumber = imageId[imageId.length - 1];
  const textarea = document.createElement("textarea");

  textarea.id = `description-image-${imageIdNumber}`;
  textarea.value = "";

  return textarea;
}

export function deleteCurrentDescriptionParagraphFromDOM() {
  if (currentlyDisplayedImage != null) {
    const imageIdArray = currentlyDisplayedImage.id.split('-');
    const imageIdNumber = imageIdArray[imageIdArray.length - 1];
    const currentDescriptionParagraph = document.getElementById(`description-image-${imageIdNumber}`);
    currentDescriptionParagraph.remove();
  }
}