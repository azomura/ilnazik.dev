import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

import tailwindcss from '@tailwindcss/vite'

import path from 'path'

import { startupHtml } from './config/startup-html.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [startupHtml(), react(), tailwindcss()],
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [{
              name: 'react-runtime',
              test: /\/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom)\//
            }]
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src')
      }
    },
    server: {
      host: true,
      port: 3000,
      allowedHosts: ['.ilnazik.dev', '.a.2na.am'],
      proxy: {
        '/api': {
          target: env.API_PROXY_TARGET || 'http://127.0.0.1:8000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
