export function handleLocalStorageError(error) {
  if (error.name === "QuotaExceededError") {
    alert("There is not enough space in local storage");
  } else {
    console.error("Error interacting with localStorage", error);
  }
}