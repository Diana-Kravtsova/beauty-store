import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BuildOptions } from './types/types';
import ESLintPlugin from 'eslint-webpack-plugin';

export function buildPlugins({ mode, paths }: BuildOptions): Configuration['plugins'] {
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [new HtmlWebpackPlugin({ template: paths.html })];

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].css',
      }),
      new ESLintPlugin({
        extensions: ['ts', 'tsx', 'js', 'jsx'],
        configType: 'flat',
      }),
    );
  }

  return plugins;
}
