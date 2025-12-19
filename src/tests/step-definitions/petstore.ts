import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import OrderApi from '../pom/orderApi';

type CustomWorld = {
  orderApi?: OrderApi;
  createdOrderId?: number | null;
  lastResponse?: any;
};

Given('La API de Petstore está disponible', async function (this: CustomWorld) {
  this.orderApi = new OrderApi();
});

When('Creo una orden de compra con id generado', async function (this: CustomWorld) {
  this.createdOrderId = Math.floor(Math.random() * 100000) + 1000;
  const order = {
    id: this.createdOrderId,
    petId: 12345,
    quantity: 1,
    shipDate: new Date().toISOString(),
    status: 'placed',
    complete: true,
  };

  if (!this.orderApi) throw new Error('orderApi no está inicializado');
  this.lastResponse = await this.orderApi.createOrder(order);
});

Then('la creación responde con código 200', async function (this: CustomWorld) {
  expect(this.lastResponse).toBeTruthy();
  expect(this.lastResponse.status()).toBe(200);
  const body = await this.lastResponse.json();
  expect(body.id).toBe(this.createdOrderId);
});

When('Consulto la orden por id creada', async function (this: CustomWorld) {
  if (!this.orderApi) throw new Error('orderApi no está inicializado');
  this.lastResponse = await this.orderApi.getOrder(this.createdOrderId!);
});

Then('la respuesta contiene el id creado', async function (this: CustomWorld) {
  expect(this.lastResponse.status()).toBe(200);
  const body = await this.lastResponse.json();
  expect(body.id).toBe(this.createdOrderId);
});

When('Busco la orden de compra por id', async function (this: CustomWorld) {
  if (!this.orderApi) throw new Error('orderApi no está inicializado');
  this.lastResponse = await this.orderApi.getOrder(this.createdOrderId!);
});

Then('obtengo una respuesta con código 200 y el id coincide', async function (this: CustomWorld) {
  expect(this.lastResponse.status()).toBe(200);
  const body = await this.lastResponse.json();
  expect(body.id).toBe(this.createdOrderId);
});

When('Consulto el inventario de ventas', async function (this: CustomWorld) {
  if (!this.orderApi) throw new Error('orderApi no está inicializado');
  this.lastResponse = await this.orderApi.getInventory();
});

Then('la respuesta tendrá código 200 y contendrá claves de estados', async function (this: CustomWorld) {
  expect(this.lastResponse.status()).toBe(200);
  const body = await this.lastResponse.json();
  expect(typeof body).toBe('object');
  expect(Object.keys(body).length).toBeGreaterThan(0);
});

When('Elimino la orden por id creada', async function (this: CustomWorld) {
  if (!this.orderApi) throw new Error('orderApi no está inicializado');
  this.lastResponse = await this.orderApi.deleteOrder(this.createdOrderId!);
});

Then('la eliminación responde con código 200', async function (this: CustomWorld) {
  expect(this.lastResponse.status()).toBe(200);
});

Then('la respuesta tendrá código 404', async function (this: CustomWorld) {
  expect(this.lastResponse.status()).toBe(404);
});
