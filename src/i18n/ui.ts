export const locales = ['es', 'en'] as const
export type Locale = (typeof locales)[number]

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

const es = {
  code: 'es',
  htmlLang: 'es-MX',
  label: 'Español',
  otherLabel: 'English',
  meta: {
    homeTitle: 'Eduardo Saavedra — Software Engineer',
    homeDescription:
      'Software Engineer enfocado en backend, datos y productos completos. Casos de estudio de NeuraClinic, Comledge, Cestia y ChaosLab.',
    projectsTitle: 'Proyectos — Eduardo Saavedra',
    projectsDescription:
      'Casos de estudio de producto, arquitectura y decisiones de ingeniería.',
    notFoundTitle: 'Página no encontrada — Eduardo Saavedra',
  },
  a11y: {
    skip: 'Saltar al contenido',
    menu: 'Abrir menú de navegación',
    theme: 'Cambiar tema de color',
    external: 'Se abre en una pestaña nueva',
    gallery: 'Abrir captura ampliada',
    close: 'Cerrar',
    previous: 'Anterior',
    next: 'Siguiente',
    currentSection: 'Sección actual',
  },
  nav: {
    work: 'Proyectos',
    experience: 'Experiencia',
    capabilities: 'Capacidades',
    contact: 'Contacto',
    cv: 'CV',
    home: 'Inicio',
  },
  hero: {
    eyebrow: 'Software Engineer',
    greeting: 'Hola, soy Eduardo.',
    headline: 'Sistemas claros para problemas complejos.',
    lead: 'Diseño y construyo productos de software con foco en backend, modelado de datos y entrega completa. Me interesa que la arquitectura explique el producto, no que lo esconda.',
    availability: 'Disponible para nuevos retos',
    ctaProjects: 'Ver casos de estudio',
    ctaCv: 'Descargar CV',
    portraitAlt: 'Retrato de Eduardo Saavedra',
    statYears: 'de experiencia construyendo software',
    statDelivery: 'Entrega integral',
    statDeliveryDetail: 'Del modelo de datos a la interfaz y el despliegue.',
    statFocus: 'backend, datos e infraestructura',
  },
  sections: {
    workEyebrow: 'Trabajo seleccionado',
    workTitle: 'Productos, decisiones y contexto.',
    workLead:
      'Cuatro casos que muestran cómo paso del problema a una solución mantenible: un SaaS clínico en producción, una plataforma documental con permisos, una app de compras compartidas y un laboratorio de concurrencia en Go.',
    experienceEyebrow: 'Trayectoria',
    experienceTitle: 'Experiencia profesional',
    experienceLead:
      'Trabajo en equipos pequeños, con responsabilidad amplia sobre la entrega y atención a las prácticas que hacen sostenible el software.',
    capabilitiesEyebrow: 'Herramientas',
    capabilitiesTitle: 'Capacidades por especialidad',
    capabilitiesLead:
      'Tecnologías que he usado para construir y operar productos, agrupadas por el problema que resuelven.',
    educationEyebrow: 'Formación',
    educationTitle: 'Base académica',
    contactEyebrow: 'Hablemos',
    contactTitle: '¿Tienes un problema que valga la pena construir?',
    contactLead:
      'Estoy abierto a conversaciones sobre backend, modernización de sistemas y productos que necesitan claridad técnica.',
  },
  project: {
    role: 'Rol',
    period: 'Periodo',
    status: 'Estado',
    stack: 'Stack',
    highlights: 'Lo más relevante',
    allProjects: 'Todos los proyectos',
    backToProjects: 'Volver a proyectos',
    nextProject: 'Siguiente caso',
    live: 'Sitio en vivo',
    private: 'Proyecto privado',
    gallery: 'Galería',
    galleryTitle: 'Recorridos del producto',
    galleryLead: 'Recorridos del producto con datos de demostración.',
    demoData: 'Datos ficticios de demostración',
    caseStudy: 'Caso de estudio',
    readCase: 'Leer caso de estudio',
    repo: 'Código fuente',
    imageOf: 'de',
  },
  experience: {
    current: 'Actualidad',
    stack: 'Stack',
    details: 'Ver detalle',
    close: 'Cerrar detalle',
  },
  contact: {
    email: 'Escríbeme',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    cv: 'Currículum en PDF',
    availability: 'Abierto a oportunidades remotas y presenciales, con disponibilidad para reubicación.',
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    backToTop: 'Volver arriba',
  },
  notFound: {
    eyebrow: 'Error 404',
    title: 'Esta página no existe.',
    lead: 'Puede que el enlace haya cambiado o que la página se haya movido. Desde aquí puedes volver al inicio.',
    home: 'Ir al inicio',
  },
  mockup: {
    terminalTitle: 'chaoslab',
    terminalNote: 'Ejemplo ilustrativo de salida; no es una medición real.',
  },
}

const en: typeof es = {
  code: 'en',
  htmlLang: 'en',
  label: 'English',
  otherLabel: 'Español',
  meta: {
    homeTitle: 'Eduardo Saavedra — Software Engineer',
    homeDescription:
      'Software Engineer focused on backend, data and end-to-end product delivery. Case studies for NeuraClinic, Comledge, Cestia and ChaosLab.',
    projectsTitle: 'Projects — Eduardo Saavedra',
    projectsDescription:
      'Case studies covering product, architecture and engineering decisions.',
    notFoundTitle: 'Page not found — Eduardo Saavedra',
  },
  a11y: {
    skip: 'Skip to content',
    menu: 'Open navigation menu',
    theme: 'Toggle color theme',
    external: 'Opens in a new tab',
    gallery: 'Open larger screenshot',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
    currentSection: 'Current section',
  },
  nav: {
    work: 'Projects',
    experience: 'Experience',
    capabilities: 'Capabilities',
    contact: 'Contact',
    cv: 'Resume',
    home: 'Home',
  },
  hero: {
    eyebrow: 'Software Engineer',
    greeting: "Hi, I'm Eduardo.",
    headline: 'Clear systems for complex problems.',
    lead: 'I design and build software products with a focus on backend, data modeling and complete delivery. I care about architecture that explains the product instead of hiding it.',
    availability: 'Open to new challenges',
    ctaProjects: 'Explore case studies',
    ctaCv: 'Download resume',
    portraitAlt: 'Portrait of Eduardo Saavedra',
    statYears: 'of experience building software',
    statDelivery: 'End-to-end delivery',
    statDeliveryDetail: 'From data modeling to interface and deployment.',
    statFocus: 'backend, data and infrastructure',
  },
  sections: {
    workEyebrow: 'Selected work',
    workTitle: 'Products, decisions and context.',
    workLead:
      'Four cases that show how I move from a problem to a maintainable solution: a clinical SaaS in production, a document platform with permissions, a shared-purchases app and a Go concurrency lab.',
    experienceEyebrow: 'Track record',
    experienceTitle: 'Professional experience',
    experienceLead:
      'I work in small teams with broad ownership of delivery and a strong focus on the practices that make software sustainable.',
    capabilitiesEyebrow: 'Toolkit',
    capabilitiesTitle: 'Capabilities by specialty',
    capabilitiesLead:
      'Technologies I have used to build and operate products, grouped by the problem they solve.',
    educationEyebrow: 'Education',
    educationTitle: 'Academic foundation',
    contactEyebrow: "Let's talk",
    contactTitle: 'Do you have a problem worth building?',
    contactLead:
      'I am open to conversations about backend, system modernization and products that need technical clarity.',
  },
  project: {
    role: 'Role',
    period: 'Period',
    status: 'Status',
    stack: 'Stack',
    highlights: 'Highlights',
    allProjects: 'All projects',
    backToProjects: 'Back to projects',
    nextProject: 'Next case',
    live: 'Live site',
    private: 'Private project',
    gallery: 'Gallery',
    galleryTitle: 'Product walkthroughs',
    galleryLead: 'Product walkthroughs with demonstration data.',
    demoData: 'Fictional demonstration data',
    caseStudy: 'Case study',
    readCase: 'Read case study',
    repo: 'Source code',
    imageOf: 'of',
  },
  experience: {
    current: 'Present',
    stack: 'Stack',
    details: 'View details',
    close: 'Close details',
  },
  contact: {
    email: 'Email me',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    cv: 'PDF resume',
    availability: 'Open to remote and on-site opportunities, with willingness to relocate.',
  },
  footer: {
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },
  notFound: {
    eyebrow: 'Error 404',
    title: 'This page does not exist.',
    lead: 'The link may have changed or the page may have moved. You can return to the start from here.',
    home: 'Go home',
  },
  mockup: {
    terminalTitle: 'chaoslab',
    terminalNote: 'Illustrative output example; not a real measurement.',
  },
}

export const ui = { es, en } satisfies Record<Locale, unknown>
export type Dictionary = typeof es

export function getDictionary(locale: Locale): Dictionary {
  return ui[locale]
}

export function homePath(locale: Locale): string {
  return `/${locale}/`
}

export function projectsPath(locale: Locale): string {
  return `/${locale}/projects/`
}

export function projectPath(locale: Locale, slug: string): string {
  return `/${locale}/projects/${slug}/`
}

export function alternateLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es'
}

/** Swap the locale segment of a known localized path. */
export function swapLocale(pathname: string, target: Locale): string {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`
  const match = normalized.match(/^\/(es|en)(\/.*)?$/)
  if (!match) return homePath(target)
  return `/${target}${match[2] ?? '/'}`
}

export function formatPeriod(
  start: string,
  end: string | null,
  locale: Locale,
  currentLabel: string,
): string {
  const [startYear, startMonth] = start.split('-').map(Number)
  const monthNames = {
    es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  }
  const startLabel = `${monthNames[locale][startMonth - 1]} ${startYear}`
  if (!end) return `${startLabel} — ${currentLabel}`
  const [endYear, endMonth] = end.split('-').map(Number)
  return `${startLabel} — ${monthNames[locale][endMonth - 1]} ${endYear}`
}
