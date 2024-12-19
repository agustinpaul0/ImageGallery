import { handleLocalStorageError } from '../exceptionHandlers/handleLocalStorageError.js';
import {
  getImageDescriptionParagraphFromLocalStorage,
  createImageElementFromImageAttributes,
  getSavedImageDescriptionParagraphsFromLocalStorage,
  getSavedImageAttributesFromLocalStorage,
} from '../utils/localStorageUtilities.js';
import {
  resetGrid,
  appendElementToFragmentDocument,
  extractImageDescriptionParagraphAttributes,
  currentlyDisplayedImage,
  getDomElement,
  appendElementToGrid
} from '../utils/domUtilities.js';

export function loadElementsFromLocalStorage() {
  const imageGrid = getDomElement("image-grid");

  resetGrid(imageGrid);
  loadImagesFromLocalStorage(imageGrid);
}

function loadImagesFromLocalStorage(grid) {
  const savedImageAttributes = getSavedImageAttributesFromLocalStorage();
  const documentFragment = document.createDocumentFragment();

  savedImageAttributes.forEach((imageAttributes) => {
    const imgElement = createImageElementFromImageAttributes(imageAttributes);
    appendElementToFragmentDocument(documentFragment, imgElement);
  });

  appendElementToGrid(grid, documentFragment);
}

export function saveImageAttributesToLocalStorage(imageAttributes) {
  try {
    const savedImageAttributes = getSavedImageAttributesFromLocalStorage();

    savedImageAttributes.push(imageAttributes);
    localStorage.setItem("uploadedImages", JSON.stringify(savedImageAttributes));
    return true;
  } catch (error) {
    handleLocalStorageError(error);
    return false;
  }
}

export function deleteImageAttributesFromLocalStorage(imageId) {
  const savedImageAttributes = getSavedImageAttributesFromLocalStorage().filter(
    (imageAttributes) => imageAttributes.id !== imageId
  );

  localStorage.setItem("uploadedImages", JSON.stringify(savedImageAttributes));
}

export function loadImageDescriptionParagraphsFromLocalStorage(grid) {
  const savedImageDescriptionParagraphs = getSavedImageDescriptionParagraphsFromLocalStorage();
  const documentFragment = document.createDocumentFragment();

  savedImageDescriptionParagraphs.forEach((imageAttributes) => {
    const imageDescriptionParagraph = getImageDescriptionParagraphFromLocalStorage(imageAttributes.id);
    appendElementToFragmentDocument(documentFragment, imageDescriptionParagraph);
  });

  appendElementToGrid(grid, documentFragment);
}

export function saveImageDescriptionParagraphToLocalStorage(imageDescriptionParagraphAttributes) {
  try {
    const savedImageDescriptionParagraphs = getSavedImageDescriptionParagraphsFromLocalStorage();

    savedImageDescriptionParagraphs.push(imageDescriptionParagraphAttributes);
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
    (currentImageDescriptionParagraphAttributes) => {
      const currentIdArray = currentImageDescriptionParagraphAttributes.id.split("-");
      const currentDescriptionParagraphId = currentIdArray[currentIdArray.length - 1]; 

      return currentDescriptionParagraphId != imageDescriptionParagraphAttributesId;
    }
  );

  localStorage.setItem("imageDescriptionParagraphs", JSON.stringify(savedImageDescriptionParagraphs));
}

export function updateCurrentDescriptionParagraph() {
  if (currentlyDisplayedImage != null) {
    const imageIdArray = currentlyDisplayedImage.id.split('-');
    const imageIdNumber = imageIdArray[imageIdArray.length - 1];
    const currentDescriptionParagraph = getDomElement(`description-image-${imageIdNumber}`);
    const imageDescriptionParagraphAttributes = 
      extractImageDescriptionParagraphAttributes(currentDescriptionParagraph);

    deleteImageDescriptionParagraphFromLocalStorage(imageDescriptionParagraphAttributes);
    saveImageDescriptionParagraphToLocalStorage(imageDescriptionParagraphAttributes);
  }
}