/**
 * Títulos de las secciones de la página. Es la única fuente: los componentes los
 * usan como encabezado, y de ellos salen el `id` de cada sección (ancla) y las
 * etiquetas del menú lateral, así que no pueden desincronizarse.
 */
export const SECTION_TITLES = {
  about: 'Sobre mí',
  experience: 'Experiencia',
  projects: 'Proyectos',
  education: 'Educación',
  certificates: 'Certificaciones',
  skills: 'Habilidades',
} as const

/** "Sobre mí" -> "sobre-mi": minúsculas, sin tildes y con guiones. */
export const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
