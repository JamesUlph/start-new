import { redirect } from '@tanstack/react-router';
import { createMiddleware } from '@tanstack/react-start';
import { createServerFileRoute, setCookie } from '@tanstack/react-start/server';
import * as arctic from 'arctic';

const domain = 'dev-neomainf-domain.auth.eu-west-2.amazoncognito.com';
const clientId = '2fqgd4551sr9q22io1b50acgec';
const clientSecret = 'c62fsikflj6jt0ntoac7dl7p4aq6b1uhjlisleqghlii1d1d73l';
const redirectURI =
  process.env['NODE_ENV'] == 'production'
    ? 'https://start-new.ballistix.co.uk/api/auth/callback/cognito'
    : 'http://localhost:3000/api/auth/callback/cognito';

function splitStringIntoChunks(str: string, maxLength: number): string[] {
  if (maxLength <= 0) {
    throw new Error('maxLength must be a positive number.');
  }

  const result: string[] = [];
  for (let i = 0; i < str.length; i += maxLength) {
    result.push(str.substring(i, i + maxLength));
  }
  return result;
}

export const plopMiddleware = createMiddleware({ type: 'request' }).server(
  async ({ next, context, request }) => {
    console.log('plop Request received:', context);
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    // const code = searchParams.get('code');
    console.log('Auth Code:', { code, state, context });

    //console.log('Response processed:', result);
    return next({
      context: {
        codeVerifier: 'dVi5waTTJZoq7Znb3ziVk38dV4UnV_P3FlwkLVjSqd8',
        code,
        state,
      },
    });
  }
);
export const ServerRoute = createServerFileRoute('/api/auth/callback/cognito')
  .middleware([plopMiddleware])
  .methods({
    GET: async (req) => {
      console.log({ context: req.context });
      //const url = new URL();
      const code = req.context.code;
      const state = req.context.state;
      const cognito = new arctic.AmazonCognito(
        domain,
        clientId,
        clientSecret,
        redirectURI
      );

      console.log(arctic.generateCodeVerifier());

      const tokens = await cognito.validateAuthorizationCode(
        code!,
        req.context.codeVerifier //arctic.generateCodeVerifier()
      );

      const accessToken = tokens.accessToken();
      const accessTokenExpiresAt = tokens.accessTokenExpiresAt();
      const refreshToken = tokens.refreshToken();
      const id = tokens.idToken();

      setCookie('token', id, { httpOnly: true, secure: true, sameSite: 'lax' });

      let zzz = 'abcdefghijklmnopqrstuvwxyz==';
      let sa = splitStringIntoChunks(zzz, 20);

      sa.forEach((o: string, i: number) => {
        setCookie(`testing.${i}`, o);
      });
      // chunk zzz into an array of 1000 characters

      return redirect({ to: '/case' });
      // return new Response(JSON.stringify(['Alice', 'Bob', 'Charlie']), {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
    },
  });
