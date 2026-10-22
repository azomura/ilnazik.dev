import { defineConfig } from 'orval'

export default defineConfig({
  client: {
    input: {
      target: process.env.API_OPENAPI_URL || 'http://127.0.0.1:8000/openapi.json'
    },
    output: {
      target: './src/services/api/generated.ts',
      schemas: './src/services/api/models',
      indexFiles: true
    }
  }
})
