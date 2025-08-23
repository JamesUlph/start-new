//dev-neomainf-domain.auth.eu-west-2.amazoncognito.com
import { plopMiddleware } from '@/routes/api/auth.callback.cognito';
import { createMiddleware, createServerFn } from '@tanstack/react-start';
import { getWebRequest, setHeader } from '@tanstack/react-start/server';
import * as arctic from 'arctic';

const domain = 'dev-neomainf-domain.auth.eu-west-2.amazoncognito.com';
const clientId = '2fqgd4551sr9q22io1b50acgec';
const clientSecret = 'c62fsikflj6jt0ntoac7dl7p4aq6b1uhjlisleqghlii1d1d73l';
const redirectURI = 'http://localhost:3000/api/auth/callback/cognito';

//export const codeVerifier = arctic.generateCodeVerifier();
//console.log({ codeVerifier });

export const authMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next, data, context }) => {
    console.log('Request received:', context);

    if (!context?.codeVerifier) {
      context.codeVerifier = arctic.generateCodeVerifier();
    }

    setHeader('X-Code-Verifier', arctic.generateCodeVerifier());
    return next({ context });
  }
);

export const getAuthUrl = createServerFn({
  method: 'GET',
  response: 'raw',
})
  .middleware([authMiddleware])
  //.validator((params: unknown) => {
  //     return GetGeneratedDocumentsSchema.parse(params);
  //   })
  .validator((context: unknown) => {
    return context;
  })
  .handler(async (context) => {
    console.log('Auth:', { context });
    const request = getWebRequest();
    const state = arctic.generateState();

    const scopes = ['openid', 'profile'];

    const cognito = new arctic.AmazonCognito(
      domain,
      clientId,
      clientSecret,
      redirectURI
    );

    let v = arctic.generateCodeVerifier();
    setHeader('X-Code-Verifier', v);

    const url = cognito.createAuthorizationURL(
      state,
      'dVi5waTTJZoq7Znb3ziVk38dV4UnV_P3FlwkLVjSqd8', //arctic.generateCodeVerifier(),
      scopes
    );
    return { href: url.href };
  });
