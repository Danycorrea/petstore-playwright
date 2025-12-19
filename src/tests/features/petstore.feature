Feature: Petstore API - Gestión de órdenes
    Feature para probar la API pública de Petstore (https://petstore.swagger.io/) usando Playwright + Cucumber.
    Background:
    Given La API de Petstore está disponible

    Scenario: Crear y consultar una orden de compra
    When Creo una orden de compra con id generado
    Then la creación responde con código 200
    When Consulto la orden por id creada
    Then la respuesta contiene el id creado

    Scenario: Buscar la orden de compra creada
    When Creo una orden de compra con id generado
    Then la creación responde con código 200
    When Busco la orden de compra por id
    Then obtengo una respuesta con código 200 y el id coincide

    Scenario: Verificar el inventario de ventas
    When Consulto el inventario de ventas
    Then la respuesta tendrá código 200 y contendrá claves de estados

    Scenario: Eliminar una orden de compra
    When Creo una orden de compra con id generado
    Then la creación responde con código 200
    When Elimino la orden por id creada
    Then la eliminación responde con código 200
    When Consulto la orden por id creada
    Then la respuesta tendrá código 404
