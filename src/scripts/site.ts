const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

try {
  const locale = document.documentElement.lang.toLowerCase().startsWith('es') ? 'es' : 'en'
  localStorage.setItem('language', locale)
} catch {
  /* Language memory is optional. */
}

function setupReveal() {
  const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

  if (!items.length) return

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'))
    return
  }

  document.documentElement.classList.add('reveal-ready')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )

  items.forEach((item) => {
    if (item.getBoundingClientRect().top < window.innerHeight) {
      item.classList.add('is-visible')
    } else {
      observer.observe(item)
    }
  })
}

setupReveal()
