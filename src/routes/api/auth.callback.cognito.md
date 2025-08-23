import {
  createServerFileRoute,
  getHeader,
  getHeaders,
  setCookie,
} from '@tanstack/react-start/server';

import { redirect } from '@tanstack/react-router';

import * as arctic from 'arctic';
import { createMiddleware } from '@tanstack/react-start';

const domain = 'dev-neomainf-domain.auth.eu-west-2.amazoncognito.com';
const clientId = '2fqgd4551sr9q22io1b50acgec';
const clientSecret = 'c62fsikflj6jt0ntoac7dl7p4aq6b1uhjlisleqghlii1d1d73l';
const redirectURI = 'http://localhost:3000/api/auth/callback/cognito';

const plopMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next, data }) => {
    console.log('plop Request received:', data);

    //console.log('Response processed:', result);
    return next({ context: { count: true } });
  }
);

export const ServerRoute = createServerFileRoute(
  '/api/auth/callback/cognito'
).methods({
  GET: async ({ request, context }: { request: Request; context: any }) => {
    console.log('Request received:', { request, context });
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    // const code = searchParams.get('code');
    console.log('Auth Code:', { code, state, context });

    console.log({ context });

    const cognito = new arctic.AmazonCognito(
      domain,
      clientId,
      clientSecret,
      redirectURI
    );

    const tokens = await cognito.validateAuthorizationCode(
      code!,
      arctic.generateCodeVerifier()
    );

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

    return {};
    // return redirect({ to: '/case' });

    // return new Response('Hello, World! from ' + request.url);
  },
});
