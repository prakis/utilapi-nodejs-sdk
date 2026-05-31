import type { CommandSpec } from './types.js';

/**
 * Command registry — keep in sync with utilapi-minimal-website/src/data/endpoints.ts
 * and live routes in api-utilapi-nodejs-service.
 */
export const COMMAND_REGISTRY: Record<string, CommandSpec> = {
  // Encoding
  'encode.base64': { path: '/encode/base64', method: 'GET', params: ['text'] },
  'encode.url': { path: '/encode/url', method: 'GET', params: ['text'] },
  'encode.html': { path: '/encode/html', method: 'GET', params: ['text'] },
  // Decoding
  'decode.base64': { path: '/decode/base64', method: 'GET', params: ['text'] },
  'decode.url': { path: '/decode/url', method: 'GET', params: ['text'] },
  'decode.html': { path: '/decode/html', method: 'GET', params: ['text'] },
  // Hash
  'hash.md5': { path: '/hash/md5', method: 'GET', params: ['text'] },
  'hash.sha1': { path: '/hash/sha1', method: 'GET', params: ['text'] },
  'hash.sha256': { path: '/hash/sha256', method: 'GET', params: ['text'] },
  'hash.sha512': { path: '/hash/sha512', method: 'GET', params: ['text'] },
  // Generate
  'generate.uuid': { path: '/generate/uuid', method: 'GET', params: ['version'] },
  'generate.nanoid': { path: '/generate/nanoid', method: 'GET', params: ['length'] },
  'generate.cuid': { path: '/generate/cuid', method: 'GET', params: [] },
  'generate.password': {
    path: '/generate/password',
    method: 'GET',
    params: ['length', 'symbols', 'numbers'],
  },
  'generate.secret': { path: '/generate/secret', method: 'GET', params: ['bytes'] },
  'generate.otp': { path: '/generate/otp', method: 'GET', params: ['length'] },
  // Number
  'number.roman': { path: '/number/roman', method: 'GET', params: ['n'] },
  'number.ordinal': { path: '/number/ordinal', method: 'GET', params: ['n'] },
  'number.inwords': { path: '/number/inwords', method: 'GET', params: ['n'] },
  'number.fibonacci': { path: '/number/fibonacci', method: 'GET', params: ['n'] },
  'number.isprime': { path: '/number/isprime', method: 'GET', params: ['n'] },
  'number.factorial': { path: '/number/factorial', method: 'GET', params: ['n'] },
  'number.clamp': { path: '/number/clamp', method: 'GET', params: ['n', 'min', 'max'] },
  // Date
  'date.now': { path: '/date/now', method: 'GET', params: ['tz'] },
  'date.humanize': { path: '/date/humanize', method: 'GET', params: ['ts'] },
  'date.diff': { path: '/date/diff', method: 'GET', params: ['from', 'to'] },
  'date.weekday': { path: '/date/weekday', method: 'GET', params: ['date'] },
  'date.quarter': { path: '/date/quarter', method: 'GET', params: ['date'] },
  'date.timezone': { path: '/date/timezone', method: 'GET', params: ['tz'] },
  'date.add': { path: '/date/add', method: 'GET', params: ['date', 'days'] },
  'date.subtract': { path: '/date/subtract', method: 'GET', params: ['date', 'days'] },
  'date.isleap': { path: '/date/isleap', method: 'GET', params: ['year'] },
  // Color
  'color.random': { path: '/color/random', method: 'GET', params: [] },
  'color.hex-to-rgb': { path: '/color/hex-to-rgb', method: 'GET', params: ['hex'] },
  'color.rgb-to-hex': { path: '/color/rgb-to-hex', method: 'GET', params: ['r', 'g', 'b'] },
  'color.lighten': { path: '/color/lighten', method: 'GET', params: ['hex', 'amount'] },
  'color.darken': { path: '/color/darken', method: 'GET', params: ['hex', 'amount'] },
  'color.complementary': { path: '/color/complementary', method: 'GET', params: ['hex'] },
  'color.name': { path: '/color/name', method: 'GET', params: ['hex'] },
};

export function commandToPath(command: string): string {
  return `/${command.replace(/\./g, '/')}`;
}
