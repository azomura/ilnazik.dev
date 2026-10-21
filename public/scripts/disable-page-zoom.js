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

  document.addEventListener(
    'touchmove',
    event => {
      if (event.touches.length > 1) event.preventDefault()
    },
    { capture: true, passive: false }
  )
})()
