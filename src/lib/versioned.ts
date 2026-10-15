import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Añade a un archivo de `public/` un parámetro con el hash de su contenido
 * (`/pfp.webp` -> `/pfp.webp?v=1a2b3c4d`).
 *
 * El servidor no envía Cache-Control, así que los navegadores deciden solos
 * cuánto tiempo guardan un archivo y, si conserva el nombre, siguen mostrando
 * la versión anterior tras un deploy. Con el hash en la URL, cambiar el
 * archivo cambia la URL y se descarga de nuevo; si no cambia, sigue en caché.
 *
 * Se ejecuta al compilar (Node), con la raíz del proyecto como directorio de
 * trabajo, tanto en `astro dev` como en el CI.
 */
export const versioned = (path: string) => {
  try {
    const file = readFileSync(join(process.cwd(), 'public', path))
    const hash = createHash('sha256').update(file).digest('hex').slice(0, 8)
    return `${path}?v=${hash}`
  } catch {
    // Si el archivo no está en public/ (p. ej. una URL externa), se deja igual.
    return path
  }
}
