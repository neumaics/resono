import { CONFIG_CHANGED, CONFIG_LOADED, CONFIG_UPDATED } from './types';

export function configChanged(config) {
  return {
    type: CONFIG_CHANGED,
    config: config
  };
}

export function configLoaded(config) {
  return {
    type: CONFIG_LOADED,
    config: config
  };
}

export function updateConfig(configPath, value) {
  return {
    type: CONFIG_UPDATED,
    configPath: configPath,
    value: value
  };
}
