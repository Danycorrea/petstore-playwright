import { APIRequestContext } from '@playwright/test';
import { getApiContext, PETSTORE_BASE } from '../support/api';

export class OrderApi {
  private ctx?: APIRequestContext;

  constructor(ctx?: APIRequestContext) {
    this.ctx = ctx;
  }

  private async context(): Promise<APIRequestContext> {
    if (!this.ctx) this.ctx = await getApiContext();
    return this.ctx!;
  }

  async createOrder(order: any) {
    const ctx = await this.context();
    return ctx.post(`${PETSTORE_BASE}/store/order`, { data: order });
  }

  async getOrder(id: number | string) {
    const ctx = await this.context();
    return ctx.get(`${PETSTORE_BASE}/store/order/${id}`);
  }

  async deleteOrder(id: number | string) {
    const ctx = await this.context();
    return ctx.delete(`${PETSTORE_BASE}/store/order/${id}`);
  }

  async getInventory() {
    const ctx = await this.context();
    return ctx.get(`${PETSTORE_BASE}/store/inventory`);
  }
}

export default OrderApi;
