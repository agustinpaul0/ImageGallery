export function showGalleryScreen() {
  toggleScreens("home-screen", "gallery-screen");
}

export function showHomeScreen() {
  toggleScreens("gallery-screen", "home-screen");
}

function toggleScreens(hideScreenId, showScreenId) {
  document.getElementById(hideScreenId).classList.add("hidden");
  document.getElementById(showScreenId).classList.remove("hidden");
}
