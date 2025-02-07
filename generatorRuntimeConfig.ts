// @ts-expect-error - client.gen is generated at runtime by openapi-ts and not available at compile time
import type { CreateClientConfig } from './client/client.gen';

export const createClientConfig: CreateClientConfig = (config: any) => ({
  ...config,
  baseURL: import.meta.env.VITE_API_URL || ''
});