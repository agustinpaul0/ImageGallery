import { 
  saveCurrentDescription,
  deleteCurrentDescription 
} from "../storage/storageManager.js";
import { 
  getSavedImagesFromLocalStorage,
  getImageDescriptionParagraphFromLocalStorage 
} from "../utils/localStorageUtilities.js";
import {
  currentlyDisplayedImage,
  updateCurrentlyDisplayedImage,
  updateCurrentlyDisplayedDescriptionParagraph
} from "../utils/domUtilities.js";

export function showNextImage() {
  if (currentlyDisplayedImage != null) {
    const savedImages = getSavedImagesFromLocalStorage();
    const currentIndex = savedImages.findIndex(
        (imageAttr) => imageAttr.id === currentlyDisplayedImage.id
    );
    const nextIndex = getNextIndex(currentIndex, savedImages.length);
    
    displayImageByIndex(savedImages, nextIndex);
  }
}

export function showPrevImage() {
  if (currentlyDisplayedImage != null) {
    const savedImages = getSavedImagesFromLocalStorage();
    const currentIndex = savedImages.findIndex(
        (imageAttr) => imageAttr.id === currentlyDisplayedImage.id
    );
    const prevIndex = getPrevIndex(currentIndex, savedImages.length);
    
    displayImageByIndex(savedImages, prevIndex);
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

  saveCurrentDescription();
  deleteCurrentDescription();
  updateCurrentlyDisplayedImage(imageToShow);
  updateCurrentlyDisplayedDescriptionParagraph(currentDescriptionParagraph);
}
