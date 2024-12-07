import { updateImageViewer } from "../storage/storageManager.js";
import { 
    enableDeleteButton,
    updateCurrentlyDisplayedImage
} from "../utils/domUtils.js";

import { extractAttributes } from "../upload/fileUpload.js";

export function handleImageClick(imgElement) {
  const imgAttributes = extractAttributes(imgElement);
  updateCurrentlyDisplayedImage(imgAttributes);
  updateImageViewer();
  enableDeleteButton();
}
