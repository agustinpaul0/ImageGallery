import { resizeImage } from '../utils/utilityFunctions.js';
import { 
  saveImageToLocalStorage,
  saveImageDescriptionParagraphToLocalStorage
} from '../storage/storageManager.js';
import { 
  createDescriptionParagraph,
  createImageElement,
  extractAttributes,
  extractImgDescriptionParagraphAttributes,
  hideElement,
  showElement
} from '../utils/domUtilities.js';

export function handleFileUpload(event) {
  const spinner = document.getElementById("loading-spinner");
  const container = document.getElementById("container");
  
  container.classList.add("imagesOnLoad");
  showElement(spinner); 

  const files = event.target.files;
  const totalFiles = files.length;
  let processedFiles = 0;  

  if (totalFiles === 0) {
    container.classList.remove("imagesOnLoad");
    hideElement(spinner);
    return;
  }

  processFiles(Array.from(files), () => {
    processedFiles++;

    if (processedFiles === totalFiles) {
      container.classList.remove("imagesOnLoad");
      hideElement(spinner);
    }
  });

  resetFileInput(event);
}

//onFileProcessed is a callback function
function processFiles(files, onFileProcessed) {
  files.forEach(file => {
    handleFile(file, onFileProcessed);
  });
}

//onFileProcessed is a callback function
function handleFile(file, onFileProcessed) {
  resizeImage(file, 800, 600, 0.7, resizedDataUrl => {
    const imgElement = createImageElement(resizedDataUrl);
    const imgAttributes = extractAttributes(imgElement);
    const imgDescriptionParagraph = createDescriptionParagraph(imgAttributes);
    const imgDescriptionParagraphAttributes = extractImgDescriptionParagraphAttributes(imgDescriptionParagraph);

    saveImageToLocalStorage(imgAttributes);
    saveImageDescriptionParagraphToLocalStorage(imgDescriptionParagraphAttributes);

    onFileProcessed();
  });
}

function resetFileInput(event) {
  event.target.value = "";
}
