export function getSavedImagesFromLocalStorage() {
  let savedImages = localStorage.getItem("uploadedImages");
  if (savedImages == null) {
    return [];
  } else {
    return JSON.parse(savedImages);
  }
}