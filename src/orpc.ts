import { os, ORPCError } from '@orpc/server';
import { RequestHeadersPluginContext } from '@orpc/server/plugins';
import { redirect } from '@tanstack/react-router';
import { getCookie, sendRedirect } from '@tanstack/react-start/server';

interface ORPCContext extends RequestHeadersPluginContext {}

const base = os.$context<ORPCContext>();

export const pub = base.use(async ({ next }) => {
  //const { headers } = await import('next/headers');
  let h = getCookie('token');
  console.log('------------------ORPC Middleware------------------');

  //console.log(Object.fromEntries(await headers()))
  const result = await next({ context: { token: h } });
  console.log('------------------ORPC Middleware END------------------');

  return result;
});

export const dev = base.middleware(async ({ next, context }) => {
  console.log('------------------ORPC DEV Middleware------------------');

  let h = getCookie('token');
  if (!h) {
    throw new ORPCError('UNAUTHORIZED', { message: 'No token found' });
  }

  let q = h.split('.');
  if (q.length !== 3) {
    throw new ORPCError('UNAUTHORIZED', { message: 'Invalid token format' });
  }

  // decode the jwt token
  let p = JSON.parse(Buffer.from(q[1], 'base64').toString('utf-8'));

  // verify it's still valid
  let now = Math.floor(Date.now() / 1000);
  if (p.exp < now) {
    console.log('Expired token');
    return redirect({ to: '/signin', replace: true });
    //
    throw new ORPCError('UNAUTHORIZED', { message: 'Token expired' });
  }

  let qq = p['custom:Claims'];
  // remove the enclosing ' from qq

  const cleanedClaims: string[] = qq
    .split(',')
    .map((claim: string) => claim.replace(/"/g, ''));

  // remove the enclosing '

  // verify it has the admin role
  if (!cleanedClaims.includes('Create:User')) {
    throw new ORPCError('FORBIDDEN', { message: 'Insufficient role' });
  }

  const result = await next();
  console.log('------------------ORPC DEV Middleware END------------------');

  return result;
});
