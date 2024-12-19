import { getImageDescriptionParagraphFromLocalStorage } from '../utils/localStorageUtilities.js';
import { 
  deleteImageAttributesFromLocalStorage,
  deleteImageDescriptionParagraphFromLocalStorage 
} from '../storage/storageManager.js';
import { 
    clearImageSrc, 
    clearImageViewerPanel,
    currentlyDisplayedImage,
    updateImageViewer,
    disableDeleteButton,
    disableImageNavigationButtons,
    extractAttributes,
    clearDescriptionPanel
} from '../utils/domUtilities.js';

export function removeImage() {
  if (currentlyDisplayedImage != null) {
    const currentlyDisplayedImageAttributes = extractAttributes(currentlyDisplayedImage);
    const currentlyDisplayedImageDescriptionParagraphAttributes = 
      getImageDescriptionParagraphFromLocalStorage(currentlyDisplayedImageAttributes.id);

    deleteImageAttributesFromLocalStorage(currentlyDisplayedImageAttributes.id);
    deleteImageDescriptionParagraphFromLocalStorage(currentlyDisplayedImageDescriptionParagraphAttributes);
    clearDescriptionPanel();
    clearImageSrc();
    clearImageViewerPanel();
    disableDeleteButton();
    disableImageNavigationButtons();
    updateImageViewer();
  }
}