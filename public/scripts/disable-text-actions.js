;(() => {
  const style = document.createElement('style')
  style.textContent = `
    html, body, body * {
      -webkit-user-select: none !important;
      user-select: none !important;
      -webkit-touch-callout: none !important;
    }
  `
  document.head.append(style)

  for (const eventName of ['selectstart', 'copy', 'cut', 'dragstart']) {
    document.addEventListener(eventName, event => event.preventDefault(), true)
  }

  document.addEventListener(
    'keydown',
    event => {
      if ((event.ctrlKey || event.metaKey) && ['a', 'c', 'x'].includes(event.key.toLowerCase())) {
        event.preventDefault()
      }
    },
    true
  )
})()
