export function resizeImage(file, maxWidth, maxHeight, quality, callback) {
  const reader = new FileReader();

  reader.onload = () => handleImageLoad(reader.result, maxWidth, maxHeight, quality, callback);
  reader.readAsDataURL(file);
}

function handleImageLoad(imageData, maxWidth, maxHeight, quality, callback) {
  const img = new Image();

  img.onload = () => resizeAndExportImage(img, maxWidth, maxHeight, quality, callback);
  img.src = imageData;
}

function resizeAndExportImage(img, maxWidth, maxHeight, quality, callback) {
  const { width, height } = calculateNewDimensions(img.width, img.height, maxWidth, maxHeight);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

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