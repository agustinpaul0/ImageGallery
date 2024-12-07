import { updateImageViewer, deleteImageFromLocalStorage } from "../storage/storageManager.js";

export let currentlyDisplayedImage = null;

export function showNextImage() {
  if (currentlyDisplayedImage != null) {
    const savedImages =
      JSON.parse(localStorage.getItem("uploadedImages")) || [];
    const currentImageIMG = document.getElementById("current-image");
    const currentIndex = savedImages.findIndex(
      (imageAttr) => imageAttr.id === currentlyDisplayedImage.id
    );

    // Circular shift
    const nextIndex = (currentIndex + 1) % savedImages.length;
    const nextImage = savedImages[nextIndex];
    currentImageIMG.src = nextImage.src;
    currentlyDisplayedImage = document.getElementById(nextImage.id);
  }
}

export function showPrevImage() {
  if (currentlyDisplayedImage != null) {
    const savedImages =
      JSON.parse(localStorage.getItem("uploadedImages")) || [];
    const currentImageIMG = document.getElementById("current-image");
    const currentIndex = savedImages.findIndex(
      (imageAttr) => imageAttr.id === currentlyDisplayedImage.id
    );

    // Circular shift
    const prevIndex =
      (currentIndex - 1 + savedImages.length) % savedImages.length;
    const prevImage = savedImages[prevIndex];
    currentImageIMG.src = prevImage.src;
    currentlyDisplayedImage = document.getElementById(prevImage.id);
  }
}

export function removeImage() {
  const deleteImageBtn = document.getElementById("delete-image-btn");
  if (currentlyDisplayedImage != null) {
    deleteImageFromLocalStorage(currentlyDisplayedImage.id);
    clearImagePanel();
    clearGridPanel();
    deleteImageBtn.disabled = true;
    updateImageViewer();
  }
}

function clearGridPanel() {
  currentlyDisplayedImage.remove();
  currentlyDisplayedImage = null;
}

function clearImagePanel() {
  const currentImageIMG = document.getElementById("current-image");
  currentImageIMG.src = "";
}

export function handleImageClick(imgElement) {
  const deleteImageBtn = document.getElementById("delete-image-btn");
  const currentImageIMG = document.getElementById("current-image");

  currentImageIMG.src = imgElement.src;
  currentlyDisplayedImage = imgElement;

  updateImageViewer();
  deleteImageBtn.disabled = false;
}
