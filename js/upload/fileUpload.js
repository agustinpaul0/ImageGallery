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

export async function handleFileUpload(event) {
  const spinner = getDomElement("loading-spinner");
  const spinnerContainer = getDomElement("container");
  spinnerContainer.classList.add("imagesOnLoad");

  showElement(spinner);

  const files = event.target.files;
  const totalFiles = files.length;

  if (totalFiles === 0) {
    spinnerContainer.classList.remove("imagesOnLoad");
    hideElement(spinner);
    return;
  }

  try {
    await processFiles(Array.from(files));
  } catch (error) {
    console.error("Error processing the files: ", error);
  } finally {
    spinnerContainer.classList.remove("imagesOnLoad");
    hideElement(spinner);
    resetFileInput(event);
  }
}

async function processFiles(files) {
  for (const file of files) {
    await handleFile(file);
    //This is crucial as it allows the navigator to render the DOM 
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}

async function handleFile(file, onFileProcessed) {
  resizeImage(file, 800, 600, 0.7, (resizedDataUrl) => {
    const imageElement = createImageElement(resizedDataUrl);
    const imageAttributes = extractAttributes(imageElement);
    const imageDescriptionParagraph = createDescriptionParagraph(imageAttributes);
    const imageDescriptionParagraphAttributes = extractImageDescriptionParagraphAttributes(imageDescriptionParagraph);

    saveImageAttributesToLocalStorage(imageAttributes);
    saveImageDescriptionParagraphToLocalStorage(imageDescriptionParagraphAttributes);
  });
}

function resetFileInput(event) {
  event.target.value = "";
}
