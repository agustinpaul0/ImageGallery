import { deleteImageFromLocalStorage } from "../storage/storageManager.js";
import { 
    clearImagePanel, 
    clearGridPanel,
    currentlyDisplayedImage,
    updateImageViewer,
    disableDeleteButton
} from "../utils/domUtilities.js";

export function removeImage() {
  if (currentlyDisplayedImage != null) {
    deleteImageFromLocalStorage(currentlyDisplayedImage.id);
    clearImagePanel();
    clearGridPanel();
    disableDeleteButton();
    updateImageViewer();
  }
}