import type { PageServerLoad } from './$types';
import { createServerClient } from '$lib';
import { COOKIE_JWT } from '../constants';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  if (!cookies.get(COOKIE_JWT)) {
    throw redirect(307, '/login');
  }

  const apiClient = createServerClient(fetch);
  return {
    deals: (await apiClient.GET('/deals', {})).data,
    jwt: cookies.get(COOKIE_JWT),
    config: (await apiClient.GET('/user/config', {})).data
  };
};
