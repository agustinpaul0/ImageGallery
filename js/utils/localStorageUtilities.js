export function getSavedImages() {
  return JSON.parse(localStorage.getItem("uploadedImages")) || [];
}