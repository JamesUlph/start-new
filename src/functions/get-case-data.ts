import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { loggingMiddleware } from '@/middleware/logging-middleware';
import { queryOptions } from 'node_modules/@tanstack/react-query/build/modern/queryOptions';

const GetCaseDataSchema = z.object({
  caseNumber: z.number(),
});

export const getCaseData = createServerFn({
  method: 'GET',
  //response: 'data',
})
  .middleware([loggingMiddleware])
  .validator((params: unknown) => {
    return GetCaseDataSchema.parse(params);
  })

  .handler(async ({ data, context }) => {
    const token = context.token || '';
    console.log({ caseNumber: data });
    console.log({ context });
    let resp = await fetch(
      'https://devtoken.neoma.co.uk/CaseV3/case/GetCaseData',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caseNumber: data.caseNumber, // Use the caseNumber from the context
        }),
      }
    );

    const response = await resp.json();

    //await new Promise((resolve) => setTimeout(resolve, 1000));

    return response;
  });

export const caseQuery = (id: number) =>
  queryOptions({
    queryKey: ['case', id],
    queryFn: () => getCaseData({ data: { caseNumber: id } }),
    staleTime: 1000 * 10, // 5 minutes
    refetchOnMount: true,
  });
