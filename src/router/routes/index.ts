import type { RouteRecordNormalized } from 'vue-router';

const modules = import.meta.webpackContext('./modules', {
  // 是否搜索子目录
  recursive: false,
  regExp: /\.ts$/,
});

const externalModules = import.meta.webpackContext('./externalModules', {
  recursive: false,
  regExp: /\.ts$/,
});

function formatModules(context: any, result: RouteRecordNormalized[]): [] {
  context.keys().forEach((path) => {
    const mod = context(path);
    const defaultModule = mod.default;
    if (!defaultModule) return;
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule];
    result.push(...moduleList);
  });
  return result;
}

export const appRoutes: RouteRecordNormalized[] = formatModules(modules, []);
export const appExternalRoutes: RouteRecordNormalized[] = formatModules(
  externalModules,
  []
);
