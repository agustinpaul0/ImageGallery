export function getSavedImagesFromLocalStorage() {
  const savedImages = JSON.parse(localStorage.getItem("uploadedImages"));
  return Array.isArray(savedImages) ? savedImages : [];
}