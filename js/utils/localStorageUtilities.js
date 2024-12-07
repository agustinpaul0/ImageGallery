export function getSavedImagesFromLocalStorage() {
  let savedImages = JSON.parse(localStorage.getItem("uploadedImages"));
  if (!Array.isArray(savedImages)) {
    savedImages = [];  
  }
  return savedImages;
}