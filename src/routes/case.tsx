import { z } from 'zod';
import { checkAuth } from '@/functions/check-auth';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import CaseDataCard from '@/components/case-data-card';
import { caseQuery } from '@/functions/get-case-data';
import { Button } from '@/components/ui/button';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

const pageSchema = z.object({
  caseNumber: z.number().min(200000).default(2000000),
});
export const Route = createFileRoute('/case')({
  validateSearch: pageSchema,
  beforeLoad: async () => {
    console.log('Before loading /case route');

    await checkAuth();
  },
  loaderDeps: ({ search: { caseNumber } }) => ({ caseNumber }),
  loader: async ({ deps, context }) => {
    console.log('loader:', deps);
    context.queryClient.prefetchQuery(caseQuery(deps.caseNumber));
    return { caseNumber: deps.caseNumber };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const c = useQueryClient();
  // const caseData = useSuspenseQuery(caseQuery(data.caseNumber));
  return (
    <div>
      Hello "/case"!
      <Suspense fallback={<div>Loading...</div>}>
        <CaseDataCard caseNumber={data.caseNumber} />
      </Suspense>
      <Button
        type="button"
        onClick={() => {
          c.refetchQueries(caseQuery(data.caseNumber));
        }}
      >
        Refresh
      </Button>
    </div>
  );
}
