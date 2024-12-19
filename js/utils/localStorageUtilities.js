import {
  handleImageClick 
} from '../ui/handleImageClick.js';

export function getSavedImagesFromLocalStorage() {
  let savedImages = JSON.parse(localStorage.getItem("uploadedImages"));
  if (!Array.isArray(savedImages)) {
    savedImages = [];  
  }
  return savedImages;
}

export function getSavedImageDescriptionParagraphsFromLocalStorage() {
  let savedImageDescriptionParagraphs = JSON.parse(localStorage.getItem("imageDescriptionParagraphs"));
  if (!Array.isArray(savedImageDescriptionParagraphs)) {
    savedImageDescriptionParagraphs = [];  
  }
  return savedImageDescriptionParagraphs;
}

export function getImageElementFromLocalStorage(imgAttr) {
  const imgElement = document.createElement("img");
  imgElement.src = imgAttr.src;
  imgElement.alt = imgAttr.alt;
  imgElement.id = imgAttr.id;
  imgElement.className = imgAttr.classList.join(" ");
  imgElement.addEventListener("click", () => handleImageClick(imgElement));
  return imgElement;
}

export function getImageDescriptionParagraphFromLocalStorage(imgId) {

  const array = imgId.split("-");
  const id = array[array.length - 1];

  let savedImageDescriptionParagraphs = JSON.parse(localStorage.getItem("imageDescriptionParagraphs"));
  const imgDescriptionParagraph = savedImageDescriptionParagraphs.find(imgDescriptionParagraphAttr => {
    let currentIdArray = imgDescriptionParagraphAttr.id.split("-");
    let currentDescriptionParagraphId = currentIdArray[currentIdArray.length - 1]; 
    return currentDescriptionParagraphId == id;
  }
  );

  const textarea = document.createElement("textarea");

  textarea.id = imgDescriptionParagraph.id;
  textarea.value = imgDescriptionParagraph.value;
  textarea.placeholder = "Add a description of your image";
  textarea.maxLength = 300;

  return textarea;
}