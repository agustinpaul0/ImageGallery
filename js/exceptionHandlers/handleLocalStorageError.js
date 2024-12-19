export function handleLocalStorageError(error) {
  if (error.name === "QuotaExceededError") {
    alert("No hay suficiente espacio en el almacenamiento local");
  } else {
    console.error("Error al interactuar con el localStorage", error);
  }
}
