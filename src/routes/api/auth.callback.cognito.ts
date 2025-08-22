import { createServerFileRoute, setCookie } from '@tanstack/react-start/server';

import { codeVerifier, cognito } from '@/functions/auth';
import { redirect } from '@tanstack/react-router';

export const ServerRoute = createServerFileRoute(
  '/api/auth/callback/cognito'
).methods({
  GET: async ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    // const code = searchParams.get('code');
    console.log('Auth Code:', { code, state });

    const tokens = await cognito.validateAuthorizationCode(code!, codeVerifier);

    const accessToken = tokens.accessToken();
    const accessTokenExpiresAt = tokens.accessTokenExpiresAt();
    const refreshToken = tokens.refreshToken();
    const id = tokens.idToken();

    console.log(id);

    setCookie('token', id, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      expires: accessTokenExpiresAt,
    });

    return redirect({ to: '/case' });
  },
});
