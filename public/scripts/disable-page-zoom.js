;(() => {
  document.addEventListener(
    'keydown',
    event => {
      const zoomKeys = ['+', '=', '-', '_', '0']
      const zoomCodes = ['Equal', 'Minus', 'Digit0', 'NumpadAdd', 'NumpadSubtract', 'Numpad0']
      if (
        (event.ctrlKey || event.metaKey) &&
        (zoomKeys.includes(event.key) || zoomCodes.includes(event.code))
      ) {
        event.preventDefault()
      }
    },
    true
  )

  document.addEventListener(
    'wheel',
    event => {
      if (event.ctrlKey || event.metaKey) event.preventDefault()
    },
    { capture: true, passive: false }
  )

  for (const eventName of ['gesturestart', 'gesturechange', 'gestureend']) {
    document.addEventListener(eventName, event => event.preventDefault(), {
      capture: true,
      passive: false
    })
  }

  const preventPinch = event => {
    if (event.touches.length > 1) event.preventDefault()
  }

  let blockingPinch = false

  const updatePinch = event => {
    const next = event.touches.length > 1
    if (next === blockingPinch) return

    blockingPinch = next
    if (next) {
      document.addEventListener('touchmove', preventPinch, { capture: true, passive: false })
    } else {
      document.removeEventListener('touchmove', preventPinch, true)
    }
  }

  for (const eventName of ['touchstart', 'touchend', 'touchcancel']) {
    document.addEventListener(eventName, updatePinch, { capture: true, passive: true })
  }
})()
