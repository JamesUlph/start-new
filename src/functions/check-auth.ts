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
    let token = getCookie('token');
    console.log('Checking auth cookie');
    if (!token) {
      console.log('No auth cookie found');
      throw redirect({ href: '/signin' });
    }

    return {};
  });
