import { showGalleryScreen, showHomeScreen } from "./screen.js";
import { handleFileUpload } from "./upload.js";
import { showNextImage, showPrevImage, removeImage } from "./viewer.js";
import { loadImagesFromLocalStorage } from "./storage.js";

export function initApp() {
  const openGalleryBtn = document.getElementById("open-gallery-btn");
  const backToHomeBtn = document.getElementById("back-to-home-btn");
  const fileInput = document.getElementById("file-input");
  const imageGrid = document.getElementById("image-grid");
  const nextImageBtn = document.getElementById("next-btn");
  const prevImageBtn = document.getElementById("prev-btn");
  const deleteImageBtn = document.getElementById("delete-image-btn");

  openGalleryBtn.addEventListener("click", showGalleryScreen);
  backToHomeBtn.addEventListener("click", showHomeScreen);
  fileInput.addEventListener("change", (event) =>
    handleFileUpload(event, imageGrid)
  );
  nextImageBtn.addEventListener("click", showNextImage);
  prevImageBtn.addEventListener("click", showPrevImage);
  deleteImageBtn.addEventListener("click", removeImage);

  //localStorage.clear(); --> to empty the gallery
  loadImagesFromLocalStorage(imageGrid);
}
