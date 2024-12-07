export function getSavedImagesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("uploadedImages")) || [];
}