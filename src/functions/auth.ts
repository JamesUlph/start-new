//dev-neomainf-domain.auth.eu-west-2.amazoncognito.com
import { createServerFn } from '@tanstack/react-start';
import * as arctic from 'arctic';

const domain = 'dev-neomainf-domain.auth.eu-west-2.amazoncognito.com';
const clientId = '2fqgd4551sr9q22io1b50acgec';
const clientSecret = 'c62fsikflj6jt0ntoac7dl7p4aq6b1uhjlisleqghlii1d1d73l';
const redirectURI = 'http://localhost:3000/api/auth/callback/cognito';
export const cognito = new arctic.AmazonCognito(
  domain,
  clientId,
  clientSecret,
  redirectURI
);

export const codeVerifier = arctic.generateCodeVerifier();
console.log({ codeVerifier });

export const getAuthUrl = createServerFn({
  method: 'GET',
  //response: 'data',
}).handler(async () => {
  console.log('Auth');
  const state = arctic.generateState();

  const scopes = ['openid', 'profile'];
  const url = cognito.createAuthorizationURL(state, codeVerifier, scopes);
  return { href: url.href };
});
