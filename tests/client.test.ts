import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { UtilAPI, UtilAPIError } from '../src/index.js';

describe('UtilAPI', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => ({
          ok: true,
          endpoint: '/encode/base64',
          result: 'aGVsbG8=',
          ms: 1,
        }),
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('calls encode.base64 with positional text param', async () => {
    const api = new UtilAPI({ baseUrl: 'https://api.utilapi.com' });

    const response = await api.action({
      command: 'encode.base64',
      data: ['hello'],
    });

    expect(response.ok).toBe(true);
    expect(response.result).toBe('aGVsbG8=');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.utilapi.com/encode/base64?text=hello',
      { method: 'GET' },
    );
  });

  it('calls generate.uuid without query params', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({
        ok: true,
        endpoint: '/generate/uuid',
        result: { uuid: '550e8400-e29b-41d4-a716-446655440000', version: 4 },
        ms: 0,
      }),
    } as Response);

    const api = new UtilAPI();
    const response = await api.action({ command: 'generate.uuid' });

    expect(response.result).toEqual({
      uuid: '550e8400-e29b-41d4-a716-446655440000',
      version: 4,
    });
    expect(fetch).toHaveBeenCalledWith('https://api.utilapi.com/generate/uuid', {
      method: 'GET',
    });
  });

  it('maps multiple positional params for number.clamp', async () => {
    const api = new UtilAPI({ baseUrl: 'http://localhost:3000' });

    await api.action({
      command: 'number.clamp',
      data: [150, 0, 100],
    });

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/number/clamp?n=150&min=0&max=100',
      { method: 'GET' },
    );
  });

  it('throws UtilAPIError for unknown commands', async () => {
    const api = new UtilAPI();

    await expect(api.action({ command: 'jwt.decode' })).rejects.toThrow(UtilAPIError);
    await expect(api.action({ command: 'jwt.decode' })).rejects.toThrow(
      'Unknown command: jwt.decode',
    );
  });

  it('throws UtilAPIError when too many data values are provided', async () => {
    const api = new UtilAPI();

    await expect(
      api.action({
        command: 'encode.base64',
        data: ['hello', 'extra'],
      }),
    ).rejects.toThrow('Too many data values');
  });

  it('throws UtilAPIError on HTTP errors', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 503,
      statusText: 'Service Unavailable',
      json: async () => ({}),
    } as Response);

    const api = new UtilAPI();

    await expect(api.action({ command: 'encode.base64', data: ['hello'] })).rejects.toThrow(
      'HTTP 503',
    );
  });

  it('throws UtilAPIError on network failure', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('fetch failed'));

    const api = new UtilAPI();

    await expect(api.action({ command: 'encode.base64', data: ['hello'] })).rejects.toThrow(
      'Network error: fetch failed',
    );
  });

  it('strips trailing slash from custom baseUrl', async () => {
    const api = new UtilAPI({ baseUrl: 'http://localhost:3000/' });

    await api.action({ command: 'color.random' });

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/color/random', {
      method: 'GET',
    });
  });
});
