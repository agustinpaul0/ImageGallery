import { updateCurrentDescriptionParagraph } from '../storage/storageManager.js';
import { 
  getSavedImageAttributesFromLocalStorage,
  getImageDescriptionParagraphFromLocalStorage 
} from '../utils/localStorageUtilities.js';
import {
  currentlyDisplayedImage,
  updateCurrentlyDisplayedImage,
  updateCurrentlyDisplayedDescriptionParagraph,
  deleteCurrentDescriptionParagraphFromDOM
} from '../utils/domUtilities.js';

export function showNextImage() {
  if (currentlyDisplayedImage != null) {
    const savedImageAttributes = getSavedImageAttributesFromLocalStorage();

    const currentIndex = savedImageAttributes.findIndex(
        (imageAttr) => imageAttr.id === currentlyDisplayedImage.id
    );

    const nextIndex = getNextIndex(currentIndex, savedImageAttributes.length);
    
    displayImageByIndex(savedImageAttributes, nextIndex);
  }
}

export function showPrevImage() {
  if (currentlyDisplayedImage != null) {
    const savedImageAttributes = getSavedImageAttributesFromLocalStorage();

    const currentIndex = savedImageAttributes.findIndex(
        (imageAttr) => imageAttr.id === currentlyDisplayedImage.id
    );

    const prevIndex = getPrevIndex(currentIndex, savedImageAttributes.length);
    
    displayImageByIndex(savedImageAttributes, prevIndex);
  }
}

function getNextIndex(currentIndex, length) {
  return (currentIndex + 1) % length;
}

function getPrevIndex(currentIndex, length) {
  return (currentIndex - 1 + length) % length;
}

function displayImageByIndex(savedImages, index) {
  const imageToShow = savedImages[index];
  const currentDescriptionParagraph = getImageDescriptionParagraphFromLocalStorage(imageToShow.id);

  updateCurrentDescriptionParagraph();
  deleteCurrentDescriptionParagraphFromDOM();
  
  updateCurrentlyDisplayedImage(imageToShow);
  updateCurrentlyDisplayedDescriptionParagraph(currentDescriptionParagraph);
}
