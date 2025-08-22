import { loggingMiddleware } from '@/middleware/logging-middleware';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
// base https://devtoken.neoma.co.uk/CaseV3/case/GetGeneratedDocuments

const BASE_URL = `https://devtoken.neoma.co.uk/CaseV3`;

const GetGeneratedDocumentsSchema = z.object({
  includeDraft: z.boolean().default(true),
  parentId: z.string(),
  includeUrl: z.boolean().default(true),
});

export const getGeneratedDocuments = createServerFn({
  method: 'GET',
  //response: 'data',
})
  .middleware([loggingMiddleware])
  .validator((params: unknown) => {
    return GetGeneratedDocumentsSchema.parse(params);
  })
  .handler(async ({ data, context }) => {
    console.log('cock', data);
    let d = await fetch(`${BASE_URL}/case/GetGeneratedDocuments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    let p = (await d.json()) as {
      generatedDocumentId: string;
      documentType: string;
      title: string;
      isPublished: boolean;
      createdBy: string;
      createdDateTime: string;

      parentId: string;
    }[];

    console.log({ p });
    return p;
  });
