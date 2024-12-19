export function resizeImage(file, maxWidth, maxHeight, quality, callback) {
  const reader = new FileReader();

  reader.onload = () => handleImageLoad(reader.result, maxWidth, maxHeight, quality, callback);
  reader.readAsDataURL(file);
}

function handleImageLoad(imageData, maxWidth, maxHeight, quality, callback) {
  const image = new Image();

  image.onload = () => resizeAndExportImage(image, maxWidth, maxHeight, quality, callback);
  image.src = imageData;
}

function resizeAndExportImage(image, maxWidth, maxHeight, quality, callback) {
  const { width, height } = calculateNewDimensions(image.width, image.height, maxWidth, maxHeight);

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, width, height);

  const resizedImage = canvas.toDataURL("image/jpeg", quality);
  callback(resizedImage);
}

function calculateNewDimensions(originalWidth, originalHeight, maxWidth, maxHeight) {
  let width = originalWidth;
  let height = originalHeight;

  if (width > maxWidth || height > maxHeight) {
    if (width / height > maxWidth / maxHeight) {
      height = (height * maxWidth) / width;
      width = maxWidth;
    } else {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }
  }

  return { width, height };
}

function createCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}