import { prisma } from '@/lib/db';
import { dev, pub } from '@/orpc';
import z from 'zod/v4';

export const getGeneratedDocument = pub
  .use(dev)
  .input(z.object({ id: z.string(), includeUrl: z.boolean() }))
  .handler(async ({ input, context }) => {
    console.log('Fetching doc:', input.id);
    //console.log(context.token);

    const url = `https://devtoken.neoma.co.uk/CaseV3/case/GetGeneratedDocument`;

    const d = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify({
        generatedDocumentId: input.id,
        includeUrl: input.includeUrl,
      }),
    });

    const re = await d.json();

    const convertUserFields = JSON.parse(re.userFields);

    const ret = { ...re, userFields: convertUserFields };

    return ret as {
      generatedDocumentId: string;
      documentType: string;
      title: string;
      filename: string;
      parentId: string;
      caseId: string;
      caseNumber: string;
      userFields: Record<string, any>[];
      url: string;
    };
  });
