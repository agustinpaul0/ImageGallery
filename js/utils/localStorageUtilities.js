import { handleImageClick } from '../ui/handleImageClick.js';

export function getSavedImageAttributesFromLocalStorage() {
  let savedImageAttributes = JSON.parse(localStorage.getItem("uploadedImages"));
  if (!Array.isArray(savedImageAttributes)) {
    savedImageAttributes = [];  
  }
  return savedImageAttributes;
}

export function getSavedImageDescriptionParagraphsFromLocalStorage() {
  let savedImageDescriptionParagraphs = JSON.parse(localStorage.getItem("imageDescriptionParagraphs"));
  if (!Array.isArray(savedImageDescriptionParagraphs)) {
    savedImageDescriptionParagraphs = [];  
  }
  return savedImageDescriptionParagraphs;
}

export function createImageElementFromImageAttributes(imageAttributes) {
  const imageElement = document.createElement("img");
  imageElement.src = imageAttributes.src;
  imageElement.alt = imageAttributes.alt;
  imageElement.id = imageAttributes.id;
  imageElement.className = imageAttributes.classList.join(" ");
  imageElement.addEventListener("click", () => handleImageClick(imageElement));
  return imageElement;
}

export function getImageDescriptionParagraphFromLocalStorage(imageId) {

  const imageIdArray = imageId.split("-");
  const imageIdNumber = imageIdArray[imageIdArray.length - 1];

  let savedImageDescriptionParagraphs = JSON.parse(localStorage.getItem("imageDescriptionParagraphs"));
  const matchingImageDescriptionParagraph  = savedImageDescriptionParagraphs.find(
    (imageDescriptionParagraphAttributes) => {
    const currentIdArray = imageDescriptionParagraphAttributes.id.split("-");
    const currentDescriptionParagraphId = currentIdArray[currentIdArray.length - 1]; 
    return currentDescriptionParagraphId == imageIdNumber;
  }
  );

  const textarea = document.createElement("textarea");

  textarea.id = matchingImageDescriptionParagraph.id;
  textarea.value = matchingImageDescriptionParagraph.value;
  textarea.placeholder = "Add a description of your image";
  textarea.maxLength = 300;

  return textarea;
}