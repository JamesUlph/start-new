import { getAuthUrl } from '@/functions/auth';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/signin')({
  loader: async () => {
    console.log('SIGIN');
    let { href } = await getAuthUrl();

    // console.log(u.url.href);

    return { href };
    //return { u };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const authUrl = Route.useLoaderData();

  return (
    <div>
      Hello "/signin"! <a href={authUrl.href}>Sign in</a>
    </div>
  );
}
