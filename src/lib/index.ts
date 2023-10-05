import { PUBLIC_API_BASE } from '$env/static/public';
import type { PageServerLoadEvent } from '../routes/$types';
import type { paths } from './api.generated';
import { default as createClientBase } from 'openapi-fetch';

export const createServerClient = (fetcher: PageServerLoadEvent['fetch']) =>
  createClientBase<paths>({
    baseUrl: PUBLIC_API_BASE,
    fetch: fetcher
  });

export const createClient = () =>
  createClientBase<paths>({
    baseUrl: PUBLIC_API_BASE,
    fetch: (url, params) => fetchRetry(url, params, 5)
  });

export type ArrayElement<ArrayType extends readonly unknown[] | undefined> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export const fetchRetry = (
  url: RequestInfo | URL,
  options: RequestInit = {},
  retries: number
): Promise<Response> =>
  fetch(url, options).then((res: Response) => {
    if (res.ok) {
      return res;
    }
    if (retries > 0) {
      return fetchRetry(url, options, retries - 1);
    }
    throw new Error(res.status.toString());
  });
