import { getImageDescriptionParagraphFromLocalStorage } from '../utils/localStorageUtilities.js';
import { 
  saveCurrentDescription,
  deleteCurrentDescription 
} from '../storage/storageManager.js';
import { 
    enableDeleteButton,
    updateImageViewer,
    extractAttributes,
    updateCurrentlyDisplayedImage,
    enableImageNavigationButtons,
    updateCurrentlyDisplayedDescriptionParagraph
} from '../utils/domUtilities.js';

export function handleImageClick(imgElement) {
  const imgAttributes = extractAttributes(imgElement);
  saveCurrentDescription();
  deleteCurrentDescription();
  updateCurrentlyDisplayedImage(imgAttributes);
  const currentDescriptionParagraph = getImageDescriptionParagraphFromLocalStorage(imgAttributes.id);
  updateCurrentlyDisplayedDescriptionParagraph(currentDescriptionParagraph);
  enableDeleteButton();
  enableImageNavigationButtons();
  updateImageViewer(imgElement);
}
