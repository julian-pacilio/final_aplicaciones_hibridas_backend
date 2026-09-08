function uploadFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No se recibió ningún archivo" });
  }

  const filePath = `/uploads/${req.file.filename}`;

  return res.status(201).json({ path: filePath });
}

export default { uploadFile };