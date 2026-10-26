import { readFileSync } from 'node:fs'

import type { Plugin } from 'vite'

export function startupHtml(): Plugin {
  const read = (file: string) => readFileSync(new URL(file, import.meta.url), 'utf8')
  const logo = () =>
    read('../public/favicon.svg')
      .replace('<svg ', '<svg class="startup-logo" ')
      .replace(/fill="(?!none)[^"]+"/g, 'fill="currentColor"')
      .trim()
  const render = (html: string) => html.replaceAll('<!-- startup-logo -->', () => logo())
  const offline = () =>
    render(read('./offline.html')).replace('/* startup-styles */', () =>
      read('../public/styles/startup.css')
    )

  return {
    name: 'startup-html',
    transformIndexHtml: render,
    configureServer(server) {
      server.middlewares.use('/offline.html', (_request, response) => {
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.end(offline())
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'offline.html', source: offline() })
    }
  }
}
