# Playwright + Cucumber starter (API + UI)

Breve proyecto de ejemplo que combina Playwright y Cucumber (Gherkin) para pruebas E2E y de API.

## Contenido
- `src/tests/features` - archivos `.feature` con escenarios en Gherkin.
- `src/tests/step-definitions` - implementaciones de pasos en TypeScript.
- `src/tests/support/api.ts` - helper centralizado para la Base URL y contexto API.
- `config/cucumber.js` - configuración de Cucumber used por `npm run cucumber`.

## Requisitos
- Node.js (>=16 recomendado)
- npm

Instala dependencias:

```powershell
npm install
```

## Ejecutar las pruebas

Ejecuta la suite completa de Cucumber/Playwright:

```powershell
npm run cucumber
```

Ejecutar una sola feature (opcional):

```powershell
# Ejecuta cucumber-js directamente apuntando a la feature
npx cucumber-js src/tests/features/petstore.feature --require-module ts-node/register --require src/tests/step-definitions
```

Observa que el proyecto ya incluye un script `npm run cucumber` que usa `config/cucumber.js`.

## Base URL centralizada para APIs

La Base URL usada por las pruebas API está centralizada en `src/tests/support/api.ts` como `PETSTORE_BASE`. Para cambiarla sin editar código, define la variable de entorno `PETSTORE_BASE_URL` antes de ejecutar las pruebas:

```powershell
# Temporal para la sesión actual
$env:PETSTORE_BASE_URL='https://petstore.swagger.io/v2'; npm run cucumber
```

Esto permite apuntar a entornos distintos (staging, local, etc.) desde CI sin tocar los tests.

## Estructura recomendada para añadir tests

- Añadir nuevas features en `src/tests/features/*.feature` (Gherkin en español).
- Añadir/implementar pasos en `src/tests/step-definitions/*.ts` y reutilizar `getApiContext()` y `buildUrl()` desde `src/tests/support/api.ts` para llamadas HTTP.

## Depuración rápida
- Si una prueba falla por llamadas HTTP, revisa conectividad de red y la variable `PETSTORE_BASE_URL`.
- Puedes añadir logs o adjuntar la respuesta en los step-definitions usando `console.log(await response.text())` para diagnosticar.

## Notas
- Este repo es un starter: puedes refactorizar `src/tests/support/api.ts` para añadir retries, timeouts o logging centralizado.
- Mantén los escenarios legibles y los step-definitions pequeños para facilitar mantenimiento.

Si quieres, puedo añadir: un wrapper HTTP con logging/retries, ejemplos de CI (GitHub Actions) o integración con reportes HTML.