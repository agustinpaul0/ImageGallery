import { updateImageViewer } from "../utils/domUtilities.js";
import { extractAttributes } from "../utils/domUtilities.js";
import { 
    enableDeleteButton,
    updateCurrentlyDisplayedImage
} from "../utils/domUtilities.js";

export function handleImageClick(imgElement) {
  const imgAttributes = extractAttributes(imgElement);
  updateCurrentlyDisplayedImage(imgAttributes);
  updateImageViewer();
  enableDeleteButton();
}
