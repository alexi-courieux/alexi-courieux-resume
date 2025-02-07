import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://localhost:8000/openapi.json',
  output: 'src/api/generated',
  plugins: [{
    name: '@hey-api/client-axios',
    runtimeConfigPath: './generatorRuntimeConfig.ts',

  }]

});