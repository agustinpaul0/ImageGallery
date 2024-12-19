import { getImageDescriptionParagraphFromLocalStorage } from '../utils/localStorageUtilities.js';
import { 
  deleteImageFromLocalStorage,
  deleteImageDescriptionParagraphFromLocalStorage 
} from '../storage/storageManager.js';
import { 
    clearImagePanel, 
    clearGridPanel,
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

    deleteImageFromLocalStorage(currentlyDisplayedImageAttributes.id);
    deleteImageDescriptionParagraphFromLocalStorage(currentlyDisplayedImageDescriptionParagraphAttributes);
    clearDescriptionPanel();
    clearImagePanel();
    clearGridPanel();
    disableDeleteButton();
    disableImageNavigationButtons();
    updateImageViewer();
  }
}