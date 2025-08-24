import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';

export const checkAuth = createServerFn({
  method: 'GET',
  //response: 'data',
})
  //.middleware([loggingMiddleware])
  //   .validator((params: unknown) => {
  //     return GetGeneratedDocumentsSchema.parse(params);
  //   })
  .handler(async ({}) => {
    console.log('CHECKING AUTH');
    let token = getCookie('token');

    console.log('Checking auth cookie');
    if (!token) {
      console.log('No auth cookie found');
      throw redirect({ href: '/signin' });
    }

    let q = token.split('.');
    if (q.length !== 3) {
      //throw new ORPCError('UNAUTHORIZED', { message: 'Invalid token format' });
      throw redirect({ href: '/signin' });
    }

    // decode the jwt token
    let p = JSON.parse(Buffer.from(q[1], 'base64').toString('utf-8'));

    // verify it's still valid
    let now = Math.floor(Date.now() / 1000);
    if (p.exp < now) {
      console.log('Expired token');
      return redirect({ to: '/signin', throw: true });
      //
      // throw new ORPCError('UNAUTHORIZED', { message: 'Token expired' });
    }

    return {};
  });
