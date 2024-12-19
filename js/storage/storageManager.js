import { handleLocalStorageError } from '../exceptionHandlers/handleLocalStorageError.js';
import {
  getImageDescriptionParagraphFromLocalStorage,
  getImageElementFromLocalStorage,
  getSavedImageDescriptionParagraphsFromLocalStorage,
  getSavedImagesFromLocalStorage,
} from '../utils/localStorageUtilities.js';
import {
  resetGrid,
  appendElementToFragmentDocument,
  extractImgDescriptionParagraphAttributes,
  currentlyDisplayedImage
} from '../utils/domUtilities.js';

export function loadElementsFromLocalStorage() {
  const imageGrid = document.getElementById("image-grid");
  resetGrid(imageGrid);
  loadImages(imageGrid);
}

function loadImages(grid) {
  const savedImages = getSavedImagesFromLocalStorage();
  const documentFragment = document.createDocumentFragment();
  savedImages.forEach(imgAttr => {
    const imgElement = getImageElementFromLocalStorage(imgAttr);
    appendElementToFragmentDocument(documentFragment, imgElement);
  });
  grid.appendChild(documentFragment);
}

export function saveImageToLocalStorage(imageAttributes) {
  try {
    const savedImages = getSavedImagesFromLocalStorage();
    savedImages.push(imageAttributes);
    console.log(imageAttributes);
    localStorage.setItem("uploadedImages", JSON.stringify(savedImages));
    return true;
  } catch (error) {
    handleLocalStorageError(error);
    return false;
  }
}

export function deleteImageFromLocalStorage(imageId) {
  const savedImages = getSavedImagesFromLocalStorage().filter(
    (imgAttr) => imgAttr.id !== imageId
  );
  localStorage.setItem("uploadedImages", JSON.stringify(savedImages));
}

export function loadImageDescriptionParagraphsFromLocalStorage(grid) {
  const savedImageDescriptionParagraphs = getSavedImageDescriptionParagraphsFromLocalStorage();
  const documentFragment = document.createDocumentFragment();
  savedImageDescriptionParagraphs.forEach((imgAttr) => {
    const imageDescriptionParagraph = getImageDescriptionParagraphFromLocalStorage(imgAttr.id);
    appendElementToFragmentDocument(documentFragment, imageDescriptionParagraph);
  });
  grid.appendChild(documentFragment);
}

export function saveImageDescriptionParagraphToLocalStorage(imgDescriptionParagraphAttr) {
  try {
    const savedImageDescriptionParagraphs = getSavedImageDescriptionParagraphsFromLocalStorage();
    savedImageDescriptionParagraphs.push(imgDescriptionParagraphAttr);
    localStorage.setItem("imageDescriptionParagraphs", JSON.stringify(savedImageDescriptionParagraphs));
    return true;
  } catch (error) {
    handleLocalStorageError(error);
    return false;
  }
}

export function deleteImageDescriptionParagraphFromLocalStorage(imageDescriptionParagraphAttributes) {
  const imageDescriptionParagraphAttributesArray = imageDescriptionParagraphAttributes.id.split("-");
  const imageDescriptionParagraphAttributesId = 
    imageDescriptionParagraphAttributesArray[imageDescriptionParagraphAttributesArray.length - 1];
  const savedImageDescriptionParagraphs = getSavedImageDescriptionParagraphsFromLocalStorage().filter(
    currentImgDescriptionParagraphAttr => {
      let currentIdArray = currentImgDescriptionParagraphAttr.id.split("-");
      let currentDescriptionParagraphId = currentIdArray[currentIdArray.length - 1]; 
      return currentDescriptionParagraphId != imageDescriptionParagraphAttributesId;
    }
  );
  localStorage.setItem("imageDescriptionParagraphs", JSON.stringify(savedImageDescriptionParagraphs));
}

export function saveCurrentDescription() {
  if (currentlyDisplayedImage != null) {
    const imageId = currentlyDisplayedImage.id.split('-');
    const imageIdNumber = imageId[imageId.length - 1];
    const currentDescriptionParagraph = document.getElementById(`description-image-${imageIdNumber}`);

    const imgDescriptionParagraphAttributes = extractImgDescriptionParagraphAttributes(currentDescriptionParagraph);
    deleteImageDescriptionParagraphFromLocalStorage(imgDescriptionParagraphAttributes);
    saveImageDescriptionParagraphToLocalStorage(imgDescriptionParagraphAttributes);
  }
}

export function deleteCurrentDescription() {
  if (currentlyDisplayedImage != null) {
    const imageId = currentlyDisplayedImage.id.split('-');
    const imageIdNumber = imageId[imageId.length - 1];
    const currentDescriptionParagraph = document.getElementById(`description-image-${imageIdNumber}`);
    currentDescriptionParagraph.remove();
  }
}