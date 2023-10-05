import type { HandleFetch } from '@sveltejs/kit';
import { COOKIE_JWT, COOKIE_REFRESH_TOKEN, COOKIE_USER_ROLE } from './constants';
import { createServerClient } from '$lib';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
  const jwt = event.cookies.get(COOKIE_JWT);
  if (jwt) {
    request.headers.set('Authorization', `Bearer ${jwt}`);
  }

  const response = await fetch(request);
  if (response.status === 401 || response.status === 403) {
    const apiClient = createServerClient(fetch);
    const newTokens = await apiClient.POST('/auth/token', {
      body: {
        token: event.cookies.get(COOKIE_JWT)!,
        refreshToken: event.cookies.get(COOKIE_REFRESH_TOKEN)!
      }
    });

    event.cookies.set(COOKIE_JWT, newTokens.data?.token ?? '');
    event.cookies.set(COOKIE_REFRESH_TOKEN, newTokens.data?.refreshToken ?? '');
    event.cookies.set(COOKIE_USER_ROLE, newTokens.data?.role ?? '');

    request.headers.set('Authorization', `Bearer ${newTokens.data?.token}`);

    return fetch(request);
  }

  return response;
};
