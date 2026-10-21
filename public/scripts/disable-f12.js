document.addEventListener(
  'keydown',
  event => {
    if (event.key === 'F12' || event.code === 'F12') {
      event.preventDefault()
      event.stopImmediatePropagation()
    }
  },
  true
)
