import { error, redirect } from '@sveltejs/kit';
import { COOKIE_JWT, COOKIE_REFRESH_TOKEN, COOKIE_USER_ROLE } from '../../constants';
import type { Actions } from './$types';
import { createServerClient } from '$lib';

export const actions = {
  default: async ({ request, cookies, fetch }) => {
    const data = await request.formData();
    const username = data.get('username')!.toString();
    const password = data.get('password')!.toString();
    const apiClient = createServerClient(fetch);

    const result = await apiClient.POST('/auth/login', { body: { username, password } });
    if (!result.response.ok) {
      throw error(500);
    }

    // set max age for cookies or don't use cookies not sure yet
    cookies.set(COOKIE_JWT, result.data!.token, { path: '/' });
    cookies.set(COOKIE_REFRESH_TOKEN, result.data!.refreshToken, { path: '/' });
    cookies.set(COOKIE_USER_ROLE, result.data!.role, { path: '/' });

    throw redirect(303, '/');
  }
} satisfies Actions;
