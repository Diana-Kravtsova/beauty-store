import path from 'path';
import type { Configuration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer(options: BuildOptions): Configuration {
  return {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: options.port ?? 3000,
    open: true,
    historyApiFallback: true,
  };
}
