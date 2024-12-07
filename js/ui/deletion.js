import {
  updateImageViewer,
  deleteImageFromLocalStorage,
} from "../storage/storageManager.js";
import { 
    clearImagePanel, 
    clearGridPanel,
    currentlyDisplayedImage,
    disableDeleteButton
} from "../utils/domUtils.js";


export function removeImage() {
  if (currentlyDisplayedImage != null) {
    deleteImageFromLocalStorage(currentlyDisplayedImage.id);
    clearImagePanel();
    clearGridPanel();
    disableDeleteButton();
    updateImageViewer();
  }
}
