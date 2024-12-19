import { resizeImage } from '../utils/utilityFunctions.js';
import { 
  saveImageAttributesToLocalStorage,
  saveImageDescriptionParagraphToLocalStorage
} from '../storage/storageManager.js';
import { 
  createDescriptionParagraph,
  createImageElement,
  extractAttributes,
  extractImageDescriptionParagraphAttributes,
  hideElement,
  showElement,
  getDomElement
} from '../utils/domUtilities.js';

export function handleFileUpload(event) {
  const spinner = getDomElement("loading-spinner");
  const spinnerContainer = getDomElement("container");
  spinnerContainer.classList.add("imagesOnLoad");

  showElement(spinner); 

  const files = event.target.files;
  const totalFiles = files.length;
  let processedFiles = 0;  

  if (totalFiles === 0) {
    spinnerContainer.classList.remove("imagesOnLoad");
    hideElement(spinner);
    return;
  }

  processFiles(Array.from(files), () => {
    processedFiles++;

    if (processedFiles === totalFiles) {
      spinnerContainer.classList.remove("imagesOnLoad");
      hideElement(spinner);
    }
  });

  resetFileInput(event);
}

//onFileProcessed is a callback function
function processFiles(files, onFileProcessed) {
  files.forEach((file) => {
    handleFile(file, onFileProcessed);
  });
}

//onFileProcessed is a callback function
function handleFile(file, onFileProcessed) {
  resizeImage(file, 800, 600, 0.7, (resizedDataUrl) => {
    const imageElement = createImageElement(resizedDataUrl);
    const imageAttributes = extractAttributes(imageElement);
    const imageDescriptionParagraph = createDescriptionParagraph(imageAttributes);
    const imageDescriptionParagraphAttributes = extractImageDescriptionParagraphAttributes(imageDescriptionParagraph);

    saveImageAttributesToLocalStorage(imageAttributes);
    saveImageDescriptionParagraphToLocalStorage(imageDescriptionParagraphAttributes);

    onFileProcessed();
  });
}

function resetFileInput(event) {
  event.target.value = "";
}
