import path from "path";

/**
 * Borra un archivo de imagen del filesystem dado su path público (ej: /uploads/123-foto.jpg).
 * No lanza error si el archivo no existe — solo lo registra en consola.
 *
 * @param {string} imagePath
 */
export default async function deleteImageFile(imagePath) {
  // Evita borrar archivos fuera de /public/uploads
  if (!imagePath.startsWith("/uploads/")) {
    console.warn(`Ruta de imagen inesperada, no se borra: ${imagePath}`);
    return;
  }

  const absolutePath = path.join(process.cwd(), "public", imagePath);
}