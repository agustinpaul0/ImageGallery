let imageId = 1;
let currentlyDisplayedImage = null;
let savedImages = [];
let galleryScreenInitialised = false;

document.addEventListener("DOMContentLoaded", () => initApp());

function initApp() {
  const openGalleryBtn = document.getElementById("open-gallery-btn");
  const backToHomeBtn = document.getElementById("back-to-home-btn");
  const fileInput = document.getElementById("file-input");
  const imageGrid = document.getElementById("image-grid");
  const nextImageBtn = document.getElementById("next-btn");
  const prevImageBtn = document.getElementById("prev-btn");
  const deleteImageBtn = document.getElementById("delete-image-btn");

  openGalleryBtn.addEventListener("click", showGalleryScreen);
  backToHomeBtn.addEventListener("click", showHomeScreen);
  fileInput.addEventListener("change", event => handleFileUpload(event, imageGrid));
  nextImageBtn.addEventListener("click", showNextImage);
  prevImageBtn.addEventListener("click", showPrevImage);
  deleteImageBtn.addEventListener("click", removeImage);

  loadImagesFromLocalStorage(imageGrid);
}

function loadImagesFromLocalStorage(imageGrid) {
  // Limpiar el grid antes de cargar las imágenes desde el localStorage
  imageGrid.innerHTML = '';

  savedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];

  savedImages.forEach(imgAttr => {
    const imgElement = document.createElement("img");
    imgElement.src = imgAttr.src;
    imgElement.alt = imgAttr.alt;
    imgElement.id = imgAttr.id;
    imgElement.classList = imgAttr.classList.join(" ");
    imgElement.addEventListener("click", () => handleImageClick(imgElement));
    imageGrid.appendChild(imgElement);
  });
}

function showGalleryScreen() {
  toggleScreens("home-screen", "gallery-screen");
  if (!galleryScreenInitialised) {
    initialiseGalleryScreen();
    galleryScreenInitialised = true;
  }
}

function initialiseGalleryScreen() {
  const imageViewerDiv = document.getElementById('image-viewer');

  const message = document.createElement('h2');
  message.id = "no-images-selected-msg";
  message.classList.add("no-img-selected-msg");
  message.textContent = 'No images selected';

  const imgElement = document.createElement('img');
  imgElement.id = "current-image";
  imgElement.src = '';     
  imgElement.alt = "Selected image";
  imgElement.classList.add("hidden");

  console.log(imgElement.classList.contains("hidden"));
  imageViewerDiv.insertBefore(imgElement, imageViewerDiv.firstChild);
  imageViewerDiv.insertBefore(message, imageViewerDiv.firstChild);
}

function showHomeScreen() {
  toggleScreens("gallery-screen", "home-screen");
}

function toggleScreens(hideScreenId, showScreenId) {
  document.getElementById(hideScreenId).classList.add("hidden");
  document.getElementById(showScreenId).classList.remove("hidden");
}

function handleFileUpload(event, imageGrid) {
  const files = event.target.files;

  for (const file of files) {
    createImageElement(imageGrid, file);
  }

  // Reset input to allow repeated file uploads (after processing all files)
  event.target.value = "";
}

function createImageElement(imageGrid, file) {
  const imgElement = createImage(imageGrid, file);
}

function createImage(imageGrid, file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    resizeImage(file, 800, 600, 0.7, (resizedDataUrl) => { 
      const imgElement = document.createElement("img");
      imgElement.src = resizedDataUrl;
      imgElement.alt = "Uploaded image " + imageId;
      imgElement.id = "uploaded-image-" + imageId;
      imgElement.classList.add("uploaded-image");
      imgElement.addEventListener("click", () => handleImageClick(imgElement));
      imageId++;
      
      const imgAttributes = extractAttributes(imgElement);
      if (saveImageToLocalStorage(imgAttributes)) {
        appendImageToGrid(imageGrid, imgElement);
      }
    });
  };
  reader.readAsDataURL(file); 
}

function resizeImage(file, maxWidth, maxHeight, quality, callback) {
  const img = new Image();
  const reader = new FileReader();

  reader.onload = () => {
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        } else {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const resizedDataUrl = canvas.toDataURL("image/jpeg", quality); 
      callback(resizedDataUrl);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function extractAttributes(imgElement) {
  return {
    src: imgElement.src,
    alt: imgElement.alt,
    id: imgElement.id,
    classList: Array.from(imgElement.classList)
  };
}

function appendImageToGrid(imageGrid, imgElement) {
  imageGrid.appendChild(imgElement);
}

function saveImageToLocalStorage(imageAttributes) {
  operacionExitosa = true;
  try {
    savedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    savedImages.push(imageAttributes);
    localStorage.setItem('uploadedImages', JSON.stringify(savedImages));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      alert('No hay suficiente espacio en el almacenamiento local');
    } else {
      console.error('Error al guardar la imagen en localStorage', e);
    }
    operacionExitosa = false;
  } finally {
    return operacionExitosa;
  }
}

function handleImageClick(image) {
  const deleteImageBtn = document.getElementById("delete-image-btn");
  const currentImageIMG = document.getElementById("current-image");

  console.log(currentImageIMG);

  currentImageIMG.src = image.src;
  currentlyDisplayedImage = image;

  updateImageViewer();

  deleteImageBtn.disabled = false;
}

function showNextImage() {
  if (currentlyDisplayedImage != null) {
    savedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    const currentImageIMG = document.getElementById("current-image");
    const currentIndex = savedImages.findIndex(imageAttr => imageAttr.id === currentlyDisplayedImage.id);

    // Circular shift
    const nextIndex = (currentIndex + 1) % savedImages.length;
    const nextImage = savedImages[nextIndex];
    currentImageIMG.src = nextImage.src;
    currentlyDisplayedImage = nextImage;
  }
}

function showPrevImage() {
  if (currentlyDisplayedImage != null) {
    savedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    const currentImageIMG = document.getElementById("current-image");
    const currentIndex = savedImages.findIndex(imageAttr => imageAttr.id === currentlyDisplayedImage.id);

    // Circular shift
    const prevIndex = (currentIndex - 1 + savedImages.length) % savedImages.length;
    const prevImage = savedImages[prevIndex];
    currentImageIMG.src = prevImage.src;
    currentlyDisplayedImage = prevImage;
  }
}

function removeImage() {
  const deleteImageBtn = document.getElementById("delete-image-btn");
  if (currentlyDisplayedImage != null) {
    deleteImageFromLocalStorage();
    currentlyDisplayedImage.remove();
    clearImagePanel();
    deleteImageBtn.disabled = true;
    currentlyDisplayedImage = null;
    updateImageViewer();
  }
}

function deleteImageFromLocalStorage() {
  savedImages = savedImages.filter(imageAttr => imageAttr.id !== currentlyDisplayedImage.id);
  localStorage.setItem('uploadedImages', JSON.stringify(savedImages));
}

function clearImagePanel() {
  const currentImageIMG = document.getElementById("current-image");
  currentImageIMG.src = '';
}

function updateImageViewer() {
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