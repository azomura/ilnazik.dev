# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
    "$schema": "./node_modules/oxlint/configuration_schema.json",
    "plugins": ["react", "typescript", "oxc"],
    "options": {
        "typeAware": true
    },
    "rules": {
        "react/rules-of-hooks": "error",
        "react/only-export-components": ["warn", { "allowConstantExport": true }]
    }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## API и предпросмотр ссылок

Запуск фронтенда: `bun install` и `bun run dev`.
Запуск бэкенда из `../backend`: `uv sync` и `uv run uvicorn main:app --reload --host 127.0.0.1 --port 8000`.

`PreviewProvider` автоматически показывает метаданные внешних HTTP(S)-ссылок при наведении или фокусе. Для карточки разработчика используйте `data-preview="developer"` на ссылке или фокусируемом элементе.
Axios-клиент, обработка ошибок, DTO, модули, ключи и TanStack Query-хуки находятся в `src/services/api`.
Общий QueryProvider подключён в `src/main.tsx`.

По умолчанию клиент обращается к `/api/v1`; Vite проксирует `/api` на `http://127.0.0.1:8000`, удаляя префикс `/api`.
Переменные описаны в `.env.example`. Для production настройте такой же reverse proxy либо задайте `VITE_API_URL` с адресом API и разрешите домен фронтенда в `CORS_ORIGINS` бэкенда.

Запросы отменяются при необходимости, кешируются и объединяются для одинаковых ссылок.
Если сайт недоступен, карточка сохраняет базовую информацию о ссылке.

## Генерация API

Модели и `src/services/api/generated.ts` генерируются Orval **8.23.0** из FastAPI OpenAPI.
При запущенном бэкенде выполните `bun run api:generate`.
По умолчанию схема берётся с `http://127.0.0.1:8000/openapi.json`; другой адрес можно передать через `API_OPENAPI_URL`.
Сгенерированные файлы не редактируйте вручную — меняйте схемы FastAPI и повторяйте генерацию.
