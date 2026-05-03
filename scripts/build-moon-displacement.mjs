/**
 * Builds a web-friendly height proxy from the lunar color map so displacement
 * works in the browser without a TIFF decoder. For full LOLA crater detail,
 * replace public/textures/moon/lunar_displacement.png with a normalized export
 * from NASA CGI Moon Kit displacement (convert TIFF → PNG offline).
 */
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const colorPath = path.join(root, "public", "textures", "moon", "lunar_color.jpg");
const outPath = path.join(root, "public", "textures", "moon", "lunar_displacement.png");

await sharp(colorPath)
  .greyscale()
  .blur(14)
  .normalize()
  .png({ compressionLevel: 9 })
  .toFile(outPath);

console.log("Wrote", outPath);
