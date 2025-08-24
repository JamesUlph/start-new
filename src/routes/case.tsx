import { z } from 'zod';
import { checkAuth } from '@/functions/check-auth';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import CaseDataCard from '@/components/case-data-card';
import { caseQuery } from '@/functions/get-case-data';
import { Button } from '@/components/ui/button';
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { getGeneratedDocuments } from '@/functions/get-generated-documents';
import { orpc } from '@/orpc/client';
import { LucideDownload } from 'lucide-react';
import { ConfirmButton } from '@/components/confirm-button';

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

    context.queryClient.prefetchQuery(
      orpc.case.getCase.queryOptions({
        input: { caseNumber: deps.caseNumber },
      })
    );

    return { caseNumber: deps.caseNumber };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const c = useQueryClient();

  const caseData = useSuspenseQuery(
    orpc.case.getCase.queryOptions({
      input: { caseNumber: data.caseNumber },
    })
  );

  const q = useQuery({
    queryKey: ['generated-documents'],
    queryFn: () =>
      getGeneratedDocuments({
        data: {
          parentId: 'FD66AE28-D616-4D77-B486-12DB727829E5',
          includeDraft: true,
          includeUrl: true,
        },
      }),
  });
  // const caseData = useSuspenseQuery(caseQuery(data.caseNumber));
  return (
    <div>
      <h2 className="text-lg font-semibold">Case details</h2>
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
      <div className="bg-indigo-300">{JSON.stringify(q)}</div>
      {q.data?.map((doc) => (
        <div key={doc.generatedDocumentId}>
          {doc.title}
          {doc.isPublished ? ' (Published)' : ' (Draft)'}
          {doc.url && (
            <Button
              variant={'link'}
              className="text-gray-500"
              onClick={() => window.open(doc.url)}
            >
              {' '}
              <LucideDownload />
            </Button>
          )}
          <ConfirmButton
            type="Publish"
            dialog={{
              title: 'Publish Document',
              description:
                'This action will publish this document so it is available to use in other areas of the application.',
            }}
            confirmText="Yes, publish"
            onConfirm={() => {
              alert('x');
              //onCommand &&
              //onCommand({ type: 'PUBLISH', id: doc.GeneratedDocumentId })
            }}
          />{' '}
          <ConfirmButton
            type="Delete"
            dialog={{
              title: 'Delete',
              description:
                'This action will publish this document so it is available to use in other areas of the application.',
            }}
            confirmText="Yes, publish"
            onConfirm={() => {
              alert('x');
              //onCommand &&
              //onCommand({ type: 'PUBLISH', id: doc.GeneratedDocumentId })
            }}
          />
        </div>
      ))}
      {JSON.stringify(caseData)}
      <label>{caseData.data.caseNumber}</label>
      <Button
        type="button"
        onClick={() => {
          caseData.refetch();
        }}
      >
        Get
      </Button>
    </div>
  );
}
