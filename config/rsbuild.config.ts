import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { resolve } from 'path';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';
import configArcoResolverPlugin from './plugin/arcoResolver';

export default defineConfig({
  html: {
    template: './index.html',
  },
  source: {
    entry: {
      index: './src/main.ts',
    },
    // 别名
    alias: {
      '@': resolve(__dirname, '../src'),
      'assets': resolve(__dirname, '../src/assets'),
      'vue': 'vue/dist/vue.esm-bundler.js', // compile template
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js', // Resolve the i18n warning issue
    },
    // 样式按需引入
    transformImport: [
      {
        libraryName: 'arco-design-vue',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  },
  // 生产优化
  performance: {
    removeConsole: true,
    chunkSplit: {
      strategy: 'split-by-experience',
    },
  },
  tools: {
    rspack: {
      plugins: [configArcoResolverPlugin()],
    },
  },
  plugins: [
    pluginSvgr(),
    // 处理 Vue jsx
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginVueJsx(),
    pluginVue(),
    pluginImageCompress(),
    pluginLess({
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve(
              'src/assets/style/breakpoint.less'
            )}";`,
          },
        },
      },
    }),
  ],
});
