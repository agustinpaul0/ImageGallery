import { getImageDescriptionParagraphFromLocalStorage } from '../utils/localStorageUtilities.js';
import { updateCurrentDescriptionParagraph } from '../storage/storageManager.js';
import { 
    enableDeleteButton,
    updateImageViewer,
    extractAttributes,
    updateCurrentlyDisplayedImage,
    enableImageNavigationButtons,
    updateCurrentlyDisplayedDescriptionParagraph,
    deleteCurrentDescriptionParagraphFromDOM
} from '../utils/domUtilities.js';

export function handleImageClick(imgElement) {
  const imgAttributes = extractAttributes(imgElement);
  const currentDescriptionParagraph = getImageDescriptionParagraphFromLocalStorage(imgAttributes.id);

  updateCurrentDescriptionParagraph();
  deleteCurrentDescriptionParagraphFromDOM();

  updateCurrentlyDisplayedImage(imgAttributes);
  updateCurrentlyDisplayedDescriptionParagraph(currentDescriptionParagraph);

  enableDeleteButton();
  enableImageNavigationButtons();
  updateImageViewer();
}
