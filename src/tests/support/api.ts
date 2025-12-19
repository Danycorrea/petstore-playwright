import { request, APIRequestContext } from '@playwright/test';

// Centralized Base URL for Petstore API used across the test project.
export const PETSTORE_BASE = process.env.PETSTORE_BASE_URL || 'https://petstore.swagger.io/v2';

let ctx: APIRequestContext | null = null;

export async function getApiContext(): Promise<APIRequestContext> {
  if (!ctx) {
    ctx = await request.newContext({ extraHTTPHeaders: { 'Accept': 'application/json' } });
  }
  return ctx;
}

export function buildUrl(path: string) {
  // ensure path starts with '/'
  if (!path.startsWith('/')) path = `/${path}`;
  return `${PETSTORE_BASE}${path}`;
}
