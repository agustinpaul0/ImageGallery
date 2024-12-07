export let currentlyDisplayedImage = null;

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

export function enableDeleteButton() {
  const deleteImageBtn = getImageElement("delete-image-btn");
  deleteImageBtn.disabled = false;
}

export function disableDeleteButton() {
  const deleteImageBtn = getImageElement("delete-image-btn");
  deleteImageBtn.disabled = true;
}