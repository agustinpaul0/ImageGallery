# Image Gallery Application

## Description
This application is an interactive photo gallery built using HTML, CSS, and JavaScript. It allows users to upload images from their device, browse the available images, delete them, and maintain the gallery persistently by using Local Storage. Additionally, the application includes a feature for adding descriptions to images, also stored persistently in Local Storage.

## Features
1. **Upload Images:** Users can upload images from their device. These images are dynamically added to the gallery.
2. **View Gallery:** Uploaded images are displayed in an organized gallery.
3. **Navigate Through Images:** Users can select individual images and navigate forward or backward in the gallery.
4. **Delete Images:** Selected images can be removed from both the gallery and local storage.
5. **Image Descriptions:** Each image can have a brief description (up to 300 words). These descriptions are editable and stored persistently in Local Storage.
6. **Scroll Through Gallery:** The gallery is scrollable, allowing users to view all uploaded images.
7. **Persistence:** By using Local Storage, images and their descriptions remain available even after reloading the page or closing the browser.
8. **Main Menu Interface:** A menu provides easy access to either upload new images or view the gallery.

## How to Use
1. **Open the application:** Click the link provided on GitHub Pages. The application must be run on a server to function correctly. **It cannot be executed directly from a local file (index.html) due to DOM restrictions.**
2. **Upload images:** Click the "Upload File" button and select images from the folder `testImages` available in the GitHub Project or from your own device.
3. **Explore the gallery:** Click "Open Gallery" to view uploaded images.
4. **Navigate:** Use the "Previous" and "Next" buttons to move through the images.
5. **Add/Edit Descriptions:** Each image can have an editable description. Click on an image to add or edit its description (maximum of 300 words).
6. **Delete:** Select an image and click "Delete Image" to remove it from the gallery.
7. **Scroll:** The gallery is scrollable to view all the images.
8. **Return to the main menu:** Click "Back to Home" to go back to the main menu.

## Technologies Used
- **HTML5:** For content structure.
- **CSS3:** For design and styling.
- **JavaScript:** For DOM manipulation, event handling, and interaction with Local Storage.

## Technical Notes
- Images and their descriptions are stored in Local Storage. Images are stored as Base64 strings, and descriptions are saved as text.
- The gallery uses dynamic DOM manipulation to add, display, and delete images, as well as to update descriptions.

## Known Limitations
1. **Local Storage Size:** Browsers have a storage limit (approximately 5 MB).
2. **Compatibility:** Requires a modern browser supporting HTML5, CSS3, and ES6 JavaScript.
3. **Security:** Since images and descriptions are stored locally, they are not protected against access if the device is shared.
4. **Errors:** If too many images are uploaded, the app tends to fail at correctly deleting the images and consistently maintaining the information uploaded.

## Contribution
This project is open for contributions. Feel free to submit **Pull Requests** to improve the functionality or fix known bugs, such as the issues with Lakitu or the poor contrast between the Buzzy Beetles and the last background.

## Author
Developed by Paul Agustín.

## License
This project is open-source and can be modified and distributed under the MIT license.
