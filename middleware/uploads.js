import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "public", "uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

function fileFilter(req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido. Solo se aceptan JPG, PNG, SVG o WEBP."));
  }
}

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).single("image");


export async function processImage(req, res, next) {
    if (!req.file) return next();

    try {
        const originalPath = req.file.path;
        const processedPath = originalPath.replace(/(\.\w+)$/, '-processed$1');

        await sharp(originalPath)
            .resize(1200, 400, { fit: 'cover' })
            .toFile(processedPath);

        fs.unlinkSync(originalPath); // Borra el original sin procesar
        fs.renameSync(processedPath, originalPath); // Archivo final con el nombre esperado

        next();
    } catch (err) {
        next(err);
    }
}