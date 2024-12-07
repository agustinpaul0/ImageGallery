export function getSavedImagesFromLocalStorage() {
  let savedImages = JSON.parse(localStorage.getItem("uploadedImages"));
  if (!Array.isArray(savedImages)) {
    savedImages = [];  // Inicializa como arreglo vacío si no lo es
  }
  return savedImages;
}