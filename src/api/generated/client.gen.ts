// This file is auto-generated by @hey-api/openapi-ts

import type { ClientOptions } from './types.gen';
import { type Config, type ClientOptions as DefaultClientOptions, createClient, createConfig } from '@hey-api/client-axios';
import { createClientConfig } from '../../../generatorRuntimeConfig';

/**
 * The `createClientConfig()` function will be called on client initialization
 * and the returned object will become the client's initial configuration.
 *
 * You may want to initialize your client this way instead of calling
 * `setConfig()`. This is useful for example if you're using Next.js
 * to ensure your client always has the correct values.
 */
export type CreateClientConfig<T extends DefaultClientOptions = ClientOptions> = (override?: Config<DefaultClientOptions & T>) => Config<Required<DefaultClientOptions> & T>;

export const client = createClient(createClientConfig(createConfig<ClientOptions>({
    baseURL: 'http://localhost:8000'
})));