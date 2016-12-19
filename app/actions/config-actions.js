import { CONFIG_CHANGED, CONFIG_LOADED } from './types';

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
