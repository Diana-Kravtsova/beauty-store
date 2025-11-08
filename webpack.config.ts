import path from 'path';
import 'webpack-dev-server';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

interface EnvVariables {
  mode?: 'development' | 'production';
}

export default (env: EnvVariables) => {
  const isDev = env.mode === 'development';

  const config: Configuration = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    devtool: isDev ? 'inline-source-map' : 'source-map',

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isDev ? '[name].js' : '[name].[contenthash].js',
      clean: true,
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
    },
  };
  return config;
}
