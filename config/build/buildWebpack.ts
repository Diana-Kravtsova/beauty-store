import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === 'development';

  return {
    mode: mode ?? 'development',
    entry: paths.entry,
    devtool: isDev ? 'inline-source-map' : 'source-map',
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    plugins: buildPlugins(options),
    output: {
      path: paths.output,
      filename: isDev ? '[name].js' : '[name].[contenthash].js',
      clean: true,
      publicPath: '/',
    },
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
