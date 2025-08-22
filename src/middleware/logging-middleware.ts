import { createMiddleware } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';

export const loggingMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next, data }) => {
    console.log('Request received:', data);

    let token = getCookie('token');
    const result = await next({
      context: {
        token: token || '',
      },
    });
    //console.log('Response processed:', result);
    return result;
  }
);
