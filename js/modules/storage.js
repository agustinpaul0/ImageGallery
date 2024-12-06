import { handleImageClick, currentlyDisplayedImage } from "./viewer.js";

export function loadImagesFromLocalStorage(imageGrid) {
  const savedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
  imageGrid.innerHTML = "";

  savedImages.forEach((imgAttr) => {
    const imgElement = document.createElement("img");
    imgElement.src = imgAttr.src;
    imgElement.alt = imgAttr.alt;
    imgElement.id = imgAttr.id;
    imgElement.classList = imgAttr.classList.join(" ");
    imgElement.addEventListener("click", () => handleImageClick(imgElement));
    imageGrid.appendChild(imgElement);
  });
}

export function saveImageToLocalStorage(imageAttributes) {
  let operacionExitosa = true;
  try {
    savedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    savedImages.push(imageAttributes);
    localStorage.setItem("uploadedImages", JSON.stringify(savedImages));
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      alert("No hay suficiente espacio en el almacenamiento local");
    } else {
      console.error("Error al guardar la imagen en localStorage", e);
    }
    operacionExitosa = false;
  } finally {
    return operacionExitosa;
  }
}

export function deleteImageFromLocalStorage(imageId) {
  let savedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
  savedImages = savedImages.filter((imgAttr) => imgAttr.id !== imageId);
  localStorage.setItem("uploadedImages", JSON.stringify(savedImages));
}

export function updateImageViewer() {
  const paragraphTag = document.getElementById("no-images-selected-msg");
  const imgTag = document.getElementById("current-image");

  if (currentlyDisplayedImage != null) {
    paragraphTag.classList.add("hidden");
    imgTag.classList.remove("hidden");
  } else {
    imgTag.classList.add("hidden");
    paragraphTag.classList.remove("hidden");
  }
}

export function appendImageToGrid(imageGrid, imgElement) {
  imageGrid.appendChild(imgElement);
}
