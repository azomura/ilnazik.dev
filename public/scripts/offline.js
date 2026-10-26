;(() => {
  const root = document.documentElement
  const screen = document.getElementById('startup-screen')

  const title = screen?.querySelector('h1')
  const description = screen?.querySelector('p')

  const originalTitle = title?.textContent
  const originalDescription = description?.textContent

  const update = () => {
    const offline = !navigator.onLine

    root.dataset.network = offline ? 'offline' : 'online'

    if (title) title.textContent = offline ? 'Нет подключения к интернету' : originalTitle
    if (description) {
      description.textContent = offline
        ? 'Проверьте подключение. Сайт появится, когда связь восстановится.'
        : originalDescription
    }
  }

  window.addEventListener('offline', update)
  window.addEventListener('online', update)

  update()

  if (!isSecureContext || !('serviceWorker' in navigator)) {
    root.dataset.offlineSupport = 'requires-https'
    return
  }

  root.dataset.offlineSupport = 'installing'
  navigator.serviceWorker
    .register('/offline-worker.js', {
      scope: '/',
      updateViaCache: 'none'
    })
    .then(() => navigator.serviceWorker.ready)
    .then(() => {
      root.dataset.offlineSupport = 'ready'
    })
    .catch(error => {
      root.dataset.offlineSupport = 'error'
      console.error('Offline page registration failed:', error)
    })
})()
