# Petstore API — Pruebas automatizadas

Un conjunto de pruebas automatizadas (Cucumber + Playwright) para validar las principales funcionalidades de la API Petstore.

## Contenido

- Alcance y escenarios cubiertos
- Requisitos e instalación
- Cómo ejecutar las pruebas
- Configuración de la Base URL
- Ruta del reporte
- Estructura recomendada para añadir tests
- Depuración y notas

## Alcance

Los tests incluidos cubren las siguientes acciones:

- Consulta de una orden de compra
- Búsqueda de una orden de compra creada
- Verificación del inventario de ventas
- Eliminación de una orden de compra

## Requisitos

- Node.js (se recomienda >= 16)
- npm

Instala dependencias:

```powershell
npm install
```

## Ejecutar las pruebas

Ejecutar la suite completa (usa `config/cucumber.js`):

```powershell
npm run cucumber
```

Esto facilita apuntar a entornos distintos (staging, local, CI) desde la línea de comandos.

## Ruta del reporte

Después de la ejecución, el reporte HTML se genera en:

```
reports/cucumber-report.html
```

También existe el fichero JSON usado para el reporte:

```
reports/cucumber-report.json
```



