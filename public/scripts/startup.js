;(() => {
  if (location.protocol === 'http:' && location.hostname.endsWith('.a.2na.am')) {
    location.replace(`https:${location.href.slice(5)}`)
    return
  }

  performance.mark('startup-start')

  const root = document.documentElement

  const read = key => {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch {
      return null
    }
  }

  const theme = read('app-theme')
  const dark =
    theme === 'system' ? matchMedia('(prefers-color-scheme: dark)').matches : theme !== 'light'

  root.classList.toggle('dark', dark)
  root.style.colorScheme = dark ? 'dark' : 'light'

  const accent = read('app-accent')
  if (['#e83d40', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7'].includes(accent)) {
    root.style.setProperty('--brand-accent', accent)
  }

  const lang = read('app-language')
  if (typeof lang === 'string' && /^[a-z]{2}$/.test(lang)) root.lang = lang

  window.addEventListener(
    'error',
    event => {
      if (root.dataset.startup === 'ready') return
      if (event instanceof ErrorEvent || event.target?.type === 'module') {
        root.dataset.startup = 'error'
      }
    },
    true
  )

  document.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('[data-startup-retry]')) {
      location.reload()
    }
  })
})()
